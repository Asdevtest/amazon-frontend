import React, { FC } from 'react'

import { Avatar } from '@mui/material'

import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useDataGridCellStyles } from './user-mini-cell.style'

interface UserMiniCellProps {
  userId: string
  userName: string
}

export const UserMiniCell: FC<UserMiniCellProps> = React.memo(props => {
  const { classes: styles } = useDataGridCellStyles()
  const { userName, userId } = props

  return (
    <div className={styles.userMainWrapper}>
      <Avatar src={getUserAvatarSrc(userId)} className={styles.userCellAvatar} />
      <UserLink name={userName} userId={userId} />
    </div>
  )
})
