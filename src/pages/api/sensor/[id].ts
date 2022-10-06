import { NextApiRequest, NextApiResponse } from 'next'
import { getSensorData } from './_queryClient'

export default function handler (req: NextApiRequest, res: NextApiResponse): void {
  const { id } = req.query
  getSensorData(String(id), 'humidity', 4).then(sesnsors => res.end(JSON.stringify(sesnsors))).catch(error => {
    res.status(500)
    res.end(JSON.stringify(error))
  })
}
