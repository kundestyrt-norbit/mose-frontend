import getVerifiedUserID from '../../../../_verifyUser'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from 'aws-amplify'
import { addSensor, deleteSensor } from '../../../_query'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      const item = await addSensor(req, userId)
      return res.status(201).json(item)
    } else if (req.method === 'DELETE') {
      const deletedSensor: boolean = await deleteSensor(req, userId)
      if (deletedSensor) { return res.status(204).json({}) } else return res.status(404).json({})
    }
  }
}
