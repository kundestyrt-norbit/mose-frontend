import getVerifiedUserID from '../_verifyUser'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from 'aws-amplify'
import { getDashboard, saveDashboard } from '../_queryUserSettings'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      const item = await saveDashboard(req, userId)

      return res.status(201).json(item)
    }

    if (req.method === 'GET') {
      const item = await getDashboard(req, userId)

      return res.status(200).json(item.Item)
    }

    if (req.method === 'DELETE') {
      const item = await deleteDashboard(req, userId)

      return res.status(204).json(item)
    }
  } else {
    throw new Error('User ID not valid')
  }
}
