import { pad } from '../utilities/stringHelpers'

export const dateFormat = {
  yyyymmdd: (date, sep) => `${date.getFullYear()}${sep}${pad(date.getMonth()+1, '00')}${sep}${pad(date.getDate(), '00')}`,
  ddmmyyyy: (date, sep) => `${pad(date.getDate(), '00')}${sep}${pad(date.getMonth()+1, '00')}${sep}${date.getFullYear()}`,
  hhmm: (date, sep) => `${pad(date.getHours(), '00')}${sep}${pad(date.getMinutes(), '00')}`,
  hhmmss: (date, sep) => `${pad(date.getHours(), '00')}${sep}${pad(date.getMinutes(), '00')}${sep}${pad(date.getSeconds(), '00')}`,
}
