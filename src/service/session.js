import { Auth } from 'aws-amplify'

export const getUserIdToken = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    return user.signInUserSession.idToken.jwtToken
  } catch (_error) {
    return null
  }
}

export const getAuthorizationHeader = async () => {
  const token = await getUserIdToken()

  return {
    'Content-Type': 'application/json',
    Authorization: token
  }
}
