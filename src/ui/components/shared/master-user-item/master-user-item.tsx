import { observer } from 'mobx-react'
import { FC } from 'react'

import { getUserAvatarSrc } from '@utils/get-user-avatar'

// import { RatingStarIcon } from '../svg-icons'
import { useClassNames } from './master-user-item.styles'

interface MasterUserItemProps {
  id: string
  name: string
  rating: number
}

export const MasterUserItem: FC<MasterUserItemProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { id, name, rating } = props

  return (
    <div className={classNames.root}>
      <img src={getUserAvatarSrc(id)} alt="" className={classNames.userAvatar} />

      <p className={classNames.userName}>{name}</p>

      <div className={classNames.ratingWrapper}>
        <p className={classNames.rating}>{rating}</p>
        {/* <RatingStarIcon /> */}
      </div>
    </div>
  )
})
