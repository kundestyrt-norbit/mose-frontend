import { CognitoJwtVerifier } from 'aws-jwt-verify'

declare const process: {
  env: {
    USER_POOL_ID: string
    CLIENT_ID: string
  }
}

async function verifyUserID (token: any): Promise<boolean> {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: 'id',
    clientId: process.env.CLIENT_ID
  })

  try {
    const payload = await verifier.verify(token.jwtToken)
    console.log('Payload: ', payload)
  } catch (err) {
    console.log((err as Error).message)
    return false
  }
  return true
}

type userID = String | null

export default async function getVerifiedUserID (Auth: any): Promise<userID> {
  const userTokens = await Auth.currentSession()
  if (await verifyUserID(userTokens?.getIdToken())) {
    return userTokens?.getIdToken()?.payload?.sub
  } else {
    return null
  }
}
