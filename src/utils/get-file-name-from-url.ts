export const getFileNameFromUrl = (url?: string) => {
  if (!url) {
    return {
      fullName: '',
      type: '',
      name: '',
    }
  }

  const splitedUrl = url.split('.')

  return {
    fullName: `${splitedUrl.at(-2)}.${splitedUrl.at(-1)}`,
    type: splitedUrl.at(-1),
    name: splitedUrl.at(-2),
  }
}
