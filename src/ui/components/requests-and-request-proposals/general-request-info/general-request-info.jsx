import React from 'react'

import {Typography, Paper} from '@material-ui/core'

// import {texts} from '@constants/texts'
import {Button} from '@components/buttons/button'

import {formatNormDateTime} from '@utils/date-time'
// import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './general-request-info.style'

// const textConsts = getLocalizedTexts(texts, 'en').productSearchRequestContent

export const GeneralRequestInfo = ({request}) => {
  const classNames = useClassNames()

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.titleBlockWrapper}>
          <img src="/assets/img/no-photo.jpg" className={classNames.userPhoto} />

          <div className={classNames.titleWrapper}>
            <Typography className={classNames.title}>{request?.request.title}</Typography>

            <Typography className={classNames.subTitle}>{'Осталось 3 из 15 предложений'}</Typography>
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
              <Typography>{request?.request.status}</Typography>
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

      <div className={classNames.btnsBlockWrapper}>
        <div className={classNames.btnsWrapper}>
          <Button variant="outlined" color="danger" className={classNames.button}>
            {'Отменить'}
          </Button>

          <Button variant="outlined" color="primary" className={classNames.button}>
            {'Редактировать'}
          </Button>
        </div>

        <Button variant="contained" color="primary" className={classNames.stopBtn}>
          {'Остановить прием заявок'}
        </Button>
      </div>
    </Paper>
  )
}
