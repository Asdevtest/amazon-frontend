/* eslint-disable no-unused-vars */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SearchIcon from '@mui/icons-material/Search'

import React, {useEffect, useState} from 'react'

import {Button, InputAdornment, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field'

import {t} from '@utils/translations'

import {styles} from './with-search-select.style'

const WithSearchSelectRaw = ({classes: classNames, data, fieldName, onClickSelect}) => {
  const [selectorIsOpen, setSelectorIsOpen] = useState(false)

  const [nameSearchValue, setNameSearchValue] = useState('')

  return (
    <div className={classNames.root}>
      <div className={classNames.chosenItem} onClick={() => setSelectorIsOpen(!selectorIsOpen)}>
        <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['All Products'])}</Typography>

        {selectorIsOpen ? <ArrowDropUpIcon color="primary" /> : <ArrowDropDownIcon color="primary" />}
      </div>

      <Field
        containerClasses={classNames.searchcontainer}
        inputClasses={classNames.searchInput}
        value={nameSearchValue}
        endAdornment={
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        }
        onChange={e => setNameSearchValue(e.target.value)}
      />
      <div className={classNames.itemsWrapper}>
        {data.map((el, index) => (
          <Button
            key={index}
            // className={clsx(classNames.button, {
            //   [classNames.selectedShopsBtn]: currentShop?._id === shop._id,
            // })}
            variant="text"
            color="primary"
            onClick={() => onClickSelect(el)}
          >
            {el[fieldName]}
          </Button>
        ))}
      </div>
    </div>
  )
}
export const WithSearchSelect = withStyles(styles)(WithSearchSelectRaw)
