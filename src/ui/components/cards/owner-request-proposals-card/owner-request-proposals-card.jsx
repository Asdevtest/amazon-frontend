import { useState } from 'react'

import { Avatar, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/requests/request-proposal-status'
import { RequestStatus } from '@constants/requests/request-status'
import { freelanceRequestType, freelanceRequestTypeByCode } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestStandartResultForm } from '@components/forms/request-standart-result-form'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './owner-request-proposals-card.style'

export const OwnerRequestProposalsCard = ({
  item,
  request,
  userInfo,
  onClickContactWithExecutor,
  onClickReview,
  onClickOrderProposal,
  onClickRejectProposal,
}) => {
  const { classes: styles, cx } = useStyles()

  const [showRequestDesignerResultClientModal, setShowRequestDesignerResultClientModal] = useState(false)
  const [showRequestStandartResultModal, setShowRequestStandartResultModal] = useState(false)
  const [showRequestResultModal, setShowRequestResultModal] = useState(false)

  const onClickOpenResult = () => {
    if (freelanceRequestTypeByCode[request.request?.spec?.type] === freelanceRequestType.DESIGNER) {
      setShowRequestDesignerResultClientModal(!showRequestDesignerResultClientModal)
    } else if (freelanceRequestTypeByCode[request.request?.spec?.type] === freelanceRequestType.BLOGGER) {
      setShowRequestResultModal(!showRequestResultModal)
    } else {
      setShowRequestStandartResultModal(!showRequestStandartResultModal)
    }
  }

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
    <div className={styles.cardMainWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.userInfoMainWrapper}>
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

                    <Typography className={styles.cardTimeValue}>
                      {minsToTime(item?.proposal?.execution_time)}
                    </Typography>
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

            <div className={styles.photoWrapper}>
              <PhotoAndFilesSlider withoutFiles files={item.proposal.linksToMediaFiles} />
            </div>
          </div>
        </div>
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

        <Button
          disabled={!showDesignerResultBtnStatuses.includes(item.proposal.status)}
          variant="contained"
          color="primary"
          className={cx(styles.actionButton)}
          onClick={onClickOpenResult}
        >
          {t(TranslationKey.Result)}
        </Button>

        <div className={styles.actionButtonWrapper}>
          {(item.proposal.status === RequestProposalStatus.CREATED ||
            item.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED) && (
            <>
              <Button
                danger
                tooltipInfoContent={t(
                  TranslationKey[
                    'The terms of the proposal do not fit, the contractor will be able to edit them and do it again'
                  ],
                )}
                variant="contained"
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
                success
                tooltipInfoContent={t(TranslationKey['Make a deal on these terms'])}
                variant="contained"
                className={styles.actionButton}
                onClick={() => onClickOrderProposal(item.proposal._id, item.proposal.price)}
              >
                {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(item.proposal.price, 2)}`}
              </Button>
            )}
          <Button
            tooltipInfoContent={t(TranslationKey['Open a chat with the performer'])}
            variant="contained"
            color="primary"
            className={styles.actionButton}
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

      <Modal
        missClickModalOn
        openModal={showRequestStandartResultModal}
        setOpenModal={() => setShowRequestStandartResultModal(!showRequestStandartResultModal)}
      >
        <RequestStandartResultForm
          request={request}
          proposal={item}
          setOpenModal={() => setShowRequestStandartResultModal(!showRequestStandartResultModal)}
          // onClickSendAsResult={onClickSendAsResult}
        />
      </Modal>

      {showRequestResultModal && (
        <RequestResultModal
          request={request}
          proposal={item}
          openModal={showRequestResultModal}
          setOpenModal={() => setShowRequestResultModal(!showRequestResultModal)}
        />
      )}
    </div>
  )
}
