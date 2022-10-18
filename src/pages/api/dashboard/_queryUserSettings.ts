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
    AWS_ACCESS_KEY_ID_DYNAMO_DB: string
    AWS_SECRET_ACCESS_KEY_DYNAMO_DB: string
    USER_DB_TABLE_NAME: string
  }
}
const userDB = new DynamoDBClient(
  {
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_DYNAMO_DB,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DYNAMO_DB
    }
  })

export async function saveDashboard (req: NextApiRequest, userId: string | null): Promise<PutItemCommandOutput> {
  const { dashboardId, dashboardName, sensors } = req.query
  const Item = await userDB.send(new PutItemCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Item: {
      userID: { S: userId ?? '' },
      dashboardID: { N: dashboardId as string },
      dashboardName: { S: dashboardName as string },
      sensors: { L: sensors as any[] }
    }
  }))
  return Item
}

export async function getDashboard (req: NextApiRequest, userId: string): Promise<GetItemCommandOutput> {
  const { dashboard } = req.query
  const dashboardId = dashboard as string
  const Item = await userDB.send(new GetItemCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Key: {
      userID: { S: userId ?? '' },
      dashboardID: { N: dashboardId }
    }
  }))
  return Item
}

export async function createDashboard (req: NextApiRequest, userId: string | null): Promise<PutItemCommandOutput> {
  const Item = await userDB.send(new PutItemCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Item: {
      userID: { S: userId ?? '' },
      dashboardID: { N: req.body },
      dashboardName: { S: 'New Dashboard' }
    }
  })
  )
  return Item
}

export async function getDashboardNames (userId: string | null): Promise<QueryCommandOutput> {
  const Item = await userDB.send(new QueryCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    KeyConditionExpression: 'userID = :v1',
    ExpressionAttributeValues: {
      ':v1': { S: userId ?? '' }
    }
  })
  )
  return Item
}
