import { NextApiRequest, NextApiResponse } from 'next'
import { getSensorData } from '../_queryClient'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<any>> {
  const { id, sensor, days } = req.query
  const numDays = days ?? 1
  return await getSensorData(String(id), String(sensor), Number(numDays)).then(sesnsors => res.end(JSON.stringify(sesnsors))).catch(error => {
    res.status(500)
    return res.end(JSON.stringify(error))
  })
}
