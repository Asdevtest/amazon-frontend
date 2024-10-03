import { IInfoCounters } from './info-counters'

export interface Route {
  icon: JSX.Element
  label: string
  route: string
  children?: SubRoute[] | null
  key: string
  checkHideBlock: (user?: IInfoCounters) => boolean | undefined
}

export interface SubRoute {
  label: string
  route: string
  key?: string
  checkHideBlock?: (user?: IInfoCounters) => boolean | undefined
}
