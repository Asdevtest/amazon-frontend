import { Empty } from 'antd'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { chatModel } from '@models/chat-model-new/chat-model'

import { t } from '@utils/translations'

export const EmptyChatMessages: FC = observer(() => {
  const message = !chatModel.selectedChatId
    ? 'Select a chat room to start messaging'
    : 'Looks like no one has chatted here yet. Send a message to get started!'

  return <Empty description={t(TranslationKey[message])} />
})
