import { NextApiRequest, NextApiResponse } from 'next'
import Amplify, { withSSRContext } from 'aws-amplify'
import { createDashboard, getDashboardNames } from './_queryDB'
import getVerifiedUserID from './_verifyUser'
import config from '../../../aws-exports.js'

Amplify.configure({ ...config, ssr: true })

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<any> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      const Item = await createDashboard(req, userId)

      return res.status(201).json(Item)
    }
    if (req.method === 'GET') {
      const Item = await getDashboardNames(userId)

      return res.status(200).json(Item)
    }
  } else {
    throw new Error('UserId not valid')
  }
}
