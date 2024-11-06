import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles } from './bind-stock-goods-to-inventory-form.style'

import { chosenGoodsColumns } from './bind-stock-goods-to-inventory-columns'
import { BindStockGoodsToInventoryFormModel } from './bind-stock-goods-to-inventory-form.model'

interface BindStockGoodsToInventoryFormProps {
  goodsToSelect: any
  onCloseModal: () => void
}

export const BindStockGoodsToInventoryForm = observer((props: BindStockGoodsToInventoryFormProps) => {
  const { goodsToSelect, onCloseModal } = props
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new BindStockGoodsToInventoryFormModel(goodsToSelect, onCloseModal), [])

  const disableResetButton = !viewModel.selectedProduct && viewModel.choosenGoods.length === goodsToSelect.length
  return (
    <div className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <p className={styles.title}>{t(TranslationKey['Inventory integration'])}</p>
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search"
          onSearch={viewModel.onSearchSubmit}
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
            columns={chosenGoodsColumns(viewModel.onDeleteGoods)}
            getRowHeight={() => 'auto'}
          />
        </div>
        <div className={styles.tableWrapper}>
          <CustomDataGrid
            disableColumnMenu
            rowCount={viewModel.rowCount}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.currentData}
            getRowHeight={() => 'auto'}
            columns={viewModel.columnsModel}
            onPaginationModelChange={viewModel.onPaginationModelChange}
          />
        </div>
      </div>
      <div className={styles.flexContainer}>
        <CustomButton danger size="large" disabled={disableResetButton} onClick={viewModel.onResetData}>
          {t(TranslationKey.Reset)}
        </CustomButton>
        <div className={styles.buttonsWrapper}>
          <CustomButton
            type="primary"
            size="large"
            disabled={!viewModel.selectedProduct || viewModel.choosenGoods.length < 1}
            onClick={viewModel.onSubmitBindStockGoods}
          >
            {t(TranslationKey.Bind)}
          </CustomButton>
          <CustomButton size="large" onClick={onCloseModal}>
            {t(TranslationKey.Close)}
          </CustomButton>
        </div>
      </div>
    </div>
  )
})
