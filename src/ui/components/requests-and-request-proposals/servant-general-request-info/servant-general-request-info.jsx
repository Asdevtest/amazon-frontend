import React from 'react'

import {Typography, Paper, Avatar} from '@material-ui/core'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {RequestStatus} from '@constants/request-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './servant-general-request-info.style'

export const ServantGeneralRequestInfo = ({request, onSubmit, requestProposals}) => {
  const classNames = useClassNames()

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.titleBlockWrapper}>
          <Avatar src={getUserAvatarSrc(request?.request.createdById)} className={classNames.userPhoto} />

          <div className={classNames.titleWrapper}>
            <Typography className={classNames.title}>{request?.request.title}</Typography>

            <Typography className={classNames.subTitle}>{`${
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
              <Typography>{minsToTime(request?.request.timeLimitInMinutes)}</Typography>
            </div>

            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{t(TranslationKey.Status)}</Typography>
              <Typography className={classNames.requestStatus}>{request?.request.status}</Typography>
            </div>
          </div>

          <div className={classNames.blockInfoWrapper}>
            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{t(TranslationKey.Deadline)}</Typography>
              <Typography>{formatNormDateTime(request?.request.timeoutAt)}</Typography>
            </div>

            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{t(TranslationKey['Total price'])}</Typography>
              <Typography>{toFixedWithDollarSign(request?.request.price, 2)}</Typography>
            </div>
          </div>
        </div>
      </div>

      {(request.request.status === RequestStatus.PUBLISHED || request.request.status === RequestStatus.IN_PROCESS) && (
        <div className={classNames.btnsBlockWrapper}>
          <Button variant="contained" color="primary" className={classNames.actionBtn} onClick={onSubmit}>
            {t(TranslationKey['Suggest a deal'])}
          </Button>
        </div>
      )}
    </Paper>
  )
}
