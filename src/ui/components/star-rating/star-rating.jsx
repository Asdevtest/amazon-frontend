import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import StarIcon from '@material-ui/icons/Star'

import {toFixed} from '@utils/text'

import {useClassNames} from './star-rating.style'

export const starsAmount = 5

export const StarRating = ({rating}) => {
  const {classes: classNames} = useClassNames()
  const flooredRating = Math.floor(rating)
  return (
    <div className={classNames.root}>
      <Typography className={classNames.number}>{toFixed(rating, 1)}</Typography>
      <div className={classNames.starWrapper}>
        {Array(starsAmount)
          .fill(true)
          .map((el, index) => (
            <StarIcon key={index} className={cx(classNames.star, {[classNames.active]: flooredRating >= index + 1})} />
          ))}
      </div>
    </div>
  )
}
