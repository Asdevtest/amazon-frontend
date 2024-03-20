import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { SearchResult } from '@components/chat/search-result'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { useStyles } from './search-input-component.style'

interface SearchInputComponentProps {
  currentChatId: string
  searchInputValue: string
  foundMessages: ChatMessageContract[]
  curFoundedMessageIndex: number
  isTabletResolution: boolean
  onChangeMesSearchValue: (value: string, chatId: string) => void
  onChangeCurFoundedMessage: (index: number, messageId: string) => void
}

export const SearchInputComponent: FC<SearchInputComponentProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    currentChatId,
    searchInputValue,
    isTabletResolution,
    foundMessages,
    curFoundedMessageIndex,
    onChangeMesSearchValue,
    onChangeCurFoundedMessage,
  } = props

  const isShortInput = !!(isTabletResolution && searchInputValue)

  return (
    <div className={styles.searchMessageContainer}>
      <SearchInput
        tab={currentChatId}
        value={searchInputValue}
        inputClasses={cx(styles.searchInput, {
          [styles.searchInputShort]: isShortInput,
        })}
        placeholder={t(TranslationKey['Message Search'])}
        onSubmit={value => onChangeMesSearchValue(value, currentChatId)}
      />

      {foundMessages.length ? (
        <SearchResult
          curFoundedMessageIndex={curFoundedMessageIndex}
          messagesFound={foundMessages}
          onClose={() => onChangeMesSearchValue('', currentChatId)}
          onChangeCurFoundedMessage={onChangeCurFoundedMessage}
        />
      ) : searchInputValue ? (
        <p className={styles.searchResult}>{t(TranslationKey['Not found'])}</p>
      ) : null}
    </div>
  )
})
