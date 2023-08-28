import { cx } from '@emotion/css'
import { FC, useContext } from 'react'
import Linkify from 'react-linkify-always-blank'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreatedNewProposalProposalDescriptionContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { UserModel } from '@models/user-model'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesCarouselTest } from '@components/shared/photo-and-files-carousel-test'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useClassNames } from './chat-message-proposal.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

export interface ChatMessageProposalHandlers {
  onClickProposalAccept: (proposalId: string, price: number) => void
  onClickProposalRegect: (proposalId: string | undefined) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalProposalDescriptionContract>
  handlers: ChatMessageProposalHandlers
}

export const ChatMessageProposal: FC<Props> = ({ message, handlers }) => {
  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)
  const { classes: classNames } = useClassNames()

  const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <p className={classNames.headerText}>{message.data.title}</p>
        <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
      </div>
      <div className={classNames.mainWrapper}>
        <div className={classNames.mainInfoWrapper}>
          <div className={classNames.descriptionWrapper}>
            <Linkify>
              <p className={classNames.descriptionText}>{message.data.comment}</p>
            </Linkify>
          </div>

          <div className={classNames.leftSide}>
            <div className={classNames.labelValueBlockWrapper}>
              <LabelValuePairBlock
                label={t(TranslationKey['Time to complete'])}
                value={minsToTime(message.data.execution_time)}
                bgColor="green"
              />
            </div>
            <div className={classNames.labelValueBlockWrapper}>
              <LabelValuePairBlock
                label={t(TranslationKey['Total price'])}
                value={toFixedWithDollarSign(message.data.price, 2)}
                bgColor="green"
              />
            </div>
          </div>
        </div>
        <div className={classNames.rightSideWrapper}>
          <PhotoAndFilesCarouselTest files={message.images} customGap={20} customSlideHeight={80} />

          <div className={classNames.footerWrapper}>
            {curUserId === chatRequestAndRequestProposal.request?.request?.createdBy?._id &&
            (chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CREATED ||
              chatRequestAndRequestProposal.requestProposal?.proposal?.status === // этого условия не было
                RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
              chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
                RequestProposalStatus.OFFER_CONDITIONS_CORRECTED) ? (
              <div className={classNames.rightSide}>
                {chatRequestAndRequestProposal.requestProposal?.proposal?.status !==
                RequestProposalStatus.OFFER_CONDITIONS_REJECTED ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={cx(classNames.actionButton, classNames.cancelBtn)}
                    onClick={() =>
                      handlers.onClickProposalRegect(
                        chatRequestAndRequestProposal.requestProposal?.proposal
                          ._id /* handlers.onClickProposalRegect(message.data._id */,
                      )
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
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  )
}
