import { cx } from '@emotion/css'
import { FC } from 'react'

import { isMobileResolution } from '@constants/configs/sizes-settings'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreatedNewProposalRequestDescriptionContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTimeHourAndMinutes, formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './chat-message-request.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

type BlockType = {
  text: string
}

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalRequestDescriptionContract>
  isShowChatInfo?: boolean
}

export const ChatMessageRequest: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: classNames } = useClassNames()

  const jsonConditions = JSON.parse(message?.data?.details?.conditions)
  const conditions: string[] = jsonConditions.blocks.map((block: BlockType) => block.text)

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <p className={classNames.headerText}>{message.data?.title}</p>

        <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
      </div>

      <div className={cx(classNames.mainInfoWrapper, { [classNames.mainInfoWrapperShowChatInfo]: isShowChatInfo })}>
        <div className={classNames.descriptionWrapper}>
          {conditions?.map((condition, index) => (
            <p key={index} className={classNames.description}>
              {condition}
            </p>
          ))}

          {/* <TextareaAutosize
              disabled
              value={message?.data?.details?.conditions}
              className={classNames.conditionsField}
            /> */}
          {/* <CustomTextEditor
              readOnly
              conditions={message?.data?.details?.conditions}
              changeConditions={undefined}
              editorMaxHeight={undefined}
              verticalResize={undefined}
              textToCheck={undefined}
            /> */}
        </div>

        <PhotoAndFilesSlider
          smallSlider={!isMobileResolution}
          column={isShowChatInfo || isMobileResolution}
          files={message?.data.details?.linksToMediaFiles}
        />
      </div>

      <div className={cx(classNames.footerWrapper, { [classNames.footerWrapperShowChatInfo]: isShowChatInfo })}>
        <LabelValuePairBlock
          label={t(TranslationKey.Deadline)}
          value={formatNormDateTime(message.data?.timeoutAt)}
          bgColor="green"
          rootClasses={classNames.labelValueBlock}
        />
        <LabelValuePairBlock
          label={t(TranslationKey.Status)}
          value={MyRequestStatusTranslate(message.data?.status)}
          bgColor="green"
          rootClasses={classNames.labelValueBlock}
          valueStyle={{
            color: `${colorByStatus(message.data?.status)}`,
          }}
        />
        <LabelValuePairBlock
          label={t(TranslationKey['Total price'])}
          value={toFixedWithDollarSign(message.data?.price, 2)}
          bgColor="green"
          rootClasses={classNames.labelValueBlock}
        />
      </div>
    </div>
  )
}
