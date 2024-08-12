import { Avatar, Popconfirm, Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import Text from 'antd/es/typography/Text'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { IChangeData } from '../performer-select.config'

interface PerformerOptionProps {
  data: BaseOptionType
  onChangeData: IChangeData
}

export const PerformerOption: FC<PerformerOptionProps> = memo(({ data, onChangeData }) => {
  const avatar = getUserAvatarSrc(data?.value)

  return (
    <Popconfirm
      arrow={false}
      title={t(TranslationKey['Are you sure you want to change performer?'])}
      okText={t(TranslationKey.Yes)}
      cancelText={t(TranslationKey.No)}
      onConfirm={() => onChangeData(data?.value)}
    >
      <Space>
        {data?.value ? <Avatar size={24} src={avatar} /> : null}
        <Text ellipsis style={{ width: '165px' }}>
          {data?.value ? data?.name : t(TranslationKey.Empty)}
        </Text>
      </Space>
    </Popconfirm>
  )
})
