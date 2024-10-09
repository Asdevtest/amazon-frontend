import { observer } from 'mobx-react'
import { FC, useEffect } from 'react'
import { ImAttachment } from 'react-icons/im'
import { IoSend } from 'react-icons/io5'

import { CustomButton } from '@components/shared/custom-button'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { useStyles } from './send-message-block.style'

import { EmojiPickerBlock } from '../emoji-picker-block'

import { useSendMessageBlock } from './hooks/use-send-message-block'

export const SendMessageBlock: FC = observer(() => {
  const { classes: styles } = useStyles()

  const {
    disabledSubmit,

    message,
    onChangeMessage,
    onNewLine,

    showFilesLoader,
    onClickShowFilesLoader,

    files,
    onChangeFiles,

    onClickEmoji,

    onClickSendMessage,
  } = useSendMessageBlock()

  useEffect(() => {}, [])

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
          onPressEnter={e => {
            if (e.shiftKey) {
              e.preventDefault()
              onNewLine()
            } else {
              e.preventDefault()
              if (disabledSubmit) {
                return
              }
              onClickSendMessage()
            }
          }}
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
