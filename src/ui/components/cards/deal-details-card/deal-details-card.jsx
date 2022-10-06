import {cx} from '@emotion/css'
import {Avatar, Grid, Typography} from '@mui/material'
import Rating from '@mui/material/Rating'

import React from 'react'

import {RequestStatus} from '@constants/request-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {UserLink} from '@components/user-link'

import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './deal-details-card.style'

export const DealDetailsCard = ({
  onClickGetToWorkModal,
  onClickConfirmDealModal,
  onClickRejectDealModal,
  onClickReworkDealModal,
  dealsOnReview,
  item,
  proposalId,
}) => {
  const {classes: classNames} = useClassNames()
  const curProposal = item.find(el => el?.proposal._id === proposalId)

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={cx(classNames.leftBlockWrapper, {[classNames.leftBlockMarginWrapper]: dealsOnReview})}>
          <div className={classNames.usersInfoBlockWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Typography className={classNames.userInfoName}>{t(TranslationKey.Client)}</Typography>
              <div className={classNames.userInfo}>
                <Avatar src={getUserAvatarSrc(curProposal?.request?.createdBy?._id)} className={classNames.cardImg} />

                <div className={classNames.nameWrapper}>
                  <UserLink
                    blackText
                    name={curProposal?.request?.createdBy?.name}
                    userId={item?.request?.createdBy?._id}
                  />
                  {curProposal && <Rating disabled value={curProposal?.request?.createdBy?.rating} />}
                </div>
              </div>
            </div>
            <div className={classNames.userInfoWrapper}>
              <Typography className={classNames.userInfoName}>{t(TranslationKey.Performer)}</Typography>
              <div className={classNames.userInfo}>
                <Avatar src={getUserAvatarSrc(curProposal?.proposal.createdBy._id)} className={classNames.cardImg} />

                <div className={classNames.nameWrapper}>
                  <UserLink
                    blackText
                    name={curProposal?.proposal.createdBy.name}
                    userId={curProposal?.proposal.createdBy._id}
                  />
                  {curProposal && <Rating disabled value={curProposal?.proposal?.createdBy?.rating} />}
                </div>
              </div>
            </div>
          </div>
          <div className={classNames.cardTitleBlockWrapper}>
            <div className={classNames.cardTitleBlockHeaderWrapper}>
              <Typography className={classNames.cardTitle}>{curProposal?.proposal.title}</Typography>
              <Typography className={classNames.cardDescription}>{curProposal?.proposal.comment}</Typography>
            </div>
          </div>
          <div className={classNames.sumAndTimeWrapper}>
            <div>
              <Typography className={classNames.sumAndTimeTitle}>{t(TranslationKey.Budget)}</Typography>
              <Typography className={classNames.cardPrice}>
                {toFixedWithDollarSign(curProposal?.proposal.price, 2)}
              </Typography>
            </div>
            <div>
              <Typography className={classNames.sumAndTimeTitle}>{t(TranslationKey.Deadline)}</Typography>
              <Typography>{formatNormDateTime(curProposal?.proposal.timeoutAt)}</Typography>
            </div>
          </div>
          <div className={classNames.filesWrapper}>
            <PhotoAndFilesCarousel small files={curProposal?.proposal.linksToMediaFiles} />
          </div>
          {!dealsOnReview &&
          [
            RequestStatus.CORRECTED,
            RequestStatus.TO_CORRECT_BY_SUPERVISOR,
            RequestStatus.VERIFYING_BY_SUPERVISOR,
          ].includes(curProposal?.proposal.status) ? (
            <div>
              <Button
                className={classNames.actionButton}
                onClick={() => onClickReworkDealModal(curProposal?.proposal._id)}
              >
                {t(TranslationKey['Send in for rework'])}
              </Button>
            </div>
          ) : null}
        </div>

        <div className={classNames.middleBlockWrapper}>
          <div className={classNames.subBlockWrapper}>
            <div className={classNames.leftSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Time to complete'])}</Typography>

                <Typography>{minsToTime(curProposal?.proposal.execution_time)}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey.Status)}</Typography>

                <RequestStatusCell status={curProposal?.proposal.status} />
              </div>
            </div>
            <div className={classNames.rightSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey.Deadline)}</Typography>

                <Typography>{formatNormDateTime(curProposal?.proposal.timeoutAt)}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={classNames.cardPrice}>
                  {toFixedWithDollarSign(curProposal?.proposal.price, 2)}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classNames.resultWrapper}>
            <Typography className={classNames.result}>{t(TranslationKey.Result)}</Typography>
            <Typography className={classNames.resultDescription}>{curProposal?.details.result}</Typography>
          </div>
          <div className={classNames.filesAndTimeWrapper}>
            <div className={classNames.filesWrapper}>
              <PhotoAndFilesCarousel small files={curProposal?.details?.linksToMediaFiles} />
            </div>

            <div className={classNames.timeOnReviewWrapper}>
              <Typography className={classNames.timeOnReviewTitle}>{t(TranslationKey['Time to complete'])}</Typography>
              <Typography className={classNames.timeOnReview}>{'24ч 00мин'}</Typography>
            </div>
          </div>
          {!dealsOnReview &&
            [
              RequestStatus.CORRECTED,
              RequestStatus.TO_CORRECT_BY_SUPERVISOR,
              RequestStatus.VERIFYING_BY_SUPERVISOR,
            ].includes(curProposal?.proposal.status) && (
              <div className={classNames.buttonsWrapper}>
                <Button
                  danger
                  // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                  variant="contained"
                  color="primary"
                  className={classNames.actionButton}
                  onClick={() => onClickRejectDealModal(curProposal?.proposal._id)}
                >
                  {t(TranslationKey['Reject the deal'])}
                </Button>

                <Button
                  success
                  // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                  variant="contained"
                  color="primary"
                  className={classNames.actionButton}
                  onClick={() => onClickConfirmDealModal(curProposal?.proposal._id)}
                >
                  {t(TranslationKey['Accept the deal'])}
                </Button>
              </div>
            )}
          {dealsOnReview ? (
            <div className={classNames.buttonWrapper}>
              <Button
                success
                // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                variant="contained"
                color="primary"
                className={classNames.actionButton}
                onClick={() => onClickGetToWorkModal(curProposal?.proposal._id)}
              >
                {t(TranslationKey['Get to work'])}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </Grid>
  )
}
