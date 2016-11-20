import { Alert } from 'react-native'

import { applicationJSON } from '../utilities/requestHelpers'
import { API_URL } from '../constants/api'
import {
  requestTurmaCreate,
  successTurmaCreate,
  failureTurmaCreate,

  requestTurmaUpdate,
  successTurmaUpdate,
  failureTurmaUpdate,

  requestTurmaDestroy,
  successTurmaDestroy,
  failureTurmaDestroy,
} from '../actions/TurmaActions'
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
  const turma = { ...values }
  const body = JSON.stringify({ turma })

  dispatch(requestTurmaCreate())
  return fetch(`${API_URL}/turmas`, { method, headers, body })
    .then(response =>
      response.json().then(data => {
        if (hasError(data)) dispatch(failureTurmaCreate(data.errors[0]))
        else dispatch(successTurmaCreate(data)); next()
      })
    ).catch(error => dispatch(failureTurmaCreate(error)))
}

const _update = ({ values, props }) => {
  const { update, dispatch, credentials, next } = props

  const method = 'PUT'
  const headers = { ...applicationJSON, ...credentials }
  const turma = { ...values }
  const body = JSON.stringify({ turma })

  dispatch(requestTurmaUpdate())
  return fetch(`${API_URL}/turmas/${update.id}`, { method, headers, body })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureTurmaUpdate(data.errors[0]))
        else dispatch(successTurmaUpdate(data)); next()
      })
    ).catch(error => dispatch(failureTurmaUpdate(error)))
}

export const destroy = ({ dispatch, credentials, entity, next }) => {
  const method = 'DELETE'
  const headers = { ...applicationJSON, ...credentials }

  dispatch(requestTurmaDestroy())
  return fetch(`${API_URL}/turmas/${entity.id}`, { method, headers })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureTurmaDestroy(data.errors[0]))
        else dispatch(successTurmaDestroy(data)); next()
      })
    )
    .catch(error => dispatch(failureTurmaDestroy(error)))
}

const hasError = data => data.errors && data.errors.length
