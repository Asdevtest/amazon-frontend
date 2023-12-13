import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReviewCard } from '@components/cards/review-card'
import { useStyles } from '@components/user/users-views/user-profile-view/reviews/reviews.styles'

import { t } from '@utils/translations'

import { FeedbackType } from '@typings/feedback'

interface ReviewsProps {
  reviews: FeedbackType[]
}

export const Reviews: FC<ReviewsProps> = memo(({ reviews }) => {
  const { classes: styles, cx } = useStyles()

  const isSingleReview = reviews?.length === 1

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey.Reviews)}</p>

      <div className={styles.body}>
        <div className={cx(styles.scroll_Y, { [styles.lastReview]: !isSingleReview })}>
          {reviews?.length ? (
            reviews.map(review => <ReviewCard key={review._id} review={review} />)
          ) : (
            <p className={cx(styles.title, styles.titleCenter)}>{`${t(TranslationKey['No reviews yet'])}.`}</p>
          )}
        </div>
      </div>
    </div>
  )
})
