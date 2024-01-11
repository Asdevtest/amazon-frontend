import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect } from 'react'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useClassNames } from './search-result.style'

export const SearchResult = observer(
  ({ curFoundedMessageIndex, messagesFound, onClose, onChangeCurFoundedMessage }) => {
    const { classes: classNames } = useClassNames()

    useEffect(() => {
      const listener = event => {
        if (event.code === 'ArrowUp' && curFoundedMessageIndex !== 0) {
          event.preventDefault()
          onChangeCurFoundedMessage(curFoundedMessageIndex - 1)
        } else if (event.code === 'ArrowDown' && curFoundedMessageIndex + 1 !== messagesFound.length) {
          event.preventDefault()
          onChangeCurFoundedMessage(curFoundedMessageIndex + 1)
        }
      }
      document.addEventListener('keydown', listener)
      return () => {
        document.removeEventListener('keydown', listener)
      }
    }, [curFoundedMessageIndex, messagesFound.length])

    return (
      <div className={classNames.searchResultWrapper}>
        <p className={classNames.searchResult}>
          {t(TranslationKey['Search results']) + ': ' + (curFoundedMessageIndex + 1) + ' / ' + messagesFound.length}
        </p>

        <div className={classNames.dropUpOrDownWrapper}>
          <ArrowDropUpIcon
            className={cx(classNames.searchIconBtn, {
              [classNames.searchDisabledIconBtn]: curFoundedMessageIndex === 0,
            })}
            onClick={() => curFoundedMessageIndex !== 0 && onChangeCurFoundedMessage(curFoundedMessageIndex - 1)}
          />

          <ArrowDropDownIcon
            className={cx(classNames.searchIconBtn, {
              [classNames.searchDisabledIconBtn]: curFoundedMessageIndex + 1 === messagesFound.length,
            })}
            onClick={() =>
              curFoundedMessageIndex + 1 !== messagesFound.length &&
              onChangeCurFoundedMessage(curFoundedMessageIndex + 1)
            }
          />
        </div>

        <CloseOutlinedIcon className={classNames.searchIconBtn} onClick={onClose} />
      </div>
    )
  },
)
