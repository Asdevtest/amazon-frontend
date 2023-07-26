import React from 'react'

import { Avatar, Grid, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import { UserLink } from '@components/user/user-link'

// import {TranslationKey} from '@constants/translations/translation-key'
// import {Field} from '@components/field/field'
// import {getUserAvatarSrc} from '@utils/get-user-avatar'
// import {t} from '@utils/translations'
import { useClassNames } from './review-card.style'

export const ReviewCard = () => {
  const { classes: classNames } = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardTitleBlockWrapper}>
          <div className={classNames.userInfoWrapper}>
            <Avatar src={''} className={classNames.cardImg} />

            <div className={classNames.nameWrapper}>
              <UserLink blackText name={'Петя Петров'} userId={'2'} />
              <div className={classNames.ratingWrapper}>
                <Typography className={classNames.rating}>{'Тип услуги'}</Typography>
              </div>
            </div>
          </div>
          <div className={classNames.reviewWrapper}>
            <Typography className={classNames.cardTitle}>{'Тут будет отзыв'}</Typography>
            <Rating value={'5'} />
          </div>
        </div>
      </div>
    </Grid>
  )
}
