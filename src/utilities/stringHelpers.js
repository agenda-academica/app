export const pad = (value, padplace) => {
  const valueString = String(value)
  return padplace.substring(0, padplace.length - valueString.length) + valueString
}
