import { Avatar, Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import Text from 'antd/es/typography/Text'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

interface UserOptionProps {
  data: BaseOptionType
}

export const UserOption: FC<UserOptionProps> = memo(({ data }) => {
  const avatar = getUserAvatarSrc(data?.value)

  return (
    <Space typeof="button">
      {data?.value ? <Avatar size={24} src={avatar} /> : null}
      <Text ellipsis style={{ width: '165px' }}>
        {data?.value ? data?.name : t(TranslationKey.Empty)}
      </Text>
    </Space>
  )
})
