import { GetCommand, UpdateCommand, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest } from 'next'
import { Sensor } from '../../../../components/elements/dashboard/types'
import { userDB } from '../_queryUserSettings'

export async function addSensor (req: NextApiRequest, userId: string | null): Promise<UpdateCommandOutput> {
  const { dashboardId, sensorId, column, gatewayId } = req.query
  const item = await userDB.send(new UpdateCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Key: {
      userId,
      dashboardId
    },
    UpdateExpression: 'SET sensors= list_append(sensors, :sensor)',
    ExpressionAttributeValues: {
      ':sensor': [{ id: Number(sensorId), gatewayId: Number(gatewayId), column }]
    }
  }))
  return item
}

export async function deleteSensor (req: NextApiRequest, userId: string | null): Promise<boolean> {
  const { dashboardId, sensorId, column, gatewayId } = req.query
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
      REMOVE sensors[${indexToRemove}]
    `
  }))
  return true
}
