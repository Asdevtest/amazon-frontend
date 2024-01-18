import { FC, useState } from 'react'

import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageRemovePatchInfoGroupChatContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { ImageModal } from '@components/modals/image-modal/image-modal'
import { UserLink } from '@components/user/user-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './chat-message-patch-info-group-chat.style'

interface Props {
  message: ChatMessageContract<ChatMessageRemovePatchInfoGroupChatContract>
}

export const ChatMessagePatchInfoGroupChat: FC<Props> = ({ message }) => {
  const { classes: styles } = useStyles()

  const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 } as {
    images: string[]
    imgIndex: number
  })
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const titleIsChanged = message.data.prevData?.title !== message.data.updatedData?.title
  const imageIsChanged = message.data.prevData?.image !== message.data.updatedData?.image

  return (
    <div className={styles.root}>
      <div className={styles.root}>
        <UserLink name={message.user?.name} userId={message.user?._id} />

        <p className={styles.groupText}>{t(TranslationKey['changed the chat info']) + ':'}</p>
      </div>

      <div>
        {titleIsChanged ? (
          <div className={styles.changeTitleWrapper}>
            <p className={styles.groupText}>{t(TranslationKey.Title)}</p>

            <p className={styles.groupTitle}>{`"${message.data.prevData?.title}"`}</p>

            <ArrowRightAltOutlinedIcon className={styles.changeIcon} />

            <p className={styles.groupTitle}>{`"${message.data.updatedData?.title}"`}</p>
          </div>
        ) : null}

        {imageIsChanged ? (
          <div className={styles.changeTitleWrapper}>
            <p className={styles.groupText}>{t(TranslationKey.Image)}</p>

            <img
              className={styles.groupImage}
              src={getAmazonImageUrl(message.data.prevData?.image) || '/assets/img/no-photo.jpg'}
              onClick={() => {
                setShowPhotosModal(!showPhotosModal)

                setBigImagesOptions({
                  images: [message.data.prevData?.image],
                  imgIndex: 0,
                })
              }}
            />

            <ArrowRightAltOutlinedIcon className={styles.changeIcon} />

            <img
              className={styles.groupImage}
              src={getAmazonImageUrl(message.data.updatedData?.image)}
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

      {showPhotosModal && (
        <ImageModal
          files={bigImagesOptions.images}
          currentFileIndex={bigImagesOptions.imgIndex}
          isOpenModal={showPhotosModal}
          onOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          onCurrentFileIndex={index => setBigImagesOptions({ ...bigImagesOptions, imgIndex: index })}
        />
      )}
    </div>
  )
}
