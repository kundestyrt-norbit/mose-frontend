import getVerifiedUserID from '../../../../_verifyUser'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from 'aws-amplify'
import { addAlarm, deleteAlarm } from './_alarmQuery'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { Auth } = withSSRContext({ req })
  const userId: string | null = await getVerifiedUserID(Auth)
  if (userId != null) {
    if (req.method === 'PUT') {
      const item = await addAlarm(req, userId)
      res.status(201).json(item)
    }

    if (req.method === 'DELETE') {
      console.log('deleting')
      const deleteRes = await deleteAlarm(req, userId)
      deleteRes ? res.status(204).end() : res.status(400).end()
    }
  } else {
    throw new Error('User ID not valid')
  }
}
