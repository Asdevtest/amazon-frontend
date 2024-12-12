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

import { SelectedProduct } from './selected-product/selected-product'

interface BindProductFormProps {
  sourceProduct: IProduct
  onClickGetProductsToBind: (options: string) => void
  onClickNextButton: (option?: string, products?: Array<IProduct>) => void
  onClose: () => void
}

export const BindProductForm: FC<BindProductFormProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { sourceProduct, onClickGetProductsToBind, onClickNextButton, onClose } = props

  const [selectedProducts, setSelectedProducts] = useState<Array<IProduct>>([])
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>()

  const radioBottonsSettings = [
    {
      label: 'Add parent',
      value: ProductVariation.PARENT,
      // disabled: !sourceProduct?.parentProductId && sourceProduct?.hasChildren,
    },
    {
      label: 'Add variations',
      value: ProductVariation.CHILD,
    },
  ]

  const chooseRadioButtonSettingHandler = (value: string | number | boolean) => {
    if (typeof value === 'string') {
      setSelectedProducts([])
      setSelectedRadioValue(value)
      onClickGetProductsToBind?.(value)
    }
  }

  const onClickDeleteButton = (product: IProduct) => {
    setSelectedProducts(prev => prev.filter(el => el._id !== product._id))
  }

  const selectProductHandler = (selectedProduct: IProduct) => {
    if (selectedRadioValue === ProductVariation.PARENT) {
      return setSelectedProducts([selectedProduct])
    }
    setSelectedProducts(prev => {
      if (prev.some(product => product._id === selectedProduct._id)) {
        return prev.filter(product => product._id !== selectedProduct._id)
      } else {
        return prev ? [...prev, selectedProduct] : [selectedProduct]
      }
    })
  }

  useEffect(() => {
    if (!sourceProduct?.parentProductId && sourceProduct?.hasChildren) {
      chooseRadioButtonSettingHandler(ProductVariation.CHILD)
    }
  }, [sourceProduct?.parentProductId, sourceProduct?.hasChildren])

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Select product'])}</p>

      <div className={styles.radioButtonsWrapper}>
        <RadioButtons
          verticalDirection
          radioBottonsSettings={radioBottonsSettings}
          currentValue={selectedRadioValue}
          onClickRadioButton={chooseRadioButtonSettingHandler}
        />
      </div>

      <div className={styles.selectWrapper}>
        <InfiniteScrollSelect<IProduct>
          optionLabel="asin"
          optionValue="_id"
          method={ClientModel.getProductPermissionsData}
          optionNode={AsinOption}
          disabled={!selectedRadioValue}
          placeholder="Select product"
          onChange={selectProductHandler}
        />

        <div className={styles.selectedVariationsWrapper}>
          {!!selectedProducts.length &&
            selectedProducts.map((product: IProduct, productIndex: number) => (
              <SelectedProduct key={productIndex} product={product} onClickDeleteButton={onClickDeleteButton} />
            ))}
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <CustomButton
          type="primary"
          disabled={!selectedProducts.length}
          onClick={() => onClickNextButton(selectedRadioValue, selectedProducts)}
        >
          {t(TranslationKey.Next)}
        </CustomButton>

        <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
