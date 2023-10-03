import { FC } from 'react'

import { Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReviewCard } from '@components/cards/review-card'
import { useReviewsStyles } from '@components/user/users-views/user-profile-view/reviews/reviews.styles'

import { t } from '@utils/translations'

import { FeedbackType } from '@typings/feedback'

interface Props {
  reviews: FeedbackType[]
}

export const Reviews: FC<Props> = ({ reviews }) => {
  const { classes: styles } = useReviewsStyles()

  return (
    <div className={styles.mainWrapper}>
      <Typography variant="h6" className={styles.mainTitle}>
        {t(TranslationKey.Reviews)}
      </Typography>
      <Paper className={styles.body}>
        <div className={styles.reviewList}>
          {!!reviews?.length && reviews.map((el, index) => <ReviewCard key={index} review={el} />)}
          {!reviews?.length && (
            <Typography className={styles.typoNoReviews}>{t(TranslationKey['No reviews yet'])}</Typography>
          )}
        </div>
      </Paper>
    </div>
  )
}
