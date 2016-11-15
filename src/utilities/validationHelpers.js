const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const isValidEmail = string => emailRegex.test(string)

const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
export const hasSpecialChars = string => specialCharsRegex.test(string)

const numbersRegex = /[0-9]/
export const hasNumbersChars = string => numbersRegex.test(string)

const uppercaseCharsRegex = /[A-ZÀÁÄÂÃÈÉËÊÌÍÏÎÒÓÖÔÕÙÚÜÛÇ]/
export const hasUppercaseChars = string => uppercaseCharsRegex.test(string)
