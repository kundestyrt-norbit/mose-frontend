import { withSSRContext } from 'aws-amplify'
import { NextApiRequest, NextApiResponse } from 'next'
import getVerifiedUserID from '../../dashboard/_verifyUser'
import { getSensorsIncludeDashboard } from '../_queryClient'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<any>> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId === null) {
    return res.status(401).end(JSON.stringify('User not logged in'))
  }
  return await getSensorsIncludeDashboard(req, userId).then(sensors => res.end(JSON.stringify(sensors))).catch(() => {
    res.status(500)
    return res.end()
  })
}
