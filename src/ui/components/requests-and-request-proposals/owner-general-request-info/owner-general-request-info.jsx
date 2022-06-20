import React from 'react'

import {Typography, Paper, Avatar} from '@material-ui/core'
import clsx from 'clsx'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {RequestStatus} from '@constants/request-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {MultilineRequestStatusCell} from '@components/data-grid-cells/data-grid-cells'

import {formatDateDistanceFromNowStrict, formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './owner-general-request-info.style'

export const OwnerGeneralRequestInfo = ({
  requestProposals,
  request,
  onClickPublishBtn,
  onClickEditBtn,
  onClickCancelBtn,
  onClickAbortBtn,
}) => {
  const classNames = useClassNames()
  console.log('requestProposals', requestProposals)
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

            <Typography className={classNames.subTitle}>{` ${
              request?.request.maxAmountOfProposals -
              (requestProposals?.filter(
                el =>
                  el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CLIENT ||
                  el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST ||
                  el.proposal.status === RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
              ).length || 0)
            } ${t(TranslationKey['out of'])} ${request?.request.maxAmountOfProposals} ${t(
              TranslationKey['suggestions left'],
            )}`}</Typography>
          </div>
        </div>

        <div className={classNames.requestInfoWrapper}>
          <div className={classNames.blockInfoWrapper}>
            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{t(TranslationKey.Time)}</Typography>
              <Typography>{request && formatDateDistanceFromNowStrict(request?.request.timeoutAt, now)}</Typography>
            </div>

            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{t(TranslationKey.Status)}</Typography>
              <Typography className={classNames.requestStatus}>
                {<MultilineRequestStatusCell status={request?.request.status} />}
              </Typography>
            </div>
          </div>

          <div className={classNames.blockInfoWrapper}>
            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{t(TranslationKey.Deadline)}</Typography>
              <Typography>{formatNormDateTime(request?.request.timeoutAt)}</Typography>
            </div>

            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{t(TranslationKey['Total price'])}</Typography>
              <Typography className={classNames.price}>{toFixedWithDollarSign(request?.request.price, 2)}</Typography>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames.middleBlockWrapper}>
        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{t(TranslationKey.Total)}</Typography>
          <Typography>{requestProposals?.length || 0}</Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{t(TranslationKey.Submitted)}</Typography>
          <Typography>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.CREATED).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{t(TranslationKey['In the work'])}</Typography>
          <Typography>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED)
              .length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{t(TranslationKey['On refinement'])}</Typography>
          <Typography>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.TO_CORRECT).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{t(TranslationKey['Waiting for checks'])}</Typography>
          <Typography>
            {requestProposals?.filter(el => el.proposal.status === RequestProposalStatus.READY_TO_VERIFY).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{t(TranslationKey.Accepted)}</Typography>
          <Typography>
            {requestProposals?.filter(
              el =>
                el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CLIENT ||
                el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST ||
                el.proposal.status === RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
            ).length || 0}
          </Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{t(TranslationKey.Rejected)}</Typography>
          <Typography>
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
                color="primary"
                btnWrapperStyle={classNames.buttonWrapperFullWidth}
                className={classNames.button}
                onClick={onClickEditBtn}
              >
                {t(TranslationKey.Edit)}
              </Button>
              <Button
                variant="contained"
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
                  variant="contained"
                  color="default"
                  btnWrapperStyle={classNames.buttonWrapperFullWidth}
                  className={[classNames.button, classNames.cancelBtn]}
                  onClick={onClickCancelBtn}
                >
                  {t(TranslationKey.Delete)}
                </Button>
              )}

              {request && request?.request.status === RequestStatus.PUBLISHED && (
                <Button
                  variant="contained"
                  color="primary"
                  btnWrapperStyle={classNames.buttonWrapperFullWidth}
                  className={clsx(classNames.button, {
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
                  variant="contained"
                  color="primary"
                  btnWrapperStyle={classNames.buttonWrapperFullWidth}
                  className={clsx(classNames.button, {
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
