export const REQUEST_SHARE_MATERIAL_CREATE = 'REQUEST_SHARE_MATERIAL_CREATE'
export const SUCCESS_SHARE_MATERIAL_CREATE = 'SUCCESS_SHARE_MATERIAL_CREATE'
export const FAILURE_SHARE_MATERIAL_CREATE = 'FAILURE_SHARE_MATERIAL_CREATE'
export const requestShareMaterialCreate = () => ({ type: REQUEST_SHARE_MATERIAL_CREATE })
export const successShareMaterialCreate = material => ({ type: SUCCESS_SHARE_MATERIAL_CREATE, material })
export const failureShareMaterialCreate = error => ({ type: FAILURE_SHARE_MATERIAL_CREATE, error })

export const REQUEST_SHARE_MATERIAL_FETCH = 'REQUEST_SHARE_MATERIAL_FETCH'
export const SUCCESS_SHARE_MATERIAL_FETCH = 'SUCCESS_SHARE_MATERIAL_FETCH'
export const FAILURE_SHARE_MATERIAL_FETCH = 'FAILURE_SHARE_MATERIAL_FETCH'
export const requestShareMaterialFetch = () => ({ type: REQUEST_SHARE_MATERIAL_FETCH })
export const successShareMaterialFetch = materials => ({ type: SUCCESS_SHARE_MATERIAL_FETCH, materials })
export const failureShareMaterialFetch = error => ({ type: FAILURE_SHARE_MATERIAL_FETCH, error })

export const REQUEST_SHARE_MATERIAL_UPDATE = 'REQUEST_SHARE_MATERIAL_UPDATE'
export const SUCCESS_SHARE_MATERIAL_UPDATE = 'SUCCESS_SHARE_MATERIAL_UPDATE'
export const FAILURE_SHARE_MATERIAL_UPDATE = 'FAILURE_SHARE_MATERIAL_UPDATE'
export const requestShareMaterialUpdate = () => ({ type: REQUEST_SHARE_MATERIAL_UPDATE })
export const successShareMaterialUpdate = material => ({ type: SUCCESS_SHARE_MATERIAL_UPDATE, material })
export const failureShareMaterialUpdate = error => ({ type: FAILURE_SHARE_MATERIAL_UPDATE, error })

export const REQUEST_SHARE_MATERIAL_DESTROY = 'REQUEST_SHARE_MATERIAL_DESTROY'
export const SUCCESS_SHARE_MATERIAL_DESTROY = 'SUCCESS_SHARE_MATERIAL_DESTROY'
export const FAILURE_SHARE_MATERIAL_DESTROY = 'FAILURE_SHARE_MATERIAL_DESTROY'
export const requestShareMaterialDestroy = () => ({ type: REQUEST_SHARE_MATERIAL_DESTROY })
export const successShareMaterialDestroy = material => ({ type: SUCCESS_SHARE_MATERIAL_DESTROY, material })
export const failureShareMaterialDestroy = error => ({ type: FAILURE_SHARE_MATERIAL_DESTROY, error })

export const SHARE_MATERIAL_PUSH_MATERIAL = 'SHARE_MATERIAL_PUSH_MATERIAL'
export const pushMaterial = material => ({ type: SHARE_MATERIAL_PUSH_MATERIAL, material })
export const SHARE_MATERIAL_POP_MATERIAL = 'SHARE_MATERIAL_POP_MATERIAL'
export const popMaterial = material => ({ type: SHARE_MATERIAL_POP_MATERIAL, material })

export const SHARE_MATERIAL_SET_SELECTED = 'SHARE_MATERIAL_SET_SELECTED'
export const setSelected = selected => ({ type: SHARE_MATERIAL_SET_SELECTED, selected })

export const REQUEST_SHARE_MATERIAL_RE_SHARE = 'REQUEST_SHARE_MATERIAL_RE_SHARE'
export const SUCCESS_SHARE_MATERIAL_RE_SHARE = 'SUCCESS_SHARE_MATERIAL_RE_SHARE'
export const FAILURE_SHARE_MATERIAL_RE_SHARE = 'FAILURE_SHARE_MATERIAL_RE_SHARE'
export const requestShareMaterialReShare = () => ({ type: REQUEST_SHARE_MATERIAL_RE_SHARE })
export const successShareMaterialReShare = () => ({ type: SUCCESS_SHARE_MATERIAL_RE_SHARE })
export const failureShareMaterialReShare = () => ({ type: FAILURE_SHARE_MATERIAL_RE_SHARE })

export const SHARE_MATERIAL_RESET = 'SHARE_MATERIAL_RESET'
export const reset = () => ({ type: SHARE_MATERIAL_RESET })
