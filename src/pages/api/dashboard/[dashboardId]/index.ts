import getVerifiedUserID from '../_verifyUser'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from 'aws-amplify'
import { deleteDashboard, getDashboard, saveDashboard } from '../_queryUserSettings'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<any>> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      const item = await saveDashboard(req, userId)

      return res.status(201).end(JSON.stringify(item))
    }

    if (req.method === 'GET') {
      const item = await getDashboard(req, userId)

      return res.status(200).end(JSON.stringify(item.Item))
    }

    if (req.method === 'DELETE') {
      await deleteDashboard(req, userId)

      return res.status(204).end()
    }
    return res.status(404).end()
  } else {
    return res.status(401).end()
  }
}
