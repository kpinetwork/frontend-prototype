import { Auth } from 'aws-amplify'

export const getUserIdToken = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    return user.signInUserSession.idToken.jwtToken
  } catch (_error) {
    return null
  }
}

export const getUserId = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    return user.attributes.sub
  } catch (_error) {
    return ''
  }
}

export const getAuthorizationHeader = async () => {
  const token = await getUserIdToken()

  return {
    'Content-Type': 'application/json',
    Authorization: token
  }
}

export const verifyIsAdmin = async () => {
  const userInfo = await Auth.currentAuthenticatedUser()
  const adminRole = userInfo.signInUserSession.idToken.payload['cognito:groups'].filter(group => group.includes('admin'))
  const isAdmin = adminRole.length > 0
  return isAdmin
}
