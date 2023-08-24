import { cx } from '@emotion/css'
import { FC, useContext } from 'react'
import Linkify from 'react-linkify-always-blank'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataProposalResultEditedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { UserModel } from '@models/user-model'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesCarouselTest } from '@components/shared/photo-and-files-carousel-test'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useClassNames } from './chat-message-request-proposal-result-edited.style'

export interface ChatMessageRequestProposalResultEditedHandlers {
  onClickProposalResultToCorrect: (proposalId: string) => void
  onClickProposalResultAccept: (proposalId: string) => void
}

interface Props {
  isLastMessage: boolean
  message: ChatMessageContract<ChatMessageDataProposalResultEditedContract>
  handlers: ChatMessageRequestProposalResultEditedHandlers
}

export const ChatMessageRequestProposalResultEdited: FC<Props> = ({ message, isLastMessage, handlers }) => {
  const { classes: classNames } = useClassNames()
  const proposal = message.data.proposal

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <p className={classNames.headerText}>{t(TranslationKey.Result)}</p>

        <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
      </div>

      <Linkify>
        <p className={classNames.descriptionText}>{}</p>
      </Linkify>

      <Linkify>
        <p className={classNames.descriptionText}>{message.data.edited.result}</p>
      </Linkify>

      <div className={classNames.resultWrapper}>
        <PhotoAndFilesCarouselTest
          files={message.data?.edited?.media?.map(el => (typeof el === 'object' ? el.fileLink : el))}
          customGap={20}
          customSlideHeight={80}
        />

        <div className={classNames.timeToCheckBlockWrapper}>
          <p className={classNames.timeToCheckBlockLabelText}>{t(TranslationKey['Time to check'])}</p>
          <p className={classNames.timeToCheckBlockValueText}>{`24 ${t(TranslationKey.hour)} 00 ${t(
            TranslationKey.minute,
          )}`}</p>
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        {chatRequestAndRequestProposal &&
        (chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
          RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.READY_TO_VERIFY ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT) &&
        curUserId &&
        isLastMessage &&
        message.data.needApproveBy?.includes(curUserId) ? (
          <div className={classNames.btnsWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT && (
              <Button
                variant="contained"
                color="primary"
                className={cx(classNames.actionButton, classNames.editButton)}
                onClick={() => handlers.onClickProposalResultToCorrect(proposal._id)}
              >
                {t(TranslationKey['Send in for rework'])}
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              btnWrapperStyle={classNames.actionBtnWrapperStyleNotFirst}
              className={cx(classNames.actionButton, classNames.successBtn)}
              onClick={() => handlers.onClickProposalResultAccept(proposal._id)}
            >
              {t(TranslationKey.Receive)}
            </Button>
          </div>
        ) : undefined}

        {/* {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== 'ACCEPTED_BY_CLIENT' && (
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
  )
}
