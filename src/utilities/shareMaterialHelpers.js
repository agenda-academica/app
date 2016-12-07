import { Alert } from 'react-native'
import { RNS3 } from 'react-native-aws3'
import md5 from 'md5'
import { newId } from 'uuid-pure'

import { applicationJSON } from '../utilities/requestHelpers'
import { API_URL } from '../constants/api'
import { setLoading as uploadSetLoading } from '../actions/UploadAction'
import {
  reset,

  requestShareMaterialCreate,
  successShareMaterialCreate,
  failureShareMaterialCreate,

  requestShareMaterialFetch,
  successShareMaterialFetch,
  failureShareMaterialFetch,

  requestShareMaterialUpdate,
  successShareMaterialUpdate,
  failureShareMaterialUpdate,

  requestShareMaterialDestroy,
  successShareMaterialDestroy,
  failureShareMaterialDestroy,
} from '../actions/ShareMaterialActions'
import { mockCredentials } from '../utilities/fetchHelpers'
import { isEmptyObject } from '../utilities/validationHelpers'
import ENV from '../../env'

export const save = props => {
  const { values, anexos, turma: { pickerSelected } } = props

  const options = {
    keyPrefix: 'uploads/',
    bucket: ENV['AWS_S3_BUCKET'],
    region: ENV['AWS_S3_REGION'],
    accessKey: ENV['AWS_S3_ACCESS_KEY'],
    secretKey: ENV['AWS_S3_SECRET_KEY'],
    successActionStatus: 201
  }
  const promises = anexos.map(({ file: { uri, ext } }) => {
    const file = {
      uri,
      name: `${md5(newId())}.${ext}`,
      type: 'application/octet-stream'
    }
    return RNS3.put(file, options)
  })

  Promise.all(promises)
    .then(response => {
      response.forEach((image, index) => {
        anexos[index]['material_url'] = image.body.postResponse.location
      })
      const material = { turma_id: pickerSelected.id, anexos, ...values }
      _create({ material, ...props })
    })
    .catch(error => Alert.alert('Ops! Ocorreu um erro.', JSON.stringify(error)))
}

const _create = props => {
  const { material, dispatch, credentials, next } = props

  const method = 'POST'
  const headers = { ...applicationJSON, ...credentials }
  const body = JSON.stringify({ material })

  dispatch(requestShareMaterialCreate())
  return fetch(`${API_URL}/materials`, { method, headers, body })
    .then(response =>
      response.json().then(data => {
        if (hasError(data)) dispatch(failureShareMaterialCreate(data.errors[0]))
        else {
          dispatch(successShareMaterialCreate(data))
          dispatch(reset())
          next()
        }
      })
    ).catch(error => dispatch(failureShareMaterialCreate(error)))
}

const _update = ({ material, props }) => {
  const { update, dispatch, credentials, next } = props

  const method = 'PUT'
  const headers = { ...applicationJSON, ...credentials }
  const body = JSON.stringify({ material })

  dispatch(requestShareMaterialUpdate())
  return fetch(`${API_URL}/materials/${update.id}`, { method, headers, body })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureShareMaterialUpdate(data.errors[0]))
        else dispatch(successShareMaterialUpdate(data)); next()
      })
    ).catch(error => dispatch(failureShareMaterialUpdate(error)))
}

export const destroy = ({ dispatch, credentials, entity, next }) => {
  const method = 'DELETE'
  const headers = { ...applicationJSON, ...credentials }

  dispatch(requestShareMaterialDestroy())
  return fetch(`${API_URL}/materials/${entity.id}`, { method, headers })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureShareMaterialDestroy(data.errors[0]))
        else dispatch(successShareMaterialDestroy(data)); next()
      })
    )
    .catch(error => dispatch(failureShareMaterialDestroy(error)))
}

const hasError = data => data.errors && data.errors.length
