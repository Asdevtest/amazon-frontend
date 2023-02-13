/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Typography, Checkbox, Divider, Button} from '@mui/material'
import {consoleSandbox} from '@sentry/utils'

import React, {useEffect, useState} from 'react'

import {withStyles} from 'tss-react/mui'

import {OrderStatus, OrderStatusByCode, OrderStatusTranslate} from '@constants/order-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {SearchInput} from '@components/search-input'
import {WithSearchSelect} from '@components/selects/with-search-select'

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
                isNeedPurchaseFilterData.isFormed !== null
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

export const ShopMenuItem = React.memo(
  withStyles(({classes: classNames, shopsDataBase}) => {
    const {shopsFilterData, shopsCurrentFilterData, onClickShopBtn} = shopsDataBase

    const [shopsForRender, setShopsForRender] = useState(shopsFilterData || [])
    const [nameSearchValue, setNameSearchValue] = useState('')

    useEffect(() => {
      setShopsForRender(shopsFilterData)
    }, [shopsFilterData])

    useEffect(() => {
      if (nameSearchValue) {
        const filter = shopsFilterData?.filter(shop => shop.name.toLowerCase().includes(nameSearchValue.toLowerCase()))
        setShopsForRender(filter)
      } else {
        setShopsForRender(shopsFilterData)
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
            {shopsForRender.map(shop => (
              <div key={shop._id} className={classNames.shop}>
                <Checkbox
                  color="primary"
                  checked={shopsCurrentFilterData.some(item => item._id === shop._id)}
                  onClick={() => onClickShopBtn(shop)}
                />
                <div className={classNames.shopName}>{shop.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={classNames.buttonsWrapper}>
          <Button disabled variant="contained">
            {t(TranslationKey.Accept)}
          </Button>
          <Button disabled variant="text">
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  }, styles),
)
