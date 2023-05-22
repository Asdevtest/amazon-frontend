import { cx } from '@emotion/css'
import { Avatar, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import React, { useState } from 'react'

import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/requests/request-proposal-status'
import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { Modal } from '@components/shared/modal'
import { Button } from '@components/shared/buttons/button'
import { PhotoCarousel } from '@components/shared/photo-carousel'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './owner-request-proposals-card.style'
import { freelanceRequestType, freelanceRequestTypeByCode } from '@constants/statuses/freelance-request-type'

export const OwnerRequestProposalsCard = ({
  item,
  request,
  userInfo,
  onClickContactWithExecutor,
  onClickReview,
  onClickOrderProposal,
  onClickRejectProposal,
}) => {
  const { classes: classNames } = useClassNames()

  const [showRequestDesignerResultClientModal, setShowRequestDesignerResultClientModal] = useState(false)

  const showDesignerResultBtnStatuses = [
    RequestProposalStatus.READY_TO_VERIFY,
    RequestProposalStatus.VERIFYING_BY_SUPERVISOR,
    RequestProposalStatus.TO_CORRECT,
    RequestProposalStatus.CORRECTED,

    RequestProposalStatus.ACCEPTED_BY_CLIENT,
    RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST,
    RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,

    RequestProposalStatus.OFFER_CONDITIONS_CORRECTED,
    RequestProposalStatus.PROPOSAL_EDITED,
  ]

  return (
    <div className={classNames.cardMainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.userInfoMainWrapper}>
          <div className={classNames.cardContentWrapper}>
            <div className={classNames.cardSubContentWrapper}>
              <div className={classNames.userWrapper}>
                <div className={classNames.userInfoWrapper}>
                  <Avatar src={getUserAvatarSrc(item.proposal.createdBy?._id)} className={classNames.cardImg} />

                  <div className={classNames.userNameWrapper}>
                    <UserLink blackText name={item.proposal.createdBy?.name} userId={item.proposal.createdBy?._id} />
                    <div className={classNames.reviewWrapper}>
                      <Typography className={classNames.reviews} onClick={() => onClickReview()}>
                        {t(TranslationKey.Reviews)}
                      </Typography>
                      {/* <UserLink name={t(TranslationKey.Reviews)} userId={item.proposal.createdBy._id} /> */}
                      <Rating disabled className={classNames.userRating} value={item.proposal.createdBy?.rating} />
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
              {/* <PhotoCarousel files={item.proposal.media?.map(el => el.fileLink)} /> */}
            </div>
          </div>
        </div>
      </div>

      <div className={classNames.cardFooter}>
        <div className={classNames.statusField}>
          <span
            className={classNames.circleIndicator}
            style={{ backgroundColor: RequestProposalStatusColor(item.proposal.status) }}
          />
          <Typography className={classNames.standartText}>
            {RequestProposalStatusTranslate(item.proposal.status)}
          </Typography>
        </div>

        {freelanceRequestTypeByCode[request.request.typeTask] === freelanceRequestType.DESIGNER && (
          <Button
            disabled={!showDesignerResultBtnStatuses.includes(item.proposal.status)}
            variant="contained"
            color="primary"
            className={cx(classNames.actionButton)}
            onClick={() => setShowRequestDesignerResultClientModal(!showRequestDesignerResultClientModal)}
          >
            {t(TranslationKey.Result)}
          </Button>
        )}

        <div className={classNames.actionButtonWrapper}>
          {(item.proposal.status === RequestProposalStatus.CREATED ||
            item.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED) && (
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
              {/* <Button
                tooltipInfoContent={t(TranslationKey['Make a deal on these terms'])}
                variant="contained"
                color="primary"
                className={cx(classNames.actionButton, classNames.successBtn)}
                onClick={() => onClickOrderProposal(item.proposal._id, item.proposal.price)}
              >
                {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(item.proposal.price, 2)}`}
              </Button> */}
            </>
          )}

          {[
            RequestProposalStatus.CREATED,
            RequestProposalStatus.OFFER_CONDITIONS_CORRECTED,
            RequestProposalStatus.OFFER_CONDITIONS_REJECTED,

            RequestProposalStatus.CANCELED_BY_CREATOR_OF_REQUEST,
            RequestProposalStatus.CANCELED_BY_SUPERVISOR,
            RequestProposalStatus.CANCELED_BY_SUPERVISOR,
            RequestProposalStatus.OFFER_CONDITIONS_CORRECTED,
          ].includes(item.proposal.status) &&
            ![
              RequestStatus.EXPIRED,
              RequestStatus.CANCELED_BY_ADMIN,
              RequestStatus.CANCELED_BY_SUPERVISOR,
              RequestStatus.CANCELED_BY_EXECUTOR,
            ].includes(request.request.status) && (
              <Button
                tooltipInfoContent={t(TranslationKey['Make a deal on these terms'])}
                variant="contained"
                color="primary"
                className={cx(classNames.actionButton, classNames.successBtn)}
                onClick={() => onClickOrderProposal(item.proposal._id, item.proposal.price)}
              >
                {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(item.proposal.price, 2)}`}
              </Button>
            )}
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

      <Modal
        missClickModalOn
        openModal={showRequestDesignerResultClientModal}
        setOpenModal={() => setShowRequestDesignerResultClientModal(!showRequestDesignerResultClientModal)}
      >
        <RequestDesignerResultClientForm
          onlyRead
          userInfo={userInfo}
          request={request}
          proposal={item}
          curResultMedia={item.proposal.media}
          setOpenModal={() => setShowRequestDesignerResultClientModal(!showRequestDesignerResultClientModal)}
          // onClickSendAsResult={onClickSendAsResult}
        />
      </Modal>
    </div>
  )
}
