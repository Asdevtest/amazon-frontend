import { FC, memo } from 'react'
import { IoClose } from 'react-icons/io5'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './chat-info-header.style'

interface ChatInfoHeaderProps {
  onClickCloseChatInfo: () => void
}

export const ChatInfoHeader: FC<ChatInfoHeaderProps> = memo(({ onClickCloseChatInfo }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.chatInfoTitle}>
      <p>{t(TranslationKey['Chat info'])}</p>

      <CustomButton type="text" icon={<IoClose size={20} />} onClick={onClickCloseChatInfo} />
    </div>
  )
})
