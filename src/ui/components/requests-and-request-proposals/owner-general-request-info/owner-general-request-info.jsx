/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Typography, Paper, Avatar} from '@mui/material'

import React from 'react'

import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/freelance-request-type'
import {RequestProposalStatus} from '@constants/request-proposal-status'
import {RequestStatus} from '@constants/request-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {AsinLink} from '@components/asin-link'
import {Button} from '@components/buttons/button'
import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'

import {calcNumberMinusPercent, calcPercentAfterMinusNumbers} from '@utils/calculation'
import {formatDateDistanceFromNowStrict, formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'
import {translateProposalsLeftMessage} from '@utils/validation'

import {useClassNames} from './owner-general-request-info.style'

export const OwnerGeneralRequestInfo = ({
  requestProposals,
  request,
  onClickPublishBtn,
  onClickEditBtn,
  onClickCancelBtn,
  onClickAbortBtn,
}) => {
  const {classes: classNames} = useClassNames()
  const now = new Date()

  const isDraft = request?.request?.status === RequestStatus.DRAFT

  const newProductPrice =
    calcNumberMinusPercent(request?.request?.priceAmazon, request?.request?.cashBackInPercent) || null

  const requestIsNotDraftAndPublished =
    !request?.request.status === RequestStatus.DRAFT || request?.request.status === RequestStatus.PUBLISHED

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.titleBlockWrapper}>
          <Avatar src={getUserAvatarSrc(request?.request.createdById)} className={classNames.userPhoto} />

          <div className={classNames.titleWrapper}>
            <div className={classNames.titleAndAsinWrapper}>
              <Typography className={classNames.title}>{request?.request.title}</Typography>

              <div className={classNames.asinTitleWrapper}>
                <Typography className={classNames.asinText}>{t(TranslationKey.ASIN) + ':'}</Typography>
                {/* <Typography className={cx(classNames.asinText, classNames.asinTextBlue)}>
                  {request?.request.asin || t(TranslationKey.Missing)}
                </Typography> */}

                <AsinLink
                  asin={request?.request.asin}
                  linkSpanClass={classNames.linkSpan}
                  missingSpanClass={classNames.linkSpan}
                />
              </div>

              <div className={classNames.asinTitleWrapper}>
                <Typography className={classNames.asinText}>{t(TranslationKey.ID) + ':'}</Typography>
                <Typography className={cx(classNames.asinText, classNames.asinTextDark)}>
                  {request?.request.humanFriendlyId || t(TranslationKey.Missing)}
                </Typography>
              </div>
            </div>

            <Typography className={classNames.subTitle}>
              {translateProposalsLeftMessage(
                request?.request.maxAmountOfProposals -
                  (requestProposals?.filter(
                    el =>
                      el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CLIENT ||
                      el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST ||
                      el.proposal.status === RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
                  ).length || 0),
                request?.request.maxAmountOfProposals,
              )}
            </Typography>
          </div>
        </div>

        <div className={classNames.requestInfoWrapper}>
          <div className={classNames.blockInfoWrapper}>
            <div className={classNames.blockInfoCell}>
              <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey['Request price'])}</Typography>
              <Typography className={cx(classNames.price, classNames.blockInfoCellText)}>
                {toFixed(request?.request.price, 2) + '$'}
              </Typography>
            </div>

            <div className={classNames.blockInfoCell}>
              <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Status)}</Typography>
              <div className={classNames.blockInfoCellText}>
                {
                  <RequestStatusCell
                    status={request?.request.status}
                    styles={{
                      fontWeight: 600,
                      fontSize: 14,
                      lineHeight: '19px',
                      textAlign: 'left',
                      // width: `200px`,
                      // whiteSpace: 'pre',
                      // wordBreak: 'break-word',
                    }}
                  />
                }
              </div>
            </div>
          </div>

          {`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` ? (
            <div className={classNames.blockInfoWrapper}>
              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey['Product price'])}</Typography>
                <div className={classNames.pricesWrapper}>
                  {newProductPrice && (
                    <Typography className={cx(classNames.blockInfoCellText, {[classNames.newPrice]: newProductPrice})}>
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
              <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Time)}</Typography>
              <Typography className={classNames.blockInfoCellText}>
                {request && formatDateDistanceFromNowStrict(request?.request.timeoutAt, now)}
              </Typography>
            </div>

            <div className={classNames.blockInfoCell}>
              <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey['Task type'])}</Typography>
              <Typography className={cx(classNames.blockInfoCellText)}>
                {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[request?.request?.typeTask])}
              </Typography>
            </div>
          </div>

          <div className={cx(classNames.blockInfoWrapper, classNames.blockInfoWrapperLast)}>
            <div className={classNames.blockInfoCell}>
              <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Updated)}</Typography>
              <Typography className={classNames.blockInfoCellText}>
                {formatNormDateTime(request?.request.updatedAt)}
              </Typography>
            </div>

            <div className={classNames.blockInfoCell}>
              <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey['Performance time'])}</Typography>
              <Typography className={cx(classNames.blockInfoCellText)}>
                {formatNormDateTime(request?.request.timeoutAt)}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames.middleBlockWrapper}>
        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {t(TranslationKey.Total)}
          </Typography>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {requestProposals?.length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {t(TranslationKey.Submitted)}
          </Typography>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.CREATED).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {t(TranslationKey['In the work'])}
          </Typography>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED)
              .length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {t(TranslationKey['On refinement'])}
          </Typography>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.TO_CORRECT).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {t(TranslationKey['Waiting for checks'])}
          </Typography>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.READY_TO_VERIFY).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {t(TranslationKey.Accepted)}
          </Typography>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {requestProposals?.filter(
              el =>
                el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CLIENT ||
                el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST ||
                el.proposal.status === RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
            ).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {t(TranslationKey.Rejected)}
          </Typography>
          <Typography className={cx(classNames.standartText, {[classNames.standartTextGrey]: isDraft})}>
            {requestProposals?.filter(
              el =>
                el.proposal.status === RequestProposalStatus.CANCELED_BY_CREATOR_OF_REQUEST ||
                el.proposal.status === RequestProposalStatus.CANCELED_BY_SUPERVISOR ||
                el.proposal.status === RequestProposalStatus.CANCELED_BY_EXECUTOR,
            ).length || 0}
          </Typography>
        </div>
      </div>

      {request && request?.request.status === RequestStatus.DRAFT && (
        <div className={classNames.btnsBlockWrapper}>
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
        </div>
      )}

      {request && request?.request.status !== RequestStatus.DRAFT && (
        <div className={classNames.btnsBlockWrapper}>
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
        </div>
      )}
    </Paper>
  )
}
