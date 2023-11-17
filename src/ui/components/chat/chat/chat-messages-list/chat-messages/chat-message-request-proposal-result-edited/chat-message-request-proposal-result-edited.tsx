import { cx } from '@emotion/css'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataProposalResultEditedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { t } from '@utils/translations'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useClassNames } from './chat-message-request-proposal-result-edited.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalResultEditedContract>
  isShowChatInfo?: boolean
}

export const ChatMessageRequestProposalResultEdited: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: classNames } = useClassNames()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  const files = message.data?.edited?.media?.map(el => (typeof el === 'object' ? el.fileLink : el))

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <p className={classNames.headerText}>{t(TranslationKey.Result)}</p>

        <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
      </div>

      <p className={classNames.descriptionText}>{message.data.edited.result}</p>

      <div className={cx(classNames.resultWrapper, { [classNames.resultWrapperShowChatInfo]: isShowChatInfo })}>
        <PhotoAndFilesSlider
          smallSlider={!isMobileResolution}
          column={isShowChatInfo || isMobileResolution}
          files={files}
        />

        <div className={cx(classNames.infoWrapper, { [classNames.infoWrapperShowChatInfo]: isShowChatInfo })}>
          <Field
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.fieldContainer}
            label={t(TranslationKey['Time to check'])}
            inputComponent={
              <p className={classNames.infoItem}>{`24 ${t(TranslationKey.hour)} 00 ${t(TranslationKey.minute)}`}</p>
            }
          />
        </div>
      </div>
    </div>
  )
}
