import { Rating, Typography } from '@mui/material'

import { useStyles } from '@components/shared/short-rating/short-rating.style'

interface ShortRatingProps {
  rating: number
  size?: 'small' | 'medium' | 'large'
}

export const ShortRating = (props: ShortRatingProps) => {
  const { rating, size = 'small' } = props
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      <Typography
        className={cx(styles.rating, {
          [styles.ratingMedium]: size === 'medium',
        })}
      >
        {rating.toFixed(1)}
      </Typography>
      <Rating readOnly size={size} value={1} max={1} />
    </div>
  )
}
