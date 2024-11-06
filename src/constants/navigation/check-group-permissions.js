import { UserModel } from '@models/user-model'

export const checkGroupPermissions = key => {
  const userInfoPermissionGroups = UserModel.userInfo.permissionGroups

  return userInfoPermissionGroups?.flatMap(group => group.permissions)?.some(permission => permission.key === key)
}
