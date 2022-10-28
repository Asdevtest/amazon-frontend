import {cx} from '@emotion/css'
import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment} from '@mui/material'

import React from 'react'

import {Input} from '@components/input'

import {useClassNames} from './search-input.style'

export const SearchInput = ({value, onChange, placeholder, inputClasses}) => {
  const {classes: classNames} = useClassNames()

  return (
    <Input
      className={cx(classNames.input, inputClasses)}
      value={value}
      placeholder={placeholder}
      endAdornment={
        <InputAdornment position="start">
          <SearchIcon color="primary" />
        </InputAdornment>
      }
      onChange={onChange}
    />
  )
}
