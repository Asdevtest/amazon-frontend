import { UserRole } from '@constants/keys/user-roles'
import { navBarActiveCategory, navBarActiveSubCategory } from '@constants/navigation/navbar-active-category'

import { UserInfoSchema } from '@services/rest-api-service/codegen'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NavbarConfigTypes {
  export interface SubRoute {
    subtitle: () => string
    subRoute: string
    key?: keyof typeof navBarActiveSubCategory
    checkHideSubBlock?: (user?: UserInfoSchema) => boolean | undefined
  }

  export interface Route {
    icon: (props: any) => JSX.Element
    title: () => string
    route: string
    subtitles?: SubRoute[] | null
    key: keyof typeof navBarActiveCategory
    checkHideBlock: (user?: UserInfoSchema) => boolean | undefined
  }

  export type RootObject = {
    [key in keyof typeof UserRole | string]: Route[]
  }
}
