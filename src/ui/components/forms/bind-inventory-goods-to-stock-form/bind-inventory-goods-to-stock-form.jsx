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

import {useClassNames} from './bind-inventory-goods-to-stock-form.style'
import {chosenGoodsColumns, sourceColumns} from './bind-stock-goods-to-inventory-columns'

const chipConfigSettings = {
  RECOMMENDED: 'RECOMMENDED',
  NAME: 'NAME',
  ASIN: 'ASIN',
  SKU: 'SKU',
}

export const BindInventoryGoodsToStockForm = observer(({stockData, updateStockData, product, onSubmit}) => {
  const {classes: classNames} = useClassNames()

  const [selectedGoods, setSelectedGoods] = useState([])
  const [chosenGoods, setChosenGoods] = useState([])

  const [chipConfig, setChipConfig] = useState(chipConfigSettings.RECOMMENDED)
  const [searchInputValue, setSearchInputValue] = useState('')

  const onClickTrash = asin => {
    const filteredArray = [...chosenGoods].filter(el => el.asin !== asin)
    setChosenGoods(filteredArray)
  }

  const filterByChipConfig = config => {
    switch (config) {
      case chipConfigSettings.RECOMMENDED:
        return 'asin'
      case chipConfigSettings.NAME:
        return 'title'
      case chipConfigSettings.ASIN:
        return 'asin'
      case chipConfigSettings.SKU:
        return 'sku'
    }
  }

  const filter = qs
    .stringify({[filterByChipConfig(chipConfig)]: {$contains: searchInputValue}}, {encode: false})
    .replace(/&/, ';')

  const setRecommendChip = () => {
    setChipConfig(chipConfigSettings.RECOMMENDED)
  }

  const onSelectionModel = model => {
    // const curChosenGoodsIds = chosenGoods.map(el => el.id)

    // const newRowIds = model.filter(el => !curChosenGoodsIds.includes(el))

    // const newSelectedItems = toJS(stockData).filter(el => newRowIds.includes(el.id))
    // setChosenGoods([...chosenGoods, ...newSelectedItems])

    setSelectedGoods(model)
  }

  const onClickAdd = () => {
    const curChosenGoodsIds = chosenGoods.map(el => el.id)

    const newRowIds = selectedGoods.filter(el => !curChosenGoodsIds.includes(el))

    const newSelectedItems = toJS(stockData).filter(el => newRowIds.includes(el.id))
    setChosenGoods([...chosenGoods, ...newSelectedItems])

    setSelectedGoods([])
  }

  useEffect(() => {
    if (chipConfig === chipConfigSettings.RECOMMENDED) {
      const recFilter = qs.stringify({asin: {$contains: product.asin}}, {encode: false}).replace(/&/, ';')
      const isRecCall = true

      updateStockData(recFilter, isRecCall)
    }

    setSearchInputValue('')
  }, [chipConfig])

  useEffect(() => {
    if (chipConfig !== chipConfigSettings.RECOMMENDED) {
      updateStockData(filter)
    }
  }, [searchInputValue])

  const onClickSubmit = () => {
    const selectedWarehouseStocks = chosenGoods.map(el => ({sku: el.sku, shopId: el.shop._id}))

    onSubmit({productId: product._id, warehouseStocks: selectedWarehouseStocks})
  }

  const firstRowId = chosenGoods.length ? chosenGoods[0].id : null

  return (
    <div className={classNames.root}>
      <Typography variant="h6">{t(TranslationKey['Bind an product from Amazon'])}</Typography>

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

          <Button
            variant={'text'}
            className={cx(classNames.chip, classNames.chipLeftMargin, {
              [classNames.chipActive]: chipConfig === chipConfigSettings.SKU,
            })}
            onClick={() => setChipConfig(chipConfigSettings.SKU)}
          >
            {t(TranslationKey.SKU)}
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
            checkboxSelection
            sx={{
              border: 0,
              boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
              backgroundColor: '#fff',
            }}
            rows={toJS(stockData)}
            columns={sourceColumns()}
            rowHeight={60}
            selectionModel={selectedGoods}
            onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
          />
        </div>

        <div className={classNames.btnsWrapper}>
          <Button
            disabled={selectedGoods.every(el => chosenGoods.map(el => el.id).includes(el)) || selectedGoods.length < 1}
            variant="contained"
            color="primary"
            onClick={onClickAdd}
          >
            {t(TranslationKey.Add)}
          </Button>
        </div>

        <Typography className={classNames.chosenGoodsTitle}>
          {t(TranslationKey['Selected products from stock'])}
        </Typography>

        <div className={classNames.tableWrapper}>
          <DataGrid
            hideFooter
            sx={{
              border: 0,
              boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
              backgroundColor: '#fff',
            }}
            rows={chosenGoods || []}
            columns={chosenGoodsColumns({onClickTrash}, firstRowId)}
            rowHeight={60}
          />
        </div>

        <div className={classNames.btnsWrapper}>
          <Button
            success
            disableElevation
            tooltipInfoContent={t(
              TranslationKey['Bind the selected product from the store to the item in the inventory'],
            )}
            disabled={chosenGoods.length < 1}
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
})
