import { Platform } from 'react-native'
import { Permissions, Notifications } from 'exponent'

import { API_URL } from '../constants/api'
import { applicationJSON } from '../utilities/requestHelpers'

export default async function registerForPushNotificationsAsync(credentials) {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS)

  // Stop here if the user did not grant permissions
  if (status !== 'granted') return

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExponentPushTokenAsync()

  // POST the token to our backend so we can use it to send pushes from there
  const method = 'POST'
  const headers = { ...applicationJSON, ...credentials }
  const body = JSON.stringify({ token: { value: token } })
  return fetch(`${API_URL}/tokens`, { method, headers, body })
}
