import React, { ChangeEvent, FC, useState } from 'react'
import { useSupplierPriceVariationSelectorStyles } from '@components/product/suplier-price-variation-selector/supplier-price-variation-selector.styles'
import { Typography } from '@mui/material'
import { Field } from '@components/shared/field'
import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { Input } from '@components/shared/input'
import { cx } from '@emotion/css'

interface VariationType {
  quantity: number
  price: number
}

interface SupplierPriceVariationSelectorProps {
  currentVariations: VariationType[]
  updateVariationList: (newVariations: VariationType[]) => void
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
      <Typography className={styles.title}>Вариации цен:</Typography>
      <div className={styles.content}>
        <div className={styles.creationBlock}>
          <Field
            containerClasses={styles.field}
            inputClasses={styles.creationInput}
            labelClasses={styles.label}
            label={'Количество, ед'}
            placeholder="00"
            value={quantity}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                setQuantity(e.target.value)
              }
            }}
          />

          <Field
            containerClasses={styles.field}
            inputClasses={styles.creationInput}
            labelClasses={styles.label}
            label={'Стоимость,¥'}
            placeholder="00"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                setPrice(e.target.value)
              }
            }}
          />

          <button className={cx(styles.addBtn, styles.controlButton)} onClick={handleAddVariation}>
            <img src="/assets/icons/addTag.svg" alt="+" />
          </button>
        </div>

        {!!variationList.length && (
          <div className={styles.currentVariations}>
            <Typography className={styles.label}>Вариации цен:</Typography>

            <div className={styles.currentVariationList}>
              {variationList.map((el, index) => (
                <div key={index} className={styles.variationListItem}>
                  <Input readOnly value={`${el.quantity}/${el.price * el.quantity}`} />
                  <button
                    className={cx(styles.removeBtn, styles.controlButton)}
                    onClick={() => handleRemoveVariation(index)}
                  >
                    <img src="/assets/icons/minus.svg" alt="-" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
