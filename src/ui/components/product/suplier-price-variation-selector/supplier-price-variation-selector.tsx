import React, { ChangeEvent, FC, useState } from 'react'
import { useSupplierPriceVariationSelectorStyles } from '@components/product/suplier-price-variation-selector/supplier-price-variation-selector.styles'
import { Typography } from '@mui/material'
import { Field } from '@components/shared/field'
import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { Input } from '@components/shared/input'
import { cx } from '@emotion/css'
import { t } from '@utils/translations'
import { TranslationKey } from '@constants/translations/translation-key'

interface VariationType {
  quantity: number
  price: number
}

interface SupplierPriceVariationSelectorProps {
  currentVariations: VariationType[]
  updateVariationList: (newVariations: VariationType[]) => void
  isEditMode: boolean
}

export const SupplierPriceVariationSelector: FC<SupplierPriceVariationSelectorProps> = props => {
  const { classes: styles } = useSupplierPriceVariationSelectorStyles()

  const [variationList, setVariationList] = useState<VariationType[]>(props.currentVariations || [])
  const [quantity, setQuantity] = useState<string>('')
  const [price, setPrice] = useState<string>('')

  const handleAddVariation = () => {
    const newList = [...variationList, { price: Number(price), quantity: Number(quantity) }]
    setVariationList(newList)
    setQuantity('')
    setPrice('')
    props.updateVariationList(newList)
  }

  const handleRemoveVariation = (id: number) => {
    const newList = variationList.filter((el, index) => index !== id)
    setVariationList(newList)
    props.updateVariationList(newList)
  }

  return (
    <div className={styles.body}>
      <Typography className={styles.title}>{t(TranslationKey['Price variations'])}:</Typography>
      <div className={styles.content}>
        {props.isEditMode && (
          <div className={styles.creationBlock}>
            <Field
              containerClasses={styles.field}
              inputClasses={styles.creationInput}
              labelClasses={styles.label}
              label={`${t(TranslationKey.Quantity)}, ${t(TranslationKey.units)}`}
              placeholder="00"
              value={quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                  if (Number(e.target.value) > 999_999) {
                    setQuantity(String(999_999))
                    return
                  }
                  setQuantity(e.target.value)
                }
              }}
            />

            <Field
              containerClasses={styles.field}
              inputClasses={styles.creationInput}
              labelClasses={styles.label}
              label={`${t(TranslationKey.Cost)},¥`}
              placeholder="00"
              value={price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                  if (Number(e.target.value) > 999_999.99) {
                    setPrice(String(999_999.99))
                    return
                  }
                  setPrice(e.target.value)
                }
              }}
            />

            <button
              className={cx(styles.addBtn, styles.controlButton)}
              disabled={!price || !quantity || variationList.some(el => el.quantity === Number(quantity))}
              onClick={handleAddVariation}
            >
              <img src="/assets/icons/addTag.svg" alt="+" />
            </button>
          </div>
        )}

        {!!variationList.length && (
          <div className={styles.currentVariations}>
            <div className={styles.currentVariationList}>
              {variationList.map((el, index) => (
                <div key={index} className={styles.variationListItem}>
                  <Field
                    disabled
                    labelClasses={styles.label}
                    containerClasses={styles.field}
                    label={t(TranslationKey.Quantity)}
                    value={el.quantity}
                  />
                  <Field
                    disabled
                    labelClasses={styles.label}
                    containerClasses={styles.field}
                    label={`${t(TranslationKey.Cost)},¥`}
                    value={el.price}
                  />
                  {props.isEditMode && (
                    <button
                      className={cx(styles.removeBtn, styles.controlButton)}
                      onClick={() => handleRemoveVariation(index)}
                    >
                      <img src="/assets/icons/minus.svg" alt="-" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
