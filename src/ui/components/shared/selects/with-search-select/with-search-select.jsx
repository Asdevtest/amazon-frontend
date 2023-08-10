/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import isEqual from 'lodash.isequal'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { Button, Checkbox, ClickAwayListener, Popover, Tooltip, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectProductAsinCellWithourTitle } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { MasterUserItem } from '@components/shared/master-user-item'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { styles } from './with-search-select.style'

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
    isFlat,
    favourites,
    withoutSearch,
    onClickSetDestinationFavourite,
    checkbox,
    currentShops,
    searchOnlyFields,
    asinSelect,
    masterUserSelect,
    fieldNameStyles,
    buttonStyles,
    customItemsWrapper,
    fieldNamesWrapperStyles,
    customSubMainWrapper,
    customSearchInput,
    grayBorder,
    blackSelectedItem,
    darkIcon,
    notCloseOneClick,
    chosenItemNoHover,
    changeColorById,
    getRowValue,
    onClickSubmitBtn,
    isWithoutItemsTooltip,
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
          data.slice().filter(el => {
            if (isFlat) {
              return (getRowValue ? getRowValue(el) : el).toLowerCase().includes(nameSearchValue?.toLowerCase())
            }

            if (searchFields) {
              return searchFields.some(fieldName =>
                el[fieldName]?.toLowerCase()?.includes(nameSearchValue?.toLowerCase()),
              )
            }

            if (searchOnlyFields) {
              return searchOnlyFields?.some(fieldName => {
                if (Array.isArray(el[fieldName])) {
                  return el[fieldName][0]?.toLowerCase()?.includes(nameSearchValue?.toLowerCase())
                } else {
                  return el[fieldName]?.toLowerCase()?.includes(nameSearchValue?.toLowerCase())
                }
              })
            }
          }),
        )
      } else {
        setDataToRender(data)
      }
    }, [nameSearchValue, data])

    const dataToRenderSortedByFavourites = favourites
      ? dataToRender
          .slice()
          .sort(
            (a, b) =>
              favourites.findIndex(favouriteItem =>
                isEqual(favouriteItem, !isFlat ? searchFields.map(searchField => b[searchField]) : b),
              ) -
              favourites.findIndex(favouriteItem =>
                isEqual(favouriteItem, !isFlat ? searchFields.map(searchField => a[searchField]) : a),
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
          style={width && { width }}
        >
          <div className={cx(classNames.mainWrapper, { [classNames.grayBorder]: grayBorder })}>
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
                <ArrowDropUpIcon className={cx(classNames.icon, { [classNames.darkIcon]: darkIcon })} />
              ) : (
                <ArrowDropDownIcon className={cx(classNames.icon, { [classNames.darkIcon]: darkIcon })} />
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
                style={widthPopover && { width: widthPopover || width }}
              >
                {!withoutSearch ? (
                  <SearchInput
                    inputClasses={cx(classNames.searchInput, customSearchInput)}
                    value={nameSearchValue}
                    placeholder={placeholder ? placeholder : t(TranslationKey.Search)}
                    onChange={e => setNameSearchValue(e.target.value)}
                  />
                ) : null}
                <div className={cx(classNames.itemsWrapper, customItemsWrapper)}>
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
                        className={cx(classNames.button, buttonStyles)}
                        style={changeColorById && { color: changeColorById(el._id) }}
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
                          className={cx(classNames.fieldNamesWrapper, fieldNamesWrapperStyles, {
                            [classNames.fieldNamesWrapperWithCheckbox]: checkbox,
                          })}
                        >
                          {searchFields?.map((fieldName, index) => (
                            <React.Fragment key={index}>
                              {checkbox && (
                                <Checkbox checked={currentShops?.some(shop => shop?._id === el?._id)} color="primary" />
                              )}
                              {!isWithoutItemsTooltip ? (
                                <Tooltip followCursor title={getRowValue ? getRowValue(el) : el[fieldName]}>
                                  <Typography className={cx(classNames.fieldName, fieldNameStyles)}>
                                    {getRowValue ? getRowValue(el) : el[fieldName]}
                                  </Typography>
                                </Tooltip>
                              ) : (
                                <Typography className={cx(classNames.fieldName, fieldNameStyles)}>
                                  {getRowValue ? getRowValue(el) : el[fieldName]}
                                </Typography>
                              )}
                            </React.Fragment>
                          ))}

                          {isFlat && !searchFields?.length && (
                            <>
                              {checkbox && (
                                <Checkbox
                                  checked={
                                    isFlat
                                      ? currentShops.includes(el)
                                      : currentShops?.some(shop => shop?._id === el?._id)
                                  }
                                  color="primary"
                                />
                              )}
                              <Tooltip key={index} followCursor title={getRowValue ? getRowValue(el) : el}>
                                <Typography className={classNames.fieldName}>
                                  {getRowValue ? getRowValue(el) : el}
                                </Typography>
                              </Tooltip>
                            </>
                          )}

                          {asinSelect && <SelectProductAsinCellWithourTitle preventDefault product={el} />}

                          {masterUserSelect && <MasterUserItem id={el?._id} name={el?.name} rating={el?.rating} />}

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

                {onClickSubmitBtn && (
                  <div className={classNames.submitWrapper}>
                    <Button className={classNames.apply} variant="contained" onClick={onClickSubmitBtn}>
                      {t(TranslationKey.Apply)}
                    </Button>
                  </div>
                )}
              </div>
            </Popover>
          </div>
        </div>
      </ClickAwayListener>
    )
  },
)
export const WithSearchSelect = withStyles(WithSearchSelectRaw, styles)
