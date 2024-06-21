import { FC } from 'react'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreatedNewProposalRequestDescriptionContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { formatDateTimeHourAndMinutes, formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

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

        <SlideshowGallery slidesToShow={2} files={message?.data.details?.linksToMediaFiles || []} />
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
