import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  QueryCommand,
  PutItemCommandOutput,
  GetItemCommandOutput,
  QueryCommandOutput
} from '@aws-sdk/client-dynamodb'
import { NextApiRequest } from 'next'
import Amplify from 'aws-amplify'
import config from '../../../aws-exports.js'

Amplify.configure({ ...config, ssr: true })

declare const process: {
  env: {
    ACCESS_KEY_ID_DYNAMO_DB_AWS: string
    SECRET_ACCESS_KEY_DYNAMO_DB_AWS: string
    USER_DB_TABLE_NAME: string
  }
}
const userDB = new DynamoDBClient(
  {
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID_DYNAMO_DB_AWS,
      secretAccessKey: process.env.SECRET_ACCESS_KEY_DYNAMO_DB_AWS
    }
  })

export async function saveDashboard (req: NextApiRequest, userId: string | null): Promise<PutItemCommandOutput> {
  const { dashboardId, dashboardName, sensors } = req.query
  const item = await userDB.send(new PutItemCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Item: {
      userId: { S: userId ?? '' },
      dashboardId: { N: dashboardId as string },
      dashboardName: { S: dashboardName as string },
      sensors: { L: sensors as any[] }
    }
  }))
  return item
}

export async function getDashboard (req: NextApiRequest, userId: string): Promise<GetItemCommandOutput> {
  const { dashboard } = req.query
  const dashboardId = dashboard as string
  const item = await userDB.send(new GetItemCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Key: {
      userId: { S: userId ?? '' },
      dashboardId: { S: dashboardId }
    },
    ProjectionExpression: 'dashboardId, dashboardName, sensors'
  }))
  return item
}

export async function createDashboard (req: NextApiRequest, userId: string | null): Promise<PutItemCommandOutput> {
  const { dashboardId, dashboardName, sensors } = req.body
  const item = await userDB.send(new PutItemCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Item: {
      userId: { S: userId ?? '' },
      dashboardId: { S: dashboardId },
      dashboardName: { S: dashboardName },
      sensors: { L: sensors }
    }
  })
  )
  return item
}

export async function getDashboardNames (userId: string | null): Promise<QueryCommandOutput> {
  const item = await userDB.send(new QueryCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    KeyConditionExpression: 'userId = :v1',
    ExpressionAttributeValues: {
      ':v1': { S: userId ?? '' }
    },
    ProjectionExpression: 'dashboardId, dashboardName'
  })
  )

  return item
}
