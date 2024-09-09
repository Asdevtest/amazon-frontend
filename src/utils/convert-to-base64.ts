export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = () => reject('Error converting file to Base64')
    reader.readAsDataURL(file)
  })
}
