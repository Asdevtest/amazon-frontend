/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { compareDesc, isAfter, parseISO } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import {
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { OrderStatusTranslate } from '@constants/orders/order-status'
import { MyRequestStatus, MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { BoxStatus, boxStatusTranslateKey } from '@constants/statuses/box-status'
import { freelanceRequestType, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { chosenStatusesByFilter } from '@constants/statuses/inventory-product-orders-statuses'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridSelectAllFilters } from '@components/data-grid/data-grid-custom-components/data-grid-select-all-filters/data-grid-select-all-filters'
import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Input } from '@components/shared/input'
import { SearchInput } from '@components/shared/search-input'

import { checkIsPositiveNum } from '@utils/checks'
import { formatNormDateTime } from '@utils/date-time'
import { getStatusByColumnKeyAndStatusKey, minsToTime, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { styles } from './data-grid-menu-items.style'

export const IsFormedMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      isFormedData,
      onClose,
      data,
      field,
      filterRequestStatus,
      columnKey,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
    }) => {
      const [currentOption, setCurrentOption] = useState('first')

      const handleCategory = e => {
        if (e.target.value === 'second') {
          onClickFilterBtn(field)
        }
        setCurrentOption(e.target.value)
      }

      return (
        <div className={classNames.isFormedWrapper}>
          <div>
            <FormControl className={classNames.formControl}>
              <RadioGroup
                row
                className={cx(classNames.radioGroup, classNames.formedRadioGroup)}
                value={currentOption}
                onChange={handleCategory}
              >
                <FormControlLabel
                  title={t(TranslationKey.Formed)}
                  className={classNames.radioOption}
                  value="first"
                  control={<Radio className={classNames.radioControl} />}
                  label={t(TranslationKey.Formed)}
                />
                <FormControlLabel
                  title={t(TranslationKey.Responsible)}
                  className={classNames.radioOption}
                  value="second"
                  control={<Radio className={classNames.radioControl} />}
                  label={t(TranslationKey.Responsible)}
                />
              </RadioGroup>
            </FormControl>
          </div>

          {currentOption === 'first' && (
            <div className={classNames.shopsWrapper}>
              <div className={classNames.shopsBody}>
                <div className={classNames.shop}>
                  <Checkbox
                    color="primary"
                    checked={isFormedData.isFormed || isFormedData.isFormed === null}
                    onClick={() =>
                      isFormedData.onChangeIsFormed(
                        isFormedData.isFormed !== null
                          ? isFormedData.isFormed
                            ? !isFormedData.isFormed
                            : null
                          : false,
                      )
                    }
                  />

                  <Typography title={t(TranslationKey.Formed)}>{t(TranslationKey.Formed)}</Typography>
                </div>

                <div className={classNames.shop}>
                  <Checkbox
                    color="primary"
                    checked={!isFormedData.isFormed || isFormedData.isFormed === null}
                    onClick={() =>
                      isFormedData.onChangeIsFormed(
                        isFormedData.isFormed !== null
                          ? !isFormedData.isFormed
                            ? !isFormedData.isFormed
                            : null
                          : true,
                      )
                    }
                  />

                  <Typography tile={t(TranslationKey['Not formed'])}>{t(TranslationKey['Not formed'])}</Typography>
                </div>
              </div>
            </div>
          )}

          {currentOption === 'second' && (
            <>
              <ObJectFieldMenuItem
                asBlock
                data={data}
                field={field}
                filterRequestStatus={filterRequestStatus}
                columnKey={columnKey}
                onClickFilterBtn={onClickFilterBtn}
                onClose={onClose}
                onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
                onClickAccept={onClickAccept}
              />
            </>
          )}
        </div>
      )
    },
    styles,
  ),
)

export const IsNeedPurchaseFilterMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      isNeedPurchaseFilterData,
      onClose,
      data,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,
      onClickAccept,
    }) => {
      const [currentOption, setCurrentOption] = useState('first')

      const handleCategory = e => {
        setCurrentOption(e.target.value)
      }

      // useEffect(() => {
      //   if (currentOption === 'second') {
      //     if (isNeedPurchaseFilterData.isNeedPurchaseFilter) {
      //       isNeedPurchaseFilterData.onChangeIsNeedPurchaseFilter(true, false)
      //     } else {
      //       isNeedPurchaseFilterData.onChangeIsNeedPurchaseFilter(true, true)
      //     }
      //   }
      // }, [currentOption])

      return (
        <div className={classNames.shopsDataWrapper}>
          <div>
            <FormControl className={classNames.formControl}>
              {/* <FormLabel className={classNames.radioLable}>{t(TranslationKey['Search by']) + ':'}</FormLabel> */}
              <RadioGroup row className={classNames.radioGroup} value={currentOption} onChange={handleCategory}>
                <FormControlLabel
                  title={t(TranslationKey.Repurchase)}
                  className={classNames.radioOption}
                  value="first"
                  control={<Radio className={classNames.radioControl} />}
                  label={t(TranslationKey.Repurchase)}
                />
                <FormControlLabel
                  title={t(TranslationKey['Quantity of repurchase'])}
                  className={classNames.radioOption}
                  value="second"
                  control={<Radio className={classNames.radioControl} />}
                  label={t(TranslationKey['Quantity of repurchase'])}
                />
              </RadioGroup>
            </FormControl>
          </div>

          {currentOption === 'first' && (
            <div className={classNames.isFormedWrapper}>
              <div className={classNames.isFormedSubWrapper}>
                <Typography title={t(TranslationKey['Not need refills'])}>
                  {t(TranslationKey['Not need refills'])}
                </Typography>

                <Checkbox
                  color="primary"
                  checked={isNeedPurchaseFilterData.isNotNeedPurchaseFilter}
                  onClick={() => {
                    if (isNeedPurchaseFilterData.isNotNeedPurchaseFilter) {
                      isNeedPurchaseFilterData.onChangeIsNeedPurchaseFilter(false, true)
                    } else {
                      isNeedPurchaseFilterData.onChangeIsNeedPurchaseFilter(true, true)
                    }
                  }}
                />
              </div>

              <div className={classNames.isFormedSubWrapper}>
                <Typography title={t(TranslationKey['Need refills'])}>{t(TranslationKey['Need refills'])}</Typography>

                <Checkbox
                  color="primary"
                  checked={isNeedPurchaseFilterData.isNeedPurchaseFilter}
                  onClick={() => {
                    if (isNeedPurchaseFilterData.isNeedPurchaseFilter) {
                      isNeedPurchaseFilterData.onChangeIsNeedPurchaseFilter(true, false)
                    } else {
                      isNeedPurchaseFilterData.onChangeIsNeedPurchaseFilter(true, true)
                    }
                  }}
                />
              </div>

              <Divider />
            </div>
          )}

          {currentOption === 'second' && (
            <NumberFieldMenuItem
              data={data.purchaseQuantity}
              field={'purchaseQuantity'}
              filterRequestStatus={filterRequestStatus}
              onClickFilterBtn={onClickFilterBtn}
              onClose={onClose}
              onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
              onClickAccept={onClickAccept}
            />
          )}
        </div>
      )
    },
    styles,
  ),
)

export const IsHaveBarCodeFilterMenuItem = React.memo(
  withStyles(
    ({ classes: classNames, isHaveBarCodeFilterData }) => (
      <div className={classNames.isFormedWrapper}>
        <div className={classNames.isFormedSubWrapper}>
          <Typography title={t(TranslationKey['Got barcode'])}>{t(TranslationKey['Got barcode'])}</Typography>

          <Checkbox
            color="primary"
            checked={
              !isHaveBarCodeFilterData.isHaveBarCodeFilter || isHaveBarCodeFilterData.isHaveBarCodeFilter === null
            }
            onClick={() =>
              isHaveBarCodeFilterData.onChangeIsHaveBarCodeFilter(
                isHaveBarCodeFilterData.isHaveBarCodeFilter !== null
                  ? !isHaveBarCodeFilterData.isHaveBarCodeFilter
                    ? !isHaveBarCodeFilterData.isHaveBarCodeFilter
                    : null
                  : true,
              )
            }
          />
        </div>

        <div className={classNames.isFormedSubWrapper}>
          <Typography title={t(TranslationKey['No barcode'])}>{t(TranslationKey['No barcode'])}</Typography>

          <Checkbox
            color="primary"
            checked={
              isHaveBarCodeFilterData.isHaveBarCodeFilter || isHaveBarCodeFilterData.isHaveBarCodeFilter === null
            }
            onClick={() =>
              isHaveBarCodeFilterData.onChangeIsHaveBarCodeFilter(
                isHaveBarCodeFilterData.isHaveBarCodeFilter !== null
                  ? isHaveBarCodeFilterData.isHaveBarCodeFilter
                    ? !isHaveBarCodeFilterData.isHaveBarCodeFilter
                    : null
                  : false,
              )
            }
          />
        </div>

        <Divider />
      </div>
    ),
    styles,
  ),
)

export const OrderStatusMenuItem = React.memo(
  withStyles(({ classes: classNames, orderStatusData }) => {
    const { isCheckedStatusByFilter, onCheckboxChange } = orderStatusData

    const checkboxes = [
      {
        name: chosenStatusesByFilter.ALL,
        label: t(TranslationKey.All),
        checked: isCheckedStatusByFilter.ALL,
      },
      {
        name: chosenStatusesByFilter.AT_PROCESS,
        label: t(TranslationKey['At process']),
        checked: isCheckedStatusByFilter.AT_PROCESS,
      },
      {
        name: chosenStatusesByFilter.CANCELED,
        label: t(TranslationKey.Canceled),
        checked: isCheckedStatusByFilter.CANCELED,
      },
      {
        name: chosenStatusesByFilter.COMPLETED,
        label: t(TranslationKey.Completed),
        checked: isCheckedStatusByFilter.COMPLETED,
      },
    ]

    return (
      <div className={classNames.isFormedWrapper}>
        {checkboxes.map(item => (
          <div key={item.name} className={classNames.isFormedSubWrapper}>
            <Typography title={item.label}>{item.label}</Typography>

            <Checkbox color="primary" name={item.name} checked={item.checked} onChange={onCheckboxChange} />
          </div>
        ))}

        <Divider />
      </div>
    )
  }, styles),
)

export const MyRequestsStatusMenuItem = React.memo(
  withStyles(({ classes: classNames, onClose, data, field, onChangeFullFieldMenuItem, onClickAccept }) => {
    const filterData = Object.keys(MyRequestStatus)

    const { currentFilterData } = data

    const [choosenItems, setChoosenItems] = useState(currentFilterData)

    const onClickItem = str => {
      if (choosenItems.some(item => item === str)) {
        setChoosenItems(choosenItems.slice().filter(item => item !== str))
      } else {
        setChoosenItems([...choosenItems, str])
      }
    }
    useEffect(() => {
      setChoosenItems(currentFilterData)
    }, [currentFilterData])

    const [itemsForRender, setItemsForRender] = useState(filterData || [])
    const [nameSearchValue, setNameSearchValue] = useState('')

    useEffect(() => {
      if (nameSearchValue) {
        const filter = filterData?.filter(item =>
          MyRequestStatusTranslate(item).toLowerCase().includes(nameSearchValue.toLowerCase()),
        )
        setItemsForRender(filter)
      } else {
        setItemsForRender(filterData)
      }
    }, [nameSearchValue])

    return (
      <div className={classNames.shopsDataWrapper}>
        <div className={classNames.searchInputWrapper}>
          <SearchInput
            key={'client_warehouse_search_input'}
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey.Search)}
            onChange={e => {
              setNameSearchValue(e.target.value)
            }}
          />
        </div>
        <div className={classNames.shopsWrapper}>
          <div className={classNames.shopsBody}>
            <>
              {itemsForRender.length ? (
                <>
                  <DataGridSelectAllFilters
                    choosenItems={choosenItems}
                    itemsForRender={itemsForRender}
                    setChoosenItems={setChoosenItems}
                  />
                  {itemsForRender.map((el, index) => {
                    const value = MyRequestStatusTranslate(el) || t(TranslationKey.Empty)
                    const valueChecked = choosenItems.some(item => item === el)

                    return (
                      <div key={index} className={classNames.shop}>
                        <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                        <div title={value} className={classNames.shopName}>
                          {value}
                        </div>
                      </div>
                    )
                  })}
                </>
              ) : (
                <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                  {t(TranslationKey['No options'])}
                </Typography>
              )}
            </>
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            variant="contained"
            onClick={e => {
              onClose(e)
              onChangeFullFieldMenuItem(choosenItems, field)

              onClickAccept()
            }}
          >
            {t(TranslationKey.Accept)}
          </Button>
          <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

export const FreelanceRequestType = React.memo(
  withStyles(({ classes: classNames, onClose, data, field, onChangeFullFieldMenuItem, onClickAccept }) => {
    const filterData = Object.values(freelanceRequestType)

    const { currentFilterData } = data

    const [choosenItems, setChoosenItems] = useState(currentFilterData)

    const onClickItem = str => {
      if (choosenItems.some(item => item === str)) {
        setChoosenItems(choosenItems.slice().filter(item => item !== str))
      } else {
        setChoosenItems([...choosenItems, str])
      }
    }
    useEffect(() => {
      setChoosenItems(currentFilterData)
    }, [currentFilterData])

    const [itemsForRender, setItemsForRender] = useState(filterData || [])
    const [nameSearchValue, setNameSearchValue] = useState('')

    useEffect(() => {
      if (nameSearchValue) {
        const filter = filterData?.filter(item =>
          freelanceRequestTypeTranslate(item).toLowerCase().includes(nameSearchValue.toLowerCase()),
        )
        setItemsForRender(filter)
      } else {
        setItemsForRender(filterData)
      }
    }, [nameSearchValue])

    return (
      <div className={classNames.shopsDataWrapper}>
        <div className={classNames.searchInputWrapper}>
          <SearchInput
            key={'client_warehouse_search_input'}
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey.Search)}
            onChange={e => {
              setNameSearchValue(e.target.value)
            }}
          />
        </div>
        <div className={classNames.shopsWrapper}>
          <div className={classNames.shopsBody}>
            <>
              {itemsForRender.length ? (
                <>
                  <DataGridSelectAllFilters
                    choosenItems={choosenItems}
                    itemsForRender={itemsForRender}
                    setChoosenItems={setChoosenItems}
                  />
                  {itemsForRender.map((el, index) => {
                    const value = freelanceRequestTypeTranslate(el) || t(TranslationKey.Empty)
                    const valueChecked = choosenItems.some(item => item === el)

                    return (
                      freelanceRequestType.DEFAULT !== el && (
                        <div key={index} className={classNames.shop}>
                          <Checkbox
                            color="primary"
                            checked={valueChecked}
                            onClick={() => onClickItem(freelanceRequestType[el])}
                          />
                          <div title={value} className={classNames.shopName}>
                            {value}
                          </div>
                        </div>
                      )
                    )
                  })}
                </>
              ) : (
                <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                  {t(TranslationKey['No options'])}
                </Typography>
              )}
            </>
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            variant="contained"
            onClick={e => {
              onClose(e)
              onChangeFullFieldMenuItem(choosenItems, field)

              onClickAccept()
            }}
          >
            {t(TranslationKey.Accept)}
          </Button>
          <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

export const ClientOrderAllStatusesMenuItem = React.memo(
  withStyles(({ classes: classNames, orderStatusData }) => {
    const { orderStatusDataBase, chosenStatus, onClickOrderStatusData } = orderStatusData

    return (
      <div className={classNames.orderStatusDataWrapper}>
        <div className={classNames.orderStatusDataBody}>
          <div className={classNames.orderStatus} onClick={() => onClickOrderStatusData('ALL')}>
            <Checkbox color="primary" checked={!chosenStatus?.length} />
            <div title={t(TranslationKey.All)} className={classNames.orderStatusName}>
              {t(TranslationKey.All)}
            </div>
          </div>
          {orderStatusDataBase.map((item, itemIndex) => (
            <div key={itemIndex} className={classNames.orderStatus} onClick={() => onClickOrderStatusData(item)}>
              <Checkbox color="primary" checked={chosenStatus?.some(status => status === item)} />
              <div title={OrderStatusTranslate(item)} className={classNames.orderStatusName}>
                {OrderStatusTranslate(item)}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }, styles),
)

export const CreatedByMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      columnKey,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
    }) => {
      useEffect(() => {
        onClickFilterBtn('createdBy')
        onClickFilterBtn('sub')
      }, [])

      const filterData = [...data.createdBy.filterData, ...data.sub.filterData] || []
      const currentFilterData = [...data.createdBy.currentFilterData, ...data.sub.currentFilterData] || []

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = obj => {
        if (choosenItems.some(item => item._id === obj._id)) {
          setChoosenItems(choosenItems.slice().filter(item => item._id !== obj._id))
        } else {
          setChoosenItems([...choosenItems, obj])
        }
      }

      const [itemsForRender, setItemsForRender] = useState(filterData || [])

      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        setItemsForRender(
          filterData
            .filter(el => el)
            .sort(
              (a, b) =>
                currentFilterData.length &&
                Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)),
            ),
        )
      }, [data.createdBy.filterData, data.sub.filterData])

      useEffect(() => {
        if (nameSearchValue) {
          const filter = filterData?.filter(item => String(item).toLowerCase().includes(nameSearchValue.toLowerCase()))
          setItemsForRender(filter)
        } else {
          setItemsForRender(filterData)
        }
      }, [nameSearchValue])

      return (
        <div className={classNames.shopsDataWrapper}>
          <div className={classNames.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={classNames.shopsWrapper}>
            <div className={classNames.shopsBody}>
              {filterRequestStatus === loadingStatuses.isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender.map(obj => {
                        const value = (obj && obj?.name) || t(TranslationKey.Empty)
                        const valueChecked = choosenItems.some(item => item?._id === obj?._id)

                        return (
                          <div key={obj?._id} className={classNames.shop}>
                            <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(obj)} />
                            <div title={value} className={classNames.shopName}>
                              {value}
                            </div>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </Typography>
                  )}
                </>
              )}
            </div>
          </div>

          <div className={classNames.buttonsWrapper}>
            <Button
              variant="contained"
              onClick={e => {
                onClose(e)

                if (choosenItems?.some(item => data?.sub?.filterData?.some(obj => obj?._id === item?._id))) {
                  const choosenSub = choosenItems.filter(item =>
                    data?.sub?.filterData?.some(obj => obj?._id === item?._id),
                  )
                  onChangeFullFieldMenuItem(choosenSub, 'sub')
                }

                if (choosenItems.some(item => data?.createdBy?.filterData?.some(obj => obj?._id === item?._id))) {
                  // const choosenCreatedBy = choosenItems.filter(item =>
                  //   data?.createdBy?.filterData?.some(obj => obj?._id === item?._id),
                  // )
                  // onChangeFullFieldMenuItem(choosenCreatedBy, 'createdBy')
                  onChangeFullFieldMenuItem([], 'sub')
                }
                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const ObJectFieldMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      addNullObj,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
      rowContent,
      asBlock,
    }) => {
      const { filterData, currentFilterData } = data

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = obj => {
        if (choosenItems.some(item => item._id === obj._id)) {
          setChoosenItems(choosenItems.slice().filter(item => item._id !== obj._id))
        } else {
          setChoosenItems([...choosenItems, obj])
        }
      }
      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      useEffect(() => {
        onClickFilterBtn(field)
      }, [])

      const [itemsForRender, setItemsForRender] = useState(filterData || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        setItemsForRender(
          [...filterData, ...[addNullObj && { name: t(TranslationKey['Without stores']), _id: 'null' }]]
            .filter(el => el)
            .sort(
              (a, b) =>
                Number(b._id === 'null') - Number(a._id === 'null') ||
                Number(choosenItems?.some(item => item._id === b._id)) -
                  Number(choosenItems?.some(item => item._id === a._id)),
            ),
        )
      }, [filterData])

      useEffect(() => {
        if (nameSearchValue) {
          const filter = filterData?.filter(obj => {
            return obj && (obj.title || obj.name).toLowerCase().includes(nameSearchValue.toLowerCase())
          })
          setItemsForRender(filter)
        } else {
          setItemsForRender(filterData)
        }
      }, [nameSearchValue])

      return (
        <div className={cx({ [classNames.shopsDataWrapper]: !asBlock, [classNames.shopsDataWrapperBlocked]: asBlock })}>
          <div className={classNames.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={classNames.shopsWrapper}>
            <div className={classNames.shopsBody}>
              {filterRequestStatus === loadingStatuses.isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender.map(obj => {
                        const value = obj.title || obj.name || t(TranslationKey.Empty)
                        const valueChecked = choosenItems.some(item => item._id === obj._id)

                        return (
                          obj && (
                            <div key={obj._id} className={classNames.shop}>
                              <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(obj)} />
                              {rowContent ? (
                                rowContent(obj)
                              ) : (
                                <div title={value} className={classNames.shopName}>
                                  {value}
                                </div>
                              )}
                            </div>
                          )
                        )
                      })}
                    </>
                  ) : (
                    <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </Typography>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={classNames.buttonsWrapper}>
            <Button
              variant="contained"
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const IdeaShopsFieldMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      addNullObj,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
      rowContent,
      asBlock,
    }) => {
      const [filterData, setFilterData] = useState([])
      const [currentFilterData, setCurrentFilterData] = useState([])
      const [choosenItems, setChoosenItems] = useState(currentFilterData)
      const [itemsForRender, setItemsForRender] = useState(filterData || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      const getData = section => field.reduce((acc, item) => [...acc, ...data[item][section]], [])

      const onClickItem = obj => {
        if (choosenItems.some(item => item._id === obj._id)) {
          setChoosenItems(choosenItems.slice().filter(item => item._id !== obj._id))
        } else {
          setChoosenItems([...choosenItems, obj])
        }
      }
      // НУжно переделать
      useEffect(() => {
        setFilterData(getData('filterData'))
      }, [data?.childProductShopIds?.filterData?.length, data?.parentProductShopIds?.filterData?.length])
      // НУжно переделать
      useEffect(() => {
        setCurrentFilterData(getData('currentFilterData'))
      }, [data?.childProductShopIds?.currentFilterData?.length, data?.parentProductShopIds?.currentFilterData?.length])

      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      useEffect(() => {
        for (const item of field) {
          onClickFilterBtn(`${item}`)
        }
      }, [])

      useEffect(() => {
        setItemsForRender(
          [...filterData, ...[addNullObj && { name: t(TranslationKey['Without stores']), _id: 'null' }]]
            .filter(el => el)
            .sort(
              (a, b) =>
                Number(b._id === 'null') - Number(a._id === 'null') ||
                Number(choosenItems?.some(item => item._id === b._id)) -
                  Number(choosenItems?.some(item => item._id === a._id)),
            ),
        )
      }, [filterData])

      useEffect(() => {
        if (nameSearchValue) {
          const filter = filterData?.filter(obj => {
            return obj && (obj.title || obj.name).toLowerCase().includes(nameSearchValue.toLowerCase())
          })
          setItemsForRender(filter)
        } else {
          setItemsForRender(filterData)
        }
      }, [nameSearchValue])

      return (
        <div className={cx({ [classNames.shopsDataWrapper]: !asBlock, [classNames.shopsDataWrapperBlocked]: asBlock })}>
          <div className={classNames.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={classNames.shopsWrapper}>
            <div className={classNames.shopsBody}>
              {filterRequestStatus === loadingStatuses.isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender.map(obj => {
                        const value = obj.title || obj.name || t(TranslationKey.Empty)
                        const valueChecked = choosenItems.some(item => item._id === obj._id)

                        return (
                          obj && (
                            <div key={obj._id} className={classNames.shop}>
                              <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(obj)} />
                              {rowContent ? (
                                rowContent(obj)
                              ) : (
                                <div title={value} className={classNames.shopName}>
                                  {value}
                                </div>
                              )}
                            </div>
                          )
                        )
                      })}
                    </>
                  ) : (
                    <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </Typography>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={classNames.buttonsWrapper}>
            <Button
              variant="contained"
              onClick={e => {
                onClose(e)

                // НУжно переделать
                const parentShops = choosenItems.filter(item =>
                  data?.parentProductShopIds?.filterData?.some(obj => obj?._id === item?._id),
                )
                const childShops = choosenItems.filter(item =>
                  data?.childProductShopIds?.filterData?.some(obj => obj?._id === item?._id),
                )

                if (parentShops?.length) {
                  onChangeFullFieldMenuItem(parentShops, 'parentProductShopIds')
                }
                if (childShops?.length) {
                  onChangeFullFieldMenuItem(childShops, 'childProductShopIds')
                }

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const BoxestatusMenuItem = React.memo(
  withStyles(({ classes: classNames, data, onChangeFullFieldMenuItem, onClose, field, onClickAccept }) => {
    const { /* filterData, */ currentFilterData } = data

    const [choosenItems, setChoosenItems] = useState(currentFilterData)

    const onClickItem = el => {
      if (el === 'ALL') {
        if (choosenItems.length === 4) {
          setChoosenItems([])
        } else {
          setChoosenItems([
            BoxStatus.NEW,
            BoxStatus.IN_STOCK,
            BoxStatus.REQUESTED_SEND_TO_BATCH,
            BoxStatus.ACCEPTED_IN_PROCESSING,
            BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
            BoxStatus.NEED_TO_UPDATE_THE_TARIFF,
          ])
        }
      } else if (choosenItems.some(item => item === el)) {
        setChoosenItems(choosenItems.slice().filter(item => item !== el))
      } else {
        setChoosenItems([...choosenItems, el])
      }
    }
    useEffect(() => {
      setChoosenItems(currentFilterData)
    }, [currentFilterData])

    return (
      <div className={classNames.shopsDataWrapper}>
        <div className={classNames.orderStatusDataBody}>
          <div className={classNames.orderStatus} onClick={() => onClickItem('ALL')}>
            <Checkbox color="primary" checked={choosenItems.length === 4 || !choosenItems.length} />
            <div className={classNames.orderStatusName}>{t(TranslationKey.All)}</div>
          </div>
          {[
            BoxStatus.NEW,
            BoxStatus.IN_STOCK,
            BoxStatus.REQUESTED_SEND_TO_BATCH,
            BoxStatus.ACCEPTED_IN_PROCESSING,
            BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
            BoxStatus.NEED_TO_UPDATE_THE_TARIFF,
          ].map(item => (
            <div key={item} className={classNames.orderStatus} onClick={() => onClickItem(item)}>
              <Checkbox color="primary" checked={choosenItems?.some(status => status === item)} />
              <div title={t(boxStatusTranslateKey(item))} className={classNames.orderStatusName}>
                {t(boxStatusTranslateKey(item))}
              </div>
            </div>
          ))}
        </div>
        <div className={classNames.buttonsWrapper}>
          <Button
            variant="contained"
            onClick={e => {
              onClose(e)
              onChangeFullFieldMenuItem(choosenItems, field)

              onClickAccept()
            }}
          >
            {t(TranslationKey.Accept)}
          </Button>
          <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

export const NormalFieldMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      columnKey,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
      asBlock = false,
    }) => {
      useEffect(() => {
        onClickFilterBtn(field)
      }, [])

      const { filterData, currentFilterData } = data

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = str => {
        if (choosenItems.some(item => item === str)) {
          setChoosenItems(choosenItems.slice().filter(item => item !== str))
        } else {
          setChoosenItems([...choosenItems, str])
        }
      }
      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      const [itemsForRender, setItemsForRender] = useState(filterData || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        setItemsForRender(
          filterData
            .filter(el => el !== undefined && el !== null)
            .sort(
              (a, b) =>
                currentFilterData.length &&
                Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)),
            ),
        )
      }, [filterData])

      useEffect(() => {
        if (nameSearchValue) {
          const filter = filterData?.filter(item =>
            String(getStatusByColumnKeyAndStatusKey(item, columnKey))
              .toLowerCase()
              .includes(nameSearchValue.toLowerCase()),
          )
          setItemsForRender(filter)
        } else {
          setItemsForRender(filterData)
        }
      }, [nameSearchValue])

      return (
        <div
          className={cx({
            [classNames.universalFilterWrapper]: !asBlock,
            [classNames.shopsDataWrapperBlocked]: asBlock,
            [classNames.fullName]: [
              columnnsKeys.buyer.MY_PRODUCTS_STATUS,
              columnnsKeys.client.INVENTORY_STATUS,
            ].includes(columnKey),
          })}
        >
          <div className={classNames.universalFilterSearchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>

          <div className={classNames.universalFilterBody}>
            {filterRequestStatus === loadingStatuses.isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {itemsForRender.length ? (
                  <>
                    <DataGridSelectAllFilters
                      choosenItems={choosenItems}
                      itemsForRender={itemsForRender}
                      setChoosenItems={setChoosenItems}
                    />
                    {itemsForRender.map((el, index) => {
                      const value = getStatusByColumnKeyAndStatusKey(el, columnKey) || t(TranslationKey.Empty)
                      const valueChecked = choosenItems.some(item => item === el)

                      return (
                        !!el && (
                          <div key={index} className={classNames.shop}>
                            <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                            <div title={value} className={classNames.shopName}>
                              {value}
                            </div>
                          </div>
                        )
                      )
                    })}
                  </>
                ) : (
                  <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                    {t(TranslationKey['No options'])}
                  </Typography>
                )}
              </>
            )}
          </div>

          <div className={classNames.buttonsWrapper}>
            <Button
              variant="contained"
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const PriorityMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      columnKey,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
    }) => {
      useEffect(() => {
        onClickFilterBtn(field)
      }, [])

      const isOrder = ['MY_ORDERS_PRIORITY', 'ORDERS_PRIORITY'].includes(columnKey)
      const urgentPriority = isOrder ? [40] : [30]
      const withoutPriority = isOrder ? [30] : [10, 20]

      const { filterData, currentFilterData } = data

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = array => {
        if (choosenItems.some(item => array.includes(item))) {
          setChoosenItems(choosenItems.slice().filter(item => !array.includes(item)))
        } else {
          setChoosenItems([...choosenItems, ...array])
        }
      }

      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      const shopName = isOrder ? 'Urgent' : 'Urgent request'

      return (
        <div className={classNames.shopsDataWrapper}>
          <div className={classNames.shopsWrapper}>
            <div className={classNames.shopsBody}>
              <div className={classNames.shop}>
                <Checkbox
                  color="primary"
                  checked={choosenItems.some(item => urgentPriority.includes(Number(item)))}
                  onClick={() => onClickItem(urgentPriority)}
                />
                <div title={shopName} className={classNames.shopName}>
                  {t(TranslationKey[`${shopName}`])} <img src="/assets/icons/fire.svg" />
                </div>
              </div>

              <div className={classNames.shop}>
                <Checkbox
                  color="primary"
                  checked={choosenItems.some(item => withoutPriority.includes(Number(item)))}
                  onClick={() => {
                    onClickItem(withoutPriority)
                  }}
                />
                <div title={'Without Priority'} className={classNames.shopName}>
                  {t(TranslationKey['Without Priority'])}
                </div>
              </div>
            </div>
          </div>

          <div className={classNames.buttonsWrapper}>
            <Button
              variant="contained"
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const FreelancerToWorkConfirmationMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      columnKey,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
    }) => {
      useEffect(() => {
        onClickFilterBtn(field)
      }, [])

      const { filterData, currentFilterData } = data

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = value => {
        if (choosenItems.some(item => item === value)) {
          setChoosenItems(choosenItems.slice().filter(item => !item === value))
        } else {
          setChoosenItems([...choosenItems, value])
        }
      }

      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      return (
        <div className={classNames.shopsDataWrapper}>
          <div className={classNames.shopsWrapper}>
            <div className={classNames.shopsBody}>
              <div className={classNames.shop}>
                <Checkbox
                  color="primary"
                  checked={choosenItems.some(item => item === true)}
                  onClick={() => onClickItem(true)}
                />
                <div title={t(TranslationKey.Yes)} className={classNames.shopName}>
                  {t(TranslationKey.Yes)}
                </div>
              </div>

              <div className={classNames.shop}>
                <Checkbox
                  color="primary"
                  checked={choosenItems.some(item => item === false)}
                  onClick={() => onClickItem(false)}
                />
                <div title={t(TranslationKey.No)} className={classNames.shopName}>
                  {t(TranslationKey.No)}
                </div>
              </div>
            </div>
          </div>

          <div className={classNames.buttonsWrapper}>
            <Button
              variant="contained"
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const ProductMenuItem = React.memo(
  withStyles(props => {
    const {
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,
      onClickAccept,
      withoutSku,
    } = props

    const getCurrentField = option => {
      if (field && field.includes('parent')) {
        return 'parentProduct' + option.charAt(0).toUpperCase() + option.slice(1)
      } else if (field && field.includes('child')) {
        return 'childProduct' + option.charAt(0).toUpperCase() + option.slice(1)
      } else {
        return option
      }
    }

    const [currentOption, setCurrentOption] = useState(
      data.amazonTitle.currentFilterData.length
        ? 'amazonTitle'
        : !withoutSku && data.skusByClient.currentFilterData.length
        ? 'skusByClient'
        : 'asin',
    )
    // const { filterData } = data[currentOption]
    const { currentFilterData, filterData } = data[getCurrentField(currentOption)]
    const [choosenItems, setChoosenItems] = useState(currentFilterData)
    const [itemsForRender, setItemsForRender] = useState(filterData || [])
    const [nameSearchValue, setNameSearchValue] = useState('')

    useEffect(() => {
      onClickFilterBtn(getCurrentField(currentOption))
    }, [currentOption])

    useEffect(() => {
      setChoosenItems(currentFilterData)
    }, [currentFilterData])
    useEffect(() => {
      setItemsForRender(
        filterData
          .filter(el => el)
          .sort(
            (a, b) => Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)),
          ),
      )
    }, [filterData])

    useEffect(() => {
      if (nameSearchValue) {
        const filter = filterData?.filter(item => String(item).toLowerCase().includes(nameSearchValue?.toLowerCase()))
        setItemsForRender(filter)
      } else {
        setItemsForRender(filterData)
      }
    }, [nameSearchValue])

    const onClickItem = str => {
      if (choosenItems.some(item => item === str)) {
        setChoosenItems(choosenItems.slice().filter(item => item !== str))
      } else {
        setChoosenItems([...choosenItems, str])
      }
    }

    const handleCategory = e => {
      onChangeFullFieldMenuItem(choosenItems, getCurrentField(currentOption))
      setCurrentOption(e.target.value)
    }

    const applyFilters = e => {
      onClose(e)
      onChangeFullFieldMenuItem(choosenItems, getCurrentField(currentOption))
      onClickAccept()
    }

    return (
      <div className={classNames.shopsDataWrapper}>
        <div>
          <FormControl className={classNames.formControl}>
            <FormLabel title={t(TranslationKey['Search by'])} className={classNames.radioLable}>
              {t(TranslationKey['Search by']) + ':'}
            </FormLabel>
            <RadioGroup
              row
              className={cx({
                [classNames.radioGroup]: !withoutSku,
                [classNames.radioGroupTwoItems]: withoutSku,
              })}
              value={currentOption}
              onChange={handleCategory}
            >
              <FormControlLabel
                title={t(TranslationKey.ASIN)}
                className={classNames.radioOption}
                value="asin"
                control={<Radio className={classNames.radioControl} />}
                label={t(TranslationKey.ASIN)}
              />
              {!withoutSku && (
                <FormControlLabel
                  title={t(TranslationKey.SKU)}
                  className={classNames.radioOption}
                  value="skusByClient"
                  control={<Radio className={classNames.radioControl} />}
                  label={t(TranslationKey.SKU)}
                />
              )}
              <FormControlLabel
                title={t(TranslationKey.Title)}
                className={classNames.radioOption}
                value="amazonTitle"
                control={<Radio className={classNames.radioControl} />}
                label={t(TranslationKey.Title)}
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className={classNames.searchInputWrapper}>
          <SearchInput
            key={'client_warehouse_search_input'}
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey.Search)}
            onChange={e => {
              setNameSearchValue(e.target.value)
            }}
          />
        </div>
        <div className={classNames.shopsWrapper}>
          <div className={classNames.shopsBody}>
            {filterRequestStatus === loadingStatuses.isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {itemsForRender.length ? (
                  <>
                    <DataGridSelectAllFilters
                      choosenItems={choosenItems}
                      itemsForRender={itemsForRender}
                      setChoosenItems={setChoosenItems}
                    />
                    {itemsForRender?.map((el, index) => {
                      const value = el || t(TranslationKey.Empty)
                      const valueChecked = choosenItems?.some(item => item === el)

                      return (
                        <div key={index} className={classNames.shop}>
                          <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                          <div title={value} className={classNames.shopName}>
                            {value}
                          </div>
                        </div>
                      )
                    })}
                  </>
                ) : (
                  <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                    {t(TranslationKey['No options'])}
                  </Typography>
                )}
              </>
            )}
          </div>
        </div>
        <div className={classNames.buttonsWrapper}>
          <Button variant="contained" onClick={applyFilters}>
            {t(TranslationKey.Accept)}
          </Button>
          <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

export const OrderOrItemMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      onClose,
      data,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,

      onClickAccept,
    }) => {
      const [currentOption, setCurrentOption] = useState(data.item.currentFilterData.length ? 'item' : 'id')

      useEffect(() => {
        onClickFilterBtn(currentOption)

        if (currentOption === 'item') {
          onChangeFullFieldMenuItem([], 'id')
        } else {
          onChangeFullFieldMenuItem([], 'item')
        }
      }, [currentOption])

      const { filterData, currentFilterData } = data[currentOption]

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = str => {
        if (choosenItems.some(item => item === str)) {
          setChoosenItems(choosenItems.slice().filter(item => item !== str))
        } else {
          setChoosenItems([...choosenItems, str])
        }
      }
      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      const [itemsForRender, setItemsForRender] = useState(filterData || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        setItemsForRender(
          filterData
            .filter(el => el)
            .sort(
              (a, b) => Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)),
            ),
        )
      }, [filterData])

      useEffect(() => {
        if (nameSearchValue) {
          const filter = filterData?.filter(item => String(item).toLowerCase().includes(nameSearchValue?.toLowerCase()))
          setItemsForRender(filter)
        } else {
          setItemsForRender(filterData)
        }
      }, [nameSearchValue])

      return (
        <div className={classNames.shopsDataWrapper}>
          <div>
            <FormControl className={classNames.formControl}>
              <FormLabel className={classNames.radioLable}>{t(TranslationKey['Search by']) + ':'}</FormLabel>
              <RadioGroup
                row
                className={classNames.radioGroupTwoItems}
                value={currentOption}
                onChange={e => setCurrentOption(e.target.value)}
              >
                <FormControlLabel
                  title={t(TranslationKey['№Order'])}
                  className={classNames.radioOption}
                  value="id"
                  control={<Radio className={classNames.radioControl} />}
                  label={t(TranslationKey['№Order'])}
                />
                <FormControlLabel
                  title={'№Item'}
                  className={classNames.radioOption}
                  value="item"
                  control={<Radio className={classNames.radioControl} />}
                  label={'№Item'}
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className={classNames.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={classNames.shopsWrapper}>
            <div className={classNames.shopsBody}>
              {filterRequestStatus === loadingStatuses.isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender
                        // .filter(el => el)
                        // ?.sort(
                        //   (a, b) =>
                        //     Number(choosenItems?.some(item => item === b)) -
                        //     Number(choosenItems?.some(item => item === a)),
                        // )
                        .map((el, index) => {
                          const value = el || t(TranslationKey.Empty)
                          const valueChecked = choosenItems?.some(item => item === el)

                          return (
                            <div key={index} className={classNames.shop}>
                              <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                              <div title={value} className={classNames.shopName}>
                                {value}
                              </div>
                            </div>
                          )
                        })}
                    </>
                  ) : (
                    <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </Typography>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={classNames.buttonsWrapper}>
            <Button
              variant="contained"
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, currentOption)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const DestinationMenuItem = React.memo(
  withStyles(props => {
    const {
      classes: classNames,
      onClose,
      data,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,
      onClickAccept,
    } = props

    const [currentOption, setCurrentOption] = useState(
      data.logicsTariff.currentFilterData.length ? 'logicsTariff' : 'destination',
    )
    const { filterData, currentFilterData } = data[currentOption]
    const [choosenItems, setChoosenItems] = useState(currentFilterData)
    const [itemsForRender, setItemsForRender] = useState(filterData || [])
    const [nameSearchValue, setNameSearchValue] = useState('')

    useEffect(() => {
      onClickFilterBtn(currentOption)
    }, [currentOption])

    useEffect(() => {
      setChoosenItems(currentFilterData)
    }, [currentFilterData])

    useEffect(() => {
      setItemsForRender(
        filterData
          .filter(el => el)
          .sort(
            (a, b) =>
              Number(choosenItems?.some(item => item?._id === b?._id)) -
              Number(choosenItems?.some(item => item?._id === a?._id)),
          ),
      )
    }, [filterData])

    useEffect(() => {
      if (nameSearchValue) {
        const filter = filterData?.filter(obj => obj && obj?.name.toLowerCase().includes(nameSearchValue.toLowerCase()))
        setItemsForRender(filter)
      } else {
        setItemsForRender(filterData)
      }
    }, [nameSearchValue])

    const onClickItem = obj => {
      if (choosenItems.some(item => item._id === obj._id)) {
        setChoosenItems(choosenItems.slice().filter(item => item._id !== obj._id))
      } else {
        setChoosenItems([...choosenItems, obj])
      }
    }

    const handleCategory = e => {
      onChangeFullFieldMenuItem(choosenItems, currentOption)
      setCurrentOption(e.target.value)
    }

    const applyFilters = e => {
      onClose(e)
      onChangeFullFieldMenuItem(choosenItems, currentOption)
      onClickAccept()
    }

    return (
      <div className={classNames.shopsDataWrapper}>
        <div>
          <FormControl className={classNames.formControl}>
            <FormLabel title={t(TranslationKey['Search by'])} className={classNames.radioLable}>
              {t(TranslationKey['Search by']) + ':'}
            </FormLabel>
            <RadioGroup row className={classNames.radioGroupTwoItems} value={currentOption} onChange={handleCategory}>
              <FormControlLabel
                title={t(TranslationKey.Destination)}
                className={classNames.radioOption}
                value="destination"
                control={<Radio className={classNames.radioControl} />}
                label={t(TranslationKey.Destination)}
              />
              <FormControlLabel
                title={t(TranslationKey.Tariff)}
                className={classNames.radioOption}
                value="logicsTariff"
                control={<Radio className={classNames.radioControl} />}
                label={t(TranslationKey.Tariff)}
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className={classNames.searchInputWrapper}>
          <SearchInput
            key={'client_warehouse_search_input'}
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey.Search)}
            onChange={e => {
              setNameSearchValue(e.target.value)
            }}
          />
        </div>
        <div className={classNames.shopsWrapper}>
          <div className={classNames.shopsBody}>
            {filterRequestStatus === loadingStatuses.isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {itemsForRender.length ? (
                  <>
                    <DataGridSelectAllFilters
                      choosenItems={choosenItems}
                      itemsForRender={itemsForRender}
                      setChoosenItems={setChoosenItems}
                    />
                    {itemsForRender.map(obj => {
                      const value = obj?.name || t(TranslationKey.Empty)
                      const valueChecked = choosenItems.some(item => item?._id === obj?._id)

                      return (
                        <div key={obj?._id} className={classNames.shop}>
                          <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(obj)} />
                          <div title={value} className={classNames.shopName}>
                            {value}
                          </div>
                        </div>
                      )
                    })}
                  </>
                ) : (
                  <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                    {t(TranslationKey['No options'])}
                  </Typography>
                )}
              </>
            )}
          </div>
        </div>
        <div className={classNames.buttonsWrapper}>
          <Button variant="contained" onClick={applyFilters}>
            {t(TranslationKey.Accept)}
          </Button>
          <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

export const FromToDateMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
      headerControls,
    }) => {
      const [fromDate, setFromDate] = useState(null)
      const [toDate, setToDate] = useState(null)

      useEffect(() => {
        onClickFilterBtn(field)
      }, [])

      const { filterData, currentFilterData } = data

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = str => {
        if (choosenItems.some(item => item === str)) {
          setChoosenItems(choosenItems.slice().filter(item => item !== str))
        } else {
          setChoosenItems([...choosenItems, str])
        }
      }
      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      const [itemsForRender, setItemsForRender] = useState(filterData || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        setItemsForRender(
          filterData
            .filter(el => el)
            .sort(
              (a, b) =>
                Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)) ||
                compareDesc(parseISO(a), parseISO(b)),
            ),
        )
      }, [filterData])

      useEffect(() => {
        const filter = filterData?.filter(
          item =>
            (nameSearchValue
              ? formatNormDateTime(item).toLowerCase().includes(nameSearchValue?.toLowerCase())
              : true) &&
            (fromDate ? isAfter(parseISO(item), fromDate) : true) &&
            (toDate ? isAfter(toDate, parseISO(item)) : true),
        )
        setItemsForRender(filter)
      }, [nameSearchValue, fromDate, toDate])

      return (
        <div className={classNames.shopsDataWrapper}>
          <div className={classNames.fromToDatesWrapper}>
            {headerControls && <div>{headerControls()}</div>}
            <div className={classNames.fromToDatesSubWrapper}>
              <Typography title={t(TranslationKey.From)} className={classNames.fromToText}>
                {t(TranslationKey.From)}
              </Typography>
              <NewDatePicker className={classNames.dateInput} value={fromDate} onChange={setFromDate} />
            </div>
            <div className={classNames.fromToDatesSubWrapper}>
              <Typography title={t(TranslationKey.To)} className={classNames.fromToText}>
                {t(TranslationKey.To)}
              </Typography>

              <NewDatePicker className={classNames.dateInput} value={toDate} onChange={setToDate} />
            </div>
          </div>

          <div className={classNames.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={classNames.shopsWrapper}>
            <div className={classNames.shopsBody}>
              {filterRequestStatus === loadingStatuses.isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender
                        // .filter(el => el)
                        // .sort(
                        //   (a, b) =>
                        //     Number(choosenItems?.some(item => item === b)) -
                        //       Number(choosenItems?.some(item => item === a)) || compareDesc(parseISO(a), parseISO(b)),
                        // )
                        ?.map((el, index) => {
                          const value = formatNormDateTime(el) || t(TranslationKey.Empty)
                          const valueChecked = choosenItems?.some(item => item === el)
                          return (
                            <div key={index} className={classNames.shop}>
                              <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                              <div title={value} className={classNames.shopName}>
                                {value}
                              </div>
                            </div>
                          )
                        })}
                    </>
                  ) : (
                    <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </Typography>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={classNames.buttonsWrapper}>
            <Button
              variant="contained"
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const NumberFieldMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      onChangeFullFieldMenuItem,

      onClickAccept,
      onClickFilterBtn,
      asBlock = false,
    }) => {
      const [fromValue, setFromValue] = useState('')
      const [toValue, setToValue] = useState('')
      const [isNotFixedValue, setIsNotFixedValue] = useState(false)

      useEffect(() => {
        onClickFilterBtn(field)
        setIsNotFixedValue(checkIsNotFixedValue(field))
      }, [])

      const { filterData, currentFilterData } = data

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = str => {
        if (choosenItems.some(item => item === str)) {
          setChoosenItems(choosenItems.slice().filter(item => item !== str))
        } else {
          setChoosenItems([...choosenItems, str])
        }
      }

      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      const [itemsForRender, setItemsForRender] = useState(filterData || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        setItemsForRender(
          filterData
            .filter(el => el || el === 0 || el === '0')
            .sort(
              (a, b) =>
                Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)) ||
                Number(b) - Number(a),
            ),
        )
      }, [filterData])

      useEffect(() => {
        const filter = filterData?.filter(
          item =>
            (nameSearchValue ? String(item).toLowerCase().includes(nameSearchValue?.toLowerCase()) : true) &&
            (fromValue || fromValue === 0 ? Number(item) >= Number(fromValue) : true) &&
            (toValue || toValue === 0 ? Number(item) <= Number(toValue) : true),
        )
        setItemsForRender(filter)
      }, [nameSearchValue, fromValue, toValue])

      const checkIsNotFixedValue = useCallback(() => {
        const whiteList = [
          'amount',
          'productionTerm',
          'amountInOrders',
          'stockUSA',
          'purchaseQuantity',
          'sentToFbaSum',
          'reservedSum',
          'bsr',
          'fbaFbmStockSum',
          'reservedSum',
          'sentToFbaSum',
          'sumStock',
          'humanFriendlyId',
          'ideasVerified',
          'ideasClosed',
          'ideasOnCheck',
          'ideasOnCheck',
          'ideasClosed',
          'ideasVerified',
          'fbaamount',
        ]
        return whiteList.includes(field)
      }, [field])

      return (
        <div className={cx({ [classNames.shopsDataWrapper]: !asBlock, [classNames.shopsDataWrapperBlocked]: asBlock })}>
          <div className={classNames.numInputsWrapper}>
            <Input
              title={t(TranslationKey.From)}
              className={classNames.numInput}
              classes={{ input: classNames.numInput }}
              placeholder={t(TranslationKey.From)}
              value={fromValue}
              onChange={e => checkIsPositiveNum(e.target.value) && setFromValue(e.target.value)}
            />
            <Input
              title={t(TranslationKey.To)}
              className={classNames.numInput}
              classes={{ input: classNames.numInput }}
              placeholder={t(TranslationKey.To)}
              value={toValue}
              onChange={e => checkIsPositiveNum(e.target.value) && setToValue(e.target.value)}
            />
          </div>

          <div className={classNames.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={classNames.shopsWrapper}>
            <div className={classNames.shopsBody}>
              {filterRequestStatus === loadingStatuses.isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender
                        // .filter(el => el)
                        // .sort(
                        //   (a, b) =>
                        //     Number(choosenItems?.some(item => item === b)) -
                        //       Number(choosenItems?.some(item => item === a)) || Number(b) - Number(a),
                        // )
                        ?.map((el, index) => {
                          const value = isNotFixedValue ? el : toFixed(el, 2) || 0
                          const valueChecked = choosenItems?.some(item => item === el)

                          return (
                            <div key={index} className={classNames.shop}>
                              <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                              <div title={value} className={classNames.shopName}>
                                {value}
                              </div>
                            </div>
                          )
                        })}
                    </>
                  ) : (
                    <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </Typography>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={classNames.buttonsWrapper}>
            <Button
              variant="contained"
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)
                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const InStockMenuItem = React.memo(
  withStyles(
    ({
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      onClickAccept,
      onChangeFullFieldMenuItem,
      onClickFilterBtn,
    }) => {
      const [fromValue, setFromValue] = useState('')
      const [toValue, setToValue] = useState('')

      useEffect(() => {
        onClickFilterBtn(field)
      }, [])

      const newData = {
        ...data,
        filterData: data.filterData
          .slice()
          .filter(el => el)
          .sort(
            (a, b) =>
              Number(data.currentFilterData?.some(item => item._id === b._id)) -
                Number(data.currentFilterData?.some(item => item._id === a._id)) ||
              Number(b.amountInBoxes) - Number(a.amountInBoxes),
          ),
      }

      const { filterData, currentFilterData } = newData

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = obj => {
        if (choosenItems.some(item => item._id === obj._id)) {
          setChoosenItems(choosenItems.slice().filter(item => item._id !== obj._id))
        } else {
          setChoosenItems([...choosenItems, obj])
        }
      }
      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      const storekepeers = Array.from(new Set(filterData.map(el => el.storekeeper.name)))

      const [currentOption, setCurrentOption] = useState(null)

      const [itemsForRender, setItemsForRender] = useState(filterData || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        setItemsForRender(
          filterData,
          // .filter(el => el)
          // .sort(
          //   (a, b) =>
          //     Number(choosenItems?.some(item => item._id === b._id)) -
          //       Number(choosenItems?.some(item => item._id === a._id)) ||
          //     Number(b.amountInBoxes) - Number(a.amountInBoxes),
          // ),
        )
        setCurrentOption(data.currentFilterData?.[0]?.storekeeper?.name || storekepeers[0])
      }, [data.filterData])

      useEffect(() => {
        const filter = filterData?.filter(
          item =>
            (nameSearchValue
              ? String(item.amountInBoxes).toLowerCase().includes(nameSearchValue?.toLowerCase())
              : true) &&
            (fromValue || fromValue === 0 ? Number(item.amountInBoxes) >= Number(fromValue) : true) &&
            (toValue || toValue === 0 ? Number(item.amountInBoxes) <= Number(toValue) : true) &&
            item.storekeeper.name === currentOption,
        )
        setItemsForRender(filter)
      }, [nameSearchValue, fromValue, toValue, currentOption, choosenItems, data.filterData])

      return (
        <div className={classNames.shopsDataWrapper}>
          <div>
            <FormControl className={classNames.formControl}>
              <FormLabel title={t(TranslationKey['Search by'])} className={classNames.radioLable}>
                {t(TranslationKey['Search by']) + ':'}
              </FormLabel>
              <RadioGroup
                row
                className={classNames.radioGroupTwoItems}
                value={currentOption}
                onChange={e => {
                  setCurrentOption(e.target.value)
                  setChoosenItems([])
                }}
              >
                {storekepeers.map((el, index) => (
                  <FormControlLabel
                    key={index}
                    className={classNames.radioOption}
                    value={el}
                    control={<Radio className={classNames.radioControl} />}
                    label={el}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <div className={classNames.numInputsWrapper}>
            <Input
              title={t(TranslationKey.From)}
              className={classNames.numInput}
              classes={{ input: classNames.numInput }}
              placeholder={t(TranslationKey.From)}
              value={fromValue}
              onChange={e => checkIsPositiveNum(e.target.value) && setFromValue(e.target.value)}
            />
            <Input
              title={t(TranslationKey.To)}
              className={classNames.numInput}
              classes={{ input: classNames.numInput }}
              placeholder={t(TranslationKey.To)}
              value={toValue}
              onChange={e => checkIsPositiveNum(e.target.value) && setToValue(e.target.value)}
            />
          </div>

          <div className={classNames.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={classNames.shopsWrapper}>
            <div className={classNames.shopsBody}>
              {filterRequestStatus === loadingStatuses.isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender
                        // .filter(el => el)
                        // .sort(
                        // (a, b) =>
                        // Number(choosenItems?.some(item => item._id === b._id)) -
                        //   Number(choosenItems?.some(item => item._id === a._id)) ||
                        // Number(b.amountInBoxes) - Number(a.amountInBoxes),
                        // )
                        ?.map((el, index) => {
                          const value = el.amountInBoxes /* || t(TranslationKey.Empty) */
                          const valueChecked = choosenItems?.some(item => item._id === el._id)

                          return (
                            <div key={index} className={classNames.shop}>
                              <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                              <div title={el.amountInBoxes} className={classNames.shopName}>
                                {value}
                              </div>
                            </div>
                          )
                        })}
                    </>
                  ) : (
                    <Typography title={t(TranslationKey['No options'])} className={classNames.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </Typography>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={classNames.buttonsWrapper}>
            <Button
              variant="contained"
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, 'boxAmounts')
                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const RedFlagsCellMenuItem = React.memo(
  withStyles(props => {
    const {
      classes: classNames,
      onClose,
      data,
      field,
      filterRequestStatus,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
    } = props

    return (
      <ObJectFieldMenuItem
        data={data}
        field={field}
        filterRequestStatus={filterRequestStatus}
        columnKey={columnnsKeys}
        rowContent={obj => (
          <div className={classNames.redFlagsCell}>
            <img src={`/assets/icons/redflags/${obj.title}.svg`} alt={obj.title} />
            <div title={obj.title || t(TranslationKey.Empty)} className={classNames.shopName}>
              {obj.title || t(TranslationKey.Empty)}
            </div>
          </div>
        )}
        onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
        onClickAccept={onClickAccept}
        onClickFilterBtn={onClickFilterBtn}
        onClose={onClose}
      />
    )
  }, styles),
)

export const OnListingCellMenuItem = React.memo(
  withStyles(({ classes: classNames, data, onClose }) => {
    // const {
    //   classes: classNames,
    //   onClose,
    //   data,
    //   field,
    //   filterRequestStatus,
    //   onChangeFullFieldMenuItem,
    //   onClickAccept,
    //   onClickFilterBtn,
    //   onListingFiltersData
    // } = props;

    return (
      <div className={classNames.shopsDataWrapper}>
        <div className={classNames.shopsWrapper}>
          <div className={classNames.shopsBody}>
            <div className={classNames.shop}>
              <Checkbox
                color="primary"
                checked={data.onListingFiltersData.onListing}
                onClick={() => {
                  if (data.onListingFiltersData.onListing) {
                    data.onListingFiltersData.handleListingFilters(false, true)
                  } else {
                    data.onListingFiltersData.handleListingFilters(true, true)
                  }
                }}
              />

              <Typography title={t(TranslationKey.Yes)}>{t(TranslationKey.Yes)}</Typography>
            </div>

            <div className={classNames.shop}>
              <Checkbox
                color="primary"
                checked={data.onListingFiltersData.notOnListing}
                onClick={() => {
                  if (data.onListingFiltersData.notOnListing) {
                    data.onListingFiltersData.handleListingFilters(true, false)
                  } else {
                    data.onListingFiltersData.handleListingFilters(true, true)
                  }
                }}
              />

              <Typography title={t(TranslationKey.No)}>{t(TranslationKey.No)}</Typography>
            </div>
          </div>
        </div>
        <div className={classNames.buttonsWrapper}>
          <Button
            variant="contained"
            onClick={e => {
              onClose(e)
            }}
          >
            {t(TranslationKey.Accept)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

export const YesNoCellMenuItem = React.memo(
  withStyles(({ classes: classNames, data, onClose, field }) => {
    const filterData = data[`${field}YesNoFilterData`]

    return (
      <div className={classNames.shopsDataWrapper}>
        <div className={classNames.shopsWrapper}>
          <div className={classNames.shopsBody}>
            <div className={classNames.shop}>
              <Checkbox
                color="primary"
                checked={filterData.yes}
                onClick={() => {
                  if (filterData.yes) {
                    filterData.handleFilters(false, true)
                  } else {
                    filterData.handleFilters(true, true)
                  }
                }}
              />

              <Typography title={t(TranslationKey.Yes)}>{t(TranslationKey.Yes)}</Typography>
            </div>

            <div className={classNames.shop}>
              <Checkbox
                color="primary"
                checked={filterData.no}
                onClick={() => {
                  if (filterData.no) {
                    filterData.handleFilters(true, false)
                  } else {
                    filterData.handleFilters(true, true)
                  }
                }}
              />

              <Typography title={t(TranslationKey.No)}>{t(TranslationKey.No)}</Typography>
            </div>
          </div>
        </div>
        <div className={classNames.buttonsWrapper}>
          <Button
            variant="contained"
            onClick={e => {
              onClose(e)
            }}
          >
            {t(TranslationKey.Accept)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

const batchShippingDateTabs = [
  {
    label: t(TranslationKey['CLS (batch closing date)']),
    value: 'cls',
  },
  {
    label: t(TranslationKey['ETD (date of shipment)']),
    value: 'etd',
  },
  {
    label: t(TranslationKey['ETA (arrival date)']),
    value: 'eta',
  },
]

export const BatchShippingDateCellMenuItem = React.memo(
  withStyles(props => {
    const {
      classes: classNames,
      data,
      field,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClose,
    } = props
    const [currentTab, setCurrentTab] = useState(field)

    useEffect(() => {
      onClickFilterBtn(currentTab)
    }, [currentTab])

    return (
      <FromToDateMenuItem
        data={data[currentTab]}
        field={currentTab}
        filterRequestStatus={filterRequestStatus}
        headerControls={() => (
          <FormControl className={classNames.formControl}>
            <RadioGroup
              row
              className={cx(classNames.radioGroup, classNames.formedRadioGroup)}
              value={currentTab}
              onChange={(event, value) => setCurrentTab(value)}
            >
              {batchShippingDateTabs.map((el, index) => (
                <FormControlLabel
                  key={index}
                  title={el.label}
                  className={classNames.radioOption}
                  value={el.value}
                  control={<Radio className={classNames.radioControl} />}
                  label={el.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
        onClose={onClose}
        onClickFilterBtn={onClickFilterBtn}
        onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
        onClickAccept={onClickAccept}
      />
    )
  }, styles),
)

const batchTrackingTabs = [
  {
    label: t(TranslationKey['Track number']),
    value: 'trackingNumber',
  },
  {
    label: t(TranslationKey['Arrival date']),
    value: 'arrivalDate',
  },
]

export const BatchTrackingCellMenuItem = React.memo(
  withStyles(props => {
    const {
      classes: classNames,
      data,
      field,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClose,
    } = props
    const [currentTab, setCurrentTab] = useState(field)

    useEffect(() => {
      onClickFilterBtn(currentTab)
    }, [currentTab])

    return (
      <div className={classNames.shopsDataWrapper}>
        <div>
          <FormControl className={classNames.formControl}>
            <RadioGroup
              row
              className={cx(classNames.radioGroupTwoItems)}
              value={currentTab}
              onChange={event => setCurrentTab(event.target.value)}
            >
              {batchTrackingTabs.map((el, index) => (
                <FormControlLabel
                  key={index}
                  title={el.label}
                  className={classNames.radioOption}
                  value={el.value}
                  control={<Radio className={classNames.radioControl} />}
                  label={el.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>

        {currentTab === batchTrackingTabs[0].value && (
          <NormalFieldMenuItem
            data={data[currentTab]}
            field={currentTab}
            filterRequestStatus={filterRequestStatus}
            columnKey={currentTab}
            onClickFilterBtn={onClickFilterBtn}
            onClose={onClose}
            onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
            onClickAccept={onClickAccept}
          />
        )}

        {currentTab === batchTrackingTabs[1].value && (
          <FromToDateMenuItem
            data={data[currentTab]}
            field={currentTab}
            filterRequestStatus={filterRequestStatus}
            onClickFilterBtn={onClickFilterBtn}
            onClose={onClose}
            onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
            onClickAccept={onClickAccept}
          />
        )}
      </div>
    )
  }, styles),
)

export const NumberWithTabsMenuItem = React.memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      filterRequestStatus,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
      tabs,
    }) => {
      const [activeTab, setActiveTab] = useState(tabs[0].value)

      useEffect(() => {
        onClickFilterBtn(activeTab)
      }, [activeTab])

      return (
        <div className={styles.shopsDataWrapper}>
          <div>
            <FormControl className={styles.formControl}>
              <RadioGroup
                row
                className={styles.radioGroup}
                value={activeTab}
                onChange={event => setActiveTab(event.target.value)}
              >
                {tabs.map((el, index) => (
                  <FormControlLabel
                    key={index}
                    title={el.label}
                    className={styles.radioOption}
                    value={el.value}
                    control={<Radio className={styles.radioControl} />}
                    label={el.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <NumberFieldMenuItem
            asBlock
            data={data[activeTab]}
            field={activeTab}
            filterRequestStatus={filterRequestStatus}
            onClickFilterBtn={onClickFilterBtn}
            onClose={onClose}
            onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
            onClickAccept={onClickAccept}
          />
        </div>
      )
    },
    styles,
  ),
)

const toPayCellTabs = [
  {
    value: 'priceInYuan',
    label: t(TranslationKey['To pay']),
  },
  {
    value: 'partialPaymentAmountRmb',
    label: t(TranslationKey['To pay partial']),
  },
]

export const ToPayCellMenuItem = React.memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      field,
      filterRequestStatus,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
    }) => {
      const isShowTabs = ['/buyer/partially-paid-orders', '/buyer/all-orders'].includes(window.location.pathname)

      return (
        <>
          {isShowTabs && (
            <NumberWithTabsMenuItem
              data={data}
              filterRequestStatus={filterRequestStatus}
              tabs={toPayCellTabs}
              onClickFilterBtn={onClickFilterBtn}
              onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
              onClickAccept={() => {
                onClickAccept()
              }}
              onClose={onClose}
            />
          )}

          {!isShowTabs && (
            <NumberFieldMenuItem
              data={data[field]}
              field={field}
              filterRequestStatus={filterRequestStatus}
              onClickFilterBtn={onClickFilterBtn}
              onClose={onClose}
              onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
              onClickAccept={onClickAccept}
            />
          )}
        </>
      )
    },
    styles,
  ),
)

export const SecondsCellMenuItem = React.memo(
  withStyles((props, context) => {
    const {
      classes: styles,
      onClose,
      data,
      field,
      filterRequestStatus,
      onChangeFullFieldMenuItem,

      onClickAccept,
      onClickFilterBtn,
    } = props

    const { filterData, currentFilterData } = data

    const [choosenItems, setChoosenItems] = useState(currentFilterData)

    const [itemsForRender, setItemsForRender] = useState(filterData || [])

    useEffect(() => {
      onClickFilterBtn(field)
    }, [])

    useEffect(() => {
      setChoosenItems(currentFilterData)
    }, [currentFilterData])

    useEffect(() => {
      setItemsForRender(
        filterData
          .filter(el => el || el === 0 || el === '0')
          .sort(
            (a, b) =>
              Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)) ||
              Number(b) - Number(a),
          ),
      )
    }, [filterData])

    const onClickItem = str => {
      if (choosenItems.some(item => item === str)) {
        setChoosenItems(choosenItems.slice().filter(item => item !== str))
      } else {
        setChoosenItems([...choosenItems, str])
      }
    }

    return (
      <div className={styles.shopsDataWrapper}>
        <div className={styles.shopsWrapper}>
          <div className={styles.shopsBody}>
            {filterRequestStatus === loadingStatuses.isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {itemsForRender.length ? (
                  <>
                    <DataGridSelectAllFilters
                      choosenItems={choosenItems}
                      itemsForRender={itemsForRender}
                      setChoosenItems={setChoosenItems}
                    />
                    {itemsForRender?.map((el, index) => (
                      <div key={index} className={styles.shop}>
                        <Checkbox
                          color="primary"
                          checked={choosenItems?.some(item => item === el)}
                          onClick={() => onClickItem(el)}
                        />
                        <div className={styles.shopName}>{minsToTime(el / 60)}</div>
                      </div>
                    ))}
                  </>
                ) : (
                  <Typography className={styles.noOptionText}>{t(TranslationKey['No options'])}</Typography>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            variant="contained"
            onClick={e => {
              onClose(e)
              onChangeFullFieldMenuItem(choosenItems, field)
              onClickAccept()
            }}
          >
            {t(TranslationKey.Accept)}
          </Button>
          <Button variant="text" className={styles.cancelBtn} onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)
