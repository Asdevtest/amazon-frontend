import React, {FC} from 'react'

import clsx from 'clsx'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {Button} from '@components/buttons/button'

import {formatNormDateTime} from '@utils/date-time'
import {toFixedWithDollarSign} from '@utils/text'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-proposal.style'

interface Props {
  message: ChatMessageContract
}

export const ChatMessageProposal: FC<Props> = ({message}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>ПРЕДЛОЖЕНИЕ</p>
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
        <div className={classNames.leftSide}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock
              label="Время на выполнение"
              value={`${(message.data?.execution_time || 0) / 60} часов`}
            />
          </div>
          <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
            <LabelValuePairBlock label="Стоимость" value={toFixedWithDollarSign(message.data?.price, 2)} />
          </div>
        </div>
        <div className={classNames.rightSide}>
          <Button variant="contained" color="primary" className={clsx(classNames.actionButton, classNames.successBtn)}>
            Отклонить
          </Button>
          <Button variant="contained" color="primary" className={clsx(classNames.actionButton, classNames.successBtn)}>
            Принять
          </Button>
        </div>
      </div>
    </div>
  )
}
