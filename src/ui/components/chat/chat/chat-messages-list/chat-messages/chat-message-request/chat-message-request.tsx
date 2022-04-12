import React, {FC} from 'react'

import clsx from 'clsx'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {formatNormDateTime} from '@utils/date-time'
import {toFixedWithDollarSign} from '@utils/text'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-request.style'

interface Props {
  message: ChatMessageContract
}

export const ChatMessageRequest: FC<Props> = ({message}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>{message.data?.title}</p>
        </div>
        <div className={classNames.timeWrapper}>
          <p className={classNames.timeText}>{formatNormDateTime(message.updatedAt)}</p>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        {/* <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>Сделаю за другую сумму</p>
        </div> */}
        <div className={classNames.descriptionWrapper}>
          <p className={classNames.descriptionText}>{message.text}</p>
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        <div className={classNames.footerRow}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock label="Сроки" value={formatNormDateTime(message.data?.timeoutAt)} bgColor="green" />
          </div>
          <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
            <LabelValuePairBlock label="Статус" value={message.data?.status} bgColor="green" />
          </div>
        </div>
        <div className={classNames.footerRow}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock
              label="Стоимость"
              value={toFixedWithDollarSign(message.data?.price, 2)}
              bgColor="green"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
