import { UPLOAD_IMAGE } from '../actions/UploadAction'
import {
  REQUEST_UNIDADE_CREATE,
  SUCCESS_UNIDADE_CREATE,
  FAILURE_UNIDADE_CREATE,

  REQUEST_UNIDADE_FETCH,
  SUCCESS_UNIDADE_FETCH,
  FAILURE_UNIDADE_FETCH,

  REQUEST_UNIDADE_UPDATE,
  SUCCESS_UNIDADE_UPDATE,
  FAILURE_UNIDADE_UPDATE,

  REQUEST_UNIDADE_DESTROY,
  SUCCESS_UNIDADE_DESTROY,
  FAILURE_UNIDADE_DESTROY,

  UNIDADE_SET_UNIDADE_SEDE,
  UNIDADE_PICKER_SET_SELECTED,
  UNIDADE_SET_UPDATE,
} from '../actions/UnidadeActions'

export const initialPickerItem = { id: 0, nome: '----------', universidade: {} }

const initialState = {
  loading: false,
  loaded: false,
  list: [],
  unidadeSede: true,
  pickerSelected: initialPickerItem,
  update: {},
}

export default UnidadeReducer = function(state = initialState, action) {
  let index
  let list
  switch (action.type) {

    case REQUEST_UNIDADE_CREATE:
      return { ...state, loading: true }
    case SUCCESS_UNIDADE_CREATE:
      return { ...state, loading: false, list: [...state.list, action.unidade] }
    case FAILURE_UNIDADE_CREATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_UNIDADE_FETCH:
      return { ...state, loading: true }
    case SUCCESS_UNIDADE_FETCH:
      return { ...state, loading: false, loaded: true, list: action.unidades }
    case FAILURE_UNIDADE_FETCH:
      return { ...state, loading: false, error: action.error }

    case REQUEST_UNIDADE_UPDATE:
      return { ...state, loading: true }
    case SUCCESS_UNIDADE_UPDATE:
      index = state.list.findIndex(item => item.id === action.unidade.id)
      list = [
        ...state.list.slice(0, index),
        action.unidade,
        ...state.list.slice(index + 1)
      ]
      return { ...state, loading: false, loaded: true, list, update: {} }
    case FAILURE_UNIDADE_UPDATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_UNIDADE_DESTROY:
      return { ...state, loading: true }
    case SUCCESS_UNIDADE_DESTROY:
      index = state.list.findIndex(item => item.id === action.unidade.id)
      list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
      return { ...state, loading: false, list }
    case FAILURE_UNIDADE_DESTROY:
      return { ...state, loading: false, error: action.error }

    case UNIDADE_SET_UNIDADE_SEDE:
      return { ...state, unidadeSede: action.unidadeSede }
    case UNIDADE_PICKER_SET_SELECTED:
      return { ...state, pickerSelected: action.selected }
    case UNIDADE_SET_UPDATE:
      return { ...state, update: action.update }

    default:
      return state
  }
}
