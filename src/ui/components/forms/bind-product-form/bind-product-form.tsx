/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { CustomButton } from '@components/shared/custom-button'
import { RadioButtons } from '@components/shared/radio-buttons'
import { InfiniteScrollSelect } from '@components/shared/selects/infinite-scroll-select'
import { AsinOption } from '@components/shared/selects/infinite-scroll-select/options'

import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { ProductVariation } from '@typings/enums/product/product-variation'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './bind-product-form.style'

interface BindProductFormProps {
  sourceProduct: IProduct
  onClickGetProductsToBind: (options: string) => void
  onClickNextButton: (option?: string, products?: string[]) => void
  onClose: () => void
}

export const BindProductForm: FC<BindProductFormProps> = observer(props => {
  const { sourceProduct, onClickGetProductsToBind, onClickNextButton, onClose } = props

  const { classes: styles } = useStyles()

  const [selectedProducts, setSelectedProducts] = useState<Array<IProduct>>([])
  const [radioValue, setRadioValue] = useState<ProductVariation>(ProductVariation.PARENT)

  const notParent = !sourceProduct?.parentProductId && sourceProduct?.hasChildren

  useEffect(() => {
    if (notParent) {
      handleChangeRadio(ProductVariation.CHILD)
    }
  }, [sourceProduct?.parentProductId, sourceProduct?.hasChildren])

  const handleChangeRadio = (value: ProductVariation) => {
    setSelectedProducts([])
    setRadioValue(value)
    onClickGetProductsToBind(value)
  }

  const handleChangeProducts = (values: any) => {
    setSelectedProducts(values as IProduct[])
  }

  const handleSubmit = () => {
    const selectedProductIds = selectedProducts.map(el => el._id)

    onClickNextButton(radioValue, selectedProductIds)
  }

  const radioBottonsSettings = [
    {
      label: 'Add parent',
      value: ProductVariation.PARENT,
      disabled: notParent,
    },
    {
      label: 'Add variations',
      value: ProductVariation.CHILD,
    },
  ]

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Select product'])}</p>

      <RadioButtons
        currentValue={radioValue}
        radioBottonsSettings={radioBottonsSettings}
        onClickRadioButton={handleChangeRadio}
      />

      {/* <AsinSelect
        label="Select products"
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Select product"
        onChange={(_, values) => handleChangeProducts(values)}
      /> */}

      <div className={styles.buttons}>
        <CustomButton type="primary" disabled={!selectedProducts.length} onClick={handleSubmit}>
          {t(TranslationKey.Next)}
        </CustomButton>
        <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
