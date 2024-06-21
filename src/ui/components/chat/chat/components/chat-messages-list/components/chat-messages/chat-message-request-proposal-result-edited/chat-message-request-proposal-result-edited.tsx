import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataProposalResultEditedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { Field } from '@components/shared/field'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './chat-message-request-proposal-result-edited.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalResultEditedContract>
  isShowChatInfo?: boolean
}

export const ChatMessageRequestProposalResultEdited: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: styles, cx } = useStyles()

  const files = message.data?.edited?.media?.map(el => (typeof el === 'object' ? el.fileLink : el))

  return (
    <div className={styles.root}>
      <div className={styles.headerAndTimeWrapper}>
        <p className={styles.headerText}>{t(TranslationKey.Result)}</p>

        <p className={styles.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
      </div>

      <p className={styles.descriptionText}>{message.data.edited.result}</p>

      <div className={cx(styles.resultWrapper, { [styles.resultWrapperShowChatInfo]: isShowChatInfo })}>
        <SlideshowGallery slidesToShow={2} files={files || []} />

        <div className={cx(styles.infoWrapper, { [styles.infoWrapperShowChatInfo]: isShowChatInfo })}>
          <Field
            labelClasses={styles.fieldLabel}
            containerClasses={styles.fieldContainer}
            label={t(TranslationKey['Time to check'])}
            inputComponent={
              <p className={styles.infoItem}>{`24 ${t(TranslationKey.hour)} 00 ${t(TranslationKey.minute)}`}</p>
            }
          />
        </div>
      </div>
    </div>
  )
}
