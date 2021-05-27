import {Typography} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import clsx from 'clsx'

import {useClassNames} from './star-rating.style'

export const starsAmount = 5

export const StarRating = ({rating}) => {
  const classNames = useClassNames()
  const flooredRating = Math.floor(rating)
  return (
    <div className={classNames.root}>
      <Typography className={classNames.number}>{rating.toFixed(1)}</Typography>
      <div className={classNames.starWrapper}>
        {Array(starsAmount)
          .fill(true)
          .map(el => (
            <StarIcon key={el} className={clsx(classNames.star, {[classNames.active]: flooredRating >= el})} />
          ))}
      </div>
    </div>
  )
}
