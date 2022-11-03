import { NextApiRequest, NextApiResponse } from 'next'
import Amplify, { withSSRContext } from 'aws-amplify'
import { getDashboards } from '../../../../_queryUserSettings'
import getVerifiedUserID from '../../../../_verifyUser'
import { Sensor } from '../../../../../../../components/elements/dashboard/types'
import config from '../../../../../../../aws-exports'

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
  const { gatewayId, sensorId, column } = req.query
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'GET') {
      const item = await getDashboards(userId)
      item.Items?.forEach((item) => {
        item.hasSensor = item.sensors.some(
          (sensor: Sensor) => (
            sensor.id === Number(sensorId) &&
            sensor.gatewayId === Number(gatewayId) &&
            sensor.column === column
          ))
        delete item.sensors
      })
      return res.status(200).end(JSON.stringify(item.Items))
    }
    return res.status(404).end()
  } else {
    return res.status(401).end()
  }
}
