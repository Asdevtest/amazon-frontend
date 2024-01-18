import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataDesignerProposalResultEditedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { checkIsMediaFileLink } from '@utils/checks'
import { formatDateOnlyTime } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './chat-message-designer-proposal-edited-result.style'

export interface ChatMessageRequestProposalDesignerResultEditedHandlers {
  onClickOpenRequest: (
    media: {
      commentByClient: string | null
      commentByPerformer: string | null
      fileLink: string
      _id: string
    }[],
  ) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataDesignerProposalResultEditedContract>
  handlers: ChatMessageRequestProposalDesignerResultEditedHandlers
  isShowChatInfo?: boolean
}

export const ChatMessageDesignerProposalEditedResult: FC<Props> = ({ message, isShowChatInfo, handlers }) => {
  const { classes: styles, cx } = useStyles()
  const files = message.data.proposal.media.slice(0, 4).map(el => el.fileLink)

  return (
    <div className={styles.root}>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <p className={styles.headerText}>{t(TranslationKey.Result)}</p>

          <p className={styles.timeText}>{formatDateOnlyTime(message.createdAt)}</p>
        </div>

        <div className={cx(styles.infosWrapper, { [styles.infosWrapperIsShowChatInfo]: isShowChatInfo })}>
          <p className={styles.descriptionText}>{message.data.proposal?.details?.result}</p>

          <div className={cx(styles.imagesWrapper, { [styles.imagesWrapperIsShowChatInfo]: isShowChatInfo })}>
            {files.map((item, index) => (
              <div key={index} className={cx(styles.imageWrapper, { [styles.mainImageWrapper]: index === 0 })}>
                {index === 0 && <img src="/assets/icons/star-main.svg" className={styles.mainStarIcon} />}

                {index === 3 && message.data.proposal.media.length > 4 && (
                  <div className={styles.moreImagesWrapper}>{message.data.proposal.media.length - 4}</div>
                )}

                <img
                  src={checkIsMediaFileLink(item) ? getAmazonImageUrl(item) : '/assets/icons/file.png'}
                  alt={`Image ${index}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={cx(styles.footerWrapper, { [styles.footerWrapperIsShowChatInfo]: isShowChatInfo })}>
        <div className={cx(styles.fieldsContainer, { [styles.fieldsContainerIsShowChatInfo]: isShowChatInfo })}>
          <Field
            labelClasses={styles.fieldLabel}
            label={t(TranslationKey['Time to check'])}
            containerClasses={styles.containerField}
            inputComponent={<p className={styles.simpleSpan}>{minsToTime(1440)}</p>}
          />
          <Field
            labelClasses={styles.fieldLabel}
            label={t(TranslationKey['Number of illustrations'])}
            containerClasses={styles.containerField}
            inputComponent={<p className={styles.simpleSpan}>{message.data.proposal.media?.length}</p>}
          />
          <Field
            labelClasses={styles.fieldLabel}
            label={'ASIN'}
            containerClasses={styles.containerField}
            inputComponent={<AsinOrSkuLink withCopyValue link={message?.data?.request?.asin} />}
          />
        </div>

        <Button
          className={styles.actionButton}
          onClick={() => handlers.onClickOpenRequest(message.data.proposal.media)}
        >
          {t(TranslationKey['Open result'])}
        </Button>
      </div>
    </div>
  )
}
