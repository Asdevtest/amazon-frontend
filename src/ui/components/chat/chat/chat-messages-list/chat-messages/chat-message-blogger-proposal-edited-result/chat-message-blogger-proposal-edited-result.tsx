import { FC, useContext } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataBloggerProposalResultEditedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateOnlyTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './chat-message-blogger-proposal-edited-result.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataBloggerProposalResultEditedContract>
  isShowChatInfo?: boolean
}

export const ChatMessageBloggerProposalEditedResult: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: styles, cx } = useStyles()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const files = chatRequestAndRequestProposal.requestProposal?.proposal?.media.map(el => el.fileLink)
  const links = message.data.proposal.details.publicationLinks

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.headerText}>{t(TranslationKey.Result)}</p>
        <p className={styles.timeText}>{formatDateOnlyTime(message.createdAt)}</p>
      </div>

      <div className={styles.mainWrapper}>
        <p className={styles.descriptionText}>{message.data.proposal.details.result}</p>

        <div className={cx(styles.infosWrapper, { [styles.infosWrapperShowChatInfo]: isShowChatInfo })}>
          <PhotoAndFilesSlider
            smallSlider={!isMobileResolution}
            column={isShowChatInfo || isMobileResolution}
            files={files || []}
          />

          <div className={styles.infosSubWrapper}>
            <div className={cx(styles.fieldsRow, { [styles.fieldsRowShowChatInfo]: isShowChatInfo })}>
              <Field
                labelClasses={styles.fieldLabel}
                containerClasses={styles.fieldContainer}
                label={'Amazon order ID'}
                inputComponent={
                  <div className={styles.infoItemWrapper}>
                    <p className={styles.infoItemText}>
                      {message.data.proposal.details.amazonOrderId || t(TranslationKey.Missing)}
                    </p>

                    {message.data.proposal.details.amazonOrderId && (
                      <CopyValue text={message.data.proposal.details.amazonOrderId} />
                    )}
                  </div>
                }
              />

              <Field
                labelClasses={styles.fieldLabel}
                containerClasses={styles.fieldContainer}
                label={t(TranslationKey['Time to check'])}
                inputComponent={
                  <p className={styles.infoItem}>{`24 ${t(TranslationKey.hour)} 00 ${t(TranslationKey.minute)}`}</p>
                }
              />
            </div>

            <Field
              labelClasses={styles.fieldLabel}
              containerClasses={styles.fieldContainer}
              label={t(TranslationKey['Link to publication'])}
              inputComponent={
                <>
                  {links.length ? (
                    <div className={styles.infoItemList}>
                      {links.map((el, index) => (
                        <div key={index} className={styles.infoItemWrapper}>
                          <a
                            href={checkAndMakeAbsoluteUrl(el)}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.infoItemText}
                          >
                            {el.slice(0, 80)}
                          </a>

                          <CopyValue text={el} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.infoItemWrapper}>
                      <p className={styles.infoItemText}>{t(TranslationKey.Missing)}</p>
                    </div>
                  )}
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
