import { getFloatOrZero } from '@utils/text'

export const ProductDataParser = {
  AMAZON: 'AMAZON',
  SELLCENTRAL: 'SELLCENTRAL',
}

export const parseFieldsAdapterConfig = {
  [ProductDataParser.AMAZON]: {
    bsr: 'bsr',
    amazonTitle: 'title',
    amazonDetail: 'detail',
    amazonDescription: 'description',
    images: 'images',
    amazon: 'price',
    weight: {
      fieldKey: 'weight',
      transformFunc: getFloatOrZero,
    },
  },
  [ProductDataParser.SELLCENTRAL]: {
    fbafee: 'amazonFee',
    category: 'gl',
    width: 'width',
    height: 'height',
    length: 'length',
    weight: 'weight',
  },
}
