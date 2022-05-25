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

import {chosenGoodsColumns, inventoryColumns} from './bind-stock-goods-to-inventory-columns'
import {useClassNames} from './bind-stock-goods-to-inventory-form.style'

const textConsts = getLocalizedTexts(texts, 'en').bindStockGoodsToInventoryForm

const chipConfigSettings = {
  RECOMMENDED: 'RECOMMENDED',
  NAME: 'NAME',
  ASIN: 'ASIN',
}

export const BindStockGoodsToInventoryForm = observer(
  ({goodsToSelect, inventoryData, updateInventoryData, onSubmit}) => {
    const classNames = useClassNames()

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

    const onClickSearch = () => {
      updateInventoryData(filter)
    }

    const setRecommendChip = () => {
      setChipConfig(chipConfigSettings.RECOMMENDED)
      setSearchInputValue('')
    }

    useEffect(() => {
      if (chipConfig === chipConfigSettings.RECOMMENDED) {
        updateInventoryData()
      }
    }, [chipConfig])

    const onClickSubmit = () => {
      const selectedWarehouseStocks = chosenGoods.map(el => ({sku: el.sku, shopId: el.shop._id}))

      onSubmit({productId: selectedRow._id, warehouseStocks: selectedWarehouseStocks})
    }

    return (
      <div className={classNames.root}>
        <Typography variant="h5">{t(TranslationKey['Bind to an item in the inventory'])}</Typography>

        <div className={classNames.form}>
          <div className={classNames.filtersWrapper}>
            <Chip
              label={t(TranslationKey.Recommended)}
              className={clsx(classNames.chip, {
                [classNames.chipActive]: chipConfig === chipConfigSettings.RECOMMENDED,
              })}
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
              rows={toJS(inventoryData)}
              columns={inventoryColumns({selectRow: onClickRowRadioBtn}, selectedRow)}
              rowHeight={60}
            />
          </div>

          <Typography className={classNames.chosenGoodsTitle}>
            {t(TranslationKey['Selected products from stock']) + ':'}
          </Typography>

          <div className={classNames.tableWrapper}>
            <DataGrid hideFooter rows={chosenGoods || []} columns={chosenGoodsColumns({onClickTrash})} rowHeight={60} />
          </div>

          <div className={classNames.btnsWrapper}>
            <SuccessButton
              disableElevation
              disabled={!selectedRow || chosenGoods.length < 1}
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
  },
)
