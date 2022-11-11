import { NextApiRequest, NextApiResponse } from 'next'
import Amplify, { withSSRContext } from 'aws-amplify'
import { createDashboard } from './_queryUserSettings'
import getVerifiedUserID from './_verifyUser'
import config from '../../../aws-exports'

Amplify.configure({
  ...config,
  oauth: {
    domain: 'moseauth.auth.eu-north-1.amazoncognito.com',
    scope: ['email', 'openid'],
    redirectSignIn: process.env.AUTH_REDIRECT,
    redirectSignOut: process.env.AUTH_REDIRECT,
    responseType: 'code'
  },
  ssr: true
})

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<any>> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      return await createDashboard(req, userId).then(item => res.end(JSON.stringify(item))).catch(() => {
        res.status(500)
        return res.end()
      })
    }
    res.status(404)
    return res.end()
  } else {
    res.status(401)
    return res.end()
  }
}
