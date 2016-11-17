import { pad } from '../utilities/stringHelpers'

export const dateFormat = {
  yyyymmdd: (date, sep) => `${date.getFullYear()}${sep}${pad(date.getMonth(), '00')}${sep}${pad(date.getDate(), '00')}`,
  hhmm: (date, sep) => `${pad(date.getHours(), '00')}${sep}${pad(date.getMinutes(), '00')}`,
  hhmmss: (date, sep) => `${pad(date.getHours(), '00')}${sep}${pad(date.getMinutes(), '00')}${sep}${pad(date.getSeconds(), '00')}`,
}
