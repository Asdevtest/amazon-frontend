export const getModelNameWithotPostfix = modelName => modelName.replace('Static', '')

export const trimBarcode = value => (value.length >= 8 ? String(value.substr(-8)) : value)

export const replaceDollarSign = str => (str ? str.replace('$', '') : str)

export const toFixed = (int, x) => (int && typeof int === 'number' ? int.toFixed(x) : int)

export const getFloat = str => (str ? parseFloat(str) || 0 : str)
export const getFloatOrZero = str => (str ? parseFloat(str) || 0 : 0)
export const getInt = str => (str ? parseFloat(str) || 0 : str)
export const getIntOrZero = str => (str ? parseInt(str) || 0 : 0)

export const getFloatWithoutDollarSign = str => (str ? getFloat(replaceDollarSign(str)) : str)

export const toFixedWithDollarSign = (int, x) => withDollarSign(toFixed(int, x))
export const toFixedWithKg = (int, x) => withKg(toFixed(int, x))

export const withDollarSign = str => (str && str !== '0' ? `$${str}` : str)
export const withYuanSign = str => (str && str !== '0' ? `Ұ${str}` : str)
export const withKg = str => (str && str !== '0' ? `${str} kg` : str)
export const withAmount = str => (str && str !== '0' ? `${str} шт` : str)

export const withText = (str, text) => (str && str !== 0 ? `${str}${text}` : str)
