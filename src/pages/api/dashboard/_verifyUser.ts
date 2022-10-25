import { CognitoJwtVerifier } from 'aws-jwt-verify'

declare const process: {
  env: {
    AUTH_POOL: string
    AUTH_POOL_CLIENT: string
  }
}

async function verifyUserID (token: any): Promise<boolean> {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AUTH_POOL,
    tokenUse: 'id',
    clientId: process.env.AUTH_POOL_CLIENT
  })
  try {
    await verifier.verify(token.jwtToken)
  } catch (err) {
    console.log((err as Error).message)
    return false
  }
  return true
}

type userID = string | null

export default async function getVerifiedUserID (Auth: any): Promise<userID> {
  const userTokens = await Auth.currentSession()
  if (await verifyUserID(userTokens?.getIdToken())) {
    return userTokens?.getIdToken()?.payload?.sub
  } else {
    return null
  }
}
