import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreatedNewProposalProposalDescriptionContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './chat-message-proposal.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalProposalDescriptionContract>

  isShowChatInfo?: boolean
}

export const ChatMessageProposal: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: styles, cx } = useStyles()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  return (
    <div className={styles.root}>
      <div className={styles.headerAndTimeWrapper}>
        <p className={styles.headerText}>{message.data.title}</p>
        <p className={styles.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
      </div>

      <div className={cx(styles.mainWrapper, { [styles.mainWrapperShowChatInfo]: isShowChatInfo })}>
        <div className={styles.leftSideWrapper}>
          <p className={styles.description}>{message.data.comment}</p>

          <div className={cx(styles.leftSide, { [styles.leftSideShowChatInfo]: isShowChatInfo })}>
            <LabelValuePairBlock
              label={t(TranslationKey['Time to complete'])}
              value={minsToTime(message.data.execution_time)}
              bgColor="green"
              rootClasses={cx(styles.labelValueBlock, { [styles.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={t(TranslationKey['Total price'])}
              value={toFixedWithDollarSign(message.data.price, 2)}
              bgColor="green"
              rootClasses={styles.labelValueBlock}
            />
          </div>
        </div>

        <div className={cx(styles.rightSideWrapper, { [styles.rightSideWrapperShowChatInfo]: isShowChatInfo })}>
          <PhotoAndFilesSlider
            smallSlider={!isMobileResolution}
            column={isShowChatInfo || isMobileResolution}
            files={message.images}
          />
        </div>
      </div>
    </div>
  )
}
