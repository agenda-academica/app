import { applicationJSON } from './fetchHelpers'
import { API_URL } from '../constants/api'
import {
  requestUniversidadeFetch,
  successUniversidadeFetch,
  failureUniversidadeFetch,
} from '../actions/UniversidadeActions'
import {
  requestUnidadeFetch,
  successUnidadeFetch,
  failureUnidadeFetch,
} from '../actions/UnidadeActions'
import {
  requestCursoFetch,
  successCursoFetch,
  failureCursoFetch,
} from '../actions/CursoActions'
import {
  requestTurmaFetch,
  successTurmaFetch,
  failureTurmaFetch,
} from '../actions/TurmaActions'
import {
  requestDisciplinaFetch,
  successDisciplinaFetch,
  failureDisciplinaFetch,
} from '../actions/DisciplinaActions'

export const mockCredentials = {
  'access-token': 'WG3D99lUwKy4FvGFKQxqew',
  'client': 'xjJrEPzfkc-h73bRYKL48w',
  'expiry': '1480449346',
  'token-type': 'Bearer',
  'uid': 'gabrielrtakeda@gmail.com',
}

export const fetchUniversidades = async ({ dispatch, credentials, callback }) => {
  const emptyCallback = () => {}
  const cb = callback || emptyCallback
  dispatch(requestUniversidadeFetch())
  const method = 'GET'
  const headers = { ...applicationJSON, ...mockCredentials }
  fetch(`${API_URL}/universidades`, { method, headers })
    .then(res => res.json().then(data => { dispatch(successUniversidadeFetch(data)); cb(data) }))
    .catch(error => dispatch(failureUniversidadeFetch(error)))
}

export const fetchUnidades = ({ dispatch, credentials, callback }) => {
  const emptyCallback = () => {}
  const cb = callback || emptyCallback
  dispatch(requestUnidadeFetch())
  const method = 'GET'
  const headers = { ...applicationJSON, ...mockCredentials }
  fetch(`${API_URL}/unidades`, { method, headers })
    .then(res => res.json().then(data => { dispatch(successUnidadeFetch(data)); cb(data) }))
    .catch(error => dispatch(failureUnidadeFetch(error)))
}

export const fetchCursos = ({ dispatch, credentials }) => {
  dispatch(requestCursoFetch())
  const method = 'GET'
  const headers = { ...applicationJSON, ...mockCredentials }
  fetch(`${API_URL}/cursos`, { method, headers })
    .then(res => res.json().then(data => dispatch(successCursoFetch(data))))
    .catch(error => dispatch(failureCursoFetch(error)))
}

export const fetchTurmas = ({ dispatch, credentials }) => {
  dispatch(requestTurmaFetch())
  const method = 'GET'
  const headers = { ...applicationJSON, ...mockCredentials }
  fetch(`${API_URL}/turmas`, { method, headers })
    .then(res => res.json().then(data => dispatch(successTurmaFetch(data))))
    .catch(error => dispatch(failureTurmaFetch(error)))
}

export const fetchDisciplinas = ({ dispatch, credentials }) => {
  dispatch(requestDisciplinaFetch())
  const method = 'GET'
  const headers = { ...applicationJSON, ...mockCredentials }
  fetch(`${API_URL}/disciplinas`, { method, headers })
    .then(res => res.json().then(data => dispatch(successDisciplinaFetch(data))))
    .catch(error => dispatch(failureDisciplinaFetch(error)))
}