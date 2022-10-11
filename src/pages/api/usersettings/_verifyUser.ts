import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { Auth } from 'aws-amplify'

declare const process: {
  env: {
    USER_POOL_ID: string
    CLIENT_ID: string
  }
}
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USER_POOL_ID,
  tokenUse: 'id',
  clientId: process.env.CLIENT_ID
})

async function verifyUserID (token: any): Promise<boolean> {
  try {
    await verifier.verify(token)
  } catch (err) {
    console.log((err as Error).message)
    return false
  }
  console.log(token)
  return true
}

type userID = String | null

async function getVerifiedUserID (): Promise<userID> {
  const userTokens = Auth.currentSession?.idToken?.payload
  if (await verifyUserID(userTokens)) {
    return userTokens?.sub
  } else {
    return null
  }
}
export default getVerifiedUserID
