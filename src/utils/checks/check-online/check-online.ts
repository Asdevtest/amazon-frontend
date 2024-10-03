import { ChatsType } from '@constants/keys/chats'

import { IFullUser } from '@typings/shared/full-user'

import { getDistanceBetweenDatesSeconds } from '../get-distance-between-dates-seconds/get-distance-between-dates-seconds'

export const checkOnline = (type: string, oponentUser: IFullUser) => {
  const isFavoritesChat = type === ChatsType.SAVED
  const isGroupChat = type === ChatsType.GROUP

  const distanceBetweenDates = getDistanceBetweenDatesSeconds(new Date(), new Date(oponentUser?.lastSeen))

  return (
    !isFavoritesChat &&
    !isGroupChat &&
    !!oponentUser?.lastSeen &&
    !!distanceBetweenDates &&
    distanceBetweenDates <= 60 * 3
  )
}
