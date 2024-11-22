import { ObjectItemColumnMenu } from '../hooks/use-object-column-menu'

export const getValueToCompare = (value: ObjectItemColumnMenu) =>
  value?._id === null ? value?._id : value?._id || value
