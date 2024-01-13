import { ClassNamesArg } from '@emotion/react'
import { ChangeEvent, FC, useEffect, useState } from 'react'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Input } from '@components/shared/input'

import { t } from '@utils/translations'

import { useStyles } from './search-input.style'

interface Props {
  disabled?: boolean
  value?: string
  placeholder?: string
  startText?: string
  inputClasses?: ClassNamesArg
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
  onSubmit?: (value: string) => void
  onKeyDown?: () => void
}

export const SearchInput: FC<Props> = ({
  disabled,
  value,
  placeholder,
  inputClasses,
  startText,
  onChange,
  onSubmit,
  onKeyDown,
}) => {
  const { classes: styles, cx } = useStyles()

  const [isMyInputFocused, setIsMyInputFocused] = useState(false)

  const [internalValue, setInternalValue] = useState(startText ? startText : '')

  const onClickCloseIcon = () => {
    setInternalValue('')
    !!onSubmit && onSubmit('')
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (isMyInputFocused && onSubmit && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        event.preventDefault()
        onSubmit(internalValue)
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [internalValue, isMyInputFocused])

  const searchAndClearSpaces = () => {
    const valueWitchoutSpaces = internalValue.trim()

    if (onSubmit) {
      onSubmit(valueWitchoutSpaces)
      setInternalValue(valueWitchoutSpaces)
    }
  }

  return (
    <Input
      disabled={disabled}
      className={cx(styles.input, !!inputClasses && inputClasses)}
      value={onSubmit ? internalValue : value}
      title={placeholder}
      placeholder={placeholder}
      classes={{ input: styles.inputClass }}
      endAdornment={
        <InputAdornment classes={{ root: styles.inputAdornmentRoot }} position={onSubmit ? 'end' : 'start'}>
          {onSubmit ? (
            <div className={styles.searchWrapper}>
              {internalValue ? <CloseRoundedIcon className={styles.closeIcon} onClick={onClickCloseIcon} /> : null}
              <Button className={styles.submit} btnWrapperStyle={styles.btnWrapperStyle} onClick={searchAndClearSpaces}>
                {t(TranslationKey.Search)}
              </Button>
            </div>
          ) : (
            <SearchIcon className={styles.icon} />
          )}
        </InputAdornment>
      }
      onBlur={() => setIsMyInputFocused(false)}
      onFocus={() => setIsMyInputFocused(true)}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onSubmit ? setInternalValue(e.target.value) : !!onChange && onChange(e)
      }
      onKeyDown={onKeyDown}
    />
  )
}
