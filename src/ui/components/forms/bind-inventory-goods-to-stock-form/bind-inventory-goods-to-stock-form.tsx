import type { Key } from 'antd/es/table/interface'
import { observer } from 'mobx-react'
import React, { useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInputSearch } from '@components/shared/custom-input-search'
import { TableTransfer } from '@components/shared/table-transfer'

import { t } from '@utils/translations'

import { useStyles } from './bind-inventory-goods-to-stock-form.style'

// Import the TableTransfer component
import { BindInventoryGoodsToStockFormModel } from './bind-inventory-goods-to-stock-form.model'
import { bindInventoryColumns } from './bind-stock-goods-to-inventory-columns'

interface BindInventoryGoodsToStockFormProps {
  stockData: any
  updateStockData: (data: any) => void
  productAsin: string
  onSubmit: () => void
}

export const BindInventoryGoodsToStockForm = observer((props: BindInventoryGoodsToStockFormProps) => {
  const { productAsin } = props
  const viewModel = useMemo(() => new BindInventoryGoodsToStockFormModel(productAsin), [])
  const { classes: styles } = useStyles()

  console.log(viewModel.targetKeys)

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
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => viewModel.setSearchInputValue(e.target.value)}
        />
      </div>

      <div className={styles.transferWrapper}>
        <TableTransfer
          dataSource={viewModel.filteredData}
          targetKeys={viewModel.targetKeys}
          leftColumns={bindInventoryColumns}
          rightColumns={bindInventoryColumns}
          titles={['Available', 'Selected']}
          onChange={viewModel.onChange}
        />
      </div>
    </div>
  )
})
