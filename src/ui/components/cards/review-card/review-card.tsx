import { FC } from 'react'

import { Grid, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import { UserRolePrettyMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { useReviewCardStyles } from '@components/cards/review-card/review-card.styles'
import { UserLink } from '@components/user/user-link'

import { formatShortDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { FeedbackType } from '@typings/feedback'

interface Props {
  review: FeedbackType
}

export const ReviewCard: FC<Props> = ({ review }) => {
  const { classes: styles } = useReviewCardStyles()
  const user = review.sub ?? review.createdBy

  return (
    <Grid item className={styles.wrapper}>
      <div className={styles.header}>
        <UserLink
          withAvatar
          isShortRating
          ratingSize="small"
          name={user?.name}
          userId={user?._id}
          rating={user?.rating}
          customRatingClass={{ opacity: 1 }}
        />
        <div className={styles.headerItem}>
          <Typography className={styles.headerItemTitle}>{t(TranslationKey.Role)}</Typography>
          <Typography>{UserRolePrettyMap[review.role]}</Typography>
        </div>
        <div className={styles.headerItem}>
          <Typography className={styles.headerItemTitle}>{formatShortDateTime(review.createdAt)}</Typography>
          <Rating readOnly value={review.rating} size={'small'} />
        </div>
      </div>

      <Typography className={styles.comment}>{review.comment}</Typography>
    </Grid>
  )
}
