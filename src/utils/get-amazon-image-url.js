import {amazonImageUrlPostfix, amazonImageUrlPrefix} from '@constants/amazon-images'

export const getAmazonImageUrl = hash =>
  hash.includes('http') ? hash : `${amazonImageUrlPrefix}${hash}${amazonImageUrlPostfix}`
