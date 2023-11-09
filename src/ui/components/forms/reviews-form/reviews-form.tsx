import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReviewCard } from '@components/cards/review-card'
import { Button } from '@components/shared/buttons/button'
import { ShortRating } from '@components/shared/short-rating'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { FeedbackType } from '@typings/feedback'
import { IShortUser } from '@typings/master-user'

import { useStyles } from './reviews-form.styles'

interface ReviewsFormProps {
  reviews: FeedbackType[]
  onClickCloseButton: VoidFunction
  user?: IShortUser
}

export const ReviewsForm: FC<ReviewsFormProps> = memo(({ onClickCloseButton, reviews, user }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <div className={styles.modalHeader}>
        <p className={styles.userReviewTitle}>{`${t(TranslationKey['User reviews'])}:`}</p>
        <div className={styles.modalHeader}>
          <UserLink customClassNames={styles.userLink} name={user?.name} userId={user?._id} />
          {user && <ShortRating rating={user.rating} size={'medium'} />}
        </div>
      </div>
      <div className={styles.reviewsList}>
        {reviews?.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>

      <div className={styles.footerWrapper}>
        <Button color="primary" variant="outlined" className={styles.closeButton} onClick={onClickCloseButton}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
