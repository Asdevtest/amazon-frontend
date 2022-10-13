import {cx} from '@emotion/css'
import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment, Typography} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'

import React, {useEffect, useState} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import qs from 'qs'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {t} from '@utils/translations'

import {chosenGoodsColumns, inventoryColumns} from './bind-stock-goods-to-inventory-columns'
import {useClassNames} from './bind-stock-goods-to-inventory-form.style'

const chipConfigSettings = {
  RECOMMENDED: 'RECOMMENDED',
  NAME: 'NAME',
  ASIN: 'ASIN',
}

export const BindStockGoodsToInventoryForm = observer(
  ({goodsToSelect, inventoryData, updateInventoryData, onSubmit}) => {
    const {classes: classNames} = useClassNames()

    const [chosenGoods, setChosenGoods] = useState(goodsToSelect)

    const [chipConfig, setChipConfig] = useState(chipConfigSettings.RECOMMENDED)

    const [searchInputValue, setSearchInputValue] = useState('')

    const [selectedRow, setSelectedRow] = useState('')

    const onClickTrash = asin => {
      const filteredArray = [...chosenGoods].filter(el => el.asin !== asin)
      setChosenGoods(filteredArray)
    }

    const onClickRowRadioBtn = item => {
      setSelectedRow(item)
    }

    const filterByChipConfig = config => {
      switch (config) {
        case chipConfigSettings.RECOMMENDED:
          return 'asin'
        case chipConfigSettings.NAME:
          return 'amazonTitle'
        case chipConfigSettings.ASIN:
          return 'asin'
      }
    }

    const filter = qs
      .stringify(
        chipConfig === chipConfigSettings.RECOMMENDED
          ? goodsToSelect.length === 1
            ? {[filterByChipConfig(chipConfig)]: {$contains: goodsToSelect[0].asin}}
            : {
                or: goodsToSelect.reduce(
                  (ac, cur) => (ac = [...ac, {[filterByChipConfig(chipConfig)]: {$contains: cur.asin}}]),
                  [],
                ),
              }
          : {[filterByChipConfig(chipConfig)]: {$contains: searchInputValue}},
        {encode: false},
      )
      .replace(/&/, ';')

    const setRecommendChip = () => {
      setChipConfig(chipConfigSettings.RECOMMENDED)
    }

    useEffect(() => {
      if (chipConfig === chipConfigSettings.RECOMMENDED) {
        const recFilter = qs.stringify({asin: {$contains: goodsToSelect[0].asin}}, {encode: false}).replace(/&/, ';')
        const isRecCall = true

        updateInventoryData(recFilter, isRecCall)
      }

      setSearchInputValue('')
    }, [chipConfig])

    useEffect(() => {
      if (chipConfig !== chipConfigSettings.RECOMMENDED) {
        updateInventoryData(filter)
      }
    }, [searchInputValue])

    const onClickSubmit = () => {
      const selectedWarehouseStocks = chosenGoods.map(el => ({sku: el.sku, shopId: el.shop._id}))

      onSubmit({productId: selectedRow._id, warehouseStocks: selectedWarehouseStocks})
    }

    return (
      <div className={classNames.root}>
        <Typography variant="h5" className={classNames.title}>
          {t(TranslationKey['Bind to an item in the inventory'])}
        </Typography>

        <div className={classNames.form}>
          <div className={classNames.filtersWrapper}>
            <Button
              variant={'text'}
              className={cx(classNames.chip, {
                [classNames.chipActive]: chipConfig === chipConfigSettings.RECOMMENDED,
              })}
              onClick={() => setRecommendChip()}
            >
              {t(TranslationKey.Recommended)}
            </Button>

            <Typography className={classNames.betweenChipsText}>{t(TranslationKey['or search by'])}</Typography>

            <Button
              variant={'text'}
              className={cx(classNames.chip, classNames.chipLeftMargin, {
                [classNames.chipActive]: chipConfig === chipConfigSettings.NAME,
              })}
              onClick={() => setChipConfig(chipConfigSettings.NAME)}
            >
              {t(TranslationKey.Title)}
            </Button>

            <Button
              variant={'text'}
              className={cx(classNames.chip, classNames.chipLeftMargin, {
                [classNames.chipActive]: chipConfig === chipConfigSettings.ASIN,
              })}
              onClick={() => setChipConfig(chipConfigSettings.ASIN)}
            >
              {t(TranslationKey.ASIN)}
            </Button>

            <Field
              containerClasses={classNames.searchContainer}
              inputClasses={classNames.searchInput}
              disabled={chipConfig === chipConfigSettings.RECOMMENDED}
              value={searchInputValue}
              placeholder={t(TranslationKey.search)}
              endAdornment={
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              }
              onChange={e => setSearchInputValue(e.target.value)}
            />
          </div>

          <div className={classNames.tableWrapper}>
            <DataGrid
              hideFooter
              // sx={{
              //   border: 0,
              //   boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
              //   backgroundColor: theme.palette.background.main,
              // }}
              rows={toJS(inventoryData)}
              columns={inventoryColumns({selectRow: onClickRowRadioBtn}, selectedRow)}
              rowHeight={60}
            />
          </div>

          <Typography className={classNames.chosenGoodsTitle}>
            {t(TranslationKey['Selected products from stock']) + ':'}
          </Typography>

          <div className={classNames.tableWrapper}>
            <DataGrid
              hideFooter
              // sx={{
              //   border: 0,
              //   boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
              //   backgroundColor: theme.palette.background.main,
              // }}
              rows={chosenGoods || []}
              columns={chosenGoodsColumns({onClickTrash})}
              rowHeight={60}
            />
          </div>

          <div className={classNames.btnsWrapper}>
            <Button
              success
              disableElevation
              tooltipInfoContent={t(TranslationKey['Binds integration to the product card'])}
              disabled={!selectedRow || chosenGoods.length < 1}
              variant="contained"
              color="primary"
              onClick={onClickSubmit}
            >
              {t(TranslationKey.Bind)}
            </Button>
          </div>
        </div>
      </div>
    )
  },
)
