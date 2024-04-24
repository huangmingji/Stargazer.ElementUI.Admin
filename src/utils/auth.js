import Cookies from 'js-cookie'

const TokenKey = 'AccessToken'
const RefreshTokenKey = 'RefreshToken'
const RefreshTimeKey = 'RefreshTime'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(accessToken, refreshToken, refreshTime) {
  setRefreshToken(refreshToken)
  setRefreshTime(refreshTime)
  return Cookies.set(TokenKey, accessToken)
}

export function removeToken() {
  removeRefreshToken()
  removeRefreshTime()
  return Cookies.remove(TokenKey)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token)
}

function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}

export function getRefreshTime() {
  return Cookies.get(RefreshTimeKey)
}

function setRefreshTime(time) {
  return Cookies.set(RefreshTimeKey, time)
}

function removeRefreshTime() {
  return Cookies.remove(RefreshTimeKey)
}

export function isRefreshTimeValid() {
  const refreshTime = getRefreshTime()
  if (refreshTime) {
    const now = new Date().getTime()
    const diff = now - refreshTime
    if (diff > 0) {
      return false
    }
  }
  return true
}
