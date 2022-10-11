import { NextApiRequest, NextApiResponse } from 'next'
import { getSensorData } from '../_queryClient'

export default function handler (req: NextApiRequest, res: NextApiResponse): void {
  const { id, sensor, days } = req.query
  const numDays = days ?? 1
  getSensorData(String(id), String(sensor), Number(numDays)).then(sesnsors => res.end(JSON.stringify(sesnsors))).catch(error => {
    res.status(500)
    res.end(JSON.stringify(error))
  })
}
