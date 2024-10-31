import { Transfer, TransferProps } from 'antd'
import { observer } from 'mobx-react'
import { useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles } from './bind-inventory-goods-to-stock-form.style'

import { BindInventoryGoodsToStockFormModel } from './bind-inventory-goods-to-stock-form.modal'

interface BindInventoryGoodsToStockFormProps {
  stockData: any
  updateStockData: (data: any) => void
  productAsin: string
  onSubmit: () => void
}
export const BindInventoryGoodsToStockForm = observer((props: BindInventoryGoodsToStockFormProps) => {
  const { stockData, updateStockData, productAsin, onSubmit } = props
  const viewModel = useMemo(() => new BindInventoryGoodsToStockFormModel(productAsin), [])
  const { classes: styles } = useStyles()

  const [searchInputValue, setSearchInputValue] = useState<string>('')

  console.log(viewModel.sellerBoard)
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{t(TranslationKey['Bind an product from Amazon'])}</p>
        <CustomInputSearch
          allowClear
          size="large"
          value={searchInputValue}
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInputValue(e.target.value)}
        />
      </div>

      <div className={styles.transferWrapper}>
        <Transfer />
      </div>
    </div>
  )
})
