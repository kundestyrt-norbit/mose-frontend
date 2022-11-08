import { NextApiRequest, NextApiResponse } from 'next'
import { getSensorData } from '../_queryClient'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<any>> {
  const { id, column, from, to } = req.query
  let fromDate
  let toDate
  try {
    fromDate = new Date(from as string)
    const toExclusive = new Date(to as string)
    toExclusive.setDate(toExclusive.getDate() + 1)
    toDate = toExclusive
  } catch {}
  return await getSensorData(Number(id), String(column), fromDate, toDate).then(sensors => res.end(JSON.stringify(sensors))).catch(error => {
    res.status(500)
    return res.end(JSON.stringify(error))
  })
}
