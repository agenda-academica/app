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
import {
  requestEventoFetch,
  successEventoFetch,
  failureEventoFetch,
} from '../actions/EventoActions'
import {
  requestShareMaterialFetch,
  successShareMaterialFetch,
  failureShareMaterialFetch,
} from '../actions/ShareMaterialActions'

export const mockCredentials = {
  'access-token': '7Vbay743LyNBCTRwGgkynA',
  'client': 'f7HncVkb6nkQdXdzSBX59Q',
  'expiry': '1480660915',
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

export const fetchEventos = ({ dispatch, credentials }) => {
  dispatch(requestEventoFetch())
  const method = 'GET'
  const headers = { ...applicationJSON, ...mockCredentials }
  fetch(`${API_URL}/eventos`, { method, headers })
    .then(res => res.json().then(data => dispatch(successEventoFetch(data))))
    .catch(error => dispatch(failureEventoFetch(error)))
}

export const fetchShareMaterials = ({ dispatch, credentials }) => {
  dispatch(requestShareMaterialFetch())
  const method = 'GET'
  const headers = { ...applicationJSON, ...mockCredentials }
  fetch(`${API_URL}/materials`, { method, headers })
    .then(res => res.json().then(data => dispatch(successShareMaterialFetch(data))))
    .catch(error => dispatch(failureShareMaterialFetch(error)))
}
