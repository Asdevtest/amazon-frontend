import React, {useState} from 'react'

import {Chip, Typography} from '@material-ui/core'
import {DataGrid} from '@material-ui/data-grid'
import clsx from 'clsx'
import {observer} from 'mobx-react'

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

export const BindInventoryGoodsToStockForm = observer(({goodsToSelect /* selectedRow*/}) => {
  const classNames = useClassNames()

  const [chosenGoods, setChosenGoods] = useState([])

  const [chipConfig, setChipConfig] = useState(chipConfigSettings.RECOMMENDED)
  const [searchInputValue, setSearchInputValue] = useState('')

  const onClickTrash = asin => {
    const filteredArray = [...chosenGoods].filter(el => el.asin !== asin)
    setChosenGoods(filteredArray)
  }

  const onClickSearch = () => {
    // switch (chipConfig) {
    //   case chipConfigSettings.NAME:
    //     // setInventoryData(filteredArray.filter(el=>el.title.includes(searchInputValue)))
    //     sortInventoryDataByName(searchInputValue)
    //     break
    //   case chipConfigSettings.ASIN:
    //     // setInventoryData(filteredArray.filter(el=>el.asin.includes(searchInputValue)))
    //     break
    // }
  }

  const onSelectionModel = model => {
    const curChosenGoodsIds = chosenGoods.map(el => el.id)

    const newRowIds = model.filter(el => !curChosenGoodsIds.includes(el))

    const newSelectedItems = goodsToSelect.filter(el => newRowIds.includes(el.id))
    setChosenGoods([...chosenGoods, ...newSelectedItems])
  }

  return (
    <div className={classNames.root}>
      <Typography variant="h5">{textConsts.mainTitle}</Typography>

      <div className={classNames.form}>
        <div className={classNames.filtersWrapper}>
          <Chip
            label={textConsts.recommend}
            className={clsx(classNames.chip, {[classNames.chipActive]: chipConfig === chipConfigSettings.RECOMMENDED})}
            onClick={() => setChipConfig(chipConfigSettings.RECOMMENDED)}
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
            disabled={chipConfig === chipConfigSettings.RECOMMENDED}
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
            rows={goodsToSelect}
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
          <SuccessButton disableElevation disabled={chosenGoods.length < 1} variant="contained" color="primary">
            {textConsts.bindBtn}
          </SuccessButton>
        </div>
      </div>
    </div>
  )
})
