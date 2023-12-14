import React, { FC } from 'react'

import { Avatar, Rating } from '@mui/material'

import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'

import { useStyles } from './user-cell.style'

interface UserCellProps {
  userId: string
  name: string
  email: string
  rating: number
}

export const UserCell: FC<UserCellProps> = React.memo(props => {
  const { classes: styles } = useStyles()
  const { userId, name, email, rating } = props

  return (
    <div className={styles.sabUserWrapper}>
      <Avatar src={getUserAvatarSrc(userId)} className={styles.userAvatar} />

      <div className={styles.sabUserInfoWrapper}>
        <UserLink
          customStyles={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px' }}
          name={name}
          userId={userId}
        />

        <p className={styles.userEmail}>{email}</p>

        <div className={styles.sabUserRatingWrapper}>
          <p className={styles.ratingScore}>{`Rating ${toFixed(rating, 1)}`}</p>

          <Rating readOnly className={styles.sabUserRating} value={rating} />
        </div>
      </div>
    </div>
  )
})
