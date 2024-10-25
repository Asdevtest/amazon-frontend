import { observer } from 'mobx-react'
import { FC } from 'react'
import { RiShareForwardFill } from 'react-icons/ri'
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles } from './chat-header.styles'

import { ChatInfoUser } from '../chat-info-user'
import { useChatHeader } from '../send-message-block/hooks/use-chat-header'

export const ChatHeader: FC = observer(() => {
  const { classes: styles } = useStyles()

  const {
    currentChat,
    selectedLength,
    isShowChatInfo,
    onClickForwardMessages,
    onClearSelectedMessages,
    onOpenCreateNewChat,
    onClickOpenChatInfo,
  } = useChatHeader()

  return (
    <div className={styles.chatInfoHeaderWrapper}>
      {currentChat ? (
        currentChat && !!selectedLength ? (
          <>
            <CustomButton size="large" icon={<RiShareForwardFill />} onClick={onClickForwardMessages}>{`${t(
              TranslationKey.Forward,
            )} ${selectedLength}`}</CustomButton>

            <CustomButton size="large" onClick={onClearSelectedMessages}>
              {t(TranslationKey.Cancel)}
            </CustomButton>
          </>
        ) : (
          <>
            <ChatInfoUser currentChat={currentChat} />

            <CustomInputSearch placeholder="Search" />

            <CustomButton
              type={isShowChatInfo ? 'primary' : 'text'}
              icon={<TbLayoutSidebarRightCollapse size={20} />}
              onClick={onClickOpenChatInfo}
            />
          </>
        )
      ) : (
        <CustomButton onClick={onOpenCreateNewChat}>{t(TranslationKey['New Dialog'])}</CustomButton>
      )}
    </div>
  )
})
