import { Alert } from 'react-native'

import { applicationJSON } from '../utilities/requestHelpers'
import { API_URL } from '../constants/api'
import {
  requestCursoCreate,
  successCursoCreate,
  failureCursoCreate,

  requestCursoUpdate,
  successCursoUpdate,
  failureCursoUpdate,

  requestCursoDestroy,
  successCursoDestroy,
  failureCursoDestroy,
} from '../actions/CursoActions'
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
  const headers = { ...applicationJSON, ...credentials }
  const curso = { ...values }
  const body = JSON.stringify({ curso })

  dispatch(requestCursoCreate())
  return fetch(`${API_URL}/cursos`, { method, headers, body })
    .then(response =>
      response.json().then(data => {
        if (hasError(data)) dispatch(failureCursoCreate(data.errors[0]))
        else dispatch(successCursoCreate(data)); next()
      })
    ).catch(error => dispatch(failureCursoCreate(error)))
}

const _update = ({ values, props }) => {
  const { update, dispatch, credentials, next } = props

  const method = 'PUT'
  const headers = { ...applicationJSON, ...credentials }
  const curso = { ...values }
  const body = JSON.stringify({ curso })

  dispatch(requestCursoUpdate())
  return fetch(`${API_URL}/cursos/${update.id}`, { method, headers, body })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureCursoUpdate(data.errors[0]))
        else dispatch(successCursoUpdate(data)); next()
      })
    ).catch(error => dispatch(failureCursoUpdate(error)))
}

export const destroy = ({ dispatch, credentials, entity, next }) => {
  const method = 'DELETE'
  const headers = { ...applicationJSON, ...credentials }

  dispatch(requestCursoDestroy())
  return fetch(`${API_URL}/cursos/${entity.id}`, { method, headers })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureCursoDestroy(data.errors[0]))
        else dispatch(successCursoDestroy(data)); next()
      })
    )
    .catch(error => dispatch(failureCursoDestroy(error)))
}

const hasError = data => data.errors && data.errors.length
