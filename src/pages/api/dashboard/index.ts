import { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from 'aws-amplify'
import { createDashboard } from './_queryUserSettings'
import getVerifiedUserID from './_verifyUser'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<any>> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      return await createDashboard(req, userId).then(item => res.end(JSON.stringify(item))).catch(error => {
        res.status(500)
        return res.end(JSON.stringify(error))
      })
    }
    res.status(404)
    return res.end()
  } else {
    res.status(401)
    return res.end()
  }
}
