import { Avatar, Typography } from 'antd'
import { FC, memo } from 'react'

import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useStyles } from './user-cell.style'

const { Text: AntText, Link } = Typography

interface UserCellProps {
  id?: string
  name?: string
  email?: string
  isCell?: boolean
}

export const UserCell: FC<UserCellProps> = memo(props => {
  const { id, name, email, isCell = true } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell })}>
      {id ? (
        <div>
          <Avatar size={32} src={getUserAvatarSrc(id)} />
        </div>
      ) : null}
      <div className={styles.vertical}>
        {name ? (
          <Link ellipsis href={`${window.location.origin}/another-user?${id}`} target="_blank" className={styles.text}>
            {name}
          </Link>
        ) : null}
        {email ? (
          <AntText ellipsis className={styles.text}>
            {email}
          </AntText>
        ) : null}
      </div>
    </div>
  )
})
