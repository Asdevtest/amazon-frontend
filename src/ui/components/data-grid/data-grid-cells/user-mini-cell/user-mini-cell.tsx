import { FC, memo } from 'react'

import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useStyles } from './user-mini-cell.style'

interface UserMiniCellProps {
  userId: string
  userName: string
}

export const UserMiniCell: FC<UserMiniCellProps> = memo(({ userName, userId }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <img src={getUserAvatarSrc(userId)} className={styles.avatar} alt={`avatar-${userId}`} />
      <UserLink name={userName} userId={userId} customClassNames={styles.userName} />
    </div>
  )
})
