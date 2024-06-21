export const getFileNameFromUrl = (url?: string) => {
  if (!url) {
    return {
      fullName: '',
      type: '',
      name: '',
    }
  }

  const splitedUrl = url.split('.')

  if (url.includes('.preview.webp')) {
    return {
      fullName: `${splitedUrl.at(-4)}.${splitedUrl.at(-3)}`,
      type: splitedUrl.at(-3),
      name: splitedUrl.at(-4),
    }
  }

  return {
    fullName: `${splitedUrl.at(-2)}.${splitedUrl.at(-1)}`,
    type: splitedUrl.at(-1),
    name: splitedUrl.at(-2),
  }
}
