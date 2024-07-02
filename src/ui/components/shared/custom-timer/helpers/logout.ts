import { UserModel } from '@models/user-model'

import { checkIsAdmin } from '@utils/checks'

import { Roles } from '@typings/enums/roles'
import { IFullUser } from '@typings/shared/full-user'

export const logout = () => {
  const userInfo = UserModel.userInfo as unknown as IFullUser
  const logoutCondition = !checkIsAdmin(Roles[userInfo?.role])

  if (logoutCondition) {
    UserModel.signOut()
  }
}
