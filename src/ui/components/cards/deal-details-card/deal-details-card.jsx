import Rating from '@mui/material/Rating'

import React from 'react'

import {Avatar, Grid, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
// import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {UserLink} from '@components/user-link'

// import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
// import {getUserAvatarSrc} from '@utils/get-user-avatar'
// import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

// import {translateProposalsLeftMessage} from '@utils/validation'
import {useClassNames} from './deal-details-card.style'

export const DealDetailsCard = ({onClickGetToWorkModal, showDetails}) => {
  const classNames = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.leftBlockWrapper}>
          <div className={classNames.usersInfoBlockWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Typography className={classNames.userInfoName}>{t(TranslationKey.Client)}</Typography>
              <div className={classNames.userInfo}>
                <Avatar src={''} className={classNames.cardImg} />

                <div className={classNames.nameWrapper}>
                  <UserLink blackText name={'Pete'} userId={'2'} />

                  <Rating disabled value={'3'} />
                </div>
              </div>
            </div>
            <div className={classNames.userInfoWrapper}>
              <Typography className={classNames.userInfoName}>{t(TranslationKey.Performer)}</Typography>
              <div className={classNames.userInfo}>
                <Avatar src={''} className={classNames.cardImg} />

                <div className={classNames.nameWrapper}>
                  <UserLink blackText name={'Pete'} userId={'2'} />

                  <Rating disabled value={'3'} />
                </div>
              </div>
            </div>
          </div>
          <div className={classNames.cardTitleBlockWrapper}>
            <div className={classNames.cardTitleBlockHeaderWrapper}>
              <Typography className={classNames.cardTitle}>{'Вакантная сделка'}</Typography>
              <Typography className={classNames.cardDescription}>{'Описание вакантной сделки'}</Typography>
            </div>
          </div>
          <div className={classNames.sumAndTimeWrapper}>
            <div>
              <Typography className={classNames.sumAndTimeTitle}>{t(TranslationKey.Budget)}</Typography>
              <Typography>{'30$'}</Typography>
            </div>
            <div>
              <Typography className={classNames.sumAndTimeTitle}>{t(TranslationKey.Deadline)}</Typography>
              <Typography>{'Уже вчера'}</Typography>
            </div>
          </div>
          <div className={classNames.filesWrapper}>
            <PhotoAndFilesCarousel />
          </div>
          {!showDetails ? (
            <div>
              <Button className={classNames.actionButton}>{t(TranslationKey['Send in for rework'])}</Button>
            </div>
          ) : null}
        </div>

        <div className={classNames.middleBlockWrapper}>
          <div className={classNames.subBlockWrapper}>
            <div className={classNames.leftSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Time to complete'])}</Typography>

                <Typography>{'Уже поздно'}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey.Status)}</Typography>

                <Typography className={classNames.statusText}>{'Возьми в работу'}</Typography>
              </div>
            </div>
            <div className={classNames.rightSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey.Deadline)}</Typography>

                <Typography>{'Уже поздно'}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={classNames.cardPrice}>{'666ye'}</Typography>
              </div>
            </div>
          </div>
          <div className={classNames.resultWrapper}>
            <Typography className={classNames.result}>{t(TranslationKey.Result)}</Typography>
            <Typography className={classNames.resultDescription}>{'Тут будет результат сделки'}</Typography>
          </div>
          <div className={classNames.filesAndTimeWrapper}>
            <div className={classNames.filesWrapper}>
              <PhotoAndFilesCarousel />
            </div>

            <div className={classNames.timeOnReviewWrapper}>
              <Typography className={classNames.timeOnReviewTitle}>{t(TranslationKey['Time to complete'])}</Typography>
              <Typography className={classNames.timeOnReview}>{'24ч 00мин'}</Typography>
            </div>
          </div>
          {!showDetails ? (
            <div className={classNames.buttonsWrapper}>
              <Button
                danger
                // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                variant="contained"
                color="primary"
                className={classNames.actionButton}
                // onClick={() => onClickViewMore('2')}
              >
                {t(TranslationKey['Reject the deal'])}
              </Button>

              <Button
                success
                // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                variant="contained"
                color="primary"
                className={classNames.actionButton}
                // onClick={() => onClickViewMore('2')}
              >
                {t(TranslationKey['Accept the deal'])}
              </Button>
            </div>
          ) : (
            <div className={classNames.buttonWrapper}>
              <Button
                success
                // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                variant="contained"
                color="primary"
                className={classNames.actionButton}
                onClick={() => onClickGetToWorkModal()}
              >
                {t(TranslationKey['Get to work'])}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Grid>
  )
}
