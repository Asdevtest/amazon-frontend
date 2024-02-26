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

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './product-launch-form.style'

interface IProductsLaunch {
  amazonTitle: string
  asin: string
  images: Array<string>
  shopId: string
  skuByClient: string
}

interface ProductLaunchFormProps {
  selectedProductToLaunch: any
  productsToLaunch: Array<IProductsLaunch>
  onClickNextButton: (product: any) => void
  onClickVariationRadioButton: () => void
  onClickCancelButton: () => void
  onClickSubmitSearch: (searchValue: string) => void
  loadMorePermissionsDataHadler: () => void
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
  const { classes: styles } = useStyles()
  const {
    productsToLaunch,
    selectedProductToLaunch,
    onClickNextButton,
    onClickVariationRadioButton,
    onClickCancelButton,
    loadMorePermissionsDataHadler,
    onClickSubmitSearch,
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
    <div className={styles.root}>
      <p className={styles.modalTitle}>{t(TranslationKey['Create or select product'])}</p>

      <div className={styles.radioButtonsWrapper}>
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
        // @ts-ignore
        asinSelect
        grayBorder
        blackSelectedItem
        darkIcon
        chosenItemNoHover
        CustomButton={(componentProps: any) => <SelectProductButton {...componentProps} />}
        disabled={!selectedRadioValue}
        data={productsToLaunch}
        width={300}
        customSubMainWrapper={styles.searchSelectCustomSubMainWrapper}
        customSearchInput={styles.searchSelectCustomSearchInput}
        customItemsWrapper={styles.searchSelectCustomItemsWrapper}
        selectedItemName={
          selectedProduct?.asin ||
          (selectedProduct?.asin === '' && t(TranslationKey.Missing)) ||
          t(TranslationKey['Parent product'])
        }
        onScrollItemList={loadMorePermissionsDataHadler}
        onClickSubmitSearch={onClickSubmitSearch}
        onClickSelect={(el: IProductsLaunch) => setSelectedProduct(el)}
      />

      <div className={styles.buttonsWrapper}>
        <Button
          styleType={ButtonStyle.SUCCESS}
          disabled={selectedRadioValue && !selectedProduct}
          onClick={() => onClickNextButton(selectedProduct)}
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
