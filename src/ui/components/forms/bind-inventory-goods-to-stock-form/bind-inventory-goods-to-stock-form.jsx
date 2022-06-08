import {DataGrid} from '@mui/x-data-grid'

import React, {useEffect, useState} from 'react'

import {Chip, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import qs from 'qs'

import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

import {useClassNames} from './bind-inventory-goods-to-stock-form.style'
import {chosenGoodsColumns, sourceColumns} from './bind-stock-goods-to-inventory-columns'

const textConsts = getLocalizedTexts(texts, 'en').bindInventoryGoodsToStockForm

const chipConfigSettings = {
  RECOMMENDED: 'RECOMMENDED',
  NAME: 'NAME',
  ASIN: 'ASIN',
  SKU: 'SKU',
}

export const BindInventoryGoodsToStockForm = observer(({stockData, updateStockData, selectedRowId, onSubmit}) => {
  const classNames = useClassNames()

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

  const onClickSearch = () => {
    updateStockData(filter)
  }

  const setRecommendChip = () => {
    setChipConfig(chipConfigSettings.RECOMMENDED)
    setSearchInputValue('')
  }

  const onSelectionModel = model => {
    const curChosenGoodsIds = chosenGoods.map(el => el.id)

    const newRowIds = model.filter(el => !curChosenGoodsIds.includes(el))

    const newSelectedItems = toJS(stockData).filter(el => newRowIds.includes(el.id))
    setChosenGoods([...chosenGoods, ...newSelectedItems])
  }

  useEffect(() => {
    if (chipConfig === chipConfigSettings.RECOMMENDED) {
      updateStockData()
    }
  }, [chipConfig])

  const onClickSubmit = () => {
    const selectedWarehouseStocks = chosenGoods.map(el => ({sku: el.sku, shopId: el.shop._id}))

    onSubmit({productId: selectedRowId, warehouseStocks: selectedWarehouseStocks})
  }

  return (
    <div className={classNames.root}>
      <Typography variant="h5">{t(TranslationKey['Bind an product from Amazon'])}</Typography>

      <div className={classNames.form}>
        <div className={classNames.filtersWrapper}>
          <Chip
            label={t(TranslationKey.Recommended)}
            className={clsx(classNames.chip, {[classNames.chipActive]: chipConfig === chipConfigSettings.RECOMMENDED})}
            onClick={() => setRecommendChip()}
          />
          <Typography className={classNames.betweenChipsText}>{t(TranslationKey['or search by'])}</Typography>

          <Chip
            label={t(TranslationKey.Title)}
            className={clsx(classNames.chip, {[classNames.chipActive]: chipConfig === chipConfigSettings.NAME})}
            onClick={() => setChipConfig(chipConfigSettings.NAME)}
          />

          <Chip
            label={textConsts.asin}
            className={clsx(classNames.chip, classNames.asinChip, {
              [classNames.chipActive]: chipConfig === chipConfigSettings.ASIN,
            })}
            onClick={() => setChipConfig(chipConfigSettings.ASIN)}
          />

          <Chip
            label={textConsts.sku}
            className={clsx(classNames.chip, classNames.asinChip, {
              [classNames.chipActive]: chipConfig === chipConfigSettings.SKU,
            })}
            onClick={() => setChipConfig(chipConfigSettings.SKU)}
          />
        </div>

        <div className={classNames.searchInputWrapper}>
          <Input
            disabled={chipConfig === chipConfigSettings.RECOMMENDED}
            inputProps={{maxLength: 200}}
            placeholder={t(TranslationKey.search) + '...'}
            className={classNames.searchInput}
            value={searchInputValue}
            onChange={e => setSearchInputValue(e.target.value)}
          />

          <button
            disabled={chipConfig === chipConfigSettings.RECOMMENDED || searchInputValue === ''}
            className={classNames.searchBtn}
            onClick={() => onClickSearch()}
          >
            {t(TranslationKey.search)}
          </button>
        </div>

        <div className={classNames.tableWrapper}>
          <DataGrid
            hideFooter
            checkboxSelection
            rows={toJS(stockData)}
            columns={sourceColumns()}
            rowHeight={60}
            onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
          />
        </div>

        <Typography className={classNames.chosenGoodsTitle}>
          {t(TranslationKey['Selected products from stock'])}
        </Typography>

        <div className={classNames.tableWrapper}>
          <DataGrid hideFooter rows={chosenGoods || []} columns={chosenGoodsColumns({onClickTrash})} rowHeight={60} />
        </div>

        <div className={classNames.btnsWrapper}>
          <SuccessButton
            disableElevation
            disabled={chosenGoods.length < 1}
            variant="contained"
            color="primary"
            onClick={onClickSubmit}
          >
            {t(TranslationKey.Bind)}
          </SuccessButton>
        </div>
      </div>
    </div>
  )
})
