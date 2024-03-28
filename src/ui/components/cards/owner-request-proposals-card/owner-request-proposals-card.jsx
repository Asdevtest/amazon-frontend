import { useState } from 'react'

import { Avatar, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/requests/request-proposal-status'
import { RequestStatus } from '@constants/requests/request-status'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { MainRequestResultModal } from '@components/modals/main-request-result-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { Button } from '@components/shared/button'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './owner-request-proposals-card.style'

export const showDesignerResultBtnStatuses = [
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

export const OwnerRequestProposalsCard = ({
  item,
  request,
  userInfo,
  onClickContactWithExecutor,
  onClickReview,
  onClickOrderProposal,
  onClickRejectProposal,
  onSendInForRework,
  onReceiveCustomProposal,
}) => {
  const { classes: styles } = useStyles()

  const [showRequestDesignerResultClientModal, setShowRequestDesignerResultClientModal] = useState(false)
  const [showMainRequestResultModal, setShowMainRequestResultModal] = useState(false)
  const [showRequestResultModal, setShowRequestResultModal] = useState(false)

  const onClickOpenResult = () => {
    if (request.request?.spec?.title === freelanceRequestType.DESIGNER) {
      setShowRequestDesignerResultClientModal(!showRequestDesignerResultClientModal)
    } else if (request.request?.spec?.title === freelanceRequestType.BLOGGER) {
      setShowRequestResultModal(!showRequestResultModal)
    } else {
      setShowMainRequestResultModal(!showMainRequestResultModal)
    }
  }

  const statusesReworkAndReceiveButtons = [RequestProposalStatus.READY_TO_VERIFY, RequestProposalStatus.CORRECTED]

  return (
    <>
      <div className={styles.cardMainWrapper}>
        <div className={styles.cardContentWrapper}>
          <div className={styles.cardSubContentWrapper}>
            <div className={styles.userWrapper}>
              <div className={styles.userInfoWrapper}>
                <Avatar src={getUserAvatarSrc(item?.proposal?.createdBy?._id)} className={styles.cardImg} />

                <div className={styles.userNameWrapper}>
                  <UserLink blackText name={item?.proposal?.createdBy?.name} userId={item.proposal.createdBy?._id} />
                  <div className={styles.reviewWrapper}>
                    <Typography className={styles.reviews} onClick={() => onClickReview(item.proposal.createdBy)}>
                      {t(TranslationKey.Reviews)}
                    </Typography>

                    <Rating readOnly className={styles.userRating} value={item.proposal.createdBy?.rating} />
                  </div>
                </div>
              </div>

              <Typography className={styles.successDeals}>
                {t(TranslationKey['The number of total successful transactions:']) + ' '}
                {item?.proposal?.createdBy?.proposalsCompleted ?? t(TranslationKey.Missing)}
              </Typography>

              <div className={styles.timeInfoWrapper}>
                <div className={styles.timeItemInfoWrapper}>
                  <Typography className={styles.cardTime}>{t(TranslationKey['Time to complete']) + ':'}</Typography>

                  <Typography className={styles.cardTimeValue}>{minsToTime(item?.proposal?.execution_time)}</Typography>
                </div>

                <div className={styles.timeItemInfoWrapper}>
                  <Typography className={styles.cardPrice}>{t(TranslationKey['Total price']) + ':'}</Typography>

                  <Typography className={styles.cardPriceValue}>
                    {toFixedWithDollarSign(item.proposal.price, 2)}
                  </Typography>
                </div>
              </div>
            </div>
            <Typography className={styles.proposalTitle}>{item.proposal.title}</Typography>
            <Typography className={styles.proposalDescription}>{item.proposal.comment}</Typography>
          </div>

          <SlideshowGallery slidesToShow={2} files={item.proposal.linksToMediaFiles} />
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.statusField}>
            <span
              className={styles.circleIndicator}
              style={{ backgroundColor: RequestProposalStatusColor(item.proposal.status) }}
            />
            <Typography className={styles.standartText}>
              {RequestProposalStatusTranslate(item.proposal.status)}
            </Typography>
          </div>

          <Button disabled={!showDesignerResultBtnStatuses.includes(item.proposal.status)} onClick={onClickOpenResult}>
            {t(TranslationKey.Result)}
          </Button>

          <div className={styles.actionButtonWrapper}>
            {(item.proposal.status === RequestProposalStatus.CREATED ||
              item.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED) && (
              <>
                <Button
                  styleType={ButtonStyle.DANGER}
                  tooltipInfoContent={t(
                    TranslationKey[
                      'The terms of the proposal do not fit, the contractor will be able to edit them and do it again'
                    ],
                  )}
                  onClick={() => onClickRejectProposal(item.proposal._id)}
                >
                  {t(TranslationKey.Reject)}
                </Button>
              </>
            )}

            {[
              RequestProposalStatus.CREATED,
              RequestProposalStatus.OFFER_CONDITIONS_CORRECTED,
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
                RequestStatus.OFFER_CONDITIONS_REJECTED,
              ].includes(request.request.status) && (
                <Button
                  styleType={ButtonStyle.SUCCESS}
                  tooltipInfoContent={t(TranslationKey['Make a deal on these terms'])}
                  className={styles.actionButton}
                  onClick={() => onClickOrderProposal(item.proposal._id, item.proposal.price)}
                >
                  {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(item.proposal.price, 2)}`}
                </Button>
              )}
            <Button
              tooltipInfoContent={t(TranslationKey['Open a chat with the performer'])}
              className={styles.actionButton}
              onClick={() => onClickContactWithExecutor(item.proposal)}
            >
              {t(TranslationKey['Contact the performer'])}
            </Button>
          </div>
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

      {showMainRequestResultModal ? (
        <MainRequestResultModal
          readOnly={!statusesReworkAndReceiveButtons.includes(item.proposal.status)}
          customProposal={item}
          userInfo={userInfo}
          openModal={showMainRequestResultModal}
          onOpenModal={() => setShowMainRequestResultModal(!showMainRequestResultModal)}
          onEditCustomProposal={onSendInForRework}
          onReceiveCustomProposal={() => onReceiveCustomProposal(item.proposal._id)}
        />
      ) : null}

      {showRequestResultModal ? (
        <RequestResultModal
          // @ts-ignore
          request={request}
          proposal={item}
          openModal={showRequestResultModal}
          setOpenModal={() => setShowRequestResultModal(!showRequestResultModal)}
        />
      ) : null}
    </>
  )
}
