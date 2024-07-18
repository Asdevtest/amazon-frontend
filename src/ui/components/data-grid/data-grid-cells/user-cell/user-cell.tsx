import { Avatar, Rate } from 'antd'
import Link from 'antd/es/typography/Link'
import Text from 'antd/es/typography/Text'
import { FC, memo } from 'react'

import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useStyles } from './user-cell.style'

interface UserCellProps {
  userId: string
  name: string
  email: string
  rating: number
}

export const UserCell: FC<UserCellProps> = memo(props => {
  const { userId, name, email, rating } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <Avatar size={64} src={getUserAvatarSrc(userId)} />

      <div className={styles.flexColumn}>
        <Link href={`${window.location.origin}/another-user?${userId}`} target="_blank" className={styles.text}>
          {name}
        </Link>
        <Text className={styles.text}>{email}</Text>
        <Rate disabled defaultValue={rating} className={styles.text} />
      </div>
    </div>
  )
})
