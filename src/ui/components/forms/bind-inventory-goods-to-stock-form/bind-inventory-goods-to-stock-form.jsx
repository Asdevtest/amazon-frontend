import {DataGrid} from '@mui/x-data-grid'

import React, {useEffect, useState} from 'react'

import {Chip, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import qs from 'qs'

import {texts} from '@constants/texts'

import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './bind-inventory-goods-to-stock-form.style'
import {chosenGoodsColumns, sourceColumns} from './bind-stock-goods-to-inventory-columns'

const textConsts = getLocalizedTexts(texts, 'en').bindInventoryGoodsToStockForm

const chipConfigSettings = {
  RECOMMENDED: 'RECOMMENDED',
  NAME: 'NAME',
  ASIN: 'ASIN',
  SKU: 'SKU',
}

export const BindInventoryGoodsToStockForm = observer(({stockData, updateStockData, selectedRow, onSubmit}) => {
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
    .stringify(
      chipConfig === chipConfigSettings.RECOMMENDED
        ? {[filterByChipConfig(chipConfig)]: {$contains: selectedRow.id}}
        : {[filterByChipConfig(chipConfig)]: {$contains: searchInputValue}},
      {encode: false},
    )
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
    const selectedSkus = chosenGoods.map(el => el.sku)

    onSubmit({productId: selectedRow.originalData._id, skus: selectedSkus})
  }

  return (
    <div className={classNames.root}>
      <Typography variant="h5">{textConsts.mainTitle}</Typography>

      <div className={classNames.form}>
        <div className={classNames.filtersWrapper}>
          <Chip
            label={textConsts.recommend}
            className={clsx(classNames.chip, {[classNames.chipActive]: chipConfig === chipConfigSettings.RECOMMENDED})}
            onClick={() => setRecommendChip()}
          />
          <Typography className={classNames.betweenChipsText}>{textConsts.betweenChipsText}</Typography>

          <Chip
            label={textConsts.name}
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
            placeholder={textConsts.searchHolder}
            className={classNames.searchInput}
            value={searchInputValue}
            onChange={e => setSearchInputValue(e.target.value)}
          />

          <button
            disabled={chipConfig === chipConfigSettings.RECOMMENDED || searchInputValue === ''}
            className={classNames.searchBtn}
            onClick={() => onClickSearch()}
          >
            {textConsts.searchBtn}
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

        <Typography className={classNames.chosenGoodsTitle}>{textConsts.chosenGoods}</Typography>

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
            {textConsts.bindBtn}
          </SuccessButton>
        </div>
      </div>
    </div>
  )
})
