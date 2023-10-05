import { cx } from '@emotion/css'
import { FC, useContext } from 'react'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataProposalResultEditedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { UserModel } from '@models/user-model'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useClassNames } from './chat-message-request-proposal-result-edited.style'

export interface ChatMessageRequestProposalResultEditedHandlers {
  onClickProposalResultToCorrect: (proposalId: string) => void
  onClickProposalResultAccept: (proposalId: string) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalResultEditedContract>
  handlers: ChatMessageRequestProposalResultEditedHandlers
  isShowChatInfo?: boolean
  isLastResultMessage?: boolean
}

export const ChatMessageRequestProposalResultEdited: FC<Props> = ({
  message,
  handlers,
  isShowChatInfo,
  isLastResultMessage,
}) => {
  const { classes: classNames } = useClassNames()
  const { isMobileResolution } = useCreateBreakpointResolutions()
  const proposal = message.data.proposal

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId
  const proposalStatus = chatRequestAndRequestProposal.requestProposal?.proposal?.status
  const isShowButtons =
    chatRequestAndRequestProposal &&
    (proposalStatus === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
      proposalStatus === RequestProposalStatus.READY_TO_VERIFY ||
      proposalStatus !== RequestProposalStatus.TO_CORRECT) &&
    proposalStatus !== RequestProposalStatus.ACCEPTED_BY_CLIENT &&
    proposalStatus !== RequestProposalStatus.CANCELED_BY_EXECUTOR &&
    curUserId &&
    isLastResultMessage &&
    message.data.needApproveBy?.includes(curUserId)
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

          {isShowButtons ? (
            <div className={cx(classNames.btnsWrapper, { [classNames.btnsWrapperShowChatInfo]: isShowChatInfo })}>
              {proposalStatus !== RequestProposalStatus.TO_CORRECT && (
                <Button
                  variant="contained"
                  color="primary"
                  btnWrapperStyle={cx(classNames.button, { [classNames.buttonShowChatInfo]: isShowChatInfo })}
                  className={cx(classNames.actionButton, classNames.editButton)}
                  onClick={() => handlers.onClickProposalResultToCorrect(proposal._id)}
                >
                  {t(TranslationKey['Send in for rework'])}
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                btnWrapperStyle={cx(classNames.button, { [classNames.buttonShowChatInfo]: isShowChatInfo })}
                className={cx(classNames.actionButton, classNames.successBtn)}
                onClick={() => handlers.onClickProposalResultAccept(proposal._id)}
              >
                {t(TranslationKey.Receive)}
              </Button>
            </div>
          ) : null}

          {/* {proposalStatus !== 'ACCEPTED_BY_CLIENT' && (
          <div className={classNames.btnEditWrapper}>
            <Button
              variant="contained"
              color="primary"

            >
              Редактировать
            </Button>
          </div>
        )} */}
        </div>
      </div>
    </div>
  )
}
