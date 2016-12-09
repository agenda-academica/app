import { RNS3 } from 'react-native-aws3'
import md5 from 'md5'

import { applicationJSON } from '../utilities/requestHelpers'
import { API_URL } from '../constants/api'
import { setLoading as uploadSetLoading } from '../actions/UploadAction'
import {
  requestMyAccountUpdate,
  successMyAccountUpdate,
  failureMyAccountUpdate,

  requestMyAccountDestroy,
  successMyAccountDestroy,
  failureMyAccountDestroy,
} from '../actions/AuthenticationAction'
import { mockCredentials } from '../utilities/fetchHelpers'
import { isEmptyObject } from '../utilities/validationHelpers'
import ENV from '../../env'

export const save = props => {
  const { image, values, dispatch } = props

  if (!image) {
    update({ values, props });
  } else {
    const { uri, ext } = image
    const file = {
      uri,
      name: `${md5(new Date())}.${ext}`,
      type: 'application/octet-stream',
    }
    const options = {
      keyPrefix: 'uploads/',
      bucket: ENV['AWS_S3_BUCKET'],
      region: ENV['AWS_S3_REGION'],
      accessKey: ENV['AWS_S3_ACCESS_KEY'],
      secretKey: ENV['AWS_S3_SECRET_KEY'],
      successActionStatus: 201
    }

    dispatch(uploadSetLoading(true))
    return RNS3.put(file, options)
      .then(responseImage => {
        if (responseImage.status !== 201) throw new Error('Failed to upload image to S3')
        dispatch(uploadSetLoading(false))
        update({ values: { ...values, avatar: responseImage.body.postResponse.location }, props })
      })
  }
}

const update = ({ values, props }) => {
  const { dispatch, credentials, next } = props

  const method = 'PUT'
  const headers = { ...applicationJSON, ...credentials }
  const body = JSON.stringify({ ...values })

  dispatch(requestMyAccountUpdate())
  return fetch(`${API_URL}/auth`, { method, headers, body })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureMyAccountUpdate(data.errors[0]))
        else dispatch(successMyAccountUpdate(data)); next()
      })
    ).catch(error => dispatch(failureMyAccountUpdate(error)))
}

export const destroy = ({ dispatch, credentials, entity, next }) => {
  const method = 'DELETE'
  const headers = { ...applicationJSON, ...credentials }

  dispatch(requestMyAccountDestroy())
  return fetch(`${API_URL}/users/${entity.id}`, { method, headers })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureMyAccountDestroy(data.errors[0]))
        else dispatch(successMyAccountDestroy(data)); next()
      })
    )
    .catch(error => dispatch(failureMyAccountDestroy(error)))
}

const hasError = data => data.errors && data.errors.length
