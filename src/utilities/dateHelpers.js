import { pad } from '../utilities/stringHelpers'

export const dateFormat = {
  hhmm: (date, sep) => `${pad(date.getHours(), '00')}${sep}${pad(date.getMinutes(), '00')}`,
  hhmmss: (date, sep) => `${pad(date.getHours(), '00')}${sep}${pad(date.getMinutes(), '00')}${sep}${pad(date.getSeconds(), '00')}`,
}
