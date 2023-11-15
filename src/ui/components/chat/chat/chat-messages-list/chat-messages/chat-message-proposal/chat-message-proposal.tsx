import { cx } from '@emotion/css'
import { FC, useContext } from 'react'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreatedNewProposalProposalDescriptionContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { UserModel } from '@models/user-model'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useClassNames } from './chat-message-proposal.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

export interface ChatMessageProposalHandlers {
  onClickProposalAccept: (proposalId: string, price: number) => void
  onClickProposalRegect: (proposalId: string | undefined) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalProposalDescriptionContract>
  handlers: ChatMessageProposalHandlers
  isShowChatInfo?: boolean
}

export const ChatMessageProposal: FC<Props> = ({ message, handlers, isShowChatInfo }) => {
  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)
  const { classes: classNames } = useClassNames()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId
  const proporsalStatus = chatRequestAndRequestProposal.requestProposal?.proposal?.status
  const isShowButtonsBlock =
    curUserId === chatRequestAndRequestProposal.request?.request?.createdBy?._id &&
    (proporsalStatus === RequestProposalStatus.CREATED ||
      proporsalStatus === // этого условия не было
        RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
      proporsalStatus === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED)

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <p className={classNames.headerText}>{message.data.title}</p>
        <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
      </div>

      <div className={cx(classNames.mainWrapper, { [classNames.mainWrapperShowChatInfo]: isShowChatInfo })}>
        <div className={classNames.leftSideWrapper}>
          <p className={classNames.description}>{message.data.comment}</p>

          <div className={cx(classNames.leftSide, { [classNames.leftSideShowChatInfo]: isShowChatInfo })}>
            <LabelValuePairBlock
              label={t(TranslationKey['Time to complete'])}
              value={minsToTime(message.data.execution_time)}
              bgColor="green"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={t(TranslationKey['Total price'])}
              value={toFixedWithDollarSign(message.data.price, 2)}
              bgColor="green"
              rootClasses={classNames.labelValueBlock}
            />
          </div>
        </div>

        <div className={cx(classNames.rightSideWrapper, { [classNames.rightSideWrapperShowChatInfo]: isShowChatInfo })}>
          <PhotoAndFilesSlider
            smallSlider={!isMobileResolution}
            column={isShowChatInfo || isMobileResolution}
            files={message.images}
          />

          {isShowButtonsBlock ? (
            <div className={classNames.buttonsWrapper}>
              {proporsalStatus !== RequestProposalStatus.OFFER_CONDITIONS_REJECTED ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handlers.onClickProposalRegect(chatRequestAndRequestProposal.requestProposal?.proposal._id)
                  }
                >
                  {t(TranslationKey.Reject)}
                </Button>
              ) : null}
              <Button
                variant="contained"
                color="primary"
                className={cx(classNames.actionButton, classNames.successBtn)}
                onClick={() => handlers.onClickProposalAccept(message.data._id, message.data.price)}
              >
                {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(message.data.price, 2)}`}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
