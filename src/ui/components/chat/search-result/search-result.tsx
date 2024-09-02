import { FC, memo } from 'react'
import { MdArrowDropDown, MdArrowDropUp, MdClose } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { t } from '@utils/translations'

import { useStyles } from './search-result.style'

interface SearchResultProps {
  curFoundedMessageIndex: number
  messagesFound: ChatMessageContract[]
  onClose: () => void
  onChangeCurFoundedMessage: (index: number, messageId: string) => void
}

export const SearchResult: FC<SearchResultProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { curFoundedMessageIndex, messagesFound, onClose, onChangeCurFoundedMessage } = props

  const onClickNavigateToMessage = (arg: number) => onChangeCurFoundedMessage(arg, messagesFound[arg]._id)

  return (
    <div className={styles.searchResultWrapper}>
      <p className={styles.searchResult}>
        {t(TranslationKey['Search results']) + ': ' + (curFoundedMessageIndex + 1) + ' / ' + messagesFound.length}
      </p>

      <div className={styles.dropUpOrDownWrapper}>
        <MdArrowDropUp
          size={24}
          className={cx(styles.searchIconBtn)}
          onClick={() =>
            curFoundedMessageIndex !== 0
              ? onClickNavigateToMessage(curFoundedMessageIndex - 1)
              : onClickNavigateToMessage(messagesFound.length - 1)
          }
        />

        <MdArrowDropDown
          size={24}
          className={cx(styles.searchIconBtn)}
          onClick={() =>
            curFoundedMessageIndex + 1 !== messagesFound.length
              ? onClickNavigateToMessage(curFoundedMessageIndex + 1)
              : onClickNavigateToMessage(0)
          }
        />
      </div>

      <MdClose size={24} className={styles.searchIconBtn} onClick={onClose} />
    </div>
  )
})
