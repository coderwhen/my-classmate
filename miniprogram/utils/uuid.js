const guid = require('guid')

export const getGuid = () => {
  return guid.create()
}