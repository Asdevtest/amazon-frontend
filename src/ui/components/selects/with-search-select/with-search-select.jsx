/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import {Button, ClickAwayListener, Popover, Tooltip, Typography, Checkbox} from '@mui/material'

import React, {useEffect, useState} from 'react'

import isEqual from 'lodash.isequal'
import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {ProductAsinCell, SelectProductAsinCellWithourTitle} from '@components/data-grid-cells/data-grid-cells'
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
    widthPopover,
    disabled,
    onClickNotChosen,
    placeholder,
    searchFields,
    CustomBtn,
    favourites,
    withoutSearch,
    onClickSetDestinationFavourite,
    checkbox,
    currentShops,
    searchOnlyFields,
    asinSelect,
    customSubMainWrapper,
    customSearchInput,
    grayBorder,
    blackSelectedItem,
    darkIcon,
    notCloseOneClick,
    chosenItemNoHover,
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
          data.slice().filter(
            el =>
              searchFields?.some(fieldName => el[fieldName]?.toLowerCase()?.includes(nameSearchValue?.toLowerCase())) ||
              searchOnlyFields?.some(fieldName => {
                if (Array.isArray(el[fieldName])) {
                  return el[fieldName][0]?.toLowerCase()?.includes(nameSearchValue?.toLowerCase())
                } else {
                  return el[fieldName]?.toLowerCase()?.includes(nameSearchValue?.toLowerCase())
                }
              }),
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
        <div
          className={cx(classNames.root, {
            [classNames.selectHeight]: asinSelect,
            [classNames.disableRoot]: disabled,
          })}
          style={width && {width}}
        >
          <div className={cx(classNames.mainWrapper, {[classNames.grayBorder]: grayBorder})}>
            <div
              className={cx(classNames.chosenItem, {
                [classNames.disabledChosenItem]: disabled,
                [classNames.chosenItemNoHover]: chosenItemNoHover,
              })}
              onClick={e => {
                e.stopPropagation()
                !disabled && handleClick(e)
              }}
            >
              <Typography
                className={cx(classNames.selectedItemName, {
                  [classNames.disabledSelectedItemName]: disabled,
                  [classNames.blackSelectedItem]: blackSelectedItem,
                })}
              >
                {selectedItemName}
              </Typography>

              {open ? (
                <ArrowDropUpIcon className={cx(classNames.icon, {[classNames.darkIcon]: darkIcon})} />
              ) : (
                <ArrowDropDownIcon className={cx(classNames.icon, {[classNames.darkIcon]: darkIcon})} />
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
              <div
                className={cx(classNames.subMainWrapper, customSubMainWrapper)}
                style={widthPopover && {width: widthPopover || width}}
              >
                {!withoutSearch ? (
                  <SearchInput
                    inputClasses={cx(classNames.searchInput, customSearchInput)}
                    value={nameSearchValue}
                    placeholder={placeholder ? placeholder : t(TranslationKey.search)}
                    onChange={e => setNameSearchValue(e.target.value)}
                  />
                ) : null}
                <div className={classNames.itemsWrapper}>
                  {onClickNotChosen && (
                    <Tooltip followCursor title={t(TranslationKey['Not chosen'])}>
                      <Button
                        className={classNames.button}
                        variant="text"
                        onClick={e => {
                          e.stopPropagation()

                          onClickNotChosen()
                          handleClose()
                        }}
                      >
                        {t(TranslationKey['Not chosen'])}
                      </Button>
                    </Tooltip>
                  )}

                  {firstItems}

                  {dataToRenderSortedByFavourites?.map((el, index) =>
                    CustomBtn ? (
                      <CustomBtn
                        key={index}
                        item={el}
                        onClick={e => {
                          e.stopPropagation()

                          onClickSelect(el)
                          handleClose()
                        }}
                      />
                    ) : (
                      <Button
                        key={index}
                        className={classNames.button}
                        variant="text"
                        onClick={e => {
                          e.stopPropagation()
                          onClickSelect(el)
                          if (!notCloseOneClick) {
                            handleClose()
                          }
                        }}
                      >
                        <div
                          className={cx(classNames.fieldNamesWrapper, {
                            [classNames.fieldNamesWrapperWithCheckbox]: checkbox,
                          })}
                        >
                          {searchFields?.map((fieldName, index) => (
                            <>
                              {checkbox && (
                                <Checkbox checked={currentShops?.some(shop => shop?._id === el?._id)} color="primary" />
                              )}
                              <Tooltip key={index} followCursor title={el[fieldName]}>
                                <Typography className={classNames.fieldName}>{el[fieldName]}</Typography>
                              </Tooltip>
                            </>
                          ))}

                          {asinSelect && <SelectProductAsinCellWithourTitle preventDefault product={el} />}

                          {favourites ? (
                            <StarOutlinedIcon
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
                            />
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
