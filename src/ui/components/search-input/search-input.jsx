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

export const SearchInput = ({value, onChange, placeholder, inputClasses, onSubmit}) => {
  const {classes: classNames} = useClassNames()

  const [internalValue, setInternalValue] = useState('')

  const onClickCloseIcon = () => {
    setInternalValue('')
    onSubmit('')
  }

  useEffect(() => {
    const listener = event => {
      if (onSubmit && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        event.preventDefault()
        onSubmit(internalValue)
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [internalValue])

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
              <Button className={classNames.submit} onClick={() => (onSubmit ? onSubmit(internalValue) : onSubmit())}>
                {t(TranslationKey.search)}
              </Button>
            </div>
          ) : (
            <SearchIcon className={classNames.icon} />
          )}
        </InputAdornment>
      }
      onChange={e => (onSubmit ? setInternalValue(e.target.value) : onChange(e))}
    />
  )
}
