import React from 'react'

import {Typography, Paper, Avatar} from '@material-ui/core'
import clsx from 'clsx'

import {RequestStatus} from '@constants/request-status'

// import {texts} from '@constants/texts'
import {Button} from '@components/buttons/button'

import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
// import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './owner-general-request-info.style'

// const textConsts = getLocalizedTexts(texts, 'en').productSearchRequestContent

export const OwnerGeneralRequestInfo = ({
  request,
  onClickPublishBtn,
  onClickEditBtn,
  onClickCancelBtn,
  onClickAbortBtn,
}) => {
  const classNames = useClassNames()

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.titleBlockWrapper}>
          <Avatar src={getUserAvatarSrc(request?.request.createdById)} className={classNames.userPhoto} />

          <div className={classNames.titleWrapper}>
            <Typography className={classNames.title}>{request?.request.title}</Typography>

            <Typography className={classNames.subTitle}>{`Осталось ${0} из ${
              request?.request.maxAmountOfProposals
            } предложений`}</Typography>
          </div>
        </div>

        <div className={classNames.requestInfoWrapper}>
          <div className={classNames.blockInfoWrapper}>
            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{'Время'}</Typography>
              <Typography>{'11 ч. 55 мин.'}</Typography>
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

      <div className={classNames.middleBlockWrapper}>
        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{'Всего'}</Typography>
          <Typography>{'100'}</Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{'Подано'}</Typography>
          <Typography>{'0'}</Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{'В работе'}</Typography>
          <Typography>{'0'}</Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{'На доработке'}</Typography>
          <Typography>{'0'}</Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{'Ожидают проверки'}</Typography>
          <Typography>{'0'}</Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{'Принято'}</Typography>
          <Typography>{'0'}</Typography>
        </div>

        <div className={classNames.middleBlockItemInfoWrapper}>
          <Typography>{'Отклонено'}</Typography>
          <Typography>{'0'}</Typography>
        </div>
      </div>

      {request && request?.request.status === RequestStatus.DRAFT && (
        <div className={classNames.btnsBlockWrapper}>
          <div className={classNames.btnsWrapper}>
            <Button color="primary" className={classNames.button} onClick={onClickEditBtn}>
              {'Редактировать'}
            </Button>

            <Button color="primary" className={classNames.successBtn} onClick={onClickPublishBtn}>
              {'Опубликовать'}
            </Button>
          </div>
        </div>
      )}

      {request && request?.request.status !== RequestStatus.DRAFT && (
        <div className={classNames.btnsBlockWrapper}>
          <div className={classNames.btnsWrapper}>
            {request?.request.status === RequestStatus.DRAFT ||
              (request?.request.status === RequestStatus.PUBLISHED && (
                <Button variant="outlined" color="danger" className={classNames.button} onClick={onClickCancelBtn}>
                  {'Отменить'}
                </Button>
              ))}

            <Button variant="outlined" color="primary" className={classNames.button} onClick={onClickEditBtn}>
              {'Редактировать'}
            </Button>
          </div>

          {request?.request.status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED && (
            <Button
              variant="contained"
              color="primary"
              className={clsx({[classNames.stopBtn]: request?.request.status !== RequestStatus.FORBID_NEW_PROPOSALS})}
              onClick={request?.request.status !== 'FORBID_NEW_PROPOSALS' ? onClickAbortBtn : onClickPublishBtn}
            >
              {request?.request.status === RequestStatus.FORBID_NEW_PROPOSALS
                ? 'Возобновить прием заявок'
                : 'Остановить прием заявок'}
            </Button>
          )}
        </div>
      )}
    </Paper>
  )
}
