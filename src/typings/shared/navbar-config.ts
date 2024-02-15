import { UserRole } from '@constants/keys/user-roles'
import { navBarActiveCategory, navBarActiveSubCategory } from '@constants/navigation/navbar-active-category'

import { IInfoCounters } from './info-counters'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NavbarConfigTypes {
  export interface SubRoute {
    subtitle: () => string
    subRoute: string
    key?: keyof typeof navBarActiveSubCategory
    checkHideSubBlock?: (user?: IInfoCounters) => boolean | undefined
  }

  export interface Route {
    icon: (props: any) => JSX.Element
    title: () => string
    route: string
    subtitles?: SubRoute[] | null
    key: keyof typeof navBarActiveCategory
    checkHideBlock: (user?: IInfoCounters) => boolean | undefined
  }

  export type RootObject = {
    [key in keyof typeof UserRole | string]: Route[]
  }
}
