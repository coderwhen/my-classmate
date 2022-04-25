const {
  cloudFunction
} = require('../utils/index')

export const getMusicSearchSuggest = (data = {}) => {
  data.type = "music-suggest"
  return cloudFunction(data)
}

export const getMusicSearch = (data = {}) => {
  data.type = "music-result"
  return cloudFunction(data)
}

export const getMusicUrl = (data = {}) => {
  data.type = "music-url"
  return cloudFunction(data)
}
