export const getModelNameWithotPostfix = modelName => modelName.replace('Static', '')

export const trimBarcode = value => (value.length >= 8 ? String(value.substr(-8)) : value)
