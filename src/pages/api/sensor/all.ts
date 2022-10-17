import { NextApiRequest, NextApiResponse } from 'next'
import { getSensors } from './_queryClient'

export default function handler (req: NextApiRequest, res: NextApiResponse): void {
  getSensors().then(sesnsors => res.end(JSON.stringify(sesnsors))).catch(error => {
    res.status(500)
    res.end(JSON.stringify(error))
  })
}
