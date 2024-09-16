import { Tooltip } from 'antd'
import { FaRegImages } from 'react-icons/fa'
import { PiFilesLight } from 'react-icons/pi'
import { RiFolderVideoLine } from 'react-icons/ri'
import { TbUsersGroup } from 'react-icons/tb'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { TabValue } from './chat-into.type'

export const getCustomSwitcherConfig = (isGroupChat?: boolean) => {
  const config = [
    {
      label: (
        <Tooltip title={t(TranslationKey.Photos)}>
          <FaRegImages size="18" />
        </Tooltip>
      ),
      value: TabValue.PHOTOS,
    },
    {
      label: (
        <Tooltip title={t(TranslationKey.Videos)}>
          <RiFolderVideoLine size="18" />
        </Tooltip>
      ),
      value: TabValue.VIDEOS,
    },
    {
      label: (
        <Tooltip title={t(TranslationKey.Files)}>
          <PiFilesLight size="18" />
        </Tooltip>
      ),
      value: TabValue.FILES,
    },
  ]

  if (isGroupChat) {
    config.unshift({
      label: (
        <Tooltip title={t(TranslationKey.Members)}>
          <TbUsersGroup size="18" />
        </Tooltip>
      ),
      value: TabValue.GROUP_CHAT_USERS,
    })
  }

  return config
}
