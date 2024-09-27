import { observer } from 'mobx-react'
import { useCallback } from 'react'
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { useStyles } from './chats-list.styles'

import { ChatItem } from '../chat-item'

export const ChatsList = observer(() => {
  const { classes: styles } = useStyles()

  const onClickChat = useCallback((chat: Chat) => {
    chatModel.onClickChat(chat)
  }, [])

  return (
    <div className={styles.сhatsListWrapper}>
      <div className={styles.chatControls}>
        <CustomInputSearch placeholder="Search" wrapperClassName={styles.searchInput} />

        <CustomButton type="text" icon={<TbLayoutSidebarLeftCollapse size={20} />} />
      </div>

      <div className={styles.chatsList}>
        {chatModel.chats?.map(chat => (
          <ChatItem key={chat._id} chat={chat} onClickChat={onClickChat} />
        ))}
      </div>

      <CustomRadioButton
        block
        size="large"
        options={[
          { label: 'Chats', value: 'chats' },
          { label: 'Groups', value: 'groups' },
        ]}
      />
    </div>
  )
})
