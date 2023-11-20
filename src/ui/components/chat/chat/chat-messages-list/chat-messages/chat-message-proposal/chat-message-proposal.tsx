import { cx } from '@emotion/css'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreatedNewProposalProposalDescriptionContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useClassNames } from './chat-message-proposal.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalProposalDescriptionContract>

  isShowChatInfo?: boolean
}

export const ChatMessageProposal: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: classNames } = useClassNames()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <p className={classNames.headerText}>{message.data.title}</p>
        <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
      </div>

      <div className={cx(classNames.mainWrapper, { [classNames.mainWrapperShowChatInfo]: isShowChatInfo })}>
        <div className={classNames.leftSideWrapper}>
          <p className={classNames.description}>{message.data.comment}</p>

          <div className={cx(classNames.leftSide, { [classNames.leftSideShowChatInfo]: isShowChatInfo })}>
            <LabelValuePairBlock
              label={t(TranslationKey['Time to complete'])}
              value={minsToTime(message.data.execution_time)}
              bgColor="green"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={t(TranslationKey['Total price'])}
              value={toFixedWithDollarSign(message.data.price, 2)}
              bgColor="green"
              rootClasses={classNames.labelValueBlock}
            />
          </div>
        </div>

        <div className={cx(classNames.rightSideWrapper, { [classNames.rightSideWrapperShowChatInfo]: isShowChatInfo })}>
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
