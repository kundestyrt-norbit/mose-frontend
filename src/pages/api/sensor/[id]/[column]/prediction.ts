import { NextApiRequest, NextApiResponse } from 'next'
import { getSensorDataPrediction } from '../../_queryClient'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<any>> {
  const { id, column } = req.query
  return await getSensorDataPrediction(Number(id), String(column)).then(sensors => res.end(JSON.stringify(sensors))).catch(error => {
    res.status(500)
    return res.end(JSON.stringify(error))
  })
}
