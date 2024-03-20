export const getValidFieldName = (...strings: string[]): string => {
  const transformedStrings = strings.map((str, index) => {
    let firstLeter = str.charAt(0)

    if (index === 0) {
      firstLeter = firstLeter.toLowerCase()
    } else {
      firstLeter = firstLeter.toUpperCase()
    }

    return firstLeter + str.slice(1)
  })

  return transformedStrings.join('')
}
