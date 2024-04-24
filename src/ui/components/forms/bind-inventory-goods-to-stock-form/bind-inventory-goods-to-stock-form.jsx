import { observer } from 'mobx-react'
import qs from 'qs'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './bind-inventory-goods-to-stock-form.style'

import { chosenGoodsColumns, sourceColumns } from './bind-stock-goods-to-inventory-columns'

const chipConfigSettings = {
  RECOMMENDED: 'RECOMMENDED',
  NAME: 'NAME',
  ASIN: 'ASIN',
  SKU: 'SKU',
}

export const BindInventoryGoodsToStockForm = observer(props => {
  const { stockData, updateStockData, product, onSubmit } = props

  const { classes: styles } = useStyles()
  const [selectedGoods, setSelectedGoods] = useState([])
  const [chosenGoods, setChosenGoods] = useState([])
  const [chipConfig, setChipConfig] = useState(chipConfigSettings.RECOMMENDED)
  const [searchInputValue, setSearchInputValue] = useState('')

  const onClickTrash = asin => {
    const filteredArray = chosenGoods.filter(el => el.asin !== asin)
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
    .stringify({ [filterByChipConfig(chipConfig)]: { $contains: searchInputValue } }, { encode: false })
    .replace(/&/, ';')
  const setRecommendChip = () => {
    setChipConfig(chipConfigSettings.RECOMMENDED)
  }
  const onSelectionModel = model => {
    setSelectedGoods(model)
  }
  const onClickAdd = () => {
    const curChosenGoodsIds = chosenGoods.map(el => el.id)
    const newRowIds = selectedGoods.filter(el => !curChosenGoodsIds.includes(el))
    const newSelectedItems = stockData.filter(el => newRowIds.includes(el.id))
    setChosenGoods([...chosenGoods, ...newSelectedItems])
    setSelectedGoods([])
  }

  useEffect(() => {
    if (chipConfig === chipConfigSettings.RECOMMENDED) {
      const recFilter = qs.stringify({ asin: { $contains: product.asin } }, { encode: false }).replace(/&/, ';')
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
    const selectedWarehouseStocks = chosenGoods.map(el => ({ sku: el.sku, shopId: el.shop._id }))

    onSubmit({ productId: product._id, warehouseStocks: selectedWarehouseStocks })
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Bind an product from Amazon'])}</p>

      <div className={styles.flexContainer}>
        <div className={styles.flexContainer}>
          <Button
            variant={ButtonVariant.OUTLINED}
            styleType={chipConfig === chipConfigSettings.RECOMMENDED ? ButtonStyle.PRIMARY : ButtonStyle.CASUAL}
            onClick={() => setRecommendChip()}
          >
            {t(TranslationKey.Recommended)}
          </Button>

          <p className={styles.text}>{t(TranslationKey['or search by'])}</p>

          <Button
            variant={ButtonVariant.OUTLINED}
            styleType={chipConfig === chipConfigSettings.NAME ? ButtonStyle.PRIMARY : ButtonStyle.CASUAL}
            onClick={() => setChipConfig(chipConfigSettings.NAME)}
          >
            {t(TranslationKey.Title)}
          </Button>

          <Button
            variant={ButtonVariant.OUTLINED}
            styleType={chipConfig === chipConfigSettings.ASIN ? ButtonStyle.PRIMARY : ButtonStyle.CASUAL}
            onClick={() => setChipConfig(chipConfigSettings.ASIN)}
          >
            {t(TranslationKey.ASIN)}
          </Button>

          <Button
            variant={ButtonVariant.OUTLINED}
            styleType={chipConfig === chipConfigSettings.SKU ? ButtonStyle.PRIMARY : ButtonStyle.CASUAL}
            onClick={() => setChipConfig(chipConfigSettings.SKU)}
          >
            {t(TranslationKey.SKU)}
          </Button>
        </div>

        <SearchInput
          disabled={chipConfig === chipConfigSettings.RECOMMENDED}
          value={searchInputValue}
          placeholder={t(TranslationKey.Search)}
          onSubmit={setSearchInputValue}
        />
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableColumnMenu
          columnHeaderHeight={40}
          sortingMode="client"
          paginationMode="client"
          rows={stockData}
          rowCount={stockData?.length}
          columns={sourceColumns()}
          getRowHeight={() => 'auto'}
          rowSelectionModel={selectedGoods}
          onRowSelectionModelChange={onSelectionModel}
        />
      </div>

      <div className={styles.btnsWrapper}>
        <Button
          disabled={selectedGoods.every(el => chosenGoods.map(el => el.id).includes(el)) || selectedGoods.length < 1}
          onClick={onClickAdd}
        >
          {t(TranslationKey.Add)}
        </Button>
      </div>

      <p className={styles.text}>{t(TranslationKey['Selected products from stock'])}</p>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          disableColumnMenu
          columnHeaderHeight={40}
          sortingMode="client"
          paginationMode="client"
          rows={chosenGoods || []}
          columns={chosenGoodsColumns({ onClickTrash })}
          rowHeight={40}
        />
      </div>

      <div className={styles.btnsWrapper}>
        <Button
          styleType={ButtonStyle.SUCCESS}
          tooltipInfoContent={t(
            TranslationKey['Bind the selected product from the store to the item in the inventory'],
          )}
          disabled={chosenGoods.length < 1}
          onClick={onClickSubmit}
        >
          {t(TranslationKey.Bind)}
        </Button>
      </div>
    </div>
  )
})
