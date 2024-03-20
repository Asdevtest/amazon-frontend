import { FC } from 'react'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreatedNewProposalRequestDescriptionContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTimeHourAndMinutes, formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './chat-message-request.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

type BlockType = {
  text: string
}

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalRequestDescriptionContract>
  isShowChatInfo?: boolean
}

export const ChatMessageRequest: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: styles, cx } = useStyles()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  const jsonConditions = JSON.parse(message?.data?.details?.conditions)
  const conditions: string[] = jsonConditions.blocks.map((block: BlockType) => block.text)

  return (
    <div className={styles.root}>
      <div className={styles.headerAndTimeWrapper}>
        <p className={styles.headerText}>{message.data?.title}</p>

        <p className={styles.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
      </div>

      <div className={cx(styles.mainInfoWrapper, { [styles.mainInfoWrapperShowChatInfo]: isShowChatInfo })}>
        <div className={styles.descriptionWrapper}>
          {conditions?.map((condition, index) => (
            <p key={index} className={styles.description}>
              {condition}
            </p>
          ))}
        </div>

        <div className={cx(isMobileResolution && styles.photosWrapper)}>
          <PhotoAndFilesSlider
            smallSlider={!isMobileResolution}
            column={isShowChatInfo || isMobileResolution}
            files={message?.data.details?.linksToMediaFiles || []}
          />
        </div>
      </div>

      <div className={cx(styles.footerWrapper, { [styles.footerWrapperShowChatInfo]: isShowChatInfo })}>
        <LabelValuePairBlock
          label={t(TranslationKey.Deadline)}
          value={formatNormDateTime(message.data?.timeoutAt)}
          bgColor="green"
          rootClasses={styles.labelValueBlock}
        />
        <LabelValuePairBlock
          label={t(TranslationKey.Status)}
          value={MyRequestStatusTranslate(message.data?.status)}
          bgColor="green"
          rootClasses={styles.labelValueBlock}
          valueStyle={{
            color: `${colorByStatus(message.data?.status)}`,
          }}
        />
        <LabelValuePairBlock
          label={t(TranslationKey['Total price'])}
          value={toFixedWithDollarSign(message.data?.price, 2)}
          bgColor="green"
          rootClasses={styles.labelValueBlock}
        />
      </div>
    </div>
  )
}
