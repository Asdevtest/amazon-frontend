import { Dropdown } from 'antd'
import { FC, PropsWithChildren, memo, useMemo } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaRegCheckCircle } from 'react-icons/fa'
import { MdOutlineContentCopy, MdReply } from 'react-icons/md'
import { RiShareForwardFill } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessage } from '@models/chat-model-new/types/message.type'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './chat-message-controls.style'

interface ChatMessageControlsOverlayProps extends PropsWithChildren {
  showDropdown: boolean
  message: ChatMessage
  isSelectedMessage?: boolean
  onSelectMessage?: (message: ChatMessage) => void
  onClickReply?: (message: ChatMessage) => void
  onClickForwardMessages?: (message: ChatMessage) => void
  onClickCopyMessageText?: (message: ChatMessage) => void
}

export const ChatMessageControls: FC<ChatMessageControlsOverlayProps> = memo(props => {
  const {
    message,
    children,
    showDropdown,
    isSelectedMessage,
    onClickReply,
    onSelectMessage,
    onClickForwardMessages,
    onClickCopyMessageText,
  } = props

  // if (!showDropdown) {
  //   return <>{children}</>
  // }

  const { classes: styles } = useStyles()

  const hoverMessage = useHover()

  const items = useMemo(
    () => [
      {
        key: 'select',
        label: (
          <CustomButton
            className={styles.button}
            icon={isSelectedMessage ? <AiOutlineCloseCircle /> : <FaRegCheckCircle />}
            onClick={() => onSelectMessage?.(message)}
          >
            {isSelectedMessage ? t(TranslationKey.Deselect) : t(TranslationKey.Select)}
          </CustomButton>
        ),
      },
      {
        key: 'reply',
        label: (
          <CustomButton className={styles.button} icon={<MdReply />} onClick={() => onClickReply?.(message)}>
            {t(TranslationKey.Reply)}
          </CustomButton>
        ),
      },
      {
        key: 'forward',
        label: (
          <CustomButton
            className={styles.button}
            icon={<RiShareForwardFill />}
            onClick={() => {
              onSelectMessage?.(message)
              onClickForwardMessages?.(message)
            }}
          >
            {t(TranslationKey.Forward)}
          </CustomButton>
        ),
      },
      {
        key: 'copy',
        label: (
          <CustomButton
            className={styles.button}
            icon={<MdOutlineContentCopy />}
            onClick={() => onClickCopyMessageText?.(message)}
          >
            {t(TranslationKey['Copy text'])}
          </CustomButton>
        ),
      },
    ],
    [isSelectedMessage],
  )

  console.log('items :>> ', items)

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div>{children}</div>
    </Dropdown>
  )
})
