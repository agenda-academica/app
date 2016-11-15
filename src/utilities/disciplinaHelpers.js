import { applicationJSON } from '../utilities/requestHelpers'
import { API_URL } from '../constants/api'
import {
  requestDisciplinaCreate,
  successDisciplinaCreate,
  failureDisciplinaCreate,

  requestDisciplinaUpdate,
  successDisciplinaUpdate,
  failureDisciplinaUpdate,

  requestDisciplinaDestroy,
  successDisciplinaDestroy,
  failureDisciplinaDestroy,
} from '../actions/DisciplinaActions'
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
  const disciplina = { ...values }
  const body = JSON.stringify({ disciplina })

  dispatch(requestDisciplinaCreate())
  return fetch(`${API_URL}/disciplinas`, { method, headers, body })
    .then(response =>
      response.json().then(data => {
        if (hasError(data)) dispatch(failureDisciplinaCreate(data.errors[0]))
        else dispatch(successDisciplinaCreate(data)); next()
      })
    ).catch(error => dispatch(failureDisciplinaCreate(error)))
}

const _update = ({ values, props }) => {
  const { update, dispatch, credentials, next } = props

  const method = 'PUT'
  const headers = { ...applicationJSON, ...mockCredentials }
  const disciplina = { ...values }
  const body = JSON.stringify({ disciplina })

  dispatch(requestDisciplinaUpdate())
  return fetch(`${API_URL}/disciplinas/${update.id}`, { method, headers, body })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureDisciplinaUpdate(data.errors[0]))
        else dispatch(successDisciplinaUpdate(data)); next()
      })
    ).catch(error => dispatch(failureDisciplinaUpdate(error)))
}

export const destroy = ({ dispatch, credentials, entity, next }) => {
  const method = 'DELETE'
  const headers = { ...applicationJSON, ...mockCredentials }

  dispatch(requestDisciplinaDestroy())
  return fetch(`${API_URL}/disciplinas/${entity.id}`, { method, headers })
    .then(
      response => response.json().then(data => {
        if (hasError(data)) dispatch(failureDisciplinaDestroy(data.errors[0]))
        else dispatch(successDisciplinaDestroy(data)); next()
      })
    )
    .catch(error => dispatch(failureDisciplinaDestroy(error)))
}

const hasError = data => data.errors && data.errors.length
