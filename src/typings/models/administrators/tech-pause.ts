export interface ITechPause {
  body: {
    countdown: number
    jobCreatedTime: string | Date
    message: string
    turn: TurnType
  }
  value: number
  name: string
}

export type TurnType = 'off' | 'on'
