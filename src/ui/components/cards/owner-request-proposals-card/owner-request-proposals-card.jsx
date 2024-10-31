import { Avatar, Rate } from 'antd'
import { useState } from 'react'

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
import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './owner-request-proposals-card.style'

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
                    <p className={styles.reviews} onClick={() => onClickReview(item.proposal.createdBy)}>
                      {t(TranslationKey.Reviews)}
                    </p>

                    <Rate disabled className={styles.userRating} value={item.proposal.createdBy?.rating} />
                  </div>
                </div>
              </div>

              <p className={styles.successDeals}>
                {t(TranslationKey['The number of total successful transactions:']) + ' '}
                {item?.proposal?.createdBy?.proposalsCompleted ?? t(TranslationKey.Missing)}
              </p>

              <div className={styles.timeInfoWrapper}>
                <div className={styles.timeItemInfoWrapper}>
                  <p className={styles.cardTime}>{t(TranslationKey['Time to complete']) + ':'}</p>

                  <p className={styles.cardTimeValue}>{minsToTime(item?.proposal?.execution_time)}</p>
                </div>

                <div className={styles.timeItemInfoWrapper}>
                  <p className={styles.cardPrice}>{t(TranslationKey['Total price']) + ':'}</p>

                  <p className={styles.cardPriceValue}>{toFixedWithDollarSign(item.proposal.price, 2)}</p>
                </div>
              </div>
            </div>
            <p className={styles.proposalTitle}>{item.proposal.title}</p>
            <p className={styles.proposalDescription}>{item.proposal.comment}</p>
          </div>

          <SlideshowGallery slidesToShow={2} files={item.proposal.linksToMediaFiles} />
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.statusField}>
            <span
              className={styles.circleIndicator}
              style={{ backgroundColor: RequestProposalStatusColor(item.proposal.status) }}
            />
            <p className={styles.standartText}>{RequestProposalStatusTranslate(item.proposal.status)}</p>
          </div>

          <CustomButton
            disabled={!showDesignerResultBtnStatuses.includes(item.proposal.status)}
            onClick={onClickOpenResult}
          >
            {t(TranslationKey.Result)}
          </CustomButton>

          <div className={styles.actionButtonWrapper}>
            {(item.proposal.status === RequestProposalStatus.CREATED ||
              item.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED) && (
              <>
                <CustomButton
                  danger
                  title={t(
                    TranslationKey[
                      'The terms of the proposal do not fit, the contractor will be able to edit them and do it again'
                    ],
                  )}
                  type="primary"
                  onClick={() => onClickRejectProposal(item.proposal._id)}
                >
                  {t(TranslationKey.Reject)}
                </CustomButton>
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
                <CustomButton
                  type="primary"
                  onClick={() => onClickOrderProposal(item.proposal._id, item.proposal.price)}
                >
                  {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(item.proposal.price, 2)}`}
                </CustomButton>
              )}
            <CustomButton onClick={() => onClickContactWithExecutor(item.proposal)}>
              {t(TranslationKey['Contact the performer'])}
            </CustomButton>
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
          proposal={item}
          openModal={showRequestResultModal}
          setOpenModal={() => setShowRequestResultModal(!showRequestResultModal)}
        />
      ) : null}
    </>
  )
}
