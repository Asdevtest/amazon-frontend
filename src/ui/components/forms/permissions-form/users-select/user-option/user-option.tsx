import { Avatar, Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import Text from 'antd/es/typography/Text'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

interface UserOptionProps {
  user: BaseOptionType
}

export const UserOption: FC<UserOptionProps> = memo(({ user }) => {
  const avatar = getUserAvatarSrc(user?.value)

  return (
    <Space typeof="button">
      {user?.value ? <Avatar size={24} src={avatar} /> : null}
      <Text ellipsis style={{ width: '165px' }}>
        {user?.value ? user?.name : t(TranslationKey.Empty)}
      </Text>
    </Space>
  )
})
