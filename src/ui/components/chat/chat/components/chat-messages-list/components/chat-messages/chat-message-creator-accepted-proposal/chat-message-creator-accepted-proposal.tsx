import { FC } from 'react'

import { useStyles } from './chat-message-creator-accepted-proposal.style'

import { LabelValueDoubleBlock } from './label-value-double-block'

interface Props {}

export const ChatMessageCreatorAcceptedProposal: FC<Props> = () => {
  const { classes: styles, cx } = useStyles()
  return (
    <div className={styles.root}>
      <div className={styles.headerWrapper}>
        <div className={styles.avatarWrapper}></div>
        <div className={styles.headerTextWrapper}>
          <p className={styles.headerText}>ПРЕДЛОЖЕНИЕ ПРИНЯТО КЛИЕНТОМ</p>
        </div>
      </div>
      <div>
        <div className={styles.titleWrapper}>
          <p className={styles.titleText}>
            Название задачи надо писать вот тут и тут пишется полное название заявки точнее
          </p>
        </div>
        <div className={styles.descriptionWrapper}>
          <p className={styles.descriptionText}>
            Нужно организовать приток пользователей на сайт. С последующей регистрацией. Обо всем подробно в личные
            сообщения. Можем работать на постоянной основе.
          </p>
        </div>
      </div>
      <div className={styles.otherInfoWrapper}>
        <div>
          <LabelValueDoubleBlock
            bgColor="green"
            labelValueDouble={[
              { label: 'Статус', value: 'CREATED' },
              { label: 'Стоимость', value: '30$' },
            ]}
          />
        </div>
        <div className={cx(styles.labelValueDoubleBlockWrapperNotFirst)}>
          <LabelValueDoubleBlock
            bgColor="green"
            labelValueDouble={[
              { label: 'Время', value: '10 ч. 15 мин.' },
              { label: 'Срок', value: '24.01.22 12:00' },
            ]}
          />
        </div>
      </div>
      <div className={styles.filesAndLinksWrapper}>
        <div className={styles.files}></div>
        <div className={styles.links}></div>
      </div>
    </div>
  )
}
