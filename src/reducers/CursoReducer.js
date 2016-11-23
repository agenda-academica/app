import { UPLOAD_IMAGE } from '../actions/UploadAction'
import {
  REQUEST_CURSO_CREATE,
  SUCCESS_CURSO_CREATE,
  FAILURE_CURSO_CREATE,

  REQUEST_CURSO_FETCH,
  SUCCESS_CURSO_FETCH,
  FAILURE_CURSO_FETCH,

  REQUEST_CURSO_UPDATE,
  SUCCESS_CURSO_UPDATE,
  FAILURE_CURSO_UPDATE,

  REQUEST_CURSO_DESTROY,
  SUCCESS_CURSO_DESTROY,
  FAILURE_CURSO_DESTROY,

  CURSO_PICKER_SET_SELECTED,
  CURSO_SET_UPDATE,
} from '../actions/CursoActions'

export const initialPickerItem = { id: 0, nome: '----------', unidade: {} }

const initialState = {
  loading: false,
  loaded: false,
  list: [],
  pickerSelected: initialPickerItem,
  update: {},
}

export default CursoReducer = function(state = initialState, action) {
  let index
  let list
  switch (action.type) {

    case REQUEST_CURSO_CREATE:
      return { ...state, loading: true }
    case SUCCESS_CURSO_CREATE:
      return { ...state, loading: false, list: [...state.list, action.curso] }
    case FAILURE_CURSO_CREATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_CURSO_FETCH:
      return { ...state, loading: true }
    case SUCCESS_CURSO_FETCH:
      return { ...state, loading: false, loaded: true, list: action.cursos }
    case FAILURE_CURSO_FETCH:
      return { ...state, loading: false, error: action.error }

    case REQUEST_CURSO_UPDATE:
      return { ...state, loading: true }
    case SUCCESS_CURSO_UPDATE:
      index = state.list.findIndex(item => item.id === action.curso.id)
      list = [
        ...state.list.slice(0, index),
        action.curso,
        ...state.list.slice(index + 1)
      ]
      return { ...state, loading: false, loaded: true, list, update: {} }
    case FAILURE_CURSO_UPDATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_CURSO_DESTROY:
      return { ...state, loading: true }
    case SUCCESS_CURSO_DESTROY:
      index = state.list.findIndex(item => item.id === action.curso.id)
      list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
      return { ...state, loading: false, list }
    case FAILURE_CURSO_DESTROY:
      return { ...state, loading: false, error: action.error }

    case CURSO_PICKER_SET_SELECTED:
      return { ...state, pickerSelected: action.selected }
    case CURSO_SET_UPDATE:
      return { ...state, update: action.update }

    default:
      return state
  }
}
