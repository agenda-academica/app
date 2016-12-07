import {
  REQUEST_SHARE_MATERIAL_CREATE,
  SUCCESS_SHARE_MATERIAL_CREATE,
  FAILURE_SHARE_MATERIAL_CREATE,

  REQUEST_SHARE_MATERIAL_FETCH,
  SUCCESS_SHARE_MATERIAL_FETCH,
  FAILURE_SHARE_MATERIAL_FETCH,

  REQUEST_SHARE_MATERIAL_UPDATE,
  SUCCESS_SHARE_MATERIAL_UPDATE,
  FAILURE_SHARE_MATERIAL_UPDATE,

  REQUEST_SHARE_MATERIAL_DESTROY,
  SUCCESS_SHARE_MATERIAL_DESTROY,
  FAILURE_SHARE_MATERIAL_DESTROY,

  SHARE_MATERIAL_PUSH_MATERIAL,
  SHARE_MATERIAL_POP_MATERIAL,
  SHARE_MATERIAL_SET_SELECTED,

  REQUEST_SHARE_MATERIAL_RE_SHARE,
  SUCCESS_SHARE_MATERIAL_RE_SHARE,
  FAILURE_SHARE_MATERIAL_RE_SHARE,

  SHARE_MATERIAL_RESET,
} from '../actions/ShareMaterialActions'

const initialState = {
  loading: false,
  loaded: false,
  list: [],
  selected: undefined,
  anexos: [],
}

export default ShareMaterialReducer = function(state = initialState, action) {
  let index
  let list
  let anexos

  switch(action.type) {
    case REQUEST_SHARE_MATERIAL_CREATE:
      return { ...state, loading: true }
    case SUCCESS_SHARE_MATERIAL_CREATE:
      return { ...state, loading: false, list: [...state.list, action.material] }
    case FAILURE_SHARE_MATERIAL_CREATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_SHARE_MATERIAL_FETCH:
      return { ...state, loading: true }
    case SUCCESS_SHARE_MATERIAL_FETCH:
      return { ...state, loading: false, loaded: true, list: action.materials }
    case FAILURE_SHARE_MATERIAL_FETCH:
      return { ...state, loading: false, error: action.error }

    case REQUEST_SHARE_MATERIAL_UPDATE:
      return { ...state, loading: true }
    case SUCCESS_SHARE_MATERIAL_UPDATE:
      index = state.list.findIndex(item => item.id === action.material.id)
      list = [
        ...state.list.slice(0, index),
        action.material,
        ...state.list.slice(index + 1)
      ]
      return { ...state, loading: false, loaded: true, list }
    case FAILURE_SHARE_MATERIAL_UPDATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_SHARE_MATERIAL_DESTROY:
      return { ...state, loading: true }
    case SUCCESS_SHARE_MATERIAL_DESTROY:
      index = state.list.findIndex(item => item.id === action.material.id)
      list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
      return { ...state, loading: false, list }
    case FAILURE_SHARE_MATERIAL_DESTROY:
      return { ...state, loading: false, error: action.error }

    case SHARE_MATERIAL_PUSH_MATERIAL:
      return { ...state, anexos: [...state.anexos, action.material] }
    case SHARE_MATERIAL_POP_MATERIAL:
      index = state.anexos.findIndex(item => item === action.material)
      return { ...state, anexos: [...state.anexos.slice(0, index), ...state.anexos.slice(index + 1)] }
    case SHARE_MATERIAL_SET_SELECTED:
      return { ...state, selected: action.selected }

    case REQUEST_SHARE_MATERIAL_RE_SHARE:
      return { ...state, loading: true }
    case SUCCESS_SHARE_MATERIAL_RE_SHARE:
      return { ...state, loading: false }
    case FAILURE_SHARE_MATERIAL_RE_SHARE:
      return { ...state, loading: false, error: action.error }

    case SHARE_MATERIAL_RESET:
      return { ...state, selected: undefined, anexos: [] }

    default:
      return state
  }
}
