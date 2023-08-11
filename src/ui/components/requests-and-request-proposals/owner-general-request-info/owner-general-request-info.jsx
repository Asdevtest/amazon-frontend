/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import React, { useState } from 'react'

import DoneIcon from '@mui/icons-material/Done'
import { Checkbox, Typography } from '@mui/material'

import { requestPriority } from '@constants/requests/request-priority'
import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { RequestStatus } from '@constants/requests/request-status'
import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestStatusCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { RestoreRequestModal } from '@components/requests-and-request-proposals/restore-request-modal/restore-request-modal'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { Text } from '@components/shared/text'
import { UserLink } from '@components/user/user-link'

import { calcNumberMinusPercent } from '@utils/calculation'
import { formatDateDistanceFromNowStrict, formatNormDateTime } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { useClassNames } from './owner-general-request-info.style'

export const OwnerGeneralRequestInfo = ({
  request,
  requestProposals,
  requestAnnouncement,
  onClickPublishBtn,
  onClickEditBtn,
  onClickCancelBtn,
  onClickAbortBtn,
  onRecoverRequest,
  onToggleUploadedToListing,
}) => {
  const { classes: classNames } = useClassNames()

  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false)

  const now = new Date()

  const newProductPrice =
    calcNumberMinusPercent(request?.request?.priceAmazon, request?.request?.cashBackInPercent) || null

  const requestIsNotDraftAndPublished =
    !request?.request.status === RequestStatus.DRAFT || request?.request.status === RequestStatus.PUBLISHED

  return (
    <div className={classNames.root}>
      <div className={cx(classNames.requestInformationWrapper, classNames.firstBlock)}>
        <div className={classNames.priorityWrapper}>
          <Typography className={classNames.sectionTitle}>{t(TranslationKey['Request information'])}</Typography>

          {Number(request?.request?.priority) === requestPriority.urgentPriority && (
            <div className={classNames.prioritySubWrapper}>
              <Typography className={classNames.sectionTitle}>{t(TranslationKey['Urgent request'])}</Typography>

              <img className={classNames.priorityIcon} src="/assets/icons/fire.svg" />
            </div>
          )}
        </div>

        <div className={classNames.requestInformationCardWrapper}>
          <div className={classNames.requestInformation}>
            <div className={classNames.requestInformationCardInfoTitles}>
              <Typography className={classNames.sectionSubTitle}>{t(TranslationKey['Request information'])}</Typography>

              <Typography className={classNames.sectionSubTitle}>
                {translateProposalsLeftMessage(
                  request?.request?.maxAmountOfProposals -
                    (requestProposals?.filter(
                      el =>
                        el?.proposal?.status === RequestProposalStatus?.ACCEPTED_BY_CLIENT ||
                        el?.proposal?.status === RequestProposalStatus?.ACCEPTED_BY_CREATOR_OF_REQUEST ||
                        el?.proposal?.status === RequestProposalStatus?.ACCEPTED_BY_SUPERVISOR,
                    ).length || 0),
                  request?.request?.maxAmountOfProposals,
                )}
              </Typography>
            </div>

            <Typography className={classNames.sectionText}>{request?.request?.title}</Typography>
          </div>
          <div className={classNames.requestMoreInformation}>
            <div className={classNames.moreInformationSection}>
              <Typography className={classNames.sectionSubTitle}>{t(TranslationKey['Request creator'])}</Typography>

              <UserLink
                blackText
                withAvatar
                name={request?.request?.sub?.name || request?.request?.createdBy?.name}
                userId={request?.request?.sub?._id || request?.request?.createdBy?._id}
                customStyles={{ fontSize: 14, fontWeight: 400 }}
                customAvatarStyles={{ width: 19, height: 19 }}
                maxNameWidth={150}
              />
            </div>
            <div className={classNames.moreInformationSection}>
              <Typography className={classNames.sectionSubTitle}>{t(TranslationKey.ASIN) + ':'}</Typography>

              <AsinOrSkuLink
                asin={request?.request.asin}
                textStyles={cx(classNames.sectionText, classNames.linkSpan)}
                missingValueTextStyles={cx(classNames.sectionText, classNames.linkSpan)}
              />
            </div>
            <div className={classNames.moreInformationSection}>
              <Typography className={classNames.sectionSubTitle}>{t(TranslationKey.ID) + ':'}</Typography>

              <Typography className={classNames.sectionText}>
                {request?.request.humanFriendlyId || t(TranslationKey.Missing)}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {request?.request && (
        <div className={cx(classNames.requestInformationWrapper, classNames.secondBlock)}>
          <div className={classNames.requestInformationTitleWrapper}>
            <Typography className={classNames.sectionTitle}>{t(TranslationKey['Request terms'])}</Typography>

            {request?.request?.withoutConfirmation && (
              <div className={classNames.confirmationWrapper}>
                <DoneIcon className={classNames.doneIcon} />

                <Text
                  tooltipInfoContent={t(
                    TranslationKey['Allowed to the performer to take the application to work without confirmation'],
                  )}
                  tooltipPosition={'baseLine'}
                  className={classNames.sectionTitle}
                  containerClasses={classNames.container}
                >
                  {`(${t(TranslationKey['Without confirmation']).toLocaleLowerCase()})`}
                </Text>
              </div>
            )}
          </div>

          <div className={classNames.requestInfoWrapper}>
            <div className={classNames.blockInfoWrapper}>
              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey['Task type'])}</Typography>
                <Typography className={cx(classNames.blockInfoCellText)}>
                  {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[request?.request?.typeTask])}
                </Typography>
              </div>

              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Time)}</Typography>
                <Typography className={classNames.blockInfoCellText}>
                  {request?.request.timeoutAt && formatDateDistanceFromNowStrict(request.request.timeoutAt, now)}
                </Typography>
              </div>
            </div>

            {`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` ? (
              <div className={classNames.blockInfoWrapper}>
                <div className={classNames.blockInfoCell}>
                  <Typography className={classNames.blockInfoCellTitle}>
                    {t(TranslationKey['Product price'])}
                  </Typography>
                  <div className={classNames.pricesWrapper}>
                    {newProductPrice && (
                      <Typography
                        className={cx(classNames.blockInfoCellText, { [classNames.newPrice]: newProductPrice })}
                      >
                        {'$ ' + toFixed(newProductPrice, 2)}
                      </Typography>
                    )}

                    <Typography
                      className={cx(classNames.blockInfoCellText, {
                        [classNames.oldPrice]: newProductPrice,
                      })}
                    >
                      {'$ ' + toFixed(request.request.priceAmazon, 2)}
                    </Typography>
                  </div>
                </div>

                <div className={classNames.blockInfoCell}>
                  <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.CashBack)}</Typography>
                  <Typography className={cx(classNames.blockInfoCellText)}>
                    {toFixed(request?.request?.cashBackInPercent, 2) + ' %'}
                  </Typography>
                </div>
              </div>
            ) : null}

            <div className={cx(classNames.blockInfoWrapper)}>
              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Status)}</Typography>
                <RequestStatusCell
                  status={request?.request.status}
                  styles={{
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: '19px',
                    textAlign: 'left',
                    whiteSpace: 'pre-wrap',
                  }}
                />
              </div>

              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>
                  {t(TranslationKey['Performance time'])}
                </Typography>
                <Typography className={cx(classNames.blockInfoCellText)}>
                  {formatNormDateTime(request?.request.timeoutAt)}
                </Typography>
              </div>
            </div>

            <div className={cx(classNames.blockInfoWrapper, classNames.blockInfoWrapperLast)}>
              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey['Request price'])}</Typography>
                {request?.request.price && (
                  <Typography className={cx(classNames.price, classNames.blockInfoCellText)}>
                    {toFixed(request?.request.price, 2) + '$'}
                  </Typography>
                )}
              </div>

              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Updated)}</Typography>
                <Typography className={classNames.blockInfoCellText}>
                  {formatNormDateTime(request?.request.updatedAt)}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}

      {requestAnnouncement ? (
        <div className={cx(classNames.requestInformationWrapper, classNames.thirdBlock)}>
          <Typography className={classNames.sectionTitle}>{t(TranslationKey.Announcement)}</Typography>

          <div className={classNames.announcementWrapper}>
            <div className={classNames.announcementInfoSection}>
              <Typography className={classNames.sectionTitle}>{t(TranslationKey['Announcement name'])}</Typography>

              <Typography className={classNames.sectionText}>{requestAnnouncement?.title}</Typography>
            </div>
            <div className={classNames.announcementInfoSection}>
              <Typography className={classNames.sectionTitle}>{t(TranslationKey['Announcement creator'])}</Typography>

              <UserLink
                blackText
                withAvatar
                name={requestAnnouncement?.createdBy?.name}
                userId={requestAnnouncement?.createdBy?._id}
                customStyles={{ fontSize: 14, fontWeight: 400 }}
                customAvatarStyles={{ width: 19, height: 19 }}
                maxNameWidth={150}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={classNames.thirdBlock} />
      )}

      <div className={classNames.btnsBlockWrapper}>
        <Button
          border
          className={classNames.listingButton}
          onClick={() => onToggleUploadedToListing(request.request._id, request.request.uploadedToListing)}
        >
          <Checkbox
            color="primary"
            checked={request.request.uploadedToListing}
            className={classNames.listingCheckbox}
          />
          <Typography className={cx(classNames.listingText)}>{t(TranslationKey['Uploaded by on listing'])}</Typography>
        </Button>
        {request && request?.request.status === RequestStatus.DRAFT && (
          <div className={classNames.btnsWrapper}>
            <div className={classNames.btnsRow}>
              <Button
                danger
                tooltipInfoContent={t(TranslationKey['Delete the selected request'])}
                className={classNames.deleteBtn}
                onClick={onClickCancelBtn}
              >
                {t(TranslationKey.Delete)}
              </Button>

              <Button
                tooltipInfoContent={t(TranslationKey['Allows you to change the selected request'])}
                color="primary"
                className={classNames.editBtn}
                onClick={onClickEditBtn}
              >
                {t(TranslationKey.Edit)}
              </Button>
            </div>
            <Button
              success
              tooltipInfoContent={t(TranslationKey['Publish the selected request on the exchange'])}
              className={classNames.publishBtn}
              onClick={onClickPublishBtn}
            >
              {t(TranslationKey.Publish)}
            </Button>
          </div>
        )}
        {request && request?.request.status !== RequestStatus.DRAFT && (
          <>
            <div className={classNames.btnsWrapper}>
              <div className={classNames.btnsRow}>
                {requestIsNotDraftAndPublished && (
                  <Button
                    danger
                    tooltipInfoContent={t(TranslationKey['Delete the selected request'])}
                    className={classNames.deleteBtn}
                    onClick={onClickCancelBtn}
                  >
                    {t(TranslationKey.Delete)}
                  </Button>
                )}

                {request && request?.request.status === RequestStatus.PUBLISHED && (
                  <Button
                    tooltipInfoContent={t(TranslationKey['Allows you to change the selected request'])}
                    color="primary"
                    className={cx(classNames.editBtn, {
                      [classNames.buttonEditRemoveBtnIsShown]: requestIsNotDraftAndPublished,
                    })}
                    onClick={onClickEditBtn}
                  >
                    {t(TranslationKey.Edit)}
                  </Button>
                )}
              </div>
            </div>

            {(request?.request.status === RequestStatus.IN_PROCESS ||
              request?.request.status === RequestStatus.EXPIRED ||
              request?.request.status === RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED) && (
              <>
                <Button className={classNames.recoverBtn} onClick={() => setIsRestoreModalOpen(true)}>
                  {t(TranslationKey['Change request terms'])}
                </Button>

                <Modal openModal={isRestoreModalOpen} setOpenModal={() => setIsRestoreModalOpen(false)}>
                  <RestoreRequestModal
                    currentDate={request?.request?.timeoutAt}
                    currentRequestsCount={request.request.maxAmountOfProposals}
                    handleCloseModal={() => setIsRestoreModalOpen(false)}
                    handleSubmit={onRecoverRequest}
                  />
                </Modal>
              </>
            )}

            {request?.request.status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED &&
              request?.request.status !== RequestStatus.EXPIRED && (
                <div className={[classNames.btnsRow, classNames.btnsRowIsLast]}>
                  <Button
                    tooltipInfoContent={
                      request?.request.status !== RequestStatus.FORBID_NEW_PROPOSALS &&
                      t(TranslationKey['Removes the visibility of the request on the exchange'])
                    }
                    color="primary"
                    btnWrapperStyle={classNames.buttonWrapperFullWidth}
                    className={cx(classNames.button, {
                      [classNames.stopBtn]: request?.request.status !== RequestStatus.FORBID_NEW_PROPOSALS,
                    })}
                    onClick={request?.request.status !== 'FORBID_NEW_PROPOSALS' ? onClickAbortBtn : onClickPublishBtn}
                  >
                    {request?.request.status === RequestStatus.FORBID_NEW_PROPOSALS
                      ? t(TranslationKey['Resume accepting proposals'])
                      : t(TranslationKey['Stop accepting proposals'])}
                  </Button>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  )
}
