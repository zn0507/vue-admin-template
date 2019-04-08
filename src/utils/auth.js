import Cookies from 'js-cookie'

const TokenKey = 'UserToken'
const RefreshTokenKey = 'RefreshUserToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token.access_token) && Cookies.set(RefreshTokenKey, token.refresh_token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
