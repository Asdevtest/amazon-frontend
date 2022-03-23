import React, {FC} from 'react'

import clsx from 'clsx'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-request.style'

interface Props {}

export const ChatMessageRequest: FC<Props> = () => {
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
          <p className={classNames.descriptionText}>
            Нужно организовать приток пользователей на сайт. С последующей регистрацией. Обо всем подробно в личные
            сообщения. Можем работать на постоянной основе.
          </p>
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        <div className={classNames.footerRow}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock label="Сроки" value="24.01.22 12:00" bgColor="green" />
          </div>
          <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
            <LabelValuePairBlock label="Статус" value="Открыта" bgColor="green" />
          </div>
        </div>
        <div className={classNames.footerRow}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock label="Стоимость" value="30 $" bgColor="green" />
          </div>
        </div>
      </div>
    </div>
  )
}
