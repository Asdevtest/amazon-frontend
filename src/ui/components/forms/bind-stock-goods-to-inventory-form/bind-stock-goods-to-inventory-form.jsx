import { observer } from 'mobx-react'
import qs from 'qs'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

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
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Inventory integration'])}</p>

      <div className={styles.flexContainer}>
        <div className={styles.flexContainer}>
          <CustomButton
            variant="outlined"
            type={chipConfig === chipConfigSettings.RECOMMENDED ? 'primary' : 'default'}
            onClick={() => setRecommendChip()}
          >
            {t(TranslationKey.Recommended)}
          </CustomButton>

          <p className={styles.text}>{t(TranslationKey['or search by'])}</p>

          <CustomButton
            variant="outlined"
            type={chipConfig === chipConfigSettings.NAME ? 'primary' : 'default'}
            onClick={() => setChipConfig(chipConfigSettings.NAME)}
          >
            {t(TranslationKey.Title)}
          </CustomButton>

          <CustomButton
            variant="outlined"
            type={chipConfig === chipConfigSettings.ASIN ? 'primary' : 'default'}
            onClick={() => setChipConfig(chipConfigSettings.ASIN)}
          >
            {t(TranslationKey.ASIN)}
          </CustomButton>
        </div>

        <CustomInputSearch
          allowClear
          disabled={chipConfig === chipConfigSettings.RECOMMENDED}
          value={searchInputValue}
          placeholder="Search"
          onChange={e => setSearchInputValue(e.target.value)}
        />
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          disableColumnMenu
          columnHeaderHeight={40}
          sortingMode="client"
          paginationMode="client"
          rows={inventoryData}
          columns={inventoryColumns({ selectRow: onClickRowRadioBtn }, selectedRow)}
          getRowHeight={() => 'auto'}
        />
      </div>

      <p className={styles.text}>{t(TranslationKey['Selected products from stock']) + ':'}</p>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          disableColumnMenu
          columnHeaderHeight={40}
          sortingMode="client"
          paginationMode="client"
          rows={chosenGoods}
          columns={chosenGoodsColumns({ onClickTrash })}
          getRowHeight={() => 'auto'}
        />
      </div>

      <div className={styles.buttons}>
        <CustomButton
          type="primary"
          tooltipInfoContent={t(TranslationKey['Binds integration to the product card'])}
          disabled={!selectedRow || chosenGoods.length < 1}
          onClick={onClickSubmit}
        >
          {t(TranslationKey.Bind)}
        </CustomButton>
      </div>
    </div>
  )
})
