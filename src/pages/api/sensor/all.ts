import { NextApiRequest, NextApiResponse } from 'next'
import { getSensors } from './_queryClient'
import getVerifiedUserID from '../dashboard/_verifyUser'
import config from '../../../aws-exports'
import Amplify, { withSSRContext } from 'aws-amplify'

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
    return await getSensors().then(sesnsors => res.end(JSON.stringify(sesnsors))).catch(() => {
      res.status(500)
      return res.end()
    })
  }
  return res.status(401).end()
}
