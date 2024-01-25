import { FC, memo } from 'react'

import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useStyles } from './user-mini-cell.style'

interface UserMiniCellProps {
  userId?: string
  userName?: string
  wrapperClassName?: string
  avatarClassName?: string
}

export const UserMiniCell: FC<UserMiniCellProps> = memo(props => {
  const { userName, userId, wrapperClassName, avatarClassName } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, wrapperClassName)}>
      {userId && (
        <img src={getUserAvatarSrc(userId)} className={cx(styles.avatar, avatarClassName)} alt={`avatar-${userId}`} />
      )}
      {userName && <UserLink name={userName} userId={userId} customClassNames={styles.userName} />}
    </div>
  )
})
