import { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from 'aws-amplify'
import { getDashboards } from '../../../../_queryUserSettings'
import getVerifiedUserID from '../../../../_verifyUser'
import { Sensor } from '../../../../../../../components/elements/dashboard/types'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
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
      return res.status(200).json(item.Items)
    }
  } else {
    throw new Error('UserId not valid')
  }
}
