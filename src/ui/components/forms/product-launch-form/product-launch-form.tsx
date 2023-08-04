/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { RadioButtons } from '@components/shared/radio-buttons'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { t } from '@utils/translations'

import { useClassNames } from './product-launch-form.styles'

interface IProductsLaunch {
  amazonTitle: string
  asin: string
  images: Array<string>
  shopIds: Array<string>
  skusByClient: Array<string>
}

interface ProductLaunchFormProps {
  selectedProductToLaunch: any
  productsToLaunch: Array<IProductsLaunch>
  onClickNextButton: (product: any) => void
  onClickVariationRadioButton: () => void
  onClickCancelButton: () => void
}

const radioBottonsSettings = [
  {
    label: () => t(TranslationKey['New product']),
    value: false,
  },
  {
    label: () => t(TranslationKey.Variation),
    value: true,
  },
]

export const ProductLaunchForm: FC<ProductLaunchFormProps> = observer(props => {
  const { classes: classNames } = useClassNames()
  const {
    productsToLaunch,
    selectedProductToLaunch,
    onClickNextButton,
    onClickVariationRadioButton,
    onClickCancelButton,
  } = props

  const [selectedProduct, setSelectedProduct] = useState<IProductsLaunch | undefined>(undefined)
  const [selectedRadioValue, setSelectedRadioValue] = useState<boolean>(false)

  const changeRadioValueHandler = (selectedValue: boolean) => {
    if (selectedValue) {
      setSelectedRadioValue(selectedValue)
      onClickVariationRadioButton()
    } else {
      setSelectedProduct(undefined)
    }
    setSelectedRadioValue(selectedValue)
  }

  useEffect(() => {
    if (selectedProductToLaunch) {
      changeRadioValueHandler(true)
      setSelectedProduct(selectedProductToLaunch)
    }
  }, [selectedProductToLaunch])

  return (
    <div className={classNames.root}>
      <p className={classNames.modalTitle}>{t(TranslationKey['Create or select product'])}</p>

      <div className={classNames.radioButtonsWrapper}>
        <RadioButtons
          verticalDirection
          radioBottonsSettings={radioBottonsSettings}
          currentValue={selectedRadioValue}
          onClickRadioButton={selectedValue =>
            typeof selectedValue === 'boolean' && changeRadioValueHandler(selectedValue)
          }
        />
      </div>

      {/* @ts-ignore */}
      <WithSearchSelect
        asinSelect
        grayBorder
        blackSelectedItem
        darkIcon
        chosenItemNoHover
        disabled={!selectedRadioValue}
        data={productsToLaunch}
        width={255}
        searchOnlyFields={['asin', 'skusByClient']}
        customSubMainWrapper={classNames.searchSelectCustomSubMainWrapper}
        customSearchInput={classNames.searchSelectCustomSearchInput}
        customItemsWrapper={classNames.searchSelectCustomItemsWrapper}
        selectedItemName={
          selectedProduct?.asin ||
          (selectedProduct?.asin === '' && t(TranslationKey.Missing)) ||
          t(TranslationKey['Parent product'])
        }
        onClickSelect={(el: IProductsLaunch) => setSelectedProduct(el)}
      />

      <div className={classNames.buttonsWrapper}>
        <Button
          success
          disabled={selectedRadioValue && !selectedProduct}
          variant="contained"
          onClick={() => onClickNextButton(selectedProduct)}
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
