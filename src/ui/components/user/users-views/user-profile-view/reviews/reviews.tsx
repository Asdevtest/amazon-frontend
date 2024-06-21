import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReviewCard } from '@components/cards/review-card'
import { useStyles } from '@components/user/users-views/user-profile-view/reviews/reviews.style'

import { t } from '@utils/translations'

import { IFeedback } from '@typings/models/feedbacks/feedback'

interface ReviewsProps {
  reviews: IFeedback[]
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
