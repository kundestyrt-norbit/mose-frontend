import getVerifiedUserID from '../../../../_verifyUser'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from 'aws-amplify'
import { addSensor, deleteSensor } from '../../../_query'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<any>> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      const item = await addSensor(req, userId)
      return res.status(201).end(JSON.stringify(item))
    } else if (req.method === 'DELETE') {
      const deletedSensor: boolean = await deleteSensor(req, userId)
      if (deletedSensor) { return res.status(204).end() } else return res.status(404).end()
    }
  }
  return res.status(401).end()
}
