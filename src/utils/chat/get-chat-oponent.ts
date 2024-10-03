import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'

export const getChatOponent = (users: IFullUser[]) => {
  return users.find(chatUser => chatUser._id !== (UserModel.userInfo as unknown as IFullUser)?._id)
}
