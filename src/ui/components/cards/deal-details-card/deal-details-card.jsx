import Rating from '@mui/material/Rating'

import React from 'react'

import {Avatar, Grid, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
// import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {UserLink} from '@components/user-link'

import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
// import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
// import {getUserAvatarSrc} from '@utils/get-user-avatar'
// import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

// import {translateProposalsLeftMessage} from '@utils/validation'
import {useClassNames} from './deal-details-card.style'

export const DealDetailsCard = ({onClickGetToWorkModal, dealsOnReview, item}) => {
  const classNames = useClassNames()
  console.log(item)
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
                <Avatar src={getUserAvatarSrc(item?.proposal.createdBy._id)} className={classNames.cardImg} />

                <div className={classNames.nameWrapper}>
                  <UserLink blackText name={item?.proposal.createdBy.name} userId={item?.proposal.createdBy._id} />

                  <Rating disabled value={item?.proposal.createdBy.rating} />
                </div>
              </div>
            </div>
          </div>
          <div className={classNames.cardTitleBlockWrapper}>
            <div className={classNames.cardTitleBlockHeaderWrapper}>
              <Typography className={classNames.cardTitle}>{item?.proposal.title}</Typography>
              <Typography className={classNames.cardDescription}>{item?.proposal.comment}</Typography>
            </div>
          </div>
          <div className={classNames.sumAndTimeWrapper}>
            <div>
              <Typography className={classNames.sumAndTimeTitle}>{t(TranslationKey.Budget)}</Typography>
              <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item?.proposal.price, 2)}</Typography>
            </div>
            <div>
              <Typography className={classNames.sumAndTimeTitle}>{t(TranslationKey.Deadline)}</Typography>
              <Typography>{formatNormDateTime(item?.proposal.timeoutAt)}</Typography>
            </div>
          </div>
          <div className={classNames.filesWrapper}>
            <PhotoAndFilesCarousel files={item?.proposal.linksToMediaFiles} />
          </div>
          {!dealsOnReview ? (
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

                <Typography>{minsToTime(item?.proposal.execution_time)}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey.Status)}</Typography>

                <Typography className={classNames.statusText}>
                  {<RequestStatusCell status={item?.proposal.status} />}
                </Typography>
              </div>
            </div>
            <div className={classNames.rightSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey.Deadline)}</Typography>

                <Typography>{formatNormDateTime(item?.proposal.timeoutAt)}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={classNames.cardPrice}>
                  {toFixedWithDollarSign(item?.proposal.price, 2)}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classNames.resultWrapper}>
            <Typography className={classNames.result}>{t(TranslationKey.Result)}</Typography>
            <Typography className={classNames.resultDescription}>{item?.details.result}</Typography>
          </div>
          <div className={classNames.filesAndTimeWrapper}>
            <div className={classNames.filesWrapper} files={item?.details.linksToMediaFiles}>
              <PhotoAndFilesCarousel />
            </div>

            <div className={classNames.timeOnReviewWrapper}>
              <Typography className={classNames.timeOnReviewTitle}>{t(TranslationKey['Time to complete'])}</Typography>
              <Typography className={classNames.timeOnReview}>{'24ч 00мин'}</Typography>
            </div>
          </div>
          {!dealsOnReview ? (
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
