import { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from 'aws-amplify'
import { createDashboard } from './_queryUserSettings'
import getVerifiedUserID from './_verifyUser'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      const item = await createDashboard(req, userId)

      return res.status(201).json(item)
    }
  } else {
    throw new Error('UserId not valid')
  }
}
