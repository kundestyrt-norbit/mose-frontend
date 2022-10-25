import { NextApiRequest, NextApiResponse } from 'next'
import { getSensors } from './_queryClient'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<any>> {
  return await getSensors().then(sesnsors => res.end(JSON.stringify(sesnsors))).catch(error => {
    res.status(500)
    return res.end(JSON.stringify(error))
  })
}
