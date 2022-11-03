import { NextApiRequest, NextApiResponse } from 'next'
import { getSensors } from '../_queryClient'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<any>> {
  return await getSensors().then(sensors => res.end(JSON.stringify(sensors))).catch(error => {
    res.status(500)
    return res.end(JSON.stringify(error))
  })
}
