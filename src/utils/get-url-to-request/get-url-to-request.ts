import { UserRole, UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { UserModel } from '@models/user-model'

export const getUrlToRequest = (id: string) => {
  // @ts-ignore
  const userRole = UserModel?.userInfo?.role

  if (UserRoleCodeMap[userRole] === UserRole.FREELANCER) {
    return `/${UserRoleCodeMapForRoutes[userRole]}/freelance/my-proposals/custom-search-request?request-id=${id}`
  } else {
    return `/${UserRoleCodeMapForRoutes[userRole]}/freelance/my-requests/custom-request?request-id=${id}`
  }
}
