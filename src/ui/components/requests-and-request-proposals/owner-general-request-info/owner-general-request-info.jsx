import React from 'react'

import {Typography, Paper, Avatar} from '@material-ui/core'
import clsx from 'clsx'

import {RequestStatus} from '@constants/request-status'

// import {texts} from '@constants/texts'
import {Button} from '@components/buttons/button'

import {formatDateDistanceFromNowStrict, formatNormDateTime} from '@utils/date-time'
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

            <Typography className={classNames.subTitle}>{`Осталось ${0} из ${
              request?.request.maxAmountOfProposals
            } предложений`}</Typography>
          </div>
        </div>

        <div className={classNames.requestInfoWrapper}>
          <div className={classNames.blockInfoWrapper}>
            <div className={classNames.requestItemInfoWrapper}>
              <Typography>{'Время'}</Typography>
              <Typography>{request && formatDateDistanceFromNowStrict(request?.request.timeoutAt, now)}</Typography>
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
              <Typography className={classNames.price}>{toFixedWithDollarSign(request?.request.price, 2)}</Typography>
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
            <div className={classNames.btnsRow}>
              <Button
                color="primary"
                btnWrapperStyle={classNames.buttonWrapperFullWidth}
                className={classNames.button}
                onClick={onClickEditBtn}
              >
                {'Редактировать'}
              </Button>
              <Button
                variant="contained"
                color="primary"
                btnWrapperStyle={classNames.buttonWrapperFullWidth}
                className={[classNames.button, classNames.cancelBtn]}
                onClick={onClickCancelBtn}
              >
                {'Удалить'}
              </Button>
            </div>
            <div className={[classNames.btnsRow, classNames.btnsRowIsLast]}>
              <Button
                color="primary"
                btnWrapperStyle={classNames.buttonWrapperFullWidth}
                className={[classNames.button, classNames.successBtn]}
                onClick={onClickPublishBtn}
              >
                {'Опубликовать'}
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
                  variant="outlined"
                  color="danger"
                  btnWrapperStyle={classNames.buttonWrapperFullWidth}
                  className={classNames.button}
                  onClick={onClickCancelBtn}
                >
                  {'Удалить'}
                </Button>
              )}

              {request?.request.status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED && (
                <Button
                  variant="outlined"
                  color="primary"
                  btnWrapperStyle={classNames.buttonWrapperFullWidth}
                  className={clsx(classNames.button, {
                    [classNames.buttonEditRemoveBtnIsShown]: requestIsNotDraftAndPublished,
                  })}
                  onClick={onClickEditBtn}
                >
                  {'Редактировать'}
                </Button>
              )}
            </div>
          </div>

          {request?.request.status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED && (
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
                  ? 'Возобновить прием заявок'
                  : 'Остановить прием заявок'}
              </Button>
            </div>
          )}
        </div>
      )}
    </Paper>
  )
}
