const {
  cloudFunction
} = require('../utils/index')

export const addClassMate = (data = {}) => {
  data.type = "book-save"
  return cloudFunction(data)
}

export const updateClassMateCover = (data = {}) => {
  data.type = "book-cover"
  return cloudFunction(data)
}

export const getClassMate = (data = {}) => {
  data.type = "book-get"
  return cloudFunction(data)
}
