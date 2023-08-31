import { observer } from 'mobx-react'
import React from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReviewCard } from '@components/cards/review-card'
import { Button } from '@components/shared/buttons/button'
import { ShortRating } from '@components/shared/short-rating'
import { UserLink } from '@components/user/user-link'
import { FeedbackCard } from '@components/user/users-views/user-profile-view/user-profile/feedback-card'

// import {Field} from '@components/field'
import { t } from '@utils/translations'

import { FeedbackType } from '@typings/feedback'
import { ShortUserType } from '@typings/master-user'

import { useReviewsFormStyles } from './reviews-form.styles'

interface ReviewsFormProps {
  onClickCloseButton: () => void
  reviews: FeedbackType[]
  user?: ShortUserType
}

export const ReviewsForm = observer((props: ReviewsFormProps) => {
  const { onClickCloseButton, reviews, user } = props
  const { classes: classNames } = useReviewsFormStyles()

  return (
    <div className={classNames.root}>
      <div className={classNames.modalHeader}>
        <Typography className={classNames.userReviewTitle}>{`${t(TranslationKey['User reviews'])}:`}</Typography>
        <div>
          <UserLink customClassNames={classNames.userLink} name={user?.name} userId={user?._id} />
          {user && <ShortRating rating={user.rating} size={'medium'} />}
        </div>
      </div>
      <div className={classNames.reviewsWrapper}>
        {reviews?.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>

      <div className={classNames.footerWrapper}>
        <Button
          color="primary"
          variant="outlined"
          className={classNames.closeButton}
          onClick={() => onClickCloseButton()}
        >
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
