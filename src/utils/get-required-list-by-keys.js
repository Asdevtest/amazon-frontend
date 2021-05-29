export const getRequiredListByKeys = (list, keysList) =>
  list.map(item => keysList.reduce((obj, key) => ({...obj, [key]: item[key]}), {}))
