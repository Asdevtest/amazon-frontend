import React from 'react'

import { Avatar, Grid, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import { UserRolePrettyMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { useReviewCardStyles } from '@components/cards/review-card/review-card.styles'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { FeedbackType } from '@typings/feedback'

interface ReviewCardProps {
  review: FeedbackType
}

export const ReviewCard = (props: ReviewCardProps) => {
  const { review } = props
  const { classes: styles } = useReviewCardStyles()

  return (
    <Grid item className={styles.wrapper}>
      <div className={styles.header}>
        <UserLink
          withAvatar
          isShortRating
          ratingSize="small"
          name={review.createdBy.name}
          userId={review.createdBy._id}
          rating={review.createdBy.rating}
        />
        <div className={styles.headerItem}>
          <Typography className={styles.headerItemTitle}>{t(TranslationKey.Role)}</Typography>
          <Typography>{UserRolePrettyMap[review.role]}</Typography>
        </div>
        <div className={styles.headerItem}>
          <Typography className={styles.headerItemTitle}>{new Date(Date.now()).toLocaleDateString()}</Typography>
          <Rating disabled value={review.rating} size={'small'} />
        </div>
      </div>

      <Typography className={styles.comment}>{review.comment}</Typography>
    </Grid>
  )
}
