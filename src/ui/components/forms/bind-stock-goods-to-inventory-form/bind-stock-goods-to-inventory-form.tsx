import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { IStockGood } from '@typings/models/seller-boards/stock-good'

import { useStyles } from './bind-stock-goods-to-inventory-form.style'

import { BindStockGoodsToInventoryFormModel } from './bind-stock-goods-to-inventory-form.model'
import { chosenGoodsColumns } from './columns/choosen-goods-columns'

interface BindStockGoodsToInventoryFormProps {
  goodsToSelect: IStockGood[]
  onCloseModal: () => void
}

export const BindStockGoodsToInventoryForm: FC<BindStockGoodsToInventoryFormProps> = observer(props => {
  const { goodsToSelect, onCloseModal } = props
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new BindStockGoodsToInventoryFormModel(goodsToSelect, onCloseModal), [])

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
        <CustomButton danger size="large" disabled={viewModel.disableResetButton} onClick={viewModel.onResetData}>
          {t(TranslationKey.Reset)}
        </CustomButton>
        <div className={styles.buttonsWrapper}>
          <CustomButton
            type="primary"
            size="large"
            disabled={viewModel.disableBindButton}
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
