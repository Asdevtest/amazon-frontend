import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { UserModel } from '@models/user-model'

import { Roles } from '@typings/enums/roles'
import { IFullUser } from '@typings/shared/full-user'

export const getUrlToRequest = (id: string) => {
  const userRole = (UserModel?.userInfo as unknown as IFullUser)?.role

  if (userRole === Roles.FREELANCER) {
    return `/${UserRoleCodeMapForRoutes[userRole]}/freelance/my-proposals/custom-search-request?request-id=${id}`
  } else {
    return `/${UserRoleCodeMapForRoutes[userRole]}/freelance/my-requests/custom-request?request-id=${id}`
  }
}
