import React, {useState, FC, useContext} from 'react'

import {Grid} from '@material-ui/core'
import clsx from 'clsx'

import {RequestProposalStatus} from '@constants/request-proposal-status'

import {ChatMessageDataCreatedNewProposalProposalDescriptionContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {Button} from '@components/buttons/button'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {formatNormDateTime} from '@utils/date-time'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-proposal.style'

export interface ChatMessageProposalHandlers {
  onClickProposalAccept: (proposalId: string) => void
  onClickProposalRegect: (proposalId: string) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalProposalDescriptionContract>
  handlers: ChatMessageProposalHandlers
}

export const ChatMessageProposal: FC<Props> = ({message, handlers}) => {
  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [] as string[], imgIndex: 0})

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>ПРЕДЛОЖЕНИЕ</p>
        </div>
        <div className={classNames.timeWrapper}>
          <p className={classNames.timeText}>{formatNormDateTime(message.updatedAt)}</p>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        <div className={classNames.descriptionWrapper}>
          <p className={classNames.descriptionText}>{message.data.comment}</p>
        </div>
        <Grid container className={classNames.filesWrapper}>
          {message.images.map((file, fileIndex) => (
            <Grid key={fileIndex} item className={classNames.imageWrapper}>
              <img
                className={classNames.image}
                src={file}
                onClick={() => {
                  setShowImageModal(!showImageModal)
                  setBigImagesOptions({images: message.images, imgIndex: fileIndex})
                }}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classNames.footerWrapper}>
        <div className={classNames.leftSide}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock
              label="Время на выполнение"
              value={minsToTime(message.data.execution_time)}
              bgColor="green"
            />
          </div>
          <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
            <LabelValuePairBlock
              label="Стоимость"
              value={toFixedWithDollarSign(message.data.price, 2)}
              bgColor="green"
            />
          </div>
        </div>
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
                className={clsx(classNames.actionButton, classNames.cancelBtn)}
                onClick={() => handlers.onClickProposalRegect(message.data._id)}
              >
                Отклонить
              </Button>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              className={clsx(classNames.actionButton, classNames.successBtn)}
              onClick={() => handlers.onClickProposalAccept(message.data._id)}
            >
              {`Принять за $${message.data.price}`}
            </Button>
          </div>
        ) : undefined}
      </div>
      <BigImagesModal
        isAmazone
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  )
}
