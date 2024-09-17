import { cx } from '@emotion/css'
import { compareDesc, isAfter, parseISO } from 'date-fns'
import { memo, useCallback, useEffect, useState } from 'react'
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
import { MyRequestStatus, MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { BoxStatus, boxStatusTranslateKey } from '@constants/statuses/box-status'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'
import { chosenStatusesByFilter } from '@constants/statuses/inventory-product-orders-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridSelectAllFilters } from '@components/data-grid/data-grid-custom-components/data-grid-select-all-filters/data-grid-select-all-filters'
import { Button } from '@components/shared/button'
import { Checkbox } from '@components/shared/checkbox'
import { DatePicker } from '@components/shared/date-picker'
import { Input } from '@components/shared/input'
import { SearchInput } from '@components/shared/search-input'
import { Text } from '@components/shared/text'

import { checkIsPositiveNum, checkIsPositiveOrNegativeDigit } from '@utils/checks'
import { formatNormDateTime } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getStatusByColumnKeyAndStatusKey, minsToTime, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { styles } from './data-grid-menu-items.style'

import { negativeOrPositiveList, wholeIntegersList } from './whole-integers-list'

export const IsFormedMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      isFormedData,
      onClose,
      data,
      field,
      table,
      filterRequestStatus,
      columnKey,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
    }) => {
      const [currentOption, setCurrentOption] = useState('first')

      const handleCategory = e => {
        if (e.target.value === 'second') {
          onClickFilterBtn(field, table)
        }
        setCurrentOption(e.target.value)
      }

      return (
        <div title="" className={styles.isFormedWrapper}>
          <div>
            <FormControl className={styles.formControl}>
              <RadioGroup
                row
                className={cx(styles.radioGroup, styles.formedRadioGroup)}
                value={currentOption}
                onChange={handleCategory}
              >
                <FormControlLabel
                  title={t(TranslationKey.Formed)}
                  className={styles.radioOption}
                  value="first"
                  control={<Radio className={styles.radioControl} />}
                  label={t(TranslationKey.Formed)}
                />
                <FormControlLabel
                  title={t(TranslationKey.Responsible)}
                  className={styles.radioOption}
                  value="second"
                  control={<Radio className={styles.radioControl} />}
                  label={t(TranslationKey.Responsible)}
                />
              </RadioGroup>
            </FormControl>
          </div>

          {currentOption === 'first' && (
            <div className={styles.shopsWrapper}>
              <div className={styles.shopsBody}>
                <div className={styles.shop}>
                  <Checkbox
                    color="primary"
                    checked={isFormedData.isFormed || isFormedData.isFormed === undefined}
                    onClick={() =>
                      isFormedData.onChangeIsFormed(
                        isFormedData.isFormed !== undefined
                          ? isFormedData.isFormed
                            ? !isFormedData.isFormed
                            : undefined
                          : false,
                      )
                    }
                  />

                  <p title={t(TranslationKey.Formed)}>{t(TranslationKey.Formed)}</p>
                </div>

                <div className={styles.shop}>
                  <Checkbox
                    color="primary"
                    checked={!isFormedData.isFormed || isFormedData.isFormed === undefined}
                    onClick={() =>
                      isFormedData.onChangeIsFormed(
                        isFormedData.isFormed !== undefined
                          ? !isFormedData.isFormed
                            ? !isFormedData.isFormed
                            : undefined
                          : true,
                      )
                    }
                  />

                  <p title={t(TranslationKey['Not formed'])}>{t(TranslationKey['Not formed'])}</p>
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
                table={table}
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

export const IsNeedPurchaseFilterMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      isNeedPurchaseFilterData,
      onClose,
      data,
      table,
      defaultOption,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,
      onClickAccept,
    }) => {
      const [currentOption, setCurrentOption] = useState('first')

      const firstOptionTitle = defaultOption ? t(TranslationKey['For shipping']) : t(TranslationKey.Repurchase)
      const secondOptionTitle = defaultOption
        ? t(TranslationKey['Quantity to shipping'])
        : t(TranslationKey['Quantity of repurchase'])

      const isSomeFilterActive =
        !isNeedPurchaseFilterData.isNeedPurchaseFilter || !isNeedPurchaseFilterData.isNotNeedPurchaseFilter

      const handleCategory = e => {
        if (e.target.value === 'second' && isSomeFilterActive) {
          isNeedPurchaseFilterData.onChangeIsNeedPurchaseFilter(true, true)
        }

        setCurrentOption(e.target.value)
      }

      return (
        <div title="" className={styles.shopsDataWrapper}>
          <div>
            <FormControl className={styles.formControl}>
              <RadioGroup row className={styles.radioGroup} value={currentOption} onChange={handleCategory}>
                <FormControlLabel
                  title={firstOptionTitle}
                  className={styles.radioOption}
                  value="first"
                  control={<Radio className={styles.radioControl} />}
                  label={firstOptionTitle}
                />
                <FormControlLabel
                  title={secondOptionTitle}
                  className={styles.radioOption}
                  value="second"
                  control={<Radio className={styles.radioControl} />}
                  label={secondOptionTitle}
                />
              </RadioGroup>
            </FormControl>
          </div>

          {currentOption === 'first' && (
            <div className={styles.isFormedWrapper}>
              <div className={styles.isFormedSubWrapper}>
                <p title={t(TranslationKey['Not need refills'])}>{t(TranslationKey['Not need refills'])}</p>

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

              <div className={styles.isFormedSubWrapper}>
                <p title={t(TranslationKey['Need refills'])}>{t(TranslationKey['Need refills'])}</p>

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
              data={defaultOption ? data?.toRefill : data?.purchaseQuantity}
              field={defaultOption ? 'toRefill' : 'purchaseQuantity'}
              defaultOption={defaultOption}
              table={table}
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

export const IsHaveBarCodeFilterMenuItem = memo(
  withStyles(
    ({ classes: styles, isHaveBarCodeFilterData }) => (
      <div title="" className={styles.isFormedWrapper}>
        <div className={styles.isFormedSubWrapper}>
          <p title={t(TranslationKey['Got barcode'])}>{t(TranslationKey['Got barcode'])}</p>

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

        <div className={styles.isFormedSubWrapper}>
          <p title={t(TranslationKey['No barcode'])}>{t(TranslationKey['No barcode'])}</p>

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

export const OrderStatusMenuItem = memo(
  withStyles(({ classes: styles, orderStatusData }) => {
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
      <div title="" className={styles.isFormedWrapper}>
        {checkboxes.map(item => (
          <div key={item.name} className={styles.isFormedSubWrapper}>
            <p title={item.label}>{item.label}</p>

            <Checkbox color="primary" name={item.name} checked={item.checked} onChange={onCheckboxChange} />
          </div>
        ))}

        <Divider />
      </div>
    )
  }, styles),
)

export const MyRequestsStatusMenuItem = memo(
  withStyles(({ classes: styles, onClose, data, field, onChangeFullFieldMenuItem, onClickAccept }) => {
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
      <div title="" className={styles.shopsDataWrapper}>
        <div className={styles.searchInputWrapper}>
          <SearchInput
            key={'client_warehouse_search_input'}
            inputClasses={styles.searchInput}
            placeholder={t(TranslationKey.Search)}
            onChange={e => {
              setNameSearchValue(e.target.value)
            }}
          />
        </div>
        <div className={styles.shopsWrapper}>
          <div className={styles.shopsBody}>
            <>
              {itemsForRender?.length ? (
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
                      <div key={index} className={styles.shop}>
                        <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                        <div title={value} className={styles.shopName}>
                          {value}
                        </div>
                      </div>
                    )
                  })}
                </>
              ) : (
                <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                  {t(TranslationKey['No options'])}
                </p>
              )}
            </>
          </div>
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            onClick={e => {
              onClose(e)
              onChangeFullFieldMenuItem(choosenItems, field)

              onClickAccept()
            }}
          >
            {t(TranslationKey.Accept)}
          </Button>
          <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

export const FreelanceRequestType = memo(
  withStyles(({ classes: styles, onClose, data, field, onChangeFullFieldMenuItem, onClickAccept }) => {
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
        const filter = filterData?.filter(item => item.toLowerCase().includes(nameSearchValue.toLowerCase()))
        setItemsForRender(filter)
      } else {
        setItemsForRender(filterData)
      }
    }, [nameSearchValue])

    return (
      <div title="" className={styles.shopsDataWrapper}>
        <div className={styles.searchInputWrapper}>
          <SearchInput
            key={'client_warehouse_search_input'}
            inputClasses={styles.searchInput}
            placeholder={t(TranslationKey.Search)}
            onChange={e => {
              setNameSearchValue(e.target.value)
            }}
          />
        </div>
        <div className={styles.shopsWrapper}>
          <div className={styles.shopsBody}>
            <>
              {itemsForRender?.length ? (
                <>
                  <DataGridSelectAllFilters
                    choosenItems={choosenItems}
                    itemsForRender={itemsForRender}
                    setChoosenItems={setChoosenItems}
                  />
                  {itemsForRender.map((el, index) => {
                    const value = el || t(TranslationKey.Empty)
                    const valueChecked = choosenItems.some(item => item === el)

                    return (
                      freelanceRequestType.DEFAULT !== el && (
                        <div key={index} className={styles.shop}>
                          <Checkbox
                            color="primary"
                            checked={valueChecked}
                            onClick={() => onClickItem(freelanceRequestType[el])}
                          />
                          <div title={value} className={styles.shopName}>
                            {value}
                          </div>
                        </div>
                      )
                    )
                  })}
                </>
              ) : (
                <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                  {t(TranslationKey['No options'])}
                </p>
              )}
            </>
          </div>
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            onClick={e => {
              onClose(e)
              onChangeFullFieldMenuItem(choosenItems, field)

              onClickAccept()
            }}
          >
            {t(TranslationKey.Accept)}
          </Button>
          <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

export const CreatedByMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      table,
      filterRequestStatus,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
    }) => {
      useEffect(() => {
        onClickFilterBtn('createdBy', table)
        onClickFilterBtn('sub', table)
      }, [])

      const filterData = [...data.createdBy.filterData, ...data.sub.filterData] || []
      const currentFilterData = [...data.createdBy.currentFilterData, ...data.sub.currentFilterData] || []

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = obj => {
        if (choosenItems.some(item => item._id === obj._id)) {
          setChoosenItems(choosenItems.filter(item => item._id !== obj._id))
        } else {
          setChoosenItems([...choosenItems, obj])
        }
      }

      const [itemsForRender, setItemsForRender] = useState(filterData || [])

      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        setItemsForRender(
          filterData.sort(
            (a, b) =>
              currentFilterData.length &&
              Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)),
          ),
        )
      }, [data.createdBy.filterData, data.sub.filterData])

      useEffect(() => {
        if (nameSearchValue) {
          const filter = filterData?.filter(item =>
            String(item?.name).toLowerCase().includes(nameSearchValue.toLowerCase()),
          )
          setItemsForRender(filter)
        } else {
          setItemsForRender(filterData)
        }
      }, [nameSearchValue])

      return (
        <div title="" className={styles.shopsDataWrapper}>
          <div className={styles.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={styles.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={styles.shopsWrapper}>
            <div className={styles.shopsBody}>
              {filterRequestStatus === loadingStatus.IS_LOADING ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender?.length ? (
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
                          <div key={obj?._id} className={styles.shop}>
                            <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(obj)} />
                            <div title={value} className={styles.shopName}>
                              {value}
                            </div>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className={styles.buttonsWrapper}>
            <Button
              onClick={e => {
                onClose(e)

                let choosenSub = []
                if (choosenItems?.some(item => data?.sub?.filterData?.some(obj => obj?._id === item?._id))) {
                  choosenSub = choosenItems.filter(item => data?.sub?.filterData?.some(obj => obj?._id === item?._id))
                }
                onChangeFullFieldMenuItem(choosenSub, 'sub')

                let choosenCreatedBy = []
                if (choosenItems.some(item => data?.createdBy?.filterData?.some(obj => obj?._id === item?._id))) {
                  choosenCreatedBy = choosenItems.filter(item =>
                    data?.createdBy?.filterData?.some(obj => obj?._id === item?._id),
                  )
                }
                onChangeFullFieldMenuItem(choosenCreatedBy, 'createdBy')

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const ObJectFieldMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      field,
      table,
      filterRequestStatus,
      addNullObj,
      nullObjName,
      nullObjKey,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
      rowContent,
      asBlock,
    }) => {
      const filterData = data?.filterData
      const currentFilterData = data?.currentFilterData

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = obj => {
        if (choosenItems.some(item => item._id === obj._id)) {
          setChoosenItems(choosenItems.filter(item => item._id !== obj._id))
        } else {
          setChoosenItems([...choosenItems, obj])
        }
      }

      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      useEffect(() => {
        onClickFilterBtn(field, table)
      }, [])

      const [itemsForRender, setItemsForRender] = useState(filterData || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      const filteredDataWithNull = addNullObj
        ? [{ [nullObjKey]: nullObjName || t(TranslationKey['Without stores']), _id: 'null' }, ...filterData]
        : filterData

      const sortedData = filteredDataWithNull
        .filter(el => el)
        .sort((a, b) => {
          const isBNull = b._id === 'null'
          const isANull = a._id === 'null'

          return (
            Number(isBNull) - Number(isANull) ||
            Number(choosenItems?.some(item => item._id === b._id)) -
              Number(choosenItems?.some(item => item._id === a._id))
          )
        })

      useEffect(() => {
        setItemsForRender(sortedData)
      }, [filterData])

      useEffect(() => {
        if (nameSearchValue) {
          const filter = sortedData?.filter(obj => {
            const title = obj?.title || obj?.name || ''

            return title?.toLowerCase()?.includes(nameSearchValue?.toLowerCase())
          })

          setItemsForRender(filter)
        } else {
          setItemsForRender(sortedData)
        }
      }, [nameSearchValue])

      return (
        <div
          title=""
          className={cx({ [styles.shopsDataWrapper]: !asBlock, [styles.shopsDataWrapperBlocked]: asBlock })}
        >
          <div className={styles.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={styles.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => setNameSearchValue(e.target.value)}
            />
          </div>
          <div className={styles.shopsWrapper}>
            <div className={styles.shopsBody}>
              {filterRequestStatus === loadingStatus.IS_LOADING ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender?.length > 0 ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender.map(obj => {
                        const value = obj?.title || obj?.name || t(TranslationKey.Empty)
                        const valueChecked = choosenItems.some(item => item?._id === obj?._id)

                        return (
                          obj && (
                            <div key={obj._id} className={styles.shop}>
                              <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(obj)} />
                              {rowContent ? (
                                rowContent(obj)
                              ) : (
                                <div title={value} className={styles.shopName}>
                                  {value}
                                </div>
                              )}
                            </div>
                          )
                        )
                      })}
                    </>
                  ) : (
                    <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <Button
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const IdeaShopsFieldMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      field,
      table,
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
      }, [data?.childProductShop?.filterData?.length, data?.parentProductShop?.filterData?.length])
      // НУжно переделать
      useEffect(() => {
        setCurrentFilterData(getData('currentFilterData'))
      }, [data?.childProductShop?.currentFilterData?.length, data?.parentProductShop?.currentFilterData?.length])

      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      useEffect(() => {
        for (const item of field) {
          onClickFilterBtn(item, table)
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
        <div
          title=""
          className={cx({ [styles.shopsDataWrapper]: !asBlock, [styles.shopsDataWrapperBlocked]: asBlock })}
        >
          <div className={styles.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={styles.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={styles.shopsWrapper}>
            <div className={styles.shopsBody}>
              {filterRequestStatus === loadingStatus.IS_LOADING ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender?.length ? (
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
                            <div key={obj._id} className={styles.shop}>
                              <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(obj)} />
                              {rowContent ? (
                                rowContent(obj)
                              ) : (
                                <div title={value} className={styles.shopName}>
                                  {value}
                                </div>
                              )}
                            </div>
                          )
                        )
                      })}
                    </>
                  ) : (
                    <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <Button
              onClick={e => {
                onClose(e)

                // НУжно переделать
                const parentShops = choosenItems.filter(item =>
                  data?.parentProductShop?.filterData?.some(obj => obj?._id === item?._id),
                )
                const childShops = choosenItems.filter(item =>
                  data?.childProductShop?.filterData?.some(obj => obj?._id === item?._id),
                )

                if (parentShops?.length) {
                  onChangeFullFieldMenuItem(parentShops, 'parentProductShop')
                }
                if (childShops?.length) {
                  onChangeFullFieldMenuItem(childShops, 'childProductShop')
                }

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const BoxestatusMenuItem = memo(
  withStyles(({ classes: styles, data, onChangeFullFieldMenuItem, onClose, field, onClickAccept }) => {
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
      <div title="" className={styles.shopsDataWrapper}>
        <div className={styles.orderStatusDataBody}>
          <div className={styles.orderStatus} onClick={() => onClickItem('ALL')}>
            <Checkbox color="primary" checked={choosenItems.length === 4 || !choosenItems.length} />
            <div className={styles.orderStatusName}>{t(TranslationKey.All)}</div>
          </div>
          {[
            BoxStatus.NEW,
            BoxStatus.IN_STOCK,
            BoxStatus.REQUESTED_SEND_TO_BATCH,
            BoxStatus.ACCEPTED_IN_PROCESSING,
            BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
            BoxStatus.NEED_TO_UPDATE_THE_TARIFF,
          ].map(item => (
            <div key={item} className={styles.orderStatus} onClick={() => onClickItem(item)}>
              <Checkbox color="primary" checked={choosenItems?.some(status => status === item)} />
              <div title={boxStatusTranslateKey(item)} className={styles.orderStatusName}>
                {boxStatusTranslateKey(item)}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            onClick={e => {
              onClose(e)
              onChangeFullFieldMenuItem(choosenItems, field)

              onClickAccept()
            }}
          >
            {t(TranslationKey.Accept)}
          </Button>
          <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

export const NormalFieldMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      field,
      table,
      filterRequestStatus,
      columnKey,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
      asBlock = false,
    }) => {
      useEffect(() => {
        onClickFilterBtn(field, table)
      }, [])

      const filterData = data?.filterData
      const currentFilterData = data?.currentFilterData

      const [choosenItems, setChoosenItems] = useState([])

      useEffect(() => {
        if (currentFilterData) {
          setChoosenItems(currentFilterData.filter(item => filterData?.includes(item)))
        }
      }, [currentFilterData, filterData])

      const onClickItem = str => {
        if (choosenItems?.some(item => item === str)) {
          setChoosenItems(choosenItems?.filter(item => item !== str))
        } else {
          setChoosenItems([...choosenItems, str])
        }
      }

      const [itemsForRender, setItemsForRender] = useState([])

      useEffect(() => {
        if (filterData) {
          setItemsForRender(
            filterData
              ?.filter(el => el !== undefined && el !== null)
              ?.sort(
                (a, b) =>
                  currentFilterData.length &&
                  Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)),
              ),
          )
        }
      }, [filterData])

      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        if (nameSearchValue) {
          const filter = filterData?.filter(item =>
            String(getStatusByColumnKeyAndStatusKey(item, columnKey))
              ?.toLowerCase()
              ?.includes(nameSearchValue.toLowerCase()),
          )
          setItemsForRender(filter)
        } else {
          setItemsForRender(filterData)
        }
      }, [nameSearchValue])

      return (
        <div
          title=""
          className={cx({
            [styles.universalFilterWrapper]: !asBlock,
            [styles.shopsDataWrapperBlocked]: asBlock,
            [styles.fullName]: [columnnsKeys.buyer.MY_PRODUCTS_STATUS, columnnsKeys.client.INVENTORY_STATUS].includes(
              columnKey,
            ),
          })}
        >
          <div className={styles.universalFilterSearchInputWrapper}>
            <SearchInput
              key="client_warehouse_search_input"
              inputClasses={styles.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => setNameSearchValue(e.target.value)}
            />
          </div>

          <div className={styles.universalFilterBody}>
            {filterRequestStatus === loadingStatus.IS_LOADING ? (
              <CircularProgress />
            ) : (
              <>
                {itemsForRender?.length ? (
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
                        <div key={index} className={styles.shop}>
                          <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                          <Text text={value} />
                        </div>
                      )
                    })}
                  </>
                ) : (
                  <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                    {t(TranslationKey['No options'])}
                  </p>
                )}
              </>
            )}
          </div>

          <div className={styles.buttonsWrapper}>
            <Button
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const PriorityMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      field,
      table,
      columnKey,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
    }) => {
      useEffect(() => {
        onClickFilterBtn(field, table)
      }, [])

      const isOrder = ['MY_ORDERS_PRIORITY', 'ORDERS_PRIORITY'].includes(columnKey)
      const urgentPriority = isOrder ? [40] : [30]
      const withoutPriority = isOrder ? [30] : [10, 20]

      const currentFilterData = data?.currentFilterData

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
        <div title="" className={styles.shopsDataWrapper}>
          <div className={styles.shopsWrapper}>
            <div className={styles.shopsBody}>
              <div className={styles.shop}>
                <Checkbox
                  color="primary"
                  checked={choosenItems.some(item => urgentPriority.includes(Number(item)))}
                  onClick={() => onClickItem(urgentPriority)}
                />
                <div title={shopName} className={styles.shopName}>
                  {t(TranslationKey[`${shopName}`])} <img src="/assets/icons/fire.svg" />
                </div>
              </div>

              <div className={styles.shop}>
                <Checkbox
                  color="primary"
                  checked={choosenItems.some(item => withoutPriority.includes(Number(item)))}
                  onClick={() => {
                    onClickItem(withoutPriority)
                  }}
                />
                <div title={'Without Priority'} className={styles.shopName}>
                  {t(TranslationKey['Without Priority'])}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttonsWrapper}>
            <Button
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const FreelancerToWorkConfirmationMenuItem = memo(
  withStyles(
    ({ classes: styles, onClose, data, field, onChangeFullFieldMenuItem, onClickAccept, onClickFilterBtn }) => {
      const currentFilterData = data?.currentFilterData

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = value => {
        if (choosenItems.some(item => item === value)) {
          setChoosenItems(choosenItems?.filter(item => !item === value))
        } else {
          setChoosenItems([...choosenItems, value])
        }
      }

      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      return (
        <div title="" className={styles.shopsDataWrapper}>
          <div className={styles.shopsWrapper}>
            <div className={styles.shopsBody}>
              <div className={styles.shop}>
                <Checkbox
                  color="primary"
                  checked={choosenItems.some(item => item === true)}
                  onClick={() => onClickItem(true)}
                />
                <div title={t(TranslationKey.Yes)} className={styles.shopName}>
                  {t(TranslationKey.Yes)}
                </div>
              </div>

              <div className={styles.shop}>
                <Checkbox
                  color="primary"
                  checked={choosenItems.some(item => item === false)}
                  onClick={() => onClickItem(false)}
                />
                <div title={t(TranslationKey.No)} className={styles.shopName}>
                  {t(TranslationKey.No)}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttonsWrapper}>
            <Button
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const OrderOrItemMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      table,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,

      onClickAccept,
    }) => {
      const [currentOption, setCurrentOption] = useState(data.item.currentFilterData.length ? 'item' : 'id')

      useEffect(() => {
        onClickFilterBtn(currentOption, table)

        if (currentOption === 'item') {
          onChangeFullFieldMenuItem([], 'id')
        } else {
          onChangeFullFieldMenuItem([], 'item')
        }
      }, [currentOption])

      const filterData = data[currentOption]?.filterData
      const currentFilterData = data[currentOption]?.currentFilterData

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
            ?.filter(el => el)
            ?.sort(
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
        <div title="" className={styles.shopsDataWrapper}>
          <div>
            <FormControl className={styles.formControl}>
              <FormLabel className={styles.radioLable}>{t(TranslationKey['Search by']) + ':'}</FormLabel>
              <RadioGroup
                row
                className={styles.radioGroupTwoItems}
                value={currentOption}
                onChange={e => setCurrentOption(e.target.value)}
              >
                <FormControlLabel
                  title={t(TranslationKey['№ Order'])}
                  className={styles.radioOption}
                  value="id"
                  control={<Radio className={styles.radioControl} />}
                  label={t(TranslationKey['№ Order'])}
                />
                <FormControlLabel
                  title={'№Item'}
                  className={styles.radioOption}
                  value="item"
                  control={<Radio className={styles.radioControl} />}
                  label={'№Item'}
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className={styles.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={styles.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={styles.shopsWrapper}>
            <div className={styles.shopsBody}>
              {filterRequestStatus === loadingStatus.IS_LOADING ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender?.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender.map((el, index) => {
                        const value = el || t(TranslationKey.Empty)
                        const valueChecked = choosenItems?.some(item => item === el)

                        return (
                          <div key={index} className={styles.shop}>
                            <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                            <div title={value} className={styles.shopName}>
                              {value}
                            </div>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <Button
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, currentOption)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const DestinationMenuItem = memo(
  withStyles(props => {
    const {
      classes: styles,
      onClose,
      data,
      table,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,
      onClickAccept,
    } = props

    const [currentOption, setCurrentOption] = useState(
      data.destinationId
        ? 'destinationId'
        : data.logicsTariffId
        ? 'logicsTariffId'
        : data.logicsTariff.currentFilterData.length
        ? 'logicsTariff'
        : 'destination',
    )

    const filterData = data[currentOption]?.filterData
    const currentFilterData = data[currentOption]?.currentFilterData

    const [choosenItems, setChoosenItems] = useState(currentFilterData)
    const [itemsForRender, setItemsForRender] = useState(filterData || [])
    const [nameSearchValue, setNameSearchValue] = useState('')

    useEffect(() => {
      onClickFilterBtn(currentOption, table)
    }, [currentOption])

    useEffect(() => {
      setChoosenItems(currentFilterData)
    }, [currentFilterData])

    useEffect(() => {
      setItemsForRender(
        filterData
          ?.filter(el => el)
          ?.sort(
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
      <div title="" className={styles.shopsDataWrapper}>
        <div>
          <FormControl className={styles.formControl}>
            <FormLabel title={t(TranslationKey['Search by'])} className={styles.radioLable}>
              {t(TranslationKey['Search by']) + ':'}
            </FormLabel>
            <RadioGroup row className={styles.radioGroupTwoItems} value={currentOption} onChange={handleCategory}>
              <FormControlLabel
                title={t(TranslationKey.Destination)}
                className={styles.radioOption}
                value={data.destinationId ? 'destinationId' : 'destination'}
                control={<Radio className={styles.radioControl} />}
                label={t(TranslationKey.Destination)}
              />
              <FormControlLabel
                title={t(TranslationKey.Tariff)}
                className={styles.radioOption}
                value={data.logicsTariffId ? 'logicsTariffId' : 'logicsTariff'}
                control={<Radio className={styles.radioControl} />}
                label={t(TranslationKey.Tariff)}
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className={styles.searchInputWrapper}>
          <SearchInput
            key={'client_warehouse_search_input'}
            inputClasses={styles.searchInput}
            placeholder={t(TranslationKey.Search)}
            onChange={e => setNameSearchValue(e.target.value)}
          />
        </div>
        <div className={styles.shopsWrapper}>
          <div className={styles.shopsBody}>
            {filterRequestStatus === loadingStatus.IS_LOADING ? (
              <CircularProgress />
            ) : (
              <>
                {itemsForRender?.length ? (
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
                        <div key={obj?._id} className={styles.shop}>
                          <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(obj)} />
                          <div title={value} className={styles.shopName}>
                            {value}
                          </div>
                        </div>
                      )
                    })}
                  </>
                ) : (
                  <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                    {t(TranslationKey['No options'])}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <Button onClick={applyFilters}>{t(TranslationKey.Accept)}</Button>
          <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)

export const FromToDateMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      field,
      table,
      filterRequestStatus,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
      headerControls,
    }) => {
      const [fromDate, setFromDate] = useState(null)
      const [toDate, setToDate] = useState(null)

      useEffect(() => {
        if (headerControls) {
          return
        }
        onClickFilterBtn(field, table)
      }, [])

      const filterData = data?.filterData
      const currentFilterData = data?.currentFilterData

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
            ?.filter(el => el)
            ?.sort(
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
        <div title="" className={styles.shopsDataWrapper}>
          <div className={styles.fromToDatesWrapper}>
            {headerControls && <div>{headerControls()}</div>}
            <div className={styles.fromToDatesSubWrapper}>
              <p title={t(TranslationKey.From)} className={styles.fromToText}>
                {t(TranslationKey.From)}
              </p>
              <DatePicker
                maxDate={new Date()}
                disablePast={false}
                className={styles.dateInput}
                value={fromDate}
                slotProps={{ field: { size: 'small' } }}
                onChange={setFromDate}
              />
            </div>
            <div className={styles.fromToDatesSubWrapper}>
              <p title={t(TranslationKey.To)} className={styles.fromToText}>
                {t(TranslationKey.To)}
              </p>

              <DatePicker
                minDate={new Date(fromDate)}
                disablePast={false}
                className={styles.dateInput}
                value={toDate}
                slotProps={{ field: { size: 'small' } }}
                onChange={setToDate}
              />
            </div>
          </div>

          <div className={styles.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={styles.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => setNameSearchValue(e.target.value)}
            />
          </div>
          <div className={styles.shopsWrapper}>
            <div className={styles.shopsBody}>
              {filterRequestStatus === loadingStatus.IS_LOADING ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender?.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender?.map((el, index) => {
                        const value = formatNormDateTime(el) || t(TranslationKey.Empty)
                        const valueChecked = choosenItems?.some(item => item === el)
                        return (
                          <div key={index} className={styles.shop}>
                            <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                            <div title={value} className={styles.shopName}>
                              {value}
                            </div>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <Button
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)

                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const DateDetailsMenuItem = memo(
  withStyles(
    ({ classes: styles, onClose, data, field, table, onChangeFullFieldMenuItem, onClickAccept, onClickFilterBtn }) => {
      const [searchType, setSearchType] = useState('days')
      const [searchFrom, setSearchFrom] = useState('')
      const [searchTo, setSearchTo] = useState('')
      const [filteredData, setFilteredData] = useState([])
      const [disableButton, setDisableButton] = useState(false)

      useEffect(() => {
        onClickFilterBtn(field, table)
      }, [])

      const handleSearchTypeChange = event => {
        setSearchType(event.target.value)
        updateFilteredData(event.target.value, searchFrom, searchTo)
      }

      const handleSearchFromChange = event => {
        setSearchFrom(event.target.value)
        updateFilteredData(searchType, event.target.value, searchTo)
      }

      const handleSearchToChange = event => {
        setSearchTo(event.target.value)
        updateFilteredData(searchType, searchFrom, event.target.value)
      }

      const updateFilteredData = (type, from, to) => {
        const multiplier = {
          days: 24 * 60 * 60,
          hours: 60 * 60,
          minutes: 60,
        }
        const searchValueFrom = from === '' ? 0 : parseInt(from) * multiplier[type]
        const searchValueTo = to === '' ? Infinity : parseInt(to) * multiplier[type]

        if (searchValueFrom > searchValueTo) {
          setDisableButton(true)
        } else {
          setDisableButton(false)
        }

        const filteredResults = data[field]?.filterData?.filter(
          item => item >= searchValueFrom && item <= searchValueTo,
        )
        setFilteredData(filteredResults)
      }

      return (
        <div title="" className={styles.dateDetailsWrapper}>
          <FormControl>
            <FormLabel
              id="date-details-filter-radio-buttons-group-label"
              title={t(TranslationKey['Search by'])}
              className={styles.searchLabel}
            >
              {t(TranslationKey['Search by']) + ':'}
            </FormLabel>
            <RadioGroup
              row
              value={searchType}
              name="date-details-filter-radio-buttons-group"
              aria-labelledby="date-details-filter-radio-buttons-group-label"
              className={styles.radioOptions}
              onChange={handleSearchTypeChange}
            >
              <FormControlLabel
                value="days"
                control={<Radio />}
                title={t(TranslationKey.days)}
                label={t(TranslationKey.days)}
                classes={{ label: styles.radioOptionDate }}
              />
              <FormControlLabel
                value="hours"
                control={<Radio />}
                title={t(TranslationKey.hours)}
                label={t(TranslationKey.hours)}
                classes={{ label: styles.radioOptionDate }}
              />
              <FormControlLabel
                value="minutes"
                control={<Radio />}
                title={t(TranslationKey.minutes)}
                label={t(TranslationKey.minutes)}
                classes={{ label: styles.radioOptionDate }}
              />
            </RadioGroup>
          </FormControl>

          <div className={styles.inpunts}>
            <div title={t(TranslationKey.From)} className={styles.inpuntContainer}>
              <span className={styles.radioOptionDate}>{t(TranslationKey.From)}</span>
              <input type="number" value={searchFrom} className={styles.inpunt} onChange={handleSearchFromChange} />
            </div>

            <div title={t(TranslationKey.To)} className={styles.inpuntContainer}>
              <span className={styles.radioOptionDate}>{t(TranslationKey.To)}</span>
              <input type="number" value={searchTo} className={styles.inpunt} onChange={handleSearchToChange} />
            </div>
          </div>

          <div className={styles.buttonsWrapper}>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
            <Button
              disabled={disableButton}
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(filteredData, field)
                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const NumberFieldMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      field,
      table,
      filterRequestStatus,
      onChangeFullFieldMenuItem,
      defaultOption,
      onClickAccept,
      onClickFilterBtn,
      asBlock = false,
    }) => {
      const filterData = data?.filterData
      const currentFilterData = data?.currentFilterData

      const [fromValue, setFromValue] = useState('')
      const [toValue, setToValue] = useState('')
      const [isNotFixedValue, setIsNotFixedValue] = useState(false)
      const [choosenItems, setChoosenItems] = useState(currentFilterData)
      const [itemsForRender, setItemsForRender] = useState(filterData || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      const onClickItem = str => {
        if (choosenItems.some(item => item === str)) {
          setChoosenItems(choosenItems.slice().filter(item => item !== str))
        } else {
          setChoosenItems([...choosenItems, str])
        }
      }

      const checkIsNotFixedValue = useCallback(() => {
        return wholeIntegersList.includes(field)
      }, [field])

      const inputNumberCheckHandler = (value, isToType) => {
        const isValidDigit = negativeOrPositiveList.includes(field)
          ? checkIsPositiveOrNegativeDigit(value)
          : checkIsPositiveNum(value)

        if (isValidDigit) {
          isToType ? setToValue(value) : setFromValue(value)
        }
      }

      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      useEffect(() => {
        onClickFilterBtn(field, table, defaultOption ? `;storekeeper[$eq]="${defaultOption}"` : '')
        setIsNotFixedValue(checkIsNotFixedValue(field))
      }, [])

      useEffect(() => {
        setItemsForRender(
          filterData
            ?.filter(el => el || el === 0 || el === '0')
            ?.sort(
              (a, b) =>
                Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)) ||
                Number(b) - Number(a),
            ),
        )
      }, [filterData])

      useEffect(() => {
        const filter = filterData?.filter(
          item =>
            (nameSearchValue ? Number(item) === Number(nameSearchValue) : true) &&
            (fromValue || fromValue === 0 ? Number(item) >= Number(fromValue) : true) &&
            (toValue || toValue === 0 ? Number(item) <= Number(toValue) : true),
        )
        setItemsForRender(filter)
      }, [nameSearchValue, fromValue, toValue])

      return (
        <div
          title=""
          className={cx({ [styles.shopsDataWrapper]: !asBlock, [styles.shopsDataWrapperBlocked]: asBlock })}
        >
          <div className={styles.numInputsWrapper}>
            <Input
              title={t(TranslationKey.From)}
              className={styles.numInput}
              classes={{ input: styles.numInput }}
              placeholder={t(TranslationKey.From)}
              value={fromValue}
              onChange={e => inputNumberCheckHandler(e.target.value)}
            />
            <Input
              title={t(TranslationKey.To)}
              className={styles.numInput}
              classes={{ input: styles.numInput }}
              placeholder={t(TranslationKey.To)}
              value={toValue}
              onChange={e => inputNumberCheckHandler(e.target.value, true)}
            />
          </div>

          <div className={styles.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={styles.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={styles.shopsWrapper}>
            <div className={styles.shopsBody}>
              {filterRequestStatus === loadingStatus.IS_LOADING ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender?.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender?.map((el, index) => {
                        const value = isNotFixedValue ? el : toFixed(el, 2) || 0
                        const valueChecked = choosenItems?.some(item => item === el)

                        return (
                          <div key={index} className={styles.shop}>
                            <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                            <div title={value} className={styles.shopName}>
                              {value}
                            </div>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <Button
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, field)
                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const InStockMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      field,
      table,
      defaultOption,
      filterRequestStatus,
      onClickAccept,
      onChangeFullFieldMenuItem,
      onClickFilterBtn,
    }) => {
      const [fromValue, setFromValue] = useState('')
      const [toValue, setToValue] = useState('')

      useEffect(() => {
        onClickFilterBtn(field, table, `;storekeeper[$eq]="${defaultOption}"`)
      }, [])

      const { filterData, currentFilterData } = data

      const [choosenItems, setChoosenItems] = useState(currentFilterData)

      const onClickItem = obj => {
        if (choosenItems.some(item => item === obj)) {
          setChoosenItems(choosenItems.slice().filter(item => item !== obj))
        } else {
          setChoosenItems([...choosenItems, obj])
        }
      }
      useEffect(() => {
        setChoosenItems(currentFilterData)
      }, [currentFilterData])

      const [itemsForRender, setItemsForRender] = useState(filterData || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        setItemsForRender(filterData)
      }, [data.filterData])

      useEffect(() => {
        const filter = filterData?.filter(
          item =>
            (nameSearchValue ? String(item).toLowerCase().includes(nameSearchValue?.toLowerCase()) : true) &&
            (fromValue || fromValue === 0 ? Number(item) >= Number(fromValue) : true) &&
            (toValue || toValue === 0 ? Number(item) <= Number(toValue) : true),
        )
        setItemsForRender(filter)
      }, [nameSearchValue, fromValue, toValue, choosenItems, data.filterData])

      return (
        <div title="" className={styles.shopsDataWrapper}>
          <div className={styles.numInputsWrapper}>
            <Input
              title={t(TranslationKey.From)}
              className={styles.numInput}
              classes={{ input: styles.numInput }}
              placeholder={t(TranslationKey.From)}
              value={fromValue}
              onChange={e => checkIsPositiveNum(e.target.value) && setFromValue(e.target.value)}
            />
            <Input
              title={t(TranslationKey.To)}
              className={styles.numInput}
              classes={{ input: styles.numInput }}
              placeholder={t(TranslationKey.To)}
              value={toValue}
              onChange={e => checkIsPositiveNum(e.target.value) && setToValue(e.target.value)}
            />
          </div>

          <div className={styles.searchInputWrapper}>
            <SearchInput
              key={'client_warehouse_search_input'}
              inputClasses={styles.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>
          <div className={styles.shopsWrapper}>
            <div className={styles.shopsBody}>
              {filterRequestStatus === loadingStatus.IS_LOADING ? (
                <CircularProgress />
              ) : (
                <>
                  {itemsForRender?.length ? (
                    <>
                      <DataGridSelectAllFilters
                        choosenItems={choosenItems}
                        itemsForRender={itemsForRender}
                        setChoosenItems={setChoosenItems}
                      />
                      {itemsForRender?.map((el, index) => {
                        const valueChecked = choosenItems?.some(item => item === el)

                        return (
                          <div key={index} className={styles.shop}>
                            <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                            <div title={el} className={styles.shopName}>
                              {el}
                            </div>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                      {t(TranslationKey['No options'])}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <Button
              onClick={e => {
                onClose(e)
                onChangeFullFieldMenuItem(choosenItems, 'amountInBoxes')
                onClickAccept()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
            <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const RedFlagsCellMenuItem = memo(
  withStyles(props => {
    const {
      classes: styles,
      onClose,
      data,
      field,
      table,
      filterRequestStatus,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
    } = props

    return (
      <ObJectFieldMenuItem
        addNullObj
        data={data}
        field={field}
        table={table}
        filterRequestStatus={filterRequestStatus}
        columnKey={columnnsKeys}
        rowContent={obj => (
          <div className={styles.redFlagsCell}>
            {obj.iconImage && (
              <img src={getAmazonImageUrl(obj.iconImage)} alt={obj.title} className={styles.redFlagIcon} />
            )}
            <div title={obj.title || t(TranslationKey.Empty)} className={styles.shopName}>
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

export const OnListingCellMenuItem = memo(
  withStyles(({ classes: styles, data, onClose }) => {
    return (
      <div title="" className={styles.shopsDataWrapper}>
        <div className={styles.shopsWrapper}>
          <div className={styles.shopsBody}>
            <div className={styles.shop}>
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

              <p title={t(TranslationKey.Yes)}>{t(TranslationKey.Yes)}</p>
            </div>

            <div className={styles.shop}>
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

              <p title={t(TranslationKey.No)}>{t(TranslationKey.No)}</p>
            </div>
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <Button onClick={e => onClose(e)}>{t(TranslationKey.Accept)}</Button>
        </div>
      </div>
    )
  }, styles),
)

export const YesNoCellMenuItem = memo(
  withStyles(({ classes: styles, data, onClose, field, yesCustomText, noCustomText }) => {
    const filterData = data[`${field}YesNoFilterData`]
    const [condition, setCondition] = useState({
      yes: filterData.yes,
      no: filterData.no,
    })

    return (
      <div title="" className={styles.shopsDataWrapper}>
        <div className={styles.shopsWrapper}>
          <div className={styles.shopsBody}>
            <div className={styles.shop}>
              <Checkbox
                color="primary"
                checked={condition.yes}
                onClick={() => {
                  if (condition.yes) {
                    setCondition({
                      yes: false,
                      no: true,
                    })
                  } else {
                    setCondition({
                      yes: true,
                      no: true,
                    })
                  }
                }}
              />

              <p title={yesCustomText}>{yesCustomText}</p>
            </div>

            <div className={styles.shop}>
              <Checkbox
                color="primary"
                checked={condition.no}
                onClick={() => {
                  if (condition.no) {
                    setCondition({
                      yes: true,
                      no: false,
                    })
                  } else {
                    setCondition({
                      yes: true,
                      no: true,
                    })
                  }
                }}
              />

              <p title={noCustomText}>{noCustomText}</p>
            </div>
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            onClick={e => {
              filterData.handleFilters(condition.yes, condition.no)
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

export const BatchShippingDateCellMenuItem = memo(
  withStyles(props => {
    const {
      classes: styles,
      data,
      field,
      table,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClose,
    } = props
    const [currentTab, setCurrentTab] = useState(field)

    useEffect(() => {
      onClickFilterBtn(currentTab, table)
    }, [currentTab])

    return (
      <FromToDateMenuItem
        data={data[currentTab]}
        field={currentTab}
        table={table}
        filterRequestStatus={filterRequestStatus}
        headerControls={() => (
          <FormControl className={styles.formControl}>
            <RadioGroup
              row
              className={cx(styles.radioGroup, styles.formedRadioGroup)}
              value={currentTab}
              onChange={(event, value) => setCurrentTab(value)}
            >
              {batchShippingDateTabs.map((el, index) => (
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

export const BatchTrackingCellMenuItem = memo(
  withStyles(props => {
    const {
      classes: styles,
      data,
      field,
      table,
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClose,
    } = props
    const [currentTab, setCurrentTab] = useState(field)

    return (
      <div>
        <FormControl className={cx(styles.formControl, styles.batchTrackingFormWrapper)}>
          <RadioGroup
            row
            className={cx(styles.radioGroupTwoItems)}
            value={currentTab}
            onChange={event => setCurrentTab(event.target.value)}
          >
            {batchTrackingTabs.map((el, index) => (
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

        {currentTab === batchTrackingTabs[0].value && (
          <NormalFieldMenuItem
            data={data[currentTab]}
            field={currentTab}
            table={table}
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
            table={table}
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

export const NumberWithTabsMenuItem = memo(
  withStyles(
    ({
      classes: styles,
      onClose,
      data,
      table,
      filterRequestStatus,
      onChangeFullFieldMenuItem,
      onClickAccept,
      onClickFilterBtn,
      tabs,
    }) => {
      const [activeTab, setActiveTab] = useState(tabs[0].value)

      useEffect(() => {
        onClickFilterBtn(activeTab, table)
      }, [activeTab])

      return (
        <div title="" className={styles.shopsDataWrapper}>
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

export const SecondsCellMenuItem = memo(
  withStyles(props => {
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

    const filterData = data?.filterData
    const currentFilterData = data?.currentFilterData

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
          ?.filter(el => el || el === 0 || el === '0')
          ?.sort(
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
      <div title="" className={styles.shopsDataWrapper}>
        <div className={styles.shopsWrapper}>
          <div className={styles.shopsBody}>
            {filterRequestStatus === loadingStatus.IS_LOADING ? (
              <CircularProgress />
            ) : (
              <>
                {itemsForRender?.length ? (
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
                  <p className={styles.noOptionText}>{t(TranslationKey['No options'])}</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            onClick={e => {
              onClose(e)
              onChangeFullFieldMenuItem(choosenItems, field)
              onClickAccept()
            }}
          >
            {t(TranslationKey.Accept)}
          </Button>
          <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)
