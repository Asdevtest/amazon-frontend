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

import { useStyles } from './chat-message-controls.style'

interface ChatMessageControlsOverlayProps extends PropsWithChildren {
  disableSelect: boolean
  message: ChatMessage
  alignRight: boolean
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
    disableSelect,
    isSelectedMessage,
    alignRight,
    onClickReply,
    onSelectMessage,
    onClickForwardMessages,
    onClickCopyMessageText,
  } = props

  const { classes: styles, cx } = useStyles()

  const items = useMemo(
    () => [
      {
        key: 'select',
        label: (
          <CustomButton
            withoutPropagation={false}
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
          <CustomButton
            withoutPropagation={false}
            className={styles.button}
            icon={<MdReply />}
            onClick={() => onClickReply?.(message)}
          >
            {t(TranslationKey.Reply)}
          </CustomButton>
        ),
      },
      {
        key: 'forward',
        label: (
          <CustomButton
            withoutPropagation={false}
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
            withoutPropagation={false}
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

  return (
    <Dropdown
      destroyPopupOnHide
      disabled={disableSelect}
      menu={{ items }}
      trigger={['contextMenu']}
      className={cx(styles.dropdown, { [styles.alignRight]: alignRight })}
    >
      <div>{children}</div>
    </Dropdown>
  )
})
