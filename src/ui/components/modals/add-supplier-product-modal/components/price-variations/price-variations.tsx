import { Form } from 'antd'
import { memo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomSelect } from '@components/shared/custom-select'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './price-variations.style'

import { ICreateSupplierProduct, IPrice, SupplierCurrency } from '../../add-supplier-product-modal.type'

export const PriceVariations = memo(() => {
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

  return (
    <div>
      <Form.Item<ICreateSupplierProduct> name="prices" className={sharedStyles.field} rules={getRequiredRules()}>
        <CustomSelect
          required
          allowClear
          mode="tags"
          wrapperClassName={sharedStyles.input}
          label="Payment methods"
          options={[]}
          fieldNames={{ value: 'amount', label: 'amount' }}
          tagRender={props => {
            console.log('props :>> ', props)

            return <>{'22223'}</>
          }}
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

              <CustomButton size="middle" shape="circle" icon={<FaPlus size={16} />} />
            </div>
          )}
        />
      </Form.Item>
    </div>
  )
})
