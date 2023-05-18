import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import { Typography } from '@mui/material'

import React, { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageRemovePatchInfoGroupChatContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { BigImagesModal } from '@components/modals/big-images-modal'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { useClassNames } from './chat-message-patch-info-group-chat.style'

interface Props {
  message: ChatMessageContract<ChatMessageRemovePatchInfoGroupChatContract>
}

export const ChatMessagePatchInfoGroupChat: FC<Props> = ({ message }) => {
  const { classes: classNames } = useClassNames()

  const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 } as {
    images: string[]
    imgIndex: number
  })
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const titleIsChanged = message.data.prevData?.title !== message.data.updatedData?.title
  const imageIsChanged = message.data.prevData?.image !== message.data.updatedData?.image
  return (
    <div className={classNames.root}>
      <div className={classNames.root}>
        <UserLink
          name={message.user?.name}
          userId={message.user?._id}
          blackText={undefined}
          withAvatar={undefined}
          maxNameWidth={undefined}
          customStyles={undefined}
          customClassNames={undefined}
        />

        <Typography className={classNames.groupText}>{t(TranslationKey['changed the chat info']) + ':'}</Typography>
      </div>

      <div>
        {titleIsChanged ? (
          <div className={classNames.changeTitleWrapper}>
            <Typography className={classNames.groupText}>{t(TranslationKey.Title)}</Typography>

            <Typography className={classNames.groupTitle}>{`"${message.data.prevData?.title}"`}</Typography>

            <ArrowRightAltOutlinedIcon className={classNames.changeIcon} />

            <Typography className={classNames.groupTitle}>{`"${message.data.updatedData?.title}"`}</Typography>
          </div>
        ) : null}

        {imageIsChanged ? (
          <div className={classNames.changeTitleWrapper}>
            <Typography className={classNames.groupText}>{t(TranslationKey.Image)}</Typography>

            <img
              className={classNames.groupImage}
              src={message.data.prevData?.image || '/assets/img/no-photo.jpg'}
              onClick={() => {
                setShowPhotosModal(!showPhotosModal)

                setBigImagesOptions({
                  images: [message.data.prevData?.image],
                  imgIndex: 0,
                })
              }}
            />

            <ArrowRightAltOutlinedIcon className={classNames.changeIcon} />

            <img
              className={classNames.groupImage}
              src={message.data.updatedData?.image}
              onClick={() => {
                setShowPhotosModal(!showPhotosModal)

                setBigImagesOptions({
                  images: [message.data.updatedData?.image],
                  imgIndex: 0,
                })
              }}
            />
          </div>
        ) : null}
      </div>

      <BigImagesModal
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
        setImageIndex={(imgIndex: number) => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
      />
    </div>
  )
}
