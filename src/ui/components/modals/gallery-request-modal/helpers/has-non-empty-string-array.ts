import { IState } from '../gallery-request-modal.type'

export const hasNonEmptyStringArray = (data?: IState): boolean => {
  let resultQantuty = 0

  if (data) {
    Object.values(data)?.forEach((stringArray: string[]) => (resultQantuty += stringArray.length))
  }

  return resultQantuty > 0
}
