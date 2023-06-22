/* eslint-disable no-unused-vars */
import {
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'

import React, { useEffect, useState } from 'react'

import { compareDesc, isAfter, parseISO } from 'date-fns'
import { withStyles } from 'tss-react/mui'

import { MyRequestStatus, MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { BoxStatus, boxStatusTranslateKey } from '@constants/statuses/box-status'
import { freelanceRequestType, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { OrderStatusTranslate } from '@constants/statuses/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridSelectAllFilters } from '@components/data-grid/data-grid-custom-components/data-grid-select-all-filters/data-grid-select-all-filters'
import { Button } from '@components/shared/buttons/button'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Input } from '@components/shared/input'
import { SearchInput } from '@components/shared/search-input'

import { checkIsPositiveNum } from '@utils/checks'
import { formatNormDateTime } from '@utils/date-time'
import { getStatusByColumnKeyAndStatusKey, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { styles } from './data-grid-menu-items.style'
import { cx } from '@emotion/css'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'

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
                  className={classNames.radioOption}
                  value="first"
                  control={<Radio className={classNames.radioControl} />}
                  label={t(TranslationKey.Formed)}
                />
                <FormControlLabel
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

                  <Typography>{t(TranslationKey.Formed)}</Typography>
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

                  <Typography>{t(TranslationKey['Not formed'])}</Typography>
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
        // isNeedPurchaseFilterData.onChangeIsNeedPurchaseFilter(null);
        setCurrentOption(e.target.value)
      }

      return (
        <div className={classNames.shopsDataWrapper}>
          <div>
            <FormControl className={classNames.formControl}>
              {/* <FormLabel className={classNames.radioLable}>{t(TranslationKey['Search by']) + ':'}</FormLabel> */}
              <RadioGroup row className={classNames.radioGroup} value={currentOption} onChange={handleCategory}>
                <FormControlLabel
                  className={classNames.radioOption}
                  value="first"
                  control={<Radio className={classNames.radioControl} />}
                  label={t(TranslationKey.Repurchase)}
                />
                <FormControlLabel
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
                <Typography>{t(TranslationKey['Not need refills'])}</Typography>

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
                <Typography>{t(TranslationKey['Need refills'])}</Typography>

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
          <Typography>{t(TranslationKey['Got barcode'])}</Typography>

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
          <Typography>{t(TranslationKey['No barcode'])}</Typography>

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
  withStyles(
    ({ classes: classNames, orderStatusData }) => (
      <div className={classNames.isFormedWrapper}>
        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey.All)}</Typography>

          <Checkbox
            color="primary"
            checked={orderStatusData.chosenStatus === orderStatusData.chosenStatusSettings.ALL}
            onClick={() => orderStatusData.onChangeOrderStatusData(orderStatusData.chosenStatusSettings.ALL)}
          />
        </div>

        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey['At process'])}</Typography>

          <Checkbox
            color="primary"
            checked={orderStatusData.chosenStatus === orderStatusData.chosenStatusSettings.AT_PROCESS}
            onClick={() => orderStatusData.onChangeOrderStatusData(orderStatusData.chosenStatusSettings.AT_PROCESS)}
          />
        </div>

        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey.Canceled)}</Typography>

          <Checkbox
            color="primary"
            checked={orderStatusData.chosenStatus === orderStatusData.chosenStatusSettings.CANCELED}
            onClick={() => orderStatusData.onChangeOrderStatusData(orderStatusData.chosenStatusSettings.CANCELED)}
          />
        </div>

        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey.Completed)}</Typography>

          <Checkbox
            color="primary"
            checked={orderStatusData.chosenStatus === orderStatusData.chosenStatusSettings.COMPLETED}
            onClick={() => orderStatusData.onChangeOrderStatusData(orderStatusData.chosenStatusSettings.COMPLETED)}
          />
        </div>

        <Divider />
      </div>
    ),
    styles,
  ),
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
                  {itemsForRender.map((el, index) => (
                    <div key={index} className={classNames.shop}>
                      <Checkbox
                        color="primary"
                        checked={choosenItems.some(item => item === el)}
                        onClick={() => onClickItem(el)}
                      />
                      <div className={classNames.shopName}>
                        {MyRequestStatusTranslate(el) || t(TranslationKey.Empty)}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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
                  {itemsForRender.map(
                    (el, index) =>
                      freelanceRequestType.DEFAULT !== el && (
                        <div key={index} className={classNames.shop}>
                          <Checkbox
                            color="primary"
                            checked={choosenItems.some(item => item === el)}
                            onClick={() => onClickItem(freelanceRequestType[el])}
                          />
                          <div className={classNames.shopName}>
                            {freelanceRequestTypeTranslate(el) || t(TranslationKey.Empty)}
                          </div>
                        </div>
                      ),
                  )}
                </>
              ) : (
                <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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
            <div className={classNames.orderStatusName}>{t(TranslationKey.All)}</div>
          </div>
          {orderStatusDataBase.map((item, itemIndex) => (
            <div key={itemIndex} className={classNames.orderStatus} onClick={() => onClickOrderStatusData(item)}>
              <Checkbox color="primary" checked={chosenStatus?.some(status => status === item)} />
              <div className={classNames.orderStatusName}>{OrderStatusTranslate(item)}</div>
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
                      {itemsForRender.map(obj => (
                        <div key={obj?._id} className={classNames.shop}>
                          <Checkbox
                            color="primary"
                            checked={choosenItems.some(item => item?._id === obj?._id)}
                            onClick={() => onClickItem(obj)}
                          />
                          <div className={classNames.shopName}>{(obj && obj?.name) || t(TranslationKey.Empty)}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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
          const filter = filterData?.filter(obj =>
            (obj.title || obj.name).toLowerCase().includes(nameSearchValue.toLowerCase()),
          )
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
                      {itemsForRender
                        // .filter(el => el)
                        // .sort(
                        //   (a, b) =>
                        //     Number(choosenItems?.some(item => item._id === b._id)) -
                        //     Number(choosenItems?.some(item => item._id === a._id)),
                        // )
                        .map(
                          obj =>
                            obj && (
                              <div key={obj._id} className={classNames.shop}>
                                <Checkbox
                                  color="primary"
                                  checked={choosenItems.some(item => item._id === obj._id)}
                                  onClick={() => onClickItem(obj)}
                                />
                                {rowContent ? (
                                  rowContent(obj)
                                ) : (
                                  <div className={classNames.shopName}>
                                    {obj.title || obj.name || t(TranslationKey.Empty)}
                                  </div>
                                )}
                              </div>
                            ),
                        )}
                    </>
                  ) : (
                    <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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
              <div className={classNames.orderStatusName}>{t(boxStatusTranslateKey(item))}</div>
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
            .filter(el => Number.isInteger(el))
            .sort(
              (a, b) =>
                currentFilterData.length &&
                Number(choosenItems?.some(item => item === b)) - Number(choosenItems?.some(item => item === a)),
            ),
        )
      }, [filterData])

      useEffect(() => {
        if (nameSearchValue) {
          const filter = filterData?.filter(item => String(item).toLowerCase().includes(nameSearchValue.toLowerCase()))
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
                      {itemsForRender.map((el, index) => (
                        <div key={index} className={classNames.shop}>
                          <Checkbox
                            color="primary"
                            checked={choosenItems.some(item => item === el)}
                            onClick={() => onClickItem(el)}
                          />
                          <div className={classNames.shopName}>
                            {getStatusByColumnKeyAndStatusKey(el, columnKey) || t(TranslationKey.Empty)}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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

      console.log('columnKey', columnKey)

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
                <div className={classNames.shopName}>
                  {t(TranslationKey[`${isOrder ? 'Urgent' : 'Urgent request'}`])} <img src="/assets/icons/fire.svg" />
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
                <div className={classNames.shopName}>{t(TranslationKey['Without Priority'])}</div>
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
                <div className={classNames.shopName}>{t(TranslationKey.Yes)}</div>
              </div>

              <div className={classNames.shop}>
                <Checkbox
                  color="primary"
                  checked={choosenItems.some(item => item === false)}
                  onClick={() => onClickItem(false)}
                />
                <div className={classNames.shopName}>{t(TranslationKey.No)}</div>
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
      filterRequestStatus,
      onClickFilterBtn,
      onChangeFullFieldMenuItem,
      onClickAccept,
    } = props

    const [currentOption, setCurrentOption] = useState(
      data.amazonTitle.currentFilterData.length
        ? 'amazonTitle'
        : data.skusByClient.currentFilterData.length
        ? 'skusByClient'
        : 'asin',
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
            <FormLabel className={classNames.radioLable}>{t(TranslationKey['Search by']) + ':'}</FormLabel>
            <RadioGroup row className={classNames.radioGroup} value={currentOption} onChange={handleCategory}>
              <FormControlLabel
                className={classNames.radioOption}
                value="asin"
                control={<Radio className={classNames.radioControl} />}
                label={t(TranslationKey.ASIN)}
              />
              <FormControlLabel
                className={classNames.radioOption}
                value="skusByClient"
                control={<Radio className={classNames.radioControl} />}
                label={t(TranslationKey.SKU)}
              />
              <FormControlLabel
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
                    {itemsForRender?.map((el, index) => (
                      <div key={index} className={classNames.shop}>
                        <Checkbox
                          color="primary"
                          checked={choosenItems?.some(item => item === el)}
                          onClick={() => onClickItem(el)}
                        />
                        <div className={classNames.shopName}>{el || t(TranslationKey.Empty)}</div>
                      </div>
                    ))}
                  </>
                ) : (
                  <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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
                  className={classNames.radioOption}
                  value="id"
                  control={<Radio className={classNames.radioControl} />}
                  label={t(TranslationKey['№Order'])}
                />
                <FormControlLabel
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
                        .map((el, index) => (
                          <div key={index} className={classNames.shop}>
                            <Checkbox
                              color="primary"
                              checked={choosenItems?.some(item => item === el)}
                              onClick={() => onClickItem(el)}
                            />
                            <div className={classNames.shopName}>{el || t(TranslationKey.Empty)}</div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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
        const filter = filterData?.filter(obj => obj.name.toLowerCase().includes(nameSearchValue.toLowerCase()))
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
            <FormLabel className={classNames.radioLable}>{t(TranslationKey['Search by']) + ':'}</FormLabel>
            <RadioGroup row className={classNames.radioGroupTwoItems} value={currentOption} onChange={handleCategory}>
              <FormControlLabel
                className={classNames.radioOption}
                value="destination"
                control={<Radio className={classNames.radioControl} />}
                label={t(TranslationKey.Destination)}
              />
              <FormControlLabel
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
                    {itemsForRender.map(obj => (
                      <div key={obj?._id} className={classNames.shop}>
                        <Checkbox
                          color="primary"
                          checked={choosenItems.some(item => item?._id === obj?._id)}
                          onClick={() => onClickItem(obj)}
                        />
                        <div className={classNames.shopName}>{obj?.name || t(TranslationKey.Empty)}</div>
                      </div>
                    ))}
                  </>
                ) : (
                  <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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
            <div className={classNames.fromToDatesSubWrapper}>
              <Typography className={classNames.fromToText}>{t(TranslationKey.From)}</Typography>
              <NewDatePicker className={classNames.dateInput} value={fromDate} onChange={setFromDate} />
            </div>
            <div className={classNames.fromToDatesSubWrapper}>
              <Typography className={classNames.fromToText}>{t(TranslationKey.To)}</Typography>

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
                        ?.map((el, index) => (
                          <div key={index} className={classNames.shop}>
                            <Checkbox
                              color="primary"
                              checked={choosenItems?.some(item => item === el)}
                              onClick={() => onClickItem(el)}
                            />
                            <div className={classNames.shopName}>
                              {formatNormDateTime(el) || t(TranslationKey.Empty)}
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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
    }) => {
      const [fromValue, setFromValue] = useState('')
      const [toValue, setToValue] = useState('')

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

      console.log('choosenItems', choosenItems)

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

      return (
        <div className={classNames.shopsDataWrapper}>
          <div className={classNames.numInputsWrapper}>
            <Input
              className={classNames.numInput}
              classes={{ input: classNames.numInput }}
              placeholder={t(TranslationKey.From)}
              value={fromValue}
              onChange={e => checkIsPositiveNum(e.target.value) && setFromValue(e.target.value)}
            />
            <Input
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
                        ?.map((el, index) => (
                          <div key={index} className={classNames.shop}>
                            <Checkbox
                              color="primary"
                              checked={choosenItems?.some(item => item === el)}
                              onClick={() => onClickItem(el)}
                            />
                            <div className={classNames.shopName}>{toFixed(el, 2) || 0}</div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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
              <FormLabel className={classNames.radioLable}>{t(TranslationKey['Search by']) + ':'}</FormLabel>
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
              className={classNames.numInput}
              classes={{ input: classNames.numInput }}
              placeholder={t(TranslationKey.From)}
              value={fromValue}
              onChange={e => checkIsPositiveNum(e.target.value) && setFromValue(e.target.value)}
            />
            <Input
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
                        ?.map((el, index) => (
                          <div key={index} className={classNames.shop}>
                            <Checkbox
                              color="primary"
                              checked={choosenItems?.some(item => item._id === el._id)}
                              onClick={() => onClickItem(el)}
                            />
                            <div className={classNames.shopName}>
                              {el.amountInBoxes /* || t(TranslationKey.Empty) */}
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <Typography className={classNames.noOptionText}>{t(TranslationKey['No options'])}</Typography>
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
            <div className={classNames.shopName}>{obj.title || t(TranslationKey.Empty)}</div>
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

              <Typography>{t(TranslationKey.Yes)}</Typography>
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

              <Typography>{t(TranslationKey.No)}</Typography>
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

              <Typography>{t(TranslationKey.Yes)}</Typography>
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

              <Typography>{t(TranslationKey.No)}</Typography>
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
