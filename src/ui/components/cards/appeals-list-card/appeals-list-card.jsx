import React from 'react'

import { Avatar, Grid, Rating, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { UserLink } from '@components/user/user-link'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

// import {TranslationKey} from '@constants/translations/translation-key'
// import {Button} from '@components/buttons/button'
// import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
// import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
// import {UserLink} from '@components/user-link'
// import {formatNormDateTime} from '@utils/date-time'
// import {getUserAvatarSrc} from '@utils/get-user-avatar'
// import {minsToTime, toFixedWithDollarSign} from '@utils/text'
// import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
// import {getUserAvatarSrc} from '@utils/get-user-avatar'
// import {minsToTime, toFixedWithDollarSign} from '@utils/text'
// import {t} from '@utils/translations'
// import {translateProposalsLeftMessage} from '@utils/validation'
import { useClassNames } from './appeals-list-card.style'

export const AppealsListCard = ({ onClickViewMore }) => {
  const { classes: classNames } = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.leftBlockWrapper}>
          <div>
            <div className={classNames.cardTitleBlockHeaderWrapper}>
              <Typography className={classNames.cardTitle}>{'Причина обращения'}</Typography>
              <Typography className={classNames.cardDescription}>{'Текст обращения'}</Typography>
            </div>
          </div>
          <div>
            <PhotoAndFilesCarousel
              files={[
                'http://www.rosphoto.com/images/u/articles/1510/7_5.jpg',
                'https://s0.rbk.ru/v6_top_pics/media/img/5/46/756038770746465.jpg',
              ]}
              width="400px"
            />
          </div>
        </div>

        <div className={classNames.middleBlockWrapper}>
          <div className={classNames.subBlockWrapper}>
            <div className={classNames.leftSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{'Дата обращения'}</Typography>

                <Typography>{'2.08.22'}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{'Срок'}</Typography>

                <Typography>{'3.08.22'}</Typography>
              </div>
            </div>
            <div className={classNames.rightSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{'Статус'}</Typography>

                <Typography>{'На проверке'}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(22, 2)}</Typography>
              </div>
            </div>
          </div>
          <div className={classNames.timeOnReviewWrapper}>
            <Typography className={classNames.timeOnReviewTitle}>{'Время на прием к рассмотрению'}</Typography>
            <Typography className={classNames.timeOnReview}>{'24ч 00мин'}</Typography>
          </div>
          <div className={classNames.footerWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Typography className={classNames.userInfoName}>{t(TranslationKey.Client)}</Typography>
              <div className={classNames.userInfo}>
                <Avatar src={''} className={classNames.cardImg} />

                <div className={classNames.nameWrapper}>
                  <UserLink blackText name={'Клиент'} userId={''} />

                  <Rating disabled value={'5'} />
                </div>
              </div>
            </div>
            <Button
              // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
              variant="contained"
              color="primary"
              className={classNames.actionButton}
              onClick={() => onClickViewMore()}
            >
              {t(TranslationKey['Open an appeal'])}
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  )
}
