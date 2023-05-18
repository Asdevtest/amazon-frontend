import { Typography } from '@mui/material'

import React from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReviewCard } from '@components/cards/review-card'
import { Button } from '@components/shared/buttons/button'
import { UserLink } from '@components/user/user-link'
import { FeedbackCard } from '@components/user/users-views/user-profile-view/user-profile/feedback-card'

// import {Field} from '@components/field'
import { t } from '@utils/translations'

import { useClassNames } from './reviews-form.style'

export const ReviewsForm = observer(({ onClickCloseButton }) => {
  const { classes: classNames } = useClassNames()
  return (
    <div className={classNames.root}>
      <div className={classNames.modalHeader}>
        <Typography className={classNames.userReviewTitle}>{`${t(TranslationKey['User reviews'])}:`}</Typography>
        <UserLink name={'Вася Пупкин'} userId={'1'} />
      </div>
      <div className={classNames.reviewsWrapper}>
        <ReviewCard />
      </div>

      <div className={classNames.footerWrapper}>
        <div className={classNames.feedBackBtns}>
          <FeedbackCard isPositive counter={300} />
          <FeedbackCard isPositive={false} counter={11} />
        </div>
        <div>
          <Button color="primary" className={classNames.closeButton} onClick={() => onClickCloseButton()}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    </div>
  )
})
