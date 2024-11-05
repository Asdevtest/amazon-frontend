import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles } from './bind-stock-goods-to-inventory-form.style'

import { chosenGoodsColumns, stockGoodsColumns } from './bind-stock-goods-to-inventory-columns'
import { BindStockGoodsToInventoryFormModel } from './bind-stock-goods-to-inventory-form.model'

interface BindStockGoodsToInventoryFormProps {
  goodsToSelect: any
  inventoryData: any
  updateInventoryData: any
  productAsin: string
  onSubmit: any
}

export const BindStockGoodsToInventoryForm = observer((props: BindStockGoodsToInventoryFormProps) => {
  const { goodsToSelect, inventoryData, updateInventoryData, productAsin, onSubmit } = props
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new BindStockGoodsToInventoryFormModel(productAsin, goodsToSelect), [])
  return (
    <div className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <p className={styles.title}>{t(TranslationKey['Inventory integration'])}</p>
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          value={viewModel.searchInputValue}
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => viewModel.setSearchInputValue(e.target.value)}
        />
      </div>

      <div className={styles.flexContainer}>
        <div className={styles.tableWrapper}>
          <CustomDataGrid
            disableColumnMenu
            columnHeaderHeight={40}
            sortingMode="client"
            paginationMode="client"
            rows={viewModel.choosenGoods}
            columns={chosenGoodsColumns()}
            getRowHeight={() => 'auto'}
          />
        </div>
        <div className={styles.tableWrapper}>
          <CustomDataGrid
            disableColumnMenu
            checkboxSelection
            columnHeaderHeight={40}
            sortingMode="client"
            paginationMode="client"
            rows={viewModel.inventoryProducts}
            columns={stockGoodsColumns()}
            getRowHeight={() => 'auto'}
            rowSelectionModel={viewModel.selectedProduct}
            onRowSelectionModelChange={viewModel.onSelectProduct}
          />
        </div>
      </div>

      <div className={styles.buttons}>
        <CustomButton
          type="primary"
          title={t(TranslationKey['Binds integration to the product card'])}
          // disabled={!selectedRow || chosenGoods.length < 1}
          // onClick={onClickSubmit}
        >
          {t(TranslationKey.Bind)}
        </CustomButton>
      </div>
    </div>
  )
})
