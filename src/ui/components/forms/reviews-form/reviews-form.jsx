import {Typography} from '@mui/material'

import React from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {ReviewCard} from '@components/cards/review-card'
import {FeedbackCard} from '@components/screens/users-views/user-profile-view/user-profile/feedback-card'
import {UserLink} from '@components/user-link'

// import {Field} from '@components/field'
import {t} from '@utils/translations'

import {useClassNames} from './reviews-form.style'

export const ReviewsForm = observer(({onClickCloseButton}) => {
  const {classes: classNames} = useClassNames()
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
        <div className={classNames.btnWrapper}>
          <Button color="primary" className={classNames.closeButton} onClick={() => onClickCloseButton()}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    </div>
  )
})
