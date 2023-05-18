import { cx } from '@emotion/css'

import React, { FC } from 'react'

import { useClassNames } from './chat-message-creator-accepted-proposal.style'
import { LabelValueDoubleBlock } from './label-value-double-block'

interface Props {}

export const ChatMessageCreatorAcceptedProposal: FC<Props> = () => {
  const { classes: classNames } = useClassNames()
  return (
    <div className={classNames.root}>
      <div className={classNames.headerWrapper}>
        <div className={classNames.avatarWrapper}></div>
        <div className={classNames.headerTextWrapper}>
          <p className={classNames.headerText}>ПРЕДЛОЖЕНИЕ ПРИНЯТО КЛИЕНТОМ</p>
        </div>
      </div>
      <div>
        <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>
            Название задачи надо писать вот тут и тут пишется полное название заявки точнее
          </p>
        </div>
        <div className={classNames.descriptionWrapper}>
          <p className={classNames.descriptionText}>
            Нужно организовать приток пользователей на сайт. С последующей регистрацией. Обо всем подробно в личные
            сообщения. Можем работать на постоянной основе.
          </p>
        </div>
      </div>
      <div className={classNames.otherInfoWrapper}>
        <div>
          <LabelValueDoubleBlock
            bgColor="green"
            labelValueDouble={[
              { label: 'Статус', value: 'CREATED' },
              { label: 'Стоимость', value: '30$' },
            ]}
          />
        </div>
        <div className={cx(classNames.labelValueDoubleBlockWrapperNotFirst)}>
          <LabelValueDoubleBlock
            bgColor="green"
            labelValueDouble={[
              { label: 'Время', value: '10 ч. 15 мин.' },
              { label: 'Срок', value: '24.01.22 12:00' },
            ]}
          />
        </div>
      </div>
      <div className={classNames.filesAndLinksWrapper}>
        <div className={classNames.files}></div>
        <div className={classNames.links}></div>
      </div>
    </div>
  )
}
