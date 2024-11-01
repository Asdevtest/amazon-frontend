import { observer } from 'mobx-react'
import React, { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { TableTransfer } from '@components/shared/table-transfer'

import { t } from '@utils/translations'

import { useStyles } from './bind-inventory-goods-to-stock-form.style'

// Import the TableTransfer component
import { BindInventoryGoodsToStockFormModel } from './bind-inventory-goods-to-stock-form.model'
import { bindInventoryColumns } from './bind-stock-goods-to-inventory-columns'

interface BindInventoryGoodsToStockFormProps {
  productAsin: string
  productId: string
}

export const BindInventoryGoodsToStockForm = observer((props: BindInventoryGoodsToStockFormProps) => {
  const { productAsin, productId } = props
  const viewModel = useMemo(() => new BindInventoryGoodsToStockFormModel(productAsin, productId), [])
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{t(TranslationKey['Bind an product from Amazon'])}</p>
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          value={viewModel.searchInputValue}
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => viewModel.setSearchInputValue(e.target.value)}
        />
      </div>

      <div className={styles.transferWrapper}>
        <TableTransfer
          dataSource={viewModel.dataWithKeys}
          targetKeys={viewModel.targetKeys}
          leftColumns={bindInventoryColumns}
          rightColumns={bindInventoryColumns}
          tableHeight={500}
          onChange={viewModel.onChange}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <CustomButton>{t(TranslationKey.Close)}</CustomButton>
        <CustomButton disabled={!viewModel.targetKeys.length} type="primary" onClick={viewModel.onSubmitBindStockGoods}>
          {t(TranslationKey.Bind)}
        </CustomButton>
      </div>
    </div>
  )
})
