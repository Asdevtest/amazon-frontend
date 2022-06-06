import React, {FC, useState} from 'react'

import {Grid} from '@material-ui/core'
import clsx from 'clsx'

import {ChatMessageDataCreatedNewProposalRequestDescriptionContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {BigImagesModal} from '@components/modals/big-images-modal'

import {formatNormDateTime} from '@utils/date-time'
import {toFixedWithDollarSign} from '@utils/text'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-request.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalRequestDescriptionContract>
}

export const ChatMessageRequest: FC<Props> = ({message}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [] as string[] | null | undefined, imgIndex: 0})
  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>{message.data?.title}</p>
        </div>
        <div className={classNames.timeWrapper}>
          <p className={classNames.timeText}>{formatNormDateTime(message.updatedAt)}</p>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        <div className={classNames.descriptionWrapper}>
          <p className={classNames.descriptionText}>{message.data.details.conditions}</p>
        </div>

        <Grid container className={classNames.filesWrapper}>
          {message?.data.details?.linksToMediaFiles?.map((file, fileIndex) => (
            <Grid key={fileIndex} item className={classNames.imageWrapper}>
              <img
                className={classNames.image}
                src={file}
                onClick={() => {
                  setShowImageModal(!showImageModal)
                  setBigImagesOptions({images: message.data.details.linksToMediaFiles, imgIndex: fileIndex})
                }}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classNames.footerWrapper}>
        <div className={classNames.footerRow}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock label="Сроки" value={formatNormDateTime(message.data?.timeoutAt)} bgColor="green" />
          </div>
          <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
            <LabelValuePairBlock label="Статус" value={message.data?.status} bgColor="green" />
          </div>

          <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
            <LabelValuePairBlock
              label="Стоимость"
              value={toFixedWithDollarSign(message.data?.price, 2)}
              bgColor="green"
            />
          </div>
        </div>
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
