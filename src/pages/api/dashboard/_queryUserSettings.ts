import {
  DynamoDBClient
} from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  PutCommandOutput,
  GetCommandOutput,
  QueryCommand,
  QueryCommandOutput,
  DeleteCommandOutput,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb'
import { NextApiRequest } from 'next'

declare const process: {
  env: {
    ACCESS_KEY_ID_DYNAMO_DB_AWS: string
    SECRET_ACCESS_KEY_DYNAMO_DB_AWS: string
    USER_DB_TABLE_NAME: string
  }
}
const userDBClient = new DynamoDBClient(
  {
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID_DYNAMO_DB_AWS,
      secretAccessKey: process.env.SECRET_ACCESS_KEY_DYNAMO_DB_AWS
    }
  })

export const userDB = DynamoDBDocumentClient.from(userDBClient)

export async function saveDashboard (req: NextApiRequest, userId: string | null): Promise<PutCommandOutput> {
  const { dashboardId, dashboardName, sensors } = req.query
  const item = await userDB.send(new PutCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Item: {
      userId,
      dashboardId,
      dashboardName,
      sensors
    }
  }))
  return item
}

export async function getDashboard (req: NextApiRequest, userId: string): Promise<GetCommandOutput> {
  const { dashboardId } = req.query
  const item = await userDB.send(new GetCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Key: {
      userId,
      dashboardId
    },
    ProjectionExpression: 'dashboardId, dashboardName, sensors'
  }))
  return item
}

export async function createDashboard (req: NextApiRequest, userId: string | null): Promise<PutCommandOutput> {
  const { dashboardId, dashboardName, sensors } = req.body
  const item = await userDB.send(new PutCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Item: {
      userId,
      dashboardId,
      dashboardName,
      sensors
    }
  })
  )
  return item
}

export async function deleteDashboard (req: NextApiRequest, userId: string | null): Promise<DeleteCommandOutput> {
  const { dashboardId } = req.query
  console.log(dashboardId, userId)
  const item = await userDB.send(new DeleteCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    Key: {
      userId,
      dashboardId
    }
  }))
  return item
}

export async function getDashboardNames (userId: string | null): Promise<QueryCommandOutput> {
  const item = await userDB.send(new QueryCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    KeyConditionExpression: 'userId = :v1',
    ExpressionAttributeValues: {
      ':v1': userId
    },
    ProjectionExpression: 'dashboardId, dashboardName'
  })
  )
  return item
}

export async function getDashboards (userId: string | null): Promise<QueryCommandOutput> {
  const item = await userDB.send(new QueryCommand({
    TableName: process.env.USER_DB_TABLE_NAME,
    KeyConditionExpression: 'userId = :v1',
    ExpressionAttributeValues: {
      ':v1': userId
    },
    ProjectionExpression: 'dashboardId, dashboardName, sensors'
  })
  )

  return item
}
