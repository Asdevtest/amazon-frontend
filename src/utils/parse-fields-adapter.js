import { parseFieldsAdapterConfig } from '@constants/product/product-data-parser'

export const parseFieldsAdapter = (parsedResult, siteParserKey) =>
  Object.keys(parseFieldsAdapterConfig[siteParserKey]).reduce((acc, cur) => {
    const fieldKeyConfig = parseFieldsAdapterConfig[siteParserKey][cur]
    const isFieldKeyConfigString = typeof fieldKeyConfig === 'string'
    acc[cur] = isFieldKeyConfigString
      ? parsedResult[fieldKeyConfig]
      : fieldKeyConfig.transformFunc(parsedResult[fieldKeyConfig.fieldKey])
    return acc
  }, {})
