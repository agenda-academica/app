import {
  PICKER_SYNC_PROMISES_LOADED,
} from '../actions/PickerSyncActions'

const initialState = {
  loaded: false,
  result: [],
}

export default PickerSyncReducer = function(state = initialState, action) {
  switch (action.type) {

    case PICKER_SYNC_PROMISES_LOADED:
      return { ...state, loaded: action.loaded, result: action.result }

    default:
      return state
  }
}
