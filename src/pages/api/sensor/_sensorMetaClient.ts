declare const process: {
  env: {
    BLUE_TRACK_ACCESS_KEY: string
    BLUE_TRACK_ACCESS_SECRET: string
  }
}
const fetchWithAuth = async (endpoint: string): Promise<Response> => {
  return await fetch(`http://api.norbitiot.com/api/${endpoint}`, { headers: { 'X-API-KEY': process.env.BLUE_TRACK_ACCESS_KEY, 'X-API-SECRET': process.env.BLUE_TRACK_ACCESS_SECRET } })
}

export const get = async (id: number): Promise<Response> => {
  return await fetchWithAuth('/')
}
