import {
  UPLOAD_IMAGE,
  UPLOAD_SET_LOADING,
} from '../actions/UploadAction'

const initialState = {
  loading: false,
  image: undefined,
}

export default upload = function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return { ...state, image: action.image }
    case UPLOAD_SET_LOADING:
      return { ...state, loading: action.loading }
    default:
      return state
  }
}
