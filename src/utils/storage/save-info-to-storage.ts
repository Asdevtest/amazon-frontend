export const saveInfoToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}
