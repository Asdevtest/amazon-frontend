import { observer } from 'mobx-react'
import { FC } from 'react'

import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useStyles } from './master-user-item.style'

import { RatingStarIcon } from '../svg-icons'

interface MasterUserItemProps {
  id: string
  name: string
  rating: number
}

export const MasterUserItem: FC<MasterUserItemProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { id, name, rating } = props

  return (
    <div className={styles.root}>
      <img
        src={getUserAvatarSrc(id)}
        alt={getUserAvatarSrc(id)}
        className={styles.userAvatar}
        onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
      />

      <p className={styles.userName}>{name}</p>

      <div className={styles.ratingWrapper}>
        <p className={styles.rating}>{rating}</p>
        <RatingStarIcon className={styles.ratingIcon} />
      </div>
    </div>
  )
})
