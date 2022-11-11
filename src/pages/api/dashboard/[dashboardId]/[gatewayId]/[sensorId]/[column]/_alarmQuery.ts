import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest } from 'next'
import { Alarm, Sensor } from '../../../../../../../components/elements/dashboard/types'
import { userDB } from '../../../../_queryUserSettings'

export async function addAlarm (req: NextApiRequest, userId: string): Promise<Boolean> {
  const { dashboardId, column, sensorId, gatewayId } = req.query
  const { name, type, value } = req.body
  // to add an alarm we must first find the index of the sensor in the given dashboard
  const dashboardFromDb = (await userDB.send(new GetCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Key: {
      userId,
      dashboardId
    },
    ProjectionExpression: 'dashboardId, dashboardName, sensors'
  }))).Item
  const sensorIndex: number = dashboardFromDb?.sensors
    .findIndex((s: Sensor) => s.id === Number(sensorId) && s.column === column && s.gatewayId === Number(gatewayId))
  if (sensorIndex === -1) {
    // element not found
    return false
  }

  const alarm: Alarm = {
    name, value, type
  }

  await userDB.send(new UpdateCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Key: {
      userId,
      dashboardId
    },
    UpdateExpression: `SET sensors[${sensorIndex}].alarms.#type = :alarm`,
    ExpressionAttributeNames: {
      '#type': type
    },
    ExpressionAttributeValues: {
      ':alarm': alarm
    }
  }))
  return true
}

export async function deleteAlarm (req: NextApiRequest, userId: string | null): Promise<boolean> {
  const { dashboardId, sensorId, column, gatewayId } = req.query
  const { type } = req.body
  const dashboardFromDb = (await userDB.send(new GetCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Key: {
      userId,
      dashboardId
    },
    ProjectionExpression: 'dashboardId, dashboardName, sensors'
  }))).Item
  // find the index
  const indexToRemove: number = dashboardFromDb?.sensors
    .findIndex((s: Sensor) => s.id === Number(sensorId) && s.column === column && s.gatewayId === Number(gatewayId))
  if (indexToRemove === -1) {
    // element not found
    return false
  }
  await userDB.send(new UpdateCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Key: {
      userId,
      dashboardId
    },
    UpdateExpression: `
      REMOVE sensors[${indexToRemove}].alarms.#alarmType
    `,
    ExpressionAttributeNames: {
      '#alarmType': type
    }
  }))
  return true
}
