import { PutItemCommand, PutItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { NextApiRequest } from 'next'
import { userDB } from '../_queryUserSettings'

export async function addSensor (req: NextApiRequest, userId: string | null): Promise<PutItemCommandOutput> {
  const { dashboardId, sensorId, column, gatewayId } = req.query
  const item = await userDB.send(new PutItemCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Key: {
      userId: { S: userId ?? '' },
      dashboardId: { S: dashboardId }
    },
    UpdateExpression: 'set sensors= list_append(sensors, :sensor)',
    ExpressionAttributeValues: {
      ':sensor': { sensorId, gatewayId, column }
    }
  }))
  return item
}
