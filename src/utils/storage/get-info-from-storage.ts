export const getInfoFromStorage = (key: string) => {
  const keyInfo = localStorage.getItem(key)

  return keyInfo ? JSON.parse(keyInfo) : null
}
