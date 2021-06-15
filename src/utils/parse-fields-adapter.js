import {getFloatWithoutDollarSign} from './text'

export const parseFieldsAdapter = parsedResult => ({
  bsr: parsedResult.bsr,
  amazonTitle: parsedResult.title,
  amazonDetail: parsedResult.detail,
  amazonDescription: parsedResult.description,
  images: parsedResult.images,
  amazon: getFloatWithoutDollarSign(parsedResult.price),
})
