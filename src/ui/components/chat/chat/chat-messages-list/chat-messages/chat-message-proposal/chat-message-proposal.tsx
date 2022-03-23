import React, {FC} from 'react'

import clsx from 'clsx'

import {Button} from '@components/buttons/button'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-proposal.style'

interface Props {}

export const ChatMessageProposal: FC<Props> = () => {
  const classNames = useClassNames()
  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>ПРЕДЛОЖЕНИЕ</p>
        </div>
        <div className={classNames.timeWrapper}>
          <p className={classNames.timeText}>17:00</p>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>Сделаю за другую сумму</p>
        </div>
        <div className={classNames.descriptionWrapper}>
          <p className={classNames.descriptionText}>Добрый день! Готов выполнить задачу. Смогу справиться за 1 день!</p>
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        <div className={classNames.leftSide}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock label="Время на выполнение" value="24 часа" />
          </div>
          <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
            <LabelValuePairBlock label="Стоимость" value="30 $" />
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
