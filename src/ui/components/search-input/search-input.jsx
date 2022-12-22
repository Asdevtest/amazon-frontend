import {cx} from '@emotion/css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Input} from '@components/input'

import {t} from '@utils/translations'

import {useClassNames} from './search-input.style'

export const SearchInput = ({value, onChange, placeholder, inputClasses, onSubmit, startText}) => {
  const {classes: classNames} = useClassNames()

  const [isMyInputFocused, setIsMyInputFocused] = useState(false)

  const [internalValue, setInternalValue] = useState(startText ? startText : '')

  const onClickCloseIcon = () => {
    setInternalValue('')
    onSubmit('')
  }

  useEffect(() => {
    const listener = event => {
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

    onSubmit ? onSubmit(valueWitchoutSpaces) : onSubmit()

    setInternalValue(valueWitchoutSpaces)
  }

  return (
    <Input
      className={cx(classNames.input, inputClasses)}
      value={onSubmit ? internalValue : value}
      placeholder={placeholder}
      endAdornment={
        <InputAdornment position={onSubmit ? 'end' : 'start'}>
          {onSubmit ? (
            <div className={classNames.searchWrapper}>
              {(onSubmit ? internalValue : value) ? (
                <CloseRoundedIcon className={classNames.closeIcon} onClick={onClickCloseIcon} />
              ) : null}
              <Button className={classNames.submit} onClick={searchAndClearSpaces}>
                {t(TranslationKey.search)}
              </Button>
            </div>
          ) : (
            <SearchIcon className={classNames.icon} />
          )}
        </InputAdornment>
      }
      onBlur={() => setIsMyInputFocused(false)}
      onFocus={() => setIsMyInputFocused(true)}
      onChange={e => (onSubmit ? setInternalValue(e.target.value) : onChange(e))}
    />
  )
}
