import { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from 'aws-amplify'
import { createDashboard, getDashboardNames } from './_queryUserSettings'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import getVerifiedUserID from './_verifyUser'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      const item = await createDashboard(req, userId)

      return res.status(201).json(item)
    }
    if (req.method === 'GET') {
      const item = await getDashboardNames(userId)

      return res.status(200).json(item.Items?.map(i => unmarshall(i)))
    }
  } else {
    throw new Error('UserId not valid')
  }
}
