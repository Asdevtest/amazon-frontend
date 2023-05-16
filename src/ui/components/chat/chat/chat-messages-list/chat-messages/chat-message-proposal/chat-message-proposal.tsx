import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {FC, useContext} from 'react'

import Linkify from 'react-linkify-always-blank'

import {RequestProposalStatus} from '@constants/requests/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {ChatMessageDataCreatedNewProposalProposalDescriptionContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {Button} from '@components/shared/buttons/button'
import {PhotoAndFilesCarousel} from '@components/shared/custom-carousel/custom-carousel'

import {formatDateTimeHourAndMinutes} from '@utils/date-time'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-proposal.style'

export interface ChatMessageProposalHandlers {
  onClickProposalAccept: (proposalId: string, price: number) => void
  onClickProposalRegect: (proposalId: string | undefined) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalProposalDescriptionContract>
  handlers: ChatMessageProposalHandlers
}

export const ChatMessageProposal: FC<Props> = ({message, handlers}) => {
  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)
  const {classes: classNames} = useClassNames()
  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div>
          <Typography className={classNames.headerText}>{message.data.title}</Typography>
        </div>
        <div className={classNames.timeWrapper}>
          <Typography className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</Typography>
        </div>
      </div>
      <div className={classNames.mainWrapper}>
        <div className={classNames.mainInfoWrapper}>
          <div className={classNames.descriptionWrapper}>
            <Linkify>
              <Typography className={classNames.descriptionText}>{message.data.comment}</Typography>
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
          <div>
            <PhotoAndFilesCarousel
              notToShowEmpty
              small
              files={message.images}
              width="352px"
              withoutPhotos={undefined}
              whithoutFiles={undefined}
              imagesForLoad={undefined}
              isEditable={undefined}
              withoutMakeMainImage={undefined}
              onChangeImagesForLoad={undefined}
            />
          </div>

          <div className={classNames.footerWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CREATED ||
            chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
              RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
            chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
              RequestProposalStatus.OFFER_CONDITIONS_CORRECTED ? (
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
