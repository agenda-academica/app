import {
  UPLOAD_IMAGE,
} from '../actions/UploadAction'

const initialState = {}

export default upload = function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return { ...state, image: action.image }
    default:
      return state
  }
}
