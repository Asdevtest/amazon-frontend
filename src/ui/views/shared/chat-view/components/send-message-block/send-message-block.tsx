import { id } from 'date-fns/locale'
import { observer } from 'mobx-react'
import { FC, memo } from 'react'
import { ImAttachment } from 'react-icons/im'
import { IoSend } from 'react-icons/io5'

import { chatModel } from '@models/chat-model-new/chat-model'
import { UserModel } from '@models/user-model'

import { CustomButton } from '@components/shared/custom-button'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './send-message-block.style'

import { EmojiPickerBlock } from '../emoji-picker-block'

import { useSendMessageBlock } from './hooks/use-send-message-block'

export const SendMessageBlock: FC = observer(() => {
  const { classes: styles } = useStyles()

  const {
    disabledSubmit,

    message,
    onChangeMessage,

    showFilesLoader,
    onClickShowFilesLoader,

    files,
    onChangeFiles,

    onClickEmoji,
  } = useSendMessageBlock()

  const onClickSendMessage = () => {
    chatModel.sendMessage({
      chatId: chatModel.selectedChatId,
      // crmItemId: null,
      text: message,
      files,
      // replyMessageId: '',
      // forwardedMessageId: '',
      user: {
        name: UserModel.userInfo.name,
        _id: UserModel.userInfo._id,
      },
    })
  }

  return (
    <div className={styles.sendMessageBlock}>
      {showFilesLoader ? (
        <div className={styles.filesLoaderWrapper}>
          <UploadFilesInput withoutLinks images={files} setImages={onChangeFiles} />
        </div>
      ) : null}

      <div className={styles.messageBlock}>
        <CustomButton
          type={showFilesLoader ? 'primary' : 'text'}
          icon={<ImAttachment size={20} />}
          onClick={onClickShowFilesLoader}
        />

        <CustomTextarea
          value={message}
          placeholder="Write a message"
          className={styles.messageTextarea}
          autoSize={{ minRows: 1, maxRows: 8 }}
          onChange={event => onChangeMessage(event.target.value)}
        />

        <EmojiPickerBlock onClickEmoji={onClickEmoji} />

        <CustomButton
          type={disabledSubmit ? 'text' : 'primary'}
          disabled={disabledSubmit}
          icon={<IoSend size={20} />}
          onClick={onClickSendMessage}
        />
      </div>
    </div>
  )
})
