import { observer } from 'mobx-react'
import { FC } from 'react'
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb'

import { chatModel } from '@models/chat-model-new/chat-model'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { useStyles } from './chat-info-header.styles'

import { ChatInfoHeaderUser } from '../chat-info-header-user'

export const ChatInfoHeader: FC = observer(() => {
  const { classes: styles, cx } = useStyles()

  if (!chatModel.currentChat || !chatModel.selectedChatId) {
    return null
  }

  const currentChat = chatModel.currentChat

  return (
    <div className={styles.chatInfoHeaderWrapper}>
      <ChatInfoHeaderUser currentChat={currentChat} />

      <CustomInputSearch placeholder="Search" wrapperClassName={styles.searchInput} />

      <CustomButton type="text" icon={<TbLayoutSidebarRightCollapse className={styles.collapseIcon} size={20} />} />
    </div>
  )
})
