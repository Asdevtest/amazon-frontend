export const generateAcceptString = (acceptTypes: string[] | undefined) => {
  if (acceptTypes) {
    return acceptTypes.join(',')
  }

  return ''
}
