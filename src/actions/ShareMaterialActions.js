export const SHARE_MATERIAL_PUSH_MATERIAL = 'SHARE_MATERIAL_PUSH_MATERIAL'
export const pushMaterial = material => ({ type: SHARE_MATERIAL_PUSH_MATERIAL, material })
export const SHARE_MATERIAL_POP_MATERIAL = 'SHARE_MATERIAL_POP_MATERIAL'
export const popMaterial = material => ({ type: SHARE_MATERIAL_POP_MATERIAL, material })

export const SHARE_MATERIAL_SET_SELECTED = 'SHARE_MATERIAL_SET_SELECTED'
export const setSelected = selected => ({ type: SHARE_MATERIAL_SET_SELECTED, selected })
