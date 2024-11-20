import { Form, FormInstance } from 'antd'
import { FC, memo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomSelect } from '@components/shared/custom-select'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './price-variations.style'

import { ICreateSupplierProductModal, IPrice, SupplierCurrency } from '../../add-supplier-product-modal.type'

interface IPriceVariationsProps {
  form: FormInstance<ICreateSupplierProductModal>
  onAddPriceVariations: (priceVariation: IPrice) => void
}

export const PriceVariations: FC<IPriceVariationsProps> = memo(({ onAddPriceVariations }) => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const [priceVariation, setPriceVariation] = useState<IPrice>({
    amount: 0,
    price: 0,
  })

  const onChangeAmount = (value: number) => {
    setPriceVariation({ ...priceVariation, amount: value })
  }

  const onChangePrice = (value: number) => {
    setPriceVariation({ ...priceVariation, price: value })
  }

  const onAddPriceVariation = () => {
    onAddPriceVariations(priceVariation)
    setPriceVariation({ amount: 0, price: 0 })
  }

  return (
    <div className={sharedStyles.sectionWrapper}>
      <Form.Item<ICreateSupplierProductModal> name="prices" className={sharedStyles.field}>
        <CustomSelect
          allowClear
          mode="tags"
          wrapperClassName={sharedStyles.input}
          label="Payment methods"
          placeholder="Payment methods"
          options={[]}
          dropdownRender={() => (
            <div className={styles.addPriceVariations}>
              <CustomInputNumber
                size="middle"
                label="Quantity"
                placeholder="Quantity"
                wrapperClassName={sharedStyles.input}
                value={priceVariation.amount}
                onChange={value => onChangeAmount(value as number)}
              />

              <CustomInputNumber
                size="middle"
                label="Cost"
                placeholder="Cost"
                precision={2}
                wrapperClassName={sharedStyles.input}
                addonAfter={SupplierCurrency.CNY}
                value={priceVariation.price}
                onChange={value => onChangePrice(value as number)}
              />

              <CustomButton
                size="middle"
                shape="circle"
                icon={<FaPlus size={16} />}
                disabled={!priceVariation.amount || !priceVariation.price}
                onClick={onAddPriceVariation}
              />
            </div>
          )}
        />
      </Form.Item>
    </div>
  )
})
