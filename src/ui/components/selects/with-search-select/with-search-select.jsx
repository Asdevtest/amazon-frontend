import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SearchIcon from '@mui/icons-material/Search'

import React, {useEffect, useState} from 'react'

import {Button, ClickAwayListener, InputAdornment, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {Field} from '@components/field'

import {styles} from './with-search-select.style'

const WithSearchSelectRaw = ({classes: classNames, data, fieldName, onClickSelect, selectedItemName, firstItems}) => {
  const [selectorIsOpen, setSelectorIsOpen] = useState(false)

  const [nameSearchValue, setNameSearchValue] = useState('')

  const [dataToRender, setDataToRender] = useState(data)

  useEffect(() => {
    if (nameSearchValue) {
      setDataToRender(data.slice().filter(el => el[fieldName]?.toLowerCase().includes(nameSearchValue.toLowerCase())))
    } else {
      setDataToRender(data)
    }
  }, [nameSearchValue, data])

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={() => setSelectorIsOpen(false)}>
      <div className={classNames.root}>
        <div className={clsx(classNames.mainWrapper, {[classNames.selectorIsOpen]: selectorIsOpen})}>
          <div className={classNames.chosenItem} onClick={() => setSelectorIsOpen(!selectorIsOpen)}>
            <Typography className={classNames.selectedItemName}>{selectedItemName}</Typography>

            {selectorIsOpen ? <ArrowDropUpIcon color="primary" /> : <ArrowDropDownIcon color="primary" />}
          </div>

          <div className={classNames.subMainWrapper}>
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
              {firstItems}

              {dataToRender.map((el, index) => (
                <Button
                  key={index}
                  className={classNames.button}
                  variant="text"
                  color="primary"
                  onClick={() => onClickSelect(el)}
                >
                  {el[fieldName]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  )
}
export const WithSearchSelect = withStyles(styles)(WithSearchSelectRaw)
