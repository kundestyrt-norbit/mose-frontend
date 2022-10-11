import AWS from 'aws-sdk'

/**
 * Page for displaying information about a sensor.
 */
declare const process: {
  env: {
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
  }
}
export const userDB = new AWS.DynamoDB.DocumentClient(
  {
    region: 'eu-west-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })
