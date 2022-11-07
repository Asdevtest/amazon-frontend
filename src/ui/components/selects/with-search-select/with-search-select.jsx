import {cx} from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {Button, ClickAwayListener, Popover, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {SearchInput} from '@components/search-input'

import {t} from '@utils/translations'

import {styles} from './with-search-select.style'

const WithSearchSelectRaw = ({
  classes: classNames,
  data,
  fieldName,
  onClickSelect,
  selectedItemName,
  firstItems,
  width,
  disabled,
  onClickNotChosen,
  placeholder,
}) => {
  const [nameSearchValue, setNameSearchValue] = useState('')

  const [dataToRender, setDataToRender] = useState(data)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    if (anchorEl) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  useEffect(() => {
    if (nameSearchValue) {
      setDataToRender(data.slice().filter(el => el[fieldName]?.toLowerCase().includes(nameSearchValue.toLowerCase())))
    } else {
      setDataToRender(data)
    }
  }, [nameSearchValue, data])

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClose}>
      <div className={cx(classNames.root, {[classNames.disableRoot]: disabled})} style={width && {width}}>
        <div className={classNames.mainWrapper}>
          <div
            className={cx(classNames.chosenItem, {[classNames.disabledChosenItem]: disabled})}
            onClick={e => !disabled && handleClick(e)}
          >
            <Typography className={classNames.selectedItemName}>{selectedItemName}</Typography>

            {open ? <ArrowDropUpIcon className={classNames.icon} /> : <ArrowDropDownIcon className={classNames.icon} />}
          </div>

          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            onClose={handleClose}
          >
            <div className={classNames.subMainWrapper}>
              <SearchInput
                inputClasses={classNames.searchInput}
                value={nameSearchValue}
                placeholder={placeholder ? placeholder : t(TranslationKey.search)}
                onChange={e => setNameSearchValue(e.target.value)}
              />
              <div className={classNames.itemsWrapper}>
                {onClickNotChosen && (
                  <Button
                    className={classNames.button}
                    variant="text"
                    color="primary"
                    onClick={() => {
                      onClickNotChosen()
                      handleClose()
                    }}
                  >
                    {t(TranslationKey['Not chosen'])}
                  </Button>
                )}

                {firstItems}

                {dataToRender.map((el, index) => (
                  <Button
                    key={index}
                    className={classNames.button}
                    variant="text"
                    color="primary"
                    onClick={() => {
                      onClickSelect(el)
                      handleClose()
                    }}
                  >
                    {el[fieldName]}
                  </Button>
                ))}
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </ClickAwayListener>
  )
}
export const WithSearchSelect = withStyles(WithSearchSelectRaw, styles)
