import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IFeedback } from '@typings/models/administrators/feedback'
import { ISupplierFeedback } from '@typings/models/suppliers/supplier-feedback'

import { useStyles } from './reviews-form.style'

import { ReviewCard } from './review-card'

interface ReviewsProps {
  wrapperClassName?: string
  reviews: IFeedback[] | ISupplierFeedback[]
}

export const Reviews: FC<ReviewsProps> = memo(({ reviews, wrapperClassName }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.reviews, { [styles.center]: !reviews?.length }, wrapperClassName)}>
      {reviews.length ? (
        reviews?.map((review, index) => <ReviewCard key={index} review={review} />)
      ) : (
        <span className={styles.title}>{`${t(TranslationKey['No reviews yet'])}.`}</span>
      )}
    </div>
  )
})
