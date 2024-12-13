/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { CustomButton } from '@components/shared/custom-button'
import { RadioButtons } from '@components/shared/radio-buttons'
import { AsinOption, InfiniteScrollSelect } from '@components/shared/selects/infinite-scroll-select'

import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { ProductVariation } from '@typings/enums/product/product-variation'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './bind-product-form.style'

interface BindProductFormProps {
  product: IProduct
  onClose: () => void
  onSubmit?: (value?: string, productsIds?: string[]) => void
}

export const BindProductForm: FC<BindProductFormProps> = observer(props => {
  const { product, onClose, onSubmit } = props

  const { classes: styles } = useStyles()

  const [selectedProducts, setSelectedProducts] = useState<Array<IProduct>>([])
  const [radioValue, setRadioValue] = useState<ProductVariation>()

  const notParent = !product?.parentProductId && product?.hasChildren

  useEffect(() => {
    if (notParent) {
      handleChangeRadio(ProductVariation.CHILD)
    }
  }, [product?.parentProductId, product?.hasChildren])

  const handleChangeRadio = (value: ProductVariation) => {
    setSelectedProducts([])
    setRadioValue(value)
  }

  const handleChangeProducts = (values: any) => {
    const products = radioValue === ProductVariation.CHILD ? values : [values]
    setSelectedProducts(products as IProduct[])
  }

  const handleSubmit = () => {
    const selectedProductIds = selectedProducts.map(el => el._id)

    onSubmit?.(radioValue, selectedProductIds)
  }

  const radioBottonsSettings = [
    {
      label: 'Add parent',
      value: ProductVariation.PARENT,
      // disabled: notParent,
    },
    {
      label: 'Add variations',
      value: ProductVariation.CHILD,
    },
  ]

  const filterOptions = {
    isChild: false,
    isParent: radioValue === ProductVariation.CHILD ? false : undefined,
    shopId: radioValue === ProductVariation.CHILD ? product?.shopId : undefined,
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Select product'])}</p>

      <RadioButtons
        currentValue={radioValue}
        radioBottonsSettings={radioBottonsSettings}
        onClickRadioButton={handleChangeRadio}
      />

      <InfiniteScrollSelect<IProduct>
        required
        mode={radioValue === ProductVariation.CHILD ? 'multiple' : undefined}
        optionLabel="asin"
        optionValue="_id"
        filterOptions={filterOptions}
        method={ClientModel.getProductPermissionsData}
        optionNode={AsinOption}
        size="large"
        label="Select products"
        style={{ width: '100%' }}
        placeholder="Select product"
        value={selectedProducts}
        onChange={(_, values) => handleChangeProducts(values)}
      />

      <div className={styles.buttons}>
        <CustomButton type="primary" disabled={!selectedProducts.length} onClick={handleSubmit}>
          {t(TranslationKey.Next)}
        </CustomButton>
        <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
