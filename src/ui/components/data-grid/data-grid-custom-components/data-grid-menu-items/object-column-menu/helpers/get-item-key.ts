import { ObjectItemColumnMenu } from '../hooks/use-object-column-menu'

export const getItemKey = <T extends ObjectItemColumnMenu>(item: T, field?: string) => {
  if (field && field in item) {
    return field as keyof T
  } else if ('name' in item) {
    return 'name' as keyof T
  } else {
    return 'title' as keyof T
  }
}
