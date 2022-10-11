import AWS from 'aws-sdk'
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand
} from '@aws-sdk/client-dynamodb'

declare const process: {
  env: {
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
    USER_DB_TABLE_NAME: string
  }
}
const userDB = new DynamoDBClient(
  {
    region: 'eu-west-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })

export default async function handler (req: any, res: any): Promise<any> {
  if (req.method === 'PUT') {
    const Item = await userDB.send(
      new PutItemCommand({
        TableName: process.env.USER_DB_TABLE_NAME,
        Item: {
          id: { S: req.body.id },
          content: { S: req.body.content }
        }
      })
    )

    return res.status(201).json(Item)
  }

  if (req.method === 'GET') {
    const Item = await userDB.send(
      new GetItemCommand({
        TableName: process.env.USER_DB_TABLE_NAME,
        Key: {
          id: { S: req.query.id }
        }
      })
    )

    return res.status(200).json(Item)
  }
}
