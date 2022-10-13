import getVerifiedUserID from './_verifyUser'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from 'aws-amplify'
import { getDashboard, saveDashboard } from './_queryDB'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<any> {
  const { Auth } = withSSRContext({ req })
  console.log(await Auth.currentSession())
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      const Item = await saveDashboard(req, userId)

      return res.status(201).json(Item)
    }

    if (req.method === 'GET') {
      const Item = await getDashboard(req, userId)

      return res.status(200).json(Item)
    }
  } else {
    throw new Error('User ID not valid')
  }
}
