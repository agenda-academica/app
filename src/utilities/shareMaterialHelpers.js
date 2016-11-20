import { Alert } from 'react-native'
import { RNS3 } from 'react-native-aws3'
import md5 from 'md5'
import { newId } from 'uuid-pure'

import { applicationJSON } from '../utilities/requestHelpers'
import { API_URL } from '../constants/api'
import { setLoading as uploadSetLoading } from '../actions/UploadAction'
import {
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

export const save = props => {
  const { anexos, turma: { pickerSelected } } = props

  const options = {
    keyPrefix: 'uploads/',
    bucket: 'agenda-academica',
    region: 'sa-east-1',
    accessKey: 'AKIAJQ6LDL2L4TA5BJSA',
    secretKey: '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',
    successActionStatus: 201
  }
  const promises = anexos.map(material => {
    const ext = material.file.match(/\.(.*)$/)[1]
    const file = {
      uri: material.file,
      name: `${md5(newId())}.${ext}`,
      type: `image/${ext}`
    }
    return RNS3.put(file, options)
  })

  Promise.all(promises)
    .then(response => {
      response.forEach((image, index) => {
        anexos[index]['material_url'] = image.body.postResponse.location
      })
      _create({ material: { turma_id: pickerSelected.id, anexos }, ...props })
    })
    .catch(error => Alert.alert('Ops! Ocorreu um erro.', JSON.stringify(error)))
}

const _create = props => {
  const { material, dispatch, credentials, next } = props

  const method = 'POST'
  const headers = { ...applicationJSON, ...credentials }
  const body = JSON.stringify({ material })

  console.log('body', body)

  dispatch(requestShareMaterialCreate())
  return fetch(`${API_URL}/materials`, { method, headers, body })
    .then(response =>
      response.json().then(data => {
        if (hasError(data)) dispatch(failureShareMaterialCreate(data.errors[0]))
        else dispatch(successShareMaterialCreate(data)); next()
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
