import React from 'react'

import {Typography, Paper, Avatar} from '@material-ui/core'

import {RequestProposalStatus} from '@constants/request-proposal-status'

// import {texts} from '@constants/texts'
import {Button} from '@components/buttons/button'

import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
// import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed, toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './servant-general-request-info.style'

// const textConsts = getLocalizedTexts(texts, 'en').productSearchRequestContent

export const ServantGeneralRequestInfo = ({request, onSubmit, requestProposals}) => {
  const classNames = useClassNames()

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.titleBlockWrapper}>
          <Avatar src={getUserAvatarSrc(request?.request.createdById)} className={classNames.userPhoto} />

          <div className={classNames.titleWrapper}>
            <Typography className={classNames.title}>{request?.request.title}</Typography>

            <Typography className={classNames.subTitle}>{`Осталось ${
              request?.request.maxAmountOfProposals -
              (requestProposals?.filter(
                el =>
                  el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CLIENT ||
                  el.proposal.status === RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
              ).length || 0)
            } из ${request?.request.maxAmountOfProposals} предложений`}</Typography>
          </div>
        </div>

        <div className={classNames.requestInfoWrapper}>
          <div className={classNames.blockInfoWrapper}>
            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{'Время'}</Typography>
              <Typography>{`${toFixed(request?.request.timeLimitInMinutes / 60, 2)} ч.`}</Typography>
            </div>

            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{'Статус'}</Typography>
              <Typography className={classNames.requestStatus}>{request?.request.status}</Typography>
            </div>
          </div>

          <div className={classNames.blockInfoWrapper}>
            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{'Срок'}</Typography>
              <Typography>{formatNormDateTime(request?.request.timeoutAt)}</Typography>
            </div>

            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{'Стоимость'}</Typography>
              <Typography>{toFixedWithDollarSign(request?.request.price, 2)}</Typography>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames.btnsBlockWrapper}>
        <Button variant="contained" color="primary" className={classNames.actionBtn} onClick={onSubmit}>
          {'Предложить сделку'}
        </Button>
      </div>
    </Paper>
  )
}
