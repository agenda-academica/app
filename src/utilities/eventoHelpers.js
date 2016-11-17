import { applicationJSON } from '../utilities/requestHelpers'
import { API_URL } from '../constants/api'
import {
  requestEventoCreate,
  successEventoCreate,
  failureEventoCreate,

  requestEventoUpdate,
  successEventoUpdate,
  failureEventoUpdate,

  requestEventoDestroy,
  successEventoDestroy,
  failureEventoDestroy,
} from '../actions/EventoActions'
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
  const evento = { ...values }
  const body = JSON.stringify({ evento })

  dispatch(requestEventoCreate())
  return fetch(`${API_URL}/eventos`, { method, headers, body })
    .then(response =>
      response.json().then(data => {
        if (hasError(data)) dispatch(failureEventoCreate(data.errors[0]))
        else dispatch(successEventoCreate(data)); next()
      })
    ).catch(error => dispatch(failureEventoCreate(error)))
}

const _update = ({ values, props }) => {
  const { update, dispatch, credentials, next } = props

  const method = 'PUT'
  const headers = { ...applicationJSON, ...mockCredentials }
  const evento = { ...values }
  const body = JSON.stringify({ evento })

  dispatch(requestEventoUpdate())
  return fetch(`${API_URL}/eventos/${update.id}`, { method, headers, body })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureEventoUpdate(data.errors[0]))
        else dispatch(successEventoUpdate(data)); next()
      })
    ).catch(error => dispatch(failureEventoUpdate(error)))
}

export const destroy = ({ dispatch, credentials, entity, next }) => {
  const method = 'DELETE'
  const headers = { ...applicationJSON, ...mockCredentials }

  dispatch(requestEventoDestroy())
  return fetch(`${API_URL}/eventos/${entity.id}`, { method, headers })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureEventoDestroy(data.errors[0]))
        else dispatch(successEventoDestroy(data)); next()
      })
    )
    .catch(error => dispatch(failureEventoDestroy(error)))
}

const hasError = data => data.errors && data.errors.length
