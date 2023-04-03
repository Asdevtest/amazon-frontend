import {cx} from '@emotion/css'
import {Typography, Avatar} from '@mui/material'
import Rating from '@mui/material/Rating'

import React from 'react'

import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {UserLink} from '@components/user-link'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './owner-request-proposals-card.style'

export const OwnerRequestProposalsCard = ({
  item,
  onClickContactWithExecutor,
  onClickReview,
  onClickOrderProposal,
  onClickRejectProposal,
}) => {
  const {classes: classNames} = useClassNames()

  return (
    <div className={classNames.cardMainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.userInfoMainWrapper}>
          <div className={classNames.cardContentWrapper}>
            <div className={classNames.cardSubContentWrapper}>
              <div className={classNames.userWrapper}>
                <div className={classNames.userInfoWrapper}>
                  <Avatar src={getUserAvatarSrc(item.proposal.createdBy._id)} className={classNames.cardImg} />

                  <div className={classNames.userNameWrapper}>
                    <UserLink blackText name={item.proposal.createdBy.name} userId={item.proposal.createdBy._id} />
                    <div className={classNames.reviewWrapper}>
                      <Typography className={classNames.reviews} onClick={() => onClickReview()}>
                        {t(TranslationKey.Reviews)}
                      </Typography>
                      {/* <UserLink name={t(TranslationKey.Reviews)} userId={item.proposal.createdBy._id} /> */}
                      <Rating disabled className={classNames.userRating} value={item.proposal.createdBy.rating} />
                    </div>
                  </div>
                </div>

                <Typography className={classNames.successDeals}>
                  {t(TranslationKey['The number of total successful transactions:']) + ' '}
                  {item?.proposal?.createdBy?.proposalsCompleted ?? t(TranslationKey.Missing)}
                </Typography>

                <div className={classNames.timeInfoWrapper}>
                  <div className={classNames.timeItemInfoWrapper}>
                    <Typography className={classNames.cardTime}>
                      {t(TranslationKey['Time to complete']) + ':'}
                    </Typography>

                    <Typography className={classNames.cardTimeValue}>
                      {minsToTime(item.proposal.execution_time)}
                    </Typography>
                  </div>

                  <div className={classNames.timeItemInfoWrapper}>
                    <Typography className={classNames.cardPrice}>{t(TranslationKey['Total price']) + ':'}</Typography>

                    <Typography className={classNames.cardPriceValue}>
                      {toFixedWithDollarSign(item.proposal.price, 2)}
                    </Typography>
                  </div>
                </div>
              </div>
              <Typography className={classNames.proposalTitle}>{item.proposal.title}</Typography>
              <Typography className={classNames.proposalDescription}>{item.proposal.comment}</Typography>
            </div>

            <div className={classNames.photoWrapper}>
              <PhotoCarousel files={item.proposal.linksToMediaFiles} />
            </div>
          </div>
        </div>
      </div>

      <div className={classNames.cardFooter}>
        <div className={classNames.statusField}>
          <span
            className={classNames.circleIndicator}
            style={{backgroundColor: RequestProposalStatusColor(item.proposal.status)}}
          />
          <Typography className={classNames.standartText}>
            {RequestProposalStatusTranslate(item.proposal.status)}
          </Typography>
        </div>

        <div className={classNames.actionButtonWrapper}>
          {item.proposal.status === RequestProposalStatus.CREATED ||
          item.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED ? (
            <>
              <Button
                tooltipInfoContent={t(
                  TranslationKey[
                    'The terms of the proposal do not fit, the contractor will be able to edit them and do it again'
                  ],
                )}
                variant="contained"
                color="primary"
                className={cx(classNames.actionButton, classNames.cancelBtn)}
                onClick={() => onClickRejectProposal(item.proposal._id)}
              >
                {t(TranslationKey.Reject)}
              </Button>
              <Button
                tooltipInfoContent={t(TranslationKey['Make a deal on these terms'])}
                variant="contained"
                color="primary"
                className={cx(classNames.actionButton, classNames.successBtn)}
                onClick={() => onClickOrderProposal(item.proposal._id, item.proposal.price)}
              >
                {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(item.proposal.price, 2)}`}
              </Button>
            </>
          ) : undefined}

          <Button
            tooltipInfoContent={t(TranslationKey['Open a chat with the performer'])}
            variant="contained"
            color="primary"
            className={classNames.actionButton}
            onClick={() => onClickContactWithExecutor(item.proposal)}
          >
            {t(TranslationKey['Contact the performer'])}
          </Button>
        </div>
      </div>
    </div>
  )
}
