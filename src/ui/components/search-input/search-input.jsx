/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment} from '@mui/material'

import React, {useEffect} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Input} from '@components/input'

import {t} from '@utils/translations'

import {useClassNames} from './search-input.style'

export const SearchInput = ({key, value, onChange, placeholder, inputClasses, onSubmit}) => {
  const {classes: classNames} = useClassNames()

  const onClickCloseIcon = () => {
    onChange({target: {value: ''}})
    onSubmit()
  }

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        onSubmit()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <Input
      key={key ? key : `${new Date()}`}
      className={cx(classNames.input, inputClasses)}
      value={value}
      placeholder={placeholder}
      endAdornment={
        <InputAdornment position={onSubmit ? 'end' : 'start'}>
          {onSubmit ? (
            <div className={classNames.searchWrapper}>
              {value ? <CloseRoundedIcon className={classNames.closeIcon} onClick={onClickCloseIcon} /> : null}
              <Button className={classNames.submit} onClick={onSubmit}>
                {t(TranslationKey.search)}
              </Button>
            </div>
          ) : (
            <SearchIcon className={classNames.icon} />
          )}
        </InputAdornment>
      }
      onChange={onChange}
    />
  )
}
