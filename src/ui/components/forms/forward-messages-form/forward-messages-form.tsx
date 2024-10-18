import { FC, memo, useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { ChatItem } from '@views/shared/chat-view/components/chat-item'

import { getChatTitle } from '@utils/chat/get-chat-title'
import { t } from '@utils/translations'

import { useStyles } from './forward-messages-form.style'

interface ForwardMessagesFormProps {
  chats: Chat[]
  onClickChat: (chat: Chat) => void
  onCloseModal: () => void
}

export const ForwardMessagesForm: FC<ForwardMessagesFormProps> = memo(props => {
  const { chats, onClickChat, onCloseModal } = props
  const { classes: styles } = useStyles()

  const [nameSearchValue, setNameSearchValue] = useState<string>('')

  const renderData = useMemo(() => {
    return chats.filter(el => {
      if (!nameSearchValue) {
        return true
      }

      const title = getChatTitle(el)

      return title.toLocaleLowerCase().includes(nameSearchValue.toLocaleLowerCase())
    })
  }, [chats, nameSearchValue])

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Forward to'])}</p>

      <CustomInputSearch
        wrapperClassName={styles.inputSearch}
        value={nameSearchValue}
        placeholder="Title"
        onChange={event => setNameSearchValue(event.target.value)}
      />

      <div className={styles.chatList}>
        {renderData.map(chat => (
          <ChatItem key={chat._id} hideMessageBlock chat={chat} onClickChat={() => onClickChat(chat)} />
        ))}
      </div>

      <div className={styles.footer}>
        <CustomButton onClick={onCloseModal}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
