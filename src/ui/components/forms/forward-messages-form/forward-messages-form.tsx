import { FC, memo, useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './forward-messages-form.style'

import { ChatItem } from './chat-item'
import { getChatTitle } from './helpers/get-chat-title'

interface ForwardMessagesFormProps {
  user: IFullUser
  chats: ChatContract[]
  onClickChat: (chat: ChatContract) => void
}

export const ForwardMessagesForm: FC<ForwardMessagesFormProps> = memo(props => {
  const { user, chats, onClickChat } = props
  const { classes: styles } = useStyles()

  const [nameSearchValue, setNameSearchValue] = useState<string>('')

  const renderData = useMemo(() => {
    return chats
      .filter(el => {
        if (!nameSearchValue) {
          return true
        }

        const title = getChatTitle(el, user)

        return title.toLocaleLowerCase().includes(nameSearchValue.toLocaleLowerCase())
      })
      .sort((a, b) => {
        if (a.type === 'SAVED' && b.type !== 'SAVED') {
          return -1
        } else if (a.type !== 'SAVED' && b.type === 'SAVED') {
          return 1
        } else {
          return 0
        }
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
          <ChatItem key={chat._id} chat={chat} user={user} onClickChat={() => onClickChat(chat)} />
        ))}
      </div>

      <div className={styles.footer}>
        <CustomButton>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
