import { FC } from 'react'
import Linkify from 'react-linkify-always-blank'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreatedNewProposalRequestDescriptionContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { RequestStatusCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { PhotoAndFilesCarouselTest } from '@components/shared/photo-and-files-carousel-test'

import { formatDateTimeHourAndMinutes, formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './chat-message-request.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalRequestDescriptionContract>
}

export const ChatMessageRequest: FC<Props> = ({ message }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <p className={classNames.headerText}>{message.data?.title}</p>

        <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
      </div>
      <div className={classNames.mainInfoWrapper}>
        <div className={classNames.descriptionWrapper}>
          <Linkify>
            {/* <TextareaAutosize
              disabled
              value={message?.data?.details?.conditions}
              className={classNames.conditionsField}
            /> */}

            <CustomTextEditor
              readOnly
              conditions={message?.data?.details?.conditions}
              changeConditions={undefined}
              editorMaxHeight={undefined}
              verticalResize={undefined}
              textToCheck={undefined}
            />
          </Linkify>
        </div>
        <PhotoAndFilesCarouselTest
          files={message?.data.details?.linksToMediaFiles}
          customGap={20}
          customSlideHeight={80}
        />
      </div>
      <div className={classNames.footerWrapper}>
        <div className={classNames.footerRow}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock
              label={t(TranslationKey.Deadline)}
              value={formatNormDateTime(message.data?.timeoutAt)}
              bgColor="green"
            />
          </div>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock
              label={t(TranslationKey.Status)}
              value={<RequestStatusCell status={message.data?.status} />}
              bgColor="green"
            />
          </div>

          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock
              label={t(TranslationKey['Total price'])}
              value={toFixedWithDollarSign(message.data?.price, 2)}
              bgColor="green"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
