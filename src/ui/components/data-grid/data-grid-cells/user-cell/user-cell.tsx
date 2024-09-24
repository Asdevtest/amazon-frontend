import { Avatar } from 'antd'
import Link from 'antd/es/typography/Link'
import { FC, memo } from 'react'

import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useStyles } from './user-cell.style'

interface UserCellProps {
  id?: string
  name?: string
}

export const UserCell: FC<UserCellProps> = memo(props => {
  const { id, name } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      {id ? (
        <div>
          <Avatar size={36} src={getUserAvatarSrc(id)} />
        </div>
      ) : null}
      {name ? (
        <Link href={`${window.location.origin}/another-user?${id}`} target="_blank" className={styles.text}>
          {name}
        </Link>
      ) : null}
    </div>
  )
})
