import { cx } from '@emotion/css'
import { ClassNamesArg } from '@emotion/react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment } from '@mui/material'

import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Input } from '@components/shared/input'

import { t } from '@utils/translations'

import { useClassNames } from './search-input.style'

interface Props {
  disabled?: boolean
  value?: string
  placeholder?: string
  startText?: string
  inputClasses?: ClassNamesArg
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
  onSubmit?: (value: string) => void
  onKeyDown?: VoidFunction
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
  const { classes: classNames } = useClassNames()

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
  }, [internalValue])

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
      className={cx(classNames.input, !!inputClasses && inputClasses)}
      value={onSubmit ? internalValue : value}
      placeholder={placeholder}
      classes={{ input: classNames.inputClass }}
      endAdornment={
        <InputAdornment classes={{ root: classNames.inputAdornmentRoot }} position={onSubmit ? 'end' : 'start'}>
          {onSubmit ? (
            <div className={classNames.searchWrapper}>
              {internalValue ? <CloseRoundedIcon className={classNames.closeIcon} onClick={onClickCloseIcon} /> : null}
              <Button
                className={classNames.submit}
                btnWrapperStyle={classNames.btnWrapperStyle}
                onClick={searchAndClearSpaces}
              >
                {t(TranslationKey.Search)}
              </Button>
            </div>
          ) : (
            <SearchIcon className={classNames.icon} />
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
