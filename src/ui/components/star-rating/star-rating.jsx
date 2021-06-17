import {Typography} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import clsx from 'clsx'

import {toFixed} from '@utils/text'

import {useClassNames} from './star-rating.style'

export const starsAmount = 5

export const StarRating = ({rating}) => {
  const classNames = useClassNames()
  const flooredRating = Math.floor(rating)
  return (
    <div className={classNames.root}>
      <Typography className={classNames.number}>{toFixed(rating, 1)}</Typography>
      <div className={classNames.starWrapper}>
        {Array(starsAmount)
          .fill(true)
          .map((el, index) => (
            <StarIcon
              key={index}
              className={clsx(classNames.star, {[classNames.active]: flooredRating >= index + 1})}
            />
          ))}
      </div>
    </div>
  )
}
