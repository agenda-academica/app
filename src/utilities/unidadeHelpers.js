import { Alert } from 'react-native'

import { applicationJSON } from '../utilities/requestHelpers'
import { API_URL } from '../constants/api'
import {
  requestUnidadeCreate,
  successUnidadeCreate,
  failureUnidadeCreate,

  requestUnidadeUpdate,
  successUnidadeUpdate,
  failureUnidadeUpdate,

  requestUnidadeDestroy,
  successUnidadeDestroy,
  failureUnidadeDestroy,
} from '../actions/UnidadeActions'
import { mockCredentials } from '../utilities/fetchHelpers'
import { isEmptyObject } from '../utilities/validationHelpers'

export const save = props => {
  const { update, values } = props
  if (isEmptyObject(update)) _create({ values, props })
  else _update({ values, props })
}

const _create = ({ values, props }) => {
  const { dispatch, credentials, next } = props

  const method = 'POST'
  const headers = { ...applicationJSON, ...mockCredentials }
  const unidade = { ...values }
  const body = JSON.stringify({ unidade })

  dispatch(requestUnidadeCreate())
  return fetch(`${API_URL}/unidades`, { method, headers, body })
    .then(response =>
      response.json().then(data => {
        if (hasError(data)) dispatch(failureUnidadeCreate(data.errors[0]))
        else dispatch(successUnidadeCreate(data)); next()
      })
    ).catch(error => dispatch(failureUnidadeCreate(error)))
}

const _update = ({ values, props }) => {
  const { update, dispatch, credentials, next } = props

  const method = 'PUT'
  const headers = { ...applicationJSON, ...mockCredentials }
  const unidade = { ...values }
  const body = JSON.stringify({ unidade })

  dispatch(requestUnidadeUpdate())
  return fetch(`${API_URL}/unidades/${update.id}`, { method, headers, body })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureUnidadeUpdate(data.errors[0]))
        else dispatch(successUnidadeUpdate(data)); next()
      })
    ).catch(error => dispatch(failureUnidadeUpdate(error)))
}

export const destroy = ({ dispatch, credentials, entity, next }) => {
  const method = 'DELETE'
  const headers = { ...applicationJSON, ...mockCredentials }

  dispatch(requestUnidadeDestroy())
  return fetch(`${API_URL}/unidades/${entity.id}`, { method, headers })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureUnidadeDestroy(data.errors[0]))
        else dispatch(successUnidadeDestroy(data)); next()
      })
    )
    .catch(error => dispatch(failureUnidadeDestroy(error)))
}

const hasError = data => data.errors && data.errors.length
