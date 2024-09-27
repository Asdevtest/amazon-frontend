import { Avatar, Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import Text from 'antd/es/typography/Text'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { IChangeData } from '../users-selec.config'

interface UserOptionProps {
  user: BaseOptionType
  onChangeData?: IChangeData
}

export const UserOption: FC<UserOptionProps> = memo(({ user, onChangeData }) => {
  const avatar = getUserAvatarSrc(user?.value)

  return (
    <Space typeof="button" onClick={() => onChangeData?.(user?.value)}>
      {user?.value ? <Avatar size={24} src={avatar} /> : null}
      <Text ellipsis style={{ width: '165px' }}>
        {user?.value ? user?.name : t(TranslationKey.Empty)}
      </Text>
    </Space>
  )
})
