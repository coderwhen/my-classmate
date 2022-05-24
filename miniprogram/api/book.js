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

export const getClassMateCode = (data = {}) => {
  data.type = "book-code"
  return cloudFunction(data)
}

export const getClassMateInvitation = (data = {}) => {
  data.type = "book-invitation"
  return cloudFunction(data)
}

export const getClassMateDetail = (data = {}) => {
  data.type = "book-edit-get"
  return cloudFunction(data)
}

export const addClassMateList = (data = {}) => {
  data.type = "book-edit"
  return cloudFunction(data)
}

export const getClassMateList = (data = {}) => {
  data.type = "book-detail"
  return cloudFunction(data)
}

