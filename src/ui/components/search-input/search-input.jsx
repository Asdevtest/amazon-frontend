/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment} from '@mui/material'

import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Input} from '@components/input'

import {t} from '@utils/translations'

import {useClassNames} from './search-input.style'

export const SearchInput = ({value, onChange, placeholder, inputClasses, onSubmit}) => {
  const {classes: classNames} = useClassNames()

  return (
    <Input
      className={cx(classNames.input, inputClasses)}
      value={value}
      placeholder={placeholder}
      endAdornment={
        <InputAdornment position={onSubmit ? 'end' : 'start'}>
          {onSubmit ? (
            <Button className={classNames.submit} onClick={onSubmit}>
              {t(TranslationKey.search)}
            </Button>
          ) : (
            <SearchIcon className={classNames.icon} />
          )}
        </InputAdornment>
      }
      onChange={onChange}
    />
  )
}
