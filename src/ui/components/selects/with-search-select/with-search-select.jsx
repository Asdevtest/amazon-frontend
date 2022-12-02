import {cx} from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {Button, ClickAwayListener, Popover, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import isEqual from 'lodash.isequal'
import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {SearchInput} from '@components/search-input'

import {t} from '@utils/translations'

import {styles} from './with-search-select.style'

const WithSearchSelectRaw = observer(
  ({
    classes: classNames,
    data,
    onClickSelect,
    selectedItemName,
    firstItems,
    width,
    disabled,
    onClickNotChosen,
    placeholder,
    searchFields,
    CustomBtn,
    favourites,
    onClickSetDestinationFavourite,
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
        setDataToRender(
          data
            .slice()
            .filter(el =>
              searchFields.some(fieldName => el[fieldName]?.toLowerCase().includes(nameSearchValue.toLowerCase())),
            ),
        )
      } else {
        setDataToRender(data)
      }
    }, [nameSearchValue, data])

    const dataToRenderSortedByFavourites = favourites
      ? dataToRender.slice().sort(
          (a, b) =>
            favourites.findIndex(favouriteItem =>
              isEqual(
                favouriteItem,
                searchFields.map(searchField => b[searchField]),
              ),
            ) -
            favourites.findIndex(favouriteItem =>
              isEqual(
                favouriteItem,
                searchFields.map(searchField => a[searchField]),
              ),
            ),
        )
      : dataToRender

    return (
      <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClose}>
        <div className={cx(classNames.root, {[classNames.disableRoot]: disabled})} style={width && {width}}>
          <div className={classNames.mainWrapper}>
            <div
              className={cx(classNames.chosenItem, {[classNames.disabledChosenItem]: disabled})}
              onClick={e => !disabled && handleClick(e)}
            >
              <Typography className={classNames.selectedItemName}>{selectedItemName}</Typography>

              {open ? (
                <ArrowDropUpIcon className={classNames.icon} />
              ) : (
                <ArrowDropDownIcon className={classNames.icon} />
              )}
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
              <div className={classNames.subMainWrapper} style={width && {width}}>
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
                      onClick={() => {
                        onClickNotChosen()
                        handleClose()
                      }}
                    >
                      {t(TranslationKey['Not chosen'])}
                    </Button>
                  )}

                  {firstItems}

                  {dataToRenderSortedByFavourites.map((el, index) =>
                    CustomBtn ? (
                      <CustomBtn
                        key={index}
                        item={el}
                        onClick={() => {
                          onClickSelect(el)
                          handleClose()
                        }}
                      />
                    ) : (
                      <Button
                        key={index}
                        className={classNames.button}
                        variant="text"
                        onClick={() => {
                          onClickSelect(el)
                          handleClose()
                        }}
                      >
                        <div className={classNames.fieldNamesWrapper}>
                          {searchFields.map((fieldName, index) => (
                            <Typography key={index} className={classNames.fieldName}>
                              {el[fieldName]}
                            </Typography>
                          ))}
                          {favourites ? (
                            <div
                              className={cx(classNames.setFavouriteBtn, {
                                [classNames.setFavouriteBtnIsSelected]: favourites.find(favouriteItem =>
                                  isEqual(
                                    favouriteItem,
                                    searchFields.map(searchField => el[searchField]),
                                  ),
                                ),
                              })}
                              onClick={e => {
                                onClickSetDestinationFavourite(searchFields.map(searchField => el[searchField]))
                                e.preventDefault()
                                e.stopPropagation()
                              }}
                            ></div>
                          ) : undefined}
                        </div>
                      </Button>
                    ),
                  )}
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </ClickAwayListener>
    )
  },
)
export const WithSearchSelect = withStyles(WithSearchSelectRaw, styles)
