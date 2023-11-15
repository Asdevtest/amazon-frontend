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

import { useClassNames } from './chat-message-blogger-proposal-edited-result.style'

export interface ChatMessageRequestProposalResultEditedHandlers {
  onClickProposalResultToCorrect: (proposalId: string) => void
  onClickProposalResultAccept: (proposalId: string) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataBloggerProposalResultEditedContract>
  handlers: ChatMessageRequestProposalResultEditedHandlers
  isShowChatInfo?: boolean
}

export const ChatMessageBloggerProposalEditedResult: FC<Props> = ({ message, isShowChatInfo /* handlers */ }) => {
  const { classes: classNames, cx } = useClassNames()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  /* const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId
  const proposalStatus = chatRequestAndRequestProposal.requestProposal?.proposal?.status
  const isShowButtons =
    curUserId === chatRequestAndRequestProposal.request?.request?.createdBy?._id &&
    chatRequestAndRequestProposal &&
    (proposalStatus === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
      proposalStatus === RequestProposalStatus.READY_TO_VERIFY ||
      proposalStatus === RequestProposalStatus.CORRECTED) &&
    curUserId */
  const files = chatRequestAndRequestProposal.requestProposal?.proposal?.media.map(el => el.fileLink)
  const links = message.data.proposal.details.publicationLinks

  return (
    <div className={classNames.root}>
      <div className={classNames.header}>
        <p className={classNames.headerText}>{t(TranslationKey.Result)}</p>
        <p className={classNames.timeText}>{formatDateOnlyTime(message.createdAt)}</p>
      </div>

      <div className={classNames.mainWrapper}>
        <p className={classNames.descriptionText}>{message.data.proposal.details.result}</p>

        <div className={cx(classNames.infosWrapper, { [classNames.infosWrapperShowChatInfo]: isShowChatInfo })}>
          <PhotoAndFilesSlider
            smallSlider={!isMobileResolution}
            column={isShowChatInfo || isMobileResolution}
            files={files}
          />

          <div className={classNames.infosSubWrapper}>
            <div className={cx(classNames.fieldsRow, { [classNames.fieldsRowShowChatInfo]: isShowChatInfo })}>
              <Field
                labelClasses={classNames.fieldLabel}
                containerClasses={classNames.fieldContainer}
                label={'Amazon order ID'}
                inputComponent={
                  <div className={classNames.infoItemWrapper}>
                    <p className={classNames.infoItemText}>
                      {message.data.proposal.details.amazonOrderId || t(TranslationKey.Missing)}
                    </p>

                    {message.data.proposal.details.amazonOrderId && (
                      <CopyValue text={message.data.proposal.details.amazonOrderId} />
                    )}
                  </div>
                }
              />

              <Field
                labelClasses={classNames.fieldLabel}
                containerClasses={classNames.fieldContainer}
                label={t(TranslationKey['Time to check'])}
                inputComponent={
                  <p className={classNames.infoItem}>{`24 ${t(TranslationKey.hour)} 00 ${t(TranslationKey.minute)}`}</p>
                }
              />
            </div>

            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey['Link to publication'])}
              inputComponent={
                <>
                  {links.length ? (
                    <div className={classNames.infoItemList}>
                      {links.map((el, index) => (
                        <div key={index} className={classNames.infoItemWrapper}>
                          <a
                            href={checkAndMakeAbsoluteUrl(el)}
                            target="_blank"
                            rel="noreferrer"
                            className={classNames.infoItemText}
                          >
                            {el.slice(0, 80)}
                          </a>

                          <CopyValue text={el} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={classNames.infoItemWrapper}>
                      <p className={classNames.infoItemText}>{t(TranslationKey.Missing)}</p>
                    </div>
                  )}
                </>
              }
            />
          </div>
        </div>
      </div>

      {/* {isShowButtons ? (
        <div className={cx(classNames.btnsWrapper, { [classNames.btnsWrapperShowChatInfo]: isShowChatInfo })}>
          {proposalStatus !== RequestProposalStatus.TO_CORRECT && (
            <Button
              btnWrapperStyle={cx(classNames.button, { [classNames.buttonShowChatInfo]: isShowChatInfo })}
              className={cx(classNames.actionButton, classNames.editButton)}
              onClick={() => handlers.onClickProposalResultToCorrect(message.data.proposal._id)}
            >
              {t(TranslationKey['Send in for rework'])}
            </Button>
          )}
          <Button
            success
            btnWrapperStyle={classNames.button}
            className={cx(classNames.actionButton, classNames.successBtn)}
            onClick={() => handlers.onClickProposalResultAccept(message.data.proposal._id)}
          >
            {t(TranslationKey.Receive)}
          </Button>
        </div>
      ) : null} */}
    </div>
  )
}
