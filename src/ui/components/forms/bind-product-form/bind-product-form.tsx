/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { RadioButtons } from '@components/shared/radio-buttons'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { SelectProductButton } from '@components/shared/selects/with-search-select/select-product-button'

import { t } from '@utils/translations'

import { ProductVariation } from '@typings/enums/product-variation'
import { IProduct } from '@typings/models/products/product'
import { ButtonType, ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './bind-product-form.style'

import { SelectedProduct } from './selected-product/selected-product'

interface BindProductFormProps {
  sourceProduct: IProduct
  productsToBind: Array<IProduct>
  onClickGetProductsToBind: (options: string) => void
  onClickNextButton: (option?: string, products?: Array<IProduct>) => void
  onClickCancelButton: () => void
  loadMorePermissionsDataHadler: () => void
  onClickSubmitSearch: (searchValue: string) => void
}

export const BindProductForm: FC<BindProductFormProps> = observer(props => {
  const { classes: styles } = useStyles()

  const {
    sourceProduct,
    productsToBind,
    onClickGetProductsToBind,
    onClickNextButton,
    onClickCancelButton,
    loadMorePermissionsDataHadler,
    onClickSubmitSearch,
  } = props

  const [selectedProducts, setSelectedProducts] = useState<Array<IProduct>>([])
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>()

  const radioBottonsSettings = [
    {
      label: () => t(TranslationKey['Add parent']),
      value: ProductVariation.PARENT,
      disabled: !sourceProduct?.parentProductId && sourceProduct?.hasChildren,
    },
    {
      label: () => t(TranslationKey['Add variations']),
      value: ProductVariation.CHILD,
    },
  ]

  const chooseRadioButtonSettingHandler = (value: string | number | boolean) => {
    if (typeof value === 'string') {
      setSelectedProducts([])
      setSelectedRadioValue(value)
      onClickGetProductsToBind(value)
    }
  }

  const onClickDeleteButton = (product: IProduct) => {
    setSelectedProducts(prev => prev.filter(el => el._id !== product._id))
  }

  const selectProductHandler = (selectedProduct: IProduct) => {
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
        {/* @ts-ignore */}
        <WithSearchSelect
          // @ts-ignore
          asinSelect
          grayBorder
          blackSelectedItem
          darkIcon
          chosenItemNoHover
          CustomButton={(componentProps: any) => <SelectProductButton {...componentProps} />}
          notCloseOneClick={selectedRadioValue === ProductVariation.CHILD}
          checkbox={selectedRadioValue === ProductVariation.CHILD}
          disabled={!selectedRadioValue}
          data={productsToBind?.filter(productToBind => productToBind?._id !== sourceProduct?._id)}
          selectedData={selectedProducts}
          width={300}
          customSubMainWrapper={styles.searchSelectCustomSubMainWrapper}
          customSearchInput={styles.searchSelectCustomSearchInput}
          customItemsWrapper={styles.searchSelectCustomItemsWrapper}
          selectedItemName={t(TranslationKey['Select products'])}
          onScrollItemList={loadMorePermissionsDataHadler}
          onClickSubmitSearch={onClickSubmitSearch}
          onClickSelect={(product: IProduct) => {
            if (selectedRadioValue === ProductVariation.PARENT) {
              setSelectedProducts([product])
            } else {
              selectProductHandler(product)
            }
          }}
        />

        <div className={styles.selectedVariationsWrapper}>
          {!!selectedProducts.length &&
            selectedProducts.map((product: IProduct, productIndex: number) => (
              <SelectedProduct key={productIndex} product={product} onClickDeleteButton={onClickDeleteButton} />
            ))}
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          type={ButtonType.SUCCESS}
          disabled={!selectedProducts.length}
          onClick={() => onClickNextButton(selectedRadioValue, selectedProducts)}
        >
          {t(TranslationKey.Next)}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} className={styles.canselButton} onClick={onClickCancelButton}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
