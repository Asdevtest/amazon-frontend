/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Typography, Paper, Avatar} from '@mui/material'

import React from 'react'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {RequestStatus} from '@constants/request-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'

import {formatDateDistanceFromNowStrict, formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixedWithDollarSign} from '@utils/text'
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

  const requestIsNotDraftAndPublished =
    !request?.request.status === RequestStatus.DRAFT || request?.request.status === RequestStatus.PUBLISHED

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.titleBlockWrapper}>
          <Avatar src={getUserAvatarSrc(request?.request.createdById)} className={classNames.userPhoto} />

          <div className={classNames.titleWrapper}>
            <Typography className={classNames.title}>{request?.request.title}</Typography>

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
            <div className={classNames.requestItemInfoWrapper}>
              <Typography className={classNames.standartText}>{t(TranslationKey.Time)}</Typography>
              <Typography className={classNames.standartText}>
                {request && formatDateDistanceFromNowStrict(request?.request.timeoutAt, now)}
              </Typography>
            </div>

            <div className={classNames.requestItemInfoWrapper}>
              <Typography className={classNames.standartText}>{t(TranslationKey.Status)}</Typography>
              <div className={classNames.requestStatus}>{<RequestStatusCell status={request?.request.status} />}</div>
            </div>
          </div>

          <div className={classNames.blockInfoWrapper}>
            <div className={classNames.requestItemInfoWrapper}>
              <Typography className={classNames.standartText}>{t(TranslationKey.Deadline)}</Typography>
              <Typography className={classNames.standartText}>
                {formatNormDateTime(request?.request.timeoutAt)}
              </Typography>
            </div>

            <div className={classNames.requestItemInfoWrapper}>
              <Typography className={classNames.standartText}>{t(TranslationKey['Total price'])}</Typography>
              <Typography className={classNames.price}>{toFixedWithDollarSign(request?.request.price, 2)}</Typography>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames.middleBlockWrapper}>
        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={classNames.standartText}>{t(TranslationKey.Total)}</Typography>
          <Typography className={classNames.standartText}>{requestProposals?.length || 0}</Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={classNames.standartText}>{t(TranslationKey.Submitted)}</Typography>
          <Typography className={classNames.standartText}>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.CREATED).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={classNames.standartText}>{t(TranslationKey['In the work'])}</Typography>
          <Typography className={classNames.standartText}>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED)
              .length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={classNames.standartText}>{t(TranslationKey['On refinement'])}</Typography>
          <Typography className={classNames.standartText}>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.TO_CORRECT).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={classNames.standartText}>{t(TranslationKey['Waiting for checks'])}</Typography>
          <Typography className={classNames.standartText}>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.READY_TO_VERIFY).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={classNames.standartText}>{t(TranslationKey.Accepted)}</Typography>
          <Typography className={classNames.standartText}>
            {requestProposals?.filter(
              el =>
                el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CLIENT ||
                el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST ||
                el.proposal.status === RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
            ).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography className={classNames.standartText}>{t(TranslationKey.Rejected)}</Typography>
          <Typography className={classNames.standartText}>
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
                tooltipInfoContent={t(TranslationKey['Allows you to change the selected request'])}
                color="primary"
                btnWrapperStyle={classNames.buttonWrapperFullWidth}
                className={classNames.button}
                onClick={onClickEditBtn}
              >
                {t(TranslationKey.Edit)}
              </Button>
              <Button
                tooltipInfoContent={t(TranslationKey['Delete the selected request'])}
                color="primary"
                btnWrapperStyle={classNames.buttonWrapperFullWidth}
                className={[classNames.button, classNames.cancelBtn]}
                onClick={onClickCancelBtn}
              >
                {t(TranslationKey.Delete)}
              </Button>
            </div>
            <div className={[classNames.btnsRow, classNames.btnsRowIsLast]}>
              <Button
                tooltipInfoContent={t(TranslationKey['Publish the selected request on the exchange'])}
                color="primary"
                btnWrapperStyle={classNames.buttonWrapperFullWidth}
                className={[classNames.button, classNames.successBtn]}
                onClick={onClickPublishBtn}
              >
                {t(TranslationKey.Publish)}
              </Button>
            </div>
          </div>
        </div>
      )}

      {request && request?.request.status !== RequestStatus.DRAFT && (
        <div className={classNames.btnsBlockWrapper}>
          <div className={classNames.btnsWrapper}>
            <div className={classNames.btnsRow}>
              {requestIsNotDraftAndPublished && (
                <Button
                  tooltipInfoContent={t(TranslationKey['Delete the selected request'])}
                  btnWrapperStyle={classNames.buttonWrapperFullWidth}
                  className={[classNames.button, classNames.cancelBtn]}
                  onClick={onClickCancelBtn}
                >
                  {t(TranslationKey.Delete)}
                </Button>
              )}

              {request && request?.request.status === RequestStatus.PUBLISHED && (
                <Button
                  tooltipInfoContent={t(TranslationKey['Allows you to change the selected request'])}
                  color="primary"
                  btnWrapperStyle={classNames.buttonWrapperFullWidth}
                  className={cx(classNames.button, {
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
