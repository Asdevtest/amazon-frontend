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

import React, {useEffect, useState} from 'react'

import {compareDesc, isAfter, parseISO} from 'date-fns'
import {withStyles} from 'tss-react/mui'

import {BoxStatus, boxStatusTranslateKey} from '@constants/box-status'
import {freelanceRequestType, freelanceRequestTypeTranslate} from '@constants/freelance-request-type'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatusTranslate} from '@constants/order-status'
import {MyRequestStatus, MyRequestStatusTranslate} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {DataGridSelectAllFilters} from '@components/data-grid-custom-components/data-grid-select-all-filters/data-grid-select-all-filters'
import {NewDatePicker} from '@components/date-picker/date-picker'
import {Input} from '@components/input'
import {SearchInput} from '@components/search-input'

import {checkIsPositiveNum} from '@utils/checks'
import {formatNormDateTime} from '@utils/date-time'
import {getStatusByColumnKeyAndStatusKey} from '@utils/text'
import {t} from '@utils/translations'

import {styles} from './data-grid-menu-items.style'

export const IsFormedMenuItem = React.memo(
  withStyles(
    ({classes: classNames, isFormedData}) => (
      <div className={classNames.isFormedWrapper}>
        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey['Not formed'])}</Typography>

          <Checkbox
            color="primary"
            checked={!isFormedData.isFormed || isFormedData.isFormed === null}
            onClick={() =>
              isFormedData.onChangeIsFormed(
                isFormedData.isFormed !== null ? (!isFormedData.isFormed ? !isFormedData.isFormed : null) : true,
              )
            }
          />
        </div>

        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey.Formed)}</Typography>

          <Checkbox
            color="primary"
            checked={isFormedData.isFormed || isFormedData.isFormed === null}
            onClick={() =>
              isFormedData.onChangeIsFormed(
                isFormedData.isFormed !== null ? (isFormedData.isFormed ? !isFormedData.isFormed : null) : false,
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

export const IsNeedPurchaseFilterMenuItem = React.memo(
  withStyles(
    ({classes: classNames, isNeedPurchaseFilterData}) => (
      <div className={classNames.isFormedWrapper}>
        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey['Not need refills'])}</Typography>

          <Checkbox
            color="primary"
            checked={
              !isNeedPurchaseFilterData.isNeedPurchaseFilter || isNeedPurchaseFilterData.isNeedPurchaseFilter === null
            }
            onClick={() =>
              isNeedPurchaseFilterData.onChangeIsNeedPurchaseFilter(
                isNeedPurchaseFilterData.isNeedPurchaseFilter !== null
                  ? !isNeedPurchaseFilterData.isNeedPurchaseFilter
                    ? !isNeedPurchaseFilterData.isNeedPurchaseFilter
                    : null
                  : true,
              )
            }
          />
        </div>

        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey['Need refills'])}</Typography>

          <Checkbox
            color="primary"
            checked={
              isNeedPurchaseFilterData.isNeedPurchaseFilter || isNeedPurchaseFilterData.isNeedPurchaseFilter === null
            }
            onClick={() =>
              isNeedPurchaseFilterData.onChangeIsNeedPurchaseFilter(
                isNeedPurchaseFilterData.isNeedPurchaseFilter !== null
                  ? isNeedPurchaseFilterData.isNeedPurchaseFilter
                    ? !isNeedPurchaseFilterData.isNeedPurchaseFilter
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

export const IsHaveBarCodeFilterMenuItem = React.memo(
  withStyles(
    ({classes: classNames, isHaveBarCodeFilterData}) => (
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
    ({classes: classNames, orderStatusData}) => (
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
  withStyles(({classes: classNames, onClose, data, field, onChangeFullFieldMenuItem, onClickAccept}) => {
    const filterData = Object.keys(MyRequestStatus)

    const {currentFilterData} = data

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
  withStyles(({classes: classNames, onClose, data, field, onChangeFullFieldMenuItem, onClickAccept}) => {
    const filterData = Object.values(freelanceRequestType)

    const {currentFilterData} = data

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
                            onClick={() => onClickItem(el)}
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
  withStyles(({classes: classNames, orderStatusData}) => {
    const {orderStatusDataBase, chosenStatus, onClickOrderStatusData} = orderStatusData

    return (
      <div className={classNames.orderStatusDataWrapper}>
        <div className={classNames.orderStatusDataBody}>
          <div className={classNames.orderStatus} onClick={() => onClickOrderStatusData('ALL')}>
            <Checkbox color="primary" checked={!chosenStatus.length} />
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
    }) => {
      const {filterData, currentFilterData} = data

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
          [...filterData, ...[addNullObj && {name: t(TranslationKey['Without stores']), _id: 'null'}]]
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
          const filter = filterData?.filter(obj => obj.name.toLowerCase().includes(nameSearchValue.toLowerCase()))
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
                      {itemsForRender
                        // .filter(el => el)
                        // .sort(
                        //   (a, b) =>
                        //     Number(choosenItems?.some(item => item._id === b._id)) -
                        //     Number(choosenItems?.some(item => item._id === a._id)),
                        // )
                        .map(obj => (
                          <div key={obj._id} className={classNames.shop}>
                            <Checkbox
                              color="primary"
                              checked={choosenItems.some(item => item._id === obj._id)}
                              onClick={() => onClickItem(obj)}
                            />
                            <div className={classNames.shopName}>{obj.name || t(TranslationKey.Empty)}</div>
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

export const BoxestatusMenuItem = React.memo(
  withStyles(({classes: classNames, data, onChangeFullFieldMenuItem, onClose, field, onClickAccept}) => {
    const {/* filterData, */ currentFilterData} = data

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
          {[BoxStatus.NEW, BoxStatus.IN_STOCK, BoxStatus.REQUESTED_SEND_TO_BATCH, BoxStatus.ACCEPTED_IN_PROCESSING].map(
            item => (
              <div key={item} className={classNames.orderStatus} onClick={() => onClickItem(item)}>
                <Checkbox color="primary" checked={choosenItems?.some(status => status === item)} />
                <div className={classNames.orderStatusName}>{t(boxStatusTranslateKey(item))}</div>
              </div>
            ),
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
    }) => {
      useEffect(() => {
        onClickFilterBtn(field)
      }, [])

      const {filterData, currentFilterData} = data

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
    const {filterData, currentFilterData} = data[currentOption]
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

      const {filterData, currentFilterData} = data[currentOption]

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
    const {filterData, currentFilterData} = data[currentOption]
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

      const {filterData, currentFilterData} = data

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

      const {filterData, currentFilterData} = data

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

      return (
        <div className={classNames.shopsDataWrapper}>
          <div className={classNames.numInputsWrapper}>
            <Input
              className={classNames.numInput}
              classes={{input: classNames.numInput}}
              placeholder={t(TranslationKey.From)}
              value={fromValue}
              onChange={e => checkIsPositiveNum(e.target.value) && setFromValue(e.target.value)}
            />
            <Input
              className={classNames.numInput}
              classes={{input: classNames.numInput}}
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
                            <div className={classNames.shopName}>{el || 0}</div>
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

      const {filterData, currentFilterData} = newData

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
              classes={{input: classNames.numInput}}
              placeholder={t(TranslationKey.From)}
              value={fromValue}
              onChange={e => checkIsPositiveNum(e.target.value) && setFromValue(e.target.value)}
            />
            <Input
              className={classNames.numInput}
              classes={{input: classNames.numInput}}
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
