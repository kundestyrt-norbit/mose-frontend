import { NextApiRequest, NextApiResponse } from 'next'
import Amplify, { withSSRContext } from 'aws-amplify'
import { createDashboard, getDashboardNames } from '../_queryUserSettings'
import getVerifiedUserID from '../_verifyUser'
import config from '../../../../aws-exports'

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

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<void>> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      const item = await createDashboard(req, userId)

      return res.status(201).end(JSON.stringify(item))
    }
    if (req.method === 'GET') {
      const item = await getDashboardNames(userId)
      return res.status(200).end(JSON.stringify(item.Items?.sort((a, b) => {
        const left: string = a.dashboardName.toString()
        const right: string = b.dashboardName.toString()
        if (left === right) {
          return 0
        }
        return left > right ? 1 : -1
      })))
    }
    return res.status(404).end()
  } else {
    return res.status(401).end()
  }
}
