const {
  cloudFunction
} = require('../utils/index')


export const getUserLoginInfo = (payload = {}) => {
  const data = {
    type: "login",
    payload
  }
  return cloudFunction(data)
}