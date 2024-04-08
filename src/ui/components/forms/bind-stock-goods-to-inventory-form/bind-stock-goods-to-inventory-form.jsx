import { observer } from 'mobx-react'
import qs from 'qs'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './bind-stock-goods-to-inventory-form.style'

import { chosenGoodsColumns, inventoryColumns } from './bind-stock-goods-to-inventory-columns'

const chipConfigSettings = {
  RECOMMENDED: 'RECOMMENDED',
  NAME: 'NAME',
  ASIN: 'ASIN',
}

export const BindStockGoodsToInventoryForm = observer(props => {
  const { goodsToSelect, inventoryData, updateInventoryData, onSubmit } = props

  const { classes: styles } = useStyles()
  const [chosenGoods, setChosenGoods] = useState(goodsToSelect)
  const [chipConfig, setChipConfig] = useState(chipConfigSettings.RECOMMENDED)
  const [searchInputValue, setSearchInputValue] = useState('')
  const [selectedRow, setSelectedRow] = useState('')

  const onClickTrash = asin => {
    const filteredArray = chosenGoods.filter(el => el.asin !== asin)
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
          ? { [filterByChipConfig(chipConfig)]: { $contains: goodsToSelect[0].asin } }
          : {
              or: goodsToSelect.reduce(
                (ac, cur) => (ac = [...ac, { [filterByChipConfig(chipConfig)]: { $contains: cur.asin } }]),
                [],
              ),
            }
        : { [filterByChipConfig(chipConfig)]: { $contains: searchInputValue } },
      { encode: false },
    )
    .replace(/&/, ';')
  const setRecommendChip = () => {
    setChipConfig(chipConfigSettings.RECOMMENDED)
  }

  useEffect(() => {
    if (chipConfig === chipConfigSettings.RECOMMENDED) {
      const recFilter = qs
        .stringify({ asin: { $contains: goodsToSelect[0].asin } }, { encode: false })
        .replace(/&/, ';')
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
    const selectedWarehouseStocks = chosenGoods.map(el => ({ sku: el.sku, shopId: el.shop._id }))

    onSubmit({ productId: selectedRow._id, warehouseStocks: selectedWarehouseStocks })
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Inventory integration'])}</p>

      <div className={styles.filtersWrapper}>
        <div className={styles.filtersWrapper}>
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
        </div>

        <SearchInput
          disabled={chipConfig === chipConfigSettings.RECOMMENDED}
          value={searchInputValue}
          placeholder={t(TranslationKey.search)}
          onSubmit={setSearchInputValue}
        />
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          sortingMode="client"
          paginationMode="client"
          rows={inventoryData}
          columns={inventoryColumns({ selectRow: onClickRowRadioBtn }, selectedRow)}
          rowHeight={60}
        />
      </div>

      <p className={styles.text}>{t(TranslationKey['Selected products from stock']) + ':'}</p>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          sortingMode="client"
          paginationMode="client"
          rows={chosenGoods}
          columns={chosenGoodsColumns({ onClickTrash })}
          rowHeight={60}
        />
      </div>

      <div className={styles.btnsWrapper}>
        <Button
          styleType={ButtonStyle.SUCCESS}
          tooltipInfoContent={t(TranslationKey['Binds integration to the product card'])}
          disabled={!selectedRow || chosenGoods.length < 1}
          onClick={onClickSubmit}
        >
          {t(TranslationKey.Bind)}
        </Button>
      </div>
    </div>
  )
})
