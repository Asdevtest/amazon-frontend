import isEqual from 'lodash.isequal'
import { Fragment, memo, useEffect, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { Checkbox, ClickAwayListener, Popover, Tooltip, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { MasterUserItem } from '@components/shared/master-user-item'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './with-search-select.style'

export const WithSearchSelect = memo(
  ({
    isCloseAfterClickSubmit,
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
    CustomButton,
    isFlat,
    favourites,
    withoutSearch,
    onClickSetDestinationFavourite,
    checkbox,
    currentShops,
    searchOnlyFields,
    asinSelect,
    selectedData,
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
    onScrollItemList,
    onClickSubmitSearch,
  }) => {
    const { classes: styles, cx } = useStyles()

    const [nameSearchValue, setNameSearchValue] = useState('')
    const [dataToRender, setDataToRender] = useState(data)
    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)

    const dataToRenderSortedByFavourites = favourites
      ? dataToRender
          ?.slice()
          ?.sort(
            (a, b) =>
              favourites?.findIndex(favouriteItem =>
                isEqual(favouriteItem, !isFlat ? searchFields.map(searchField => b[searchField]) : b),
              ) -
              favourites?.findIndex(favouriteItem =>
                isEqual(favouriteItem, !isFlat ? searchFields.map(searchField => a[searchField]) : a),
              ),
          )
      : dataToRender

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

    useEffect(() => {
      if (nameSearchValue) {
        setDataToRender(
          data?.filter(el => {
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

    return (
      <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClose}>
        <div
          className={cx(styles.root, {
            [styles.selectHeight]: asinSelect,
            [styles.disableRoot]: disabled,
          })}
          style={width && { width }}
        >
          <div className={cx(styles.mainWrapper, { [styles.grayBorder]: grayBorder })}>
            <div
              className={cx(styles.chosenItem, {
                [styles.disabledChosenItem]: disabled,
                [styles.chosenItemNoHover]: chosenItemNoHover,
              })}
              onClick={e => {
                e.stopPropagation()
                !disabled && handleClick(e)
              }}
            >
              <Typography
                className={cx(styles.selectedItemName, {
                  [styles.disabledSelectedItemName]: disabled,
                  [styles.blackSelectedItem]: blackSelectedItem,
                })}
              >
                {selectedItemName}
              </Typography>

              {open ? (
                <ArrowDropUpIcon className={cx(styles.icon, { [styles.darkIcon]: darkIcon })} />
              ) : (
                <ArrowDropDownIcon className={cx(styles.icon, { [styles.darkIcon]: darkIcon })} />
              )}
            </div>

            <Popover
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              onClose={() => {
                handleClose()
                onClickSubmitSearch ? onClickSubmitSearch('') : undefined
              }}
            >
              <div
                className={cx(styles.subMainWrapper, customSubMainWrapper)}
                style={widthPopover && { width: widthPopover || width }}
              >
                {!withoutSearch && (
                  <SearchInput
                    inputClasses={cx(styles.searchInput, customSearchInput)}
                    value={nameSearchValue}
                    placeholder={placeholder ? placeholder : t(TranslationKey.Search)}
                    onSubmit={onClickSubmitSearch ? onClickSubmitSearch : undefined}
                    onChange={onClickSubmitSearch ? undefined : e => setNameSearchValue(e.target.value)}
                  />
                )}
                <div
                  className={cx(styles.itemsWrapper, customItemsWrapper)}
                  onScroll={e => {
                    if (onScrollItemList) {
                      const element = e.target
                      const scrollTop = element?.scrollTop
                      const containerHeight = element?.clientHeight
                      const contentHeight = element?.scrollHeight

                      if (contentHeight - (scrollTop + containerHeight) < 200) {
                        onScrollItemList()
                      }
                    }
                  }}
                >
                  {onClickNotChosen && (
                    <Tooltip followCursor title={t(TranslationKey['Not chosen'])}>
                      <Button
                        className={styles.button}
                        styleType={ButtonStyle.TRANSPARENT}
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
                    CustomButton ? (
                      <CustomButton
                        key={index}
                        data={el}
                        checkbox={checkbox}
                        checkboxChecked={selectedData?.some(item => item?._id === el?._id)}
                        onClickCustomButton={() => {
                          onClickSelect(el)
                          if (!notCloseOneClick) {
                            handleClose()
                          }
                        }}
                      />
                    ) : (
                      <Button
                        key={index}
                        className={cx(styles.button, buttonStyles)}
                        style={changeColorById && { color: changeColorById(el._id) }}
                        styleType={ButtonStyle.TRANSPARENT}
                        onClick={e => {
                          e.stopPropagation()
                          onClickSelect(el)
                          if (!notCloseOneClick) {
                            handleClose()
                          }
                        }}
                      >
                        <div
                          className={cx(styles.fieldNamesWrapper, fieldNamesWrapperStyles, {
                            [styles.fieldNamesWrapperWithCheckbox]: checkbox,
                          })}
                        >
                          {searchFields?.map((fieldName, index) => (
                            <Fragment key={index}>
                              {checkbox && (
                                <Checkbox checked={currentShops?.some(shop => shop?._id === el?._id)} color="primary" />
                              )}
                              {!isWithoutItemsTooltip ? (
                                <Tooltip followCursor title={getRowValue ? getRowValue(el) : el[fieldName]}>
                                  <Typography className={cx(styles.fieldName, fieldNameStyles)}>
                                    {getRowValue ? getRowValue(el) : el[fieldName]}
                                  </Typography>
                                </Tooltip>
                              ) : (
                                <Typography className={cx(styles.fieldName, fieldNameStyles)}>
                                  {getRowValue ? getRowValue(el) : el[fieldName]}
                                </Typography>
                              )}
                            </Fragment>
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
                                <Typography className={styles.fieldName}>
                                  {getRowValue ? getRowValue(el) : el}
                                </Typography>
                              </Tooltip>
                            </>
                          )}

                          {masterUserSelect && <MasterUserItem id={el?._id} name={el?.name} rating={el?.rating} />}

                          {favourites ? (
                            <StarOutlinedIcon
                              className={cx(styles.setFavouriteBtn, {
                                [styles.setFavouriteBtnIsSelected]: favourites?.find(favouriteItem =>
                                  isEqual(
                                    favouriteItem,
                                    searchFields?.map(searchField => el[searchField]),
                                  ),
                                ),
                              })}
                              onClick={e => {
                                onClickSetDestinationFavourite(searchFields?.map(searchField => el[searchField]))
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

                {(checkbox || onClickSubmitBtn) && (
                  <div className={styles.submitWrapper}>
                    <Button
                      className={styles.apply}
                      onClick={() => {
                        if (onClickSubmitBtn) {
                          onClickSubmitBtn()
                          isCloseAfterClickSubmit && handleClose()
                        } else {
                          handleClose()
                        }
                      }}
                    >
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
