import { memo } from 'react'
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { useStyles } from './chats-list.styles'

import { ChatItemList } from '../chat-item-list'

export const ChatsList = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.сhatsListWrapper}>
      <div className={styles.chatControls}>
        <CustomInputSearch placeholder="Search" wrapperClassName={styles.searchInput} />

        <CustomButton type="text" icon={<TbLayoutSidebarRightCollapse className={styles.collapseIcon} size={20} />} />
      </div>

      <ChatItemList />

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
