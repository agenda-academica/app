export const UPLOAD_IMAGE = 'UPLOAD_IMAGE'
export const uploadImage = image => ({ type: UPLOAD_IMAGE, image })

export const UPLOAD_SET_LOADING = 'UPLOAD_SET_LOADING'
export const setLoading = loading => ({ type: UPLOAD_SET_LOADING, loading })
