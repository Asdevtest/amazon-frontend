import { Dropdown } from 'antd'
import { FC, PropsWithChildren, memo, useMemo } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaRegCheckCircle } from 'react-icons/fa'
import { MdOutlineContentCopy, MdReply } from 'react-icons/md'
import { RiShareForwardFill } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

interface ChatMessageControlsOverlayProps extends PropsWithChildren {
  showDropdown: boolean
  isSelectedMessage?: boolean
  onSelectMessage?: () => void
  onClickReply?: () => void
  onClickForwardMessages?: () => void
  onClickCopyMessageText?: () => void
}

export const ChatMessageControlsOverlay: FC<ChatMessageControlsOverlayProps> = memo(props => {
  const {
    children,
    showDropdown,
    isSelectedMessage,
    onClickReply,
    onSelectMessage,
    onClickForwardMessages,
    onClickCopyMessageText,
  } = props

  if (!showDropdown) {
    return <>{children}</>
  }

  const items = useMemo(
    () => [
      {
        key: 'select',
        label: (
          <CustomButton
            icon={isSelectedMessage ? <AiOutlineCloseCircle /> : <FaRegCheckCircle />}
            onClick={onSelectMessage}
          >
            {isSelectedMessage ? t(TranslationKey.Deselect) : t(TranslationKey.Select)}
          </CustomButton>
        ),
      },
      {
        key: 'reply',
        label: (
          <CustomButton icon={<MdReply size={18} />} onClick={onClickReply}>
            {t(TranslationKey.Reply)}
          </CustomButton>
        ),
      },
      {
        key: 'forward',
        label: (
          <CustomButton
            icon={<RiShareForwardFill />}
            onClick={() => {
              onSelectMessage?.()
              onClickForwardMessages?.()
            }}
          >
            {t(TranslationKey.Forward)}
          </CustomButton>
        ),
      },
      {
        key: 'copy',
        label: (
          <CustomButton icon={<MdOutlineContentCopy size={18} />} onClick={onClickCopyMessageText}>
            {t(TranslationKey['Copy text'])}
          </CustomButton>
        ),
      },
    ],
    [isSelectedMessage],
  )

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      {children}
    </Dropdown>
  )
})
