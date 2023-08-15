/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { RadioButtons } from '@components/shared/radio-buttons'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { t } from '@utils/translations'

import { IproductsToBind, ProductVariation } from '@typings/product'

import { useClassNames } from './bind-product-form.styles'

import { SelectedProduct } from './selected-product/selected-product'

const radioBottonsSettings = [
  {
    label: () => t(TranslationKey['Add parent']),
    value: ProductVariation.PARENT,
  },
  {
    label: () => t(TranslationKey['Add variations']),
    value: ProductVariation.CHILD,
  },
]

interface BindProductFormProps {
  productsToBind: Array<IproductsToBind>
  onClickGetProductsToBind: (options: string) => void
  onClickNextButton: (option?: string, products?: Array<IproductsToBind>) => void
  onClickCancelButton: () => void
}

export const BindProductForm: FC<BindProductFormProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { productsToBind, onClickGetProductsToBind, onClickNextButton, onClickCancelButton } = props

  const [selectedProducts, setSelectedProducts] = useState<Array<IproductsToBind>>([])
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>()

  const chooseRadioButtonSettingHandler = (value: string | number | boolean) => {
    if (typeof value === 'string') {
      setSelectedProducts([])
      setSelectedRadioValue(value)
      onClickGetProductsToBind(value)
    }
  }

  const onClickDeleteButton = (product: IproductsToBind) => {
    setSelectedProducts(prev => prev.filter(el => el._id !== product._id))
  }

  const selectProductHandler = (selectedProduct: IproductsToBind) => {
    setSelectedProducts(prev => {
      if (prev.some(product => product._id === selectedProduct._id)) {
        return prev.filter(product => product._id !== selectedProduct._id)
      } else {
        return prev ? [...prev, selectedProduct] : [selectedProduct]
      }
    })
  }

  return (
    <div className={classNames.root}>
      <p className={classNames.title}>{t(TranslationKey['Select product'])}</p>

      <div className={classNames.radioButtonsWrapper}>
        <RadioButtons
          verticalDirection
          radioBottonsSettings={radioBottonsSettings}
          currentValue={selectedRadioValue}
          onClickRadioButton={chooseRadioButtonSettingHandler}
        />
      </div>

      <div className={classNames.selectWrapper}>
        {/* @ts-ignore */}
        <WithSearchSelect
          asinSelect
          grayBorder
          blackSelectedItem
          darkIcon
          chosenItemNoHover
          notCloseOneClick={selectedRadioValue === ProductVariation.CHILD}
          selectedAsins={selectedProducts}
          checkbox={selectedRadioValue === ProductVariation.CHILD}
          disabled={!selectedRadioValue}
          data={productsToBind}
          width={255}
          searchOnlyFields={['asin', 'skusByClient']}
          customSubMainWrapper={classNames.searchSelectCustomSubMainWrapper}
          customSearchInput={classNames.searchSelectCustomSearchInput}
          customItemsWrapper={classNames.searchSelectCustomItemsWrapper}
          selectedItemName={t(TranslationKey['Select products'])}
          onClickSelect={(product: IproductsToBind) => {
            if (selectedRadioValue === ProductVariation.PARENT) {
              setSelectedProducts([product])
            } else {
              selectProductHandler(product)
            }
          }}
        />

        <div className={classNames.selectedVariationsWrapper}>
          {!!selectedProducts.length &&
            selectedProducts.map((product: IproductsToBind, productIndex: number) => (
              <SelectedProduct key={productIndex} product={product} onClickDeleteButton={onClickDeleteButton} />
            ))}
        </div>
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button
          success
          disabled={!selectedProducts.length}
          variant="contained"
          onClick={() => onClickNextButton(selectedRadioValue, selectedProducts)}
        >
          {t(TranslationKey.Next)}
        </Button>

        <Button variant="text" className={classNames.canselButton} onClick={onClickCancelButton}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
