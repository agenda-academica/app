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

export const save = props => {
  const { imageUploadUri, values, dispatch } = props

  if (!imageUploadUri) {
    console.log('do not have to upload the image')
    update({ values, props });
  } else {
    console.log('have to upload the image')
    const imageExt = imageUploadUri.match(/\.(.*)$/)[1]
    const file = {
      uri: imageUploadUri,
      name: `${md5(new Date())}.${imageExt}`,
      type: `image/${imageExt}`,
    }
    const options = {
      keyPrefix: 'uploads/',
      bucket: 'agenda-academica',
      region: 'sa-east-1',
      accessKey: 'AKIAJQ6LDL2L4TA5BJSA',
      secretKey: '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',
      successActionStatus: 201
    }

    dispatch(uploadSetLoading(true))
    return RNS3.put(file, options)
      .then(responseImage => {
        if (responseImage.status !== 201) throw new Error('Failed to upload image to S3')
        dispatch(uploadSetLoading(false))
        console.log('uploaded avatar url', responseImage.body.postResponse.location)
        update({ values: { ...values, avatar: responseImage.body.postResponse.location }, props })
      })
  }
}

const update = ({ values, props }) => {
  const { dispatch, credentials, next } = props

  console.log('update values', values)
  const method = 'PUT'
  const headers = { ...applicationJSON, ...credentials }
  const body = JSON.stringify({ ...values })

  console.log('method', method)
  console.log('headers', headers)
  console.log('body', body)

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
