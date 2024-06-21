import { TurnType } from '../administrators/tech-pause'

export interface IShutdownNotice {
  approximateShutdownTime: string | Date
  text: string
  turn: TurnType
  type: string
}
