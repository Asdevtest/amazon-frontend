import { observer } from 'mobx-react'
import { FC } from 'react'
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb'

import { TranslationKey } from '@constants/translations/translation-key'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles } from './chat-header.styles'

import { ChatInfoUser } from '../chat-info-user'

export const ChatHeader: FC = observer(() => {
  const { classes: styles } = useStyles()

  const currentChat = chatModel.currentChat as Chat

  return (
    <div className={styles.chatInfoHeaderWrapper}>
      {currentChat ? (
        <>
          <ChatInfoUser currentChat={currentChat} />

          <CustomInputSearch placeholder="Search" />

          <CustomButton type="text" icon={<TbLayoutSidebarRightCollapse size={20} />} />
        </>
      ) : (
        <CustomButton onClick={() => chatModel.onTriggerOpenModal('showCreateNewChatModal', true)}>
          {t(TranslationKey['New Dialog'])}
        </CustomButton>
      )}
    </div>
  )
})
