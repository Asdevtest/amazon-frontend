import { ObjectItemColumnMenu } from '../hooks/use-object-column-menu'

export const getItemKey = <T extends ObjectItemColumnMenu>(item: T) => {
  if ('name' in item) {
    return 'name' as keyof T
  } else {
    return 'title' as keyof T
  }
}
