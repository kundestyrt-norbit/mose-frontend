import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  BatchGetItemCommand,
  ScanCommand,
  QueryCommand
} from '@aws-sdk/client-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import getVerifiedUserID from './_verifyUser'
import Amplify, { withSSRContext } from 'aws-amplify'
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

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<any> {
  const { Auth } = withSSRContext({ req })
  console.log(await Auth.currentSession())
  const userID: string | null = await getVerifiedUserID(Auth)
  if (req.method === 'PUT') {
    const Item = await userDB.send(
      new PutItemCommand({
        TableName: process.env.USER_DB_TABLE_NAME,
        Item: {
          userID: { S: req.body.id },
          dashboardID: { S: req.body.did },
          content: { S: req.body.content }
        }
      })
    )

    return res.status(201).json(Item)
  }

  if (req.method === 'GET') {
    console.log(userID)
    const Item = await userDB.send(
      new QueryCommand({
        TableName: process.env.USER_DB_TABLE_NAME,
        KeyConditionExpression: 'userID = :v1',
        ExpressionAttributeValues: {
          ':v1': { S: userID ?? '' }
        }
        // dashboardID: { N: '1' }
      })
    )

    return res.status(200).json(Item)
  }
}
