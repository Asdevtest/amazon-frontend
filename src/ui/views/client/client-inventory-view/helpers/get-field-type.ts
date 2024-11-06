export const getFieldType = (type: string) => {
  switch (type) {
    case 'number':
      return 'number'
    case 'date':
      return 'date'
    default:
      return 'string'
  }
}
