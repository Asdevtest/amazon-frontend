import { Dropdown } from 'antd'
import { FC, PropsWithChildren, memo, useMemo } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { MdReply } from 'react-icons/md'
import { RiShareForwardFill } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './chat-message-controls-overlay.style'

interface ChatMessageControlsOverlayProps extends PropsWithChildren {
  showDropdown: boolean
  isSelectedMessage: boolean
  onSelectMessage: () => void
  onClickReply: () => void
}

export const ChatMessageControlsOverlay: FC<ChatMessageControlsOverlayProps> = memo(props => {
  const { showDropdown, onClickReply, children, isSelectedMessage, onSelectMessage } = props

  if (!showDropdown) {
    return <>{children}</>
  }

  const { classes: styles } = useStyles()

  const items = useMemo(
    () => [
      {
        key: 'select',
        label: (
          <CustomButton className={styles.button} icon={<FaRegCheckCircle />} onClick={onSelectMessage}>
            {isSelectedMessage ? t(TranslationKey.Deselect) : t(TranslationKey.Select)}
          </CustomButton>
        ),
      },
      {
        key: 'reply',
        label: (
          <CustomButton className={styles.button} icon={<MdReply />} onClick={onClickReply}>
            {t(TranslationKey.Reply)}
          </CustomButton>
        ),
      },
      {
        key: 'forward',
        label: (
          <CustomButton className={styles.button} icon={<RiShareForwardFill />} onClick={onClickReply}>
            {t(TranslationKey.Forward)}
          </CustomButton>
        ),
      },
    ],
    [],
  )

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      {children}
    </Dropdown>
  )
})
