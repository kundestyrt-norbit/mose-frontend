import { NextApiRequest, NextApiResponse } from 'next'
import Amplify, { withSSRContext } from 'aws-amplify'
import { createDashboard, getDashboardNames } from './_queryUserSettings'
import getVerifiedUserID from './_verifyUser'
import config from '../../../aws-exports.js'

Amplify.configure({ ...config, ssr: true })

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

      return res.status(200).json(item)
    }
  } else {
    throw new Error('UserId not valid')
  }
}
