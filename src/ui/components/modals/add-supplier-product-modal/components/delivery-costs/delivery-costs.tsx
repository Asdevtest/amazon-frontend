import { Form, FormInstance } from 'antd'
import { FC, memo } from 'react'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomInputNumber } from '@components/shared/custom-input-number'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './delivery-costs.style'

import { ICreateSupplierProduct, SupplierCurrency } from '../../add-supplier-product-modal.type'

interface IDeliveryCostsProps {
  currency?: SupplierCurrency
  form: FormInstance<ICreateSupplierProduct>
}

export const DeliveryCosts: FC<IDeliveryCostsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const { currency = SupplierCurrency.CNY, form } = props

  const customValue = Form.useWatch(values => values.priceInYuan * 10 || '', form)

  console.log('customValue :>> ', customValue)

  return (
    <div className={styles.root}>
      <CustomButton
        size="small"
        type="default"
        icon={currency}
        className={cx(styles.currency, { [styles.alignLeft]: currency === SupplierCurrency.USD })}
      />

      <div className={styles.inputWrapper}>
        <Form.Item<ICreateSupplierProduct>
          name="priceInYuan" /* priceInUsd */
          className={sharedStyles.field} /* rules={getRequiredRules()} */
        >
          <CustomInputNumber
            size="large"
            label="Price per unit"
            placeholder="Price per unit"
            precision={2}
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <CustomInputNumber
          disabled
          size="large"
          label="Price with delivery per unit"
          placeholder="Price with delivery per unit"
          wrapperClassName={sharedStyles.input}
          value={customValue}
        />
      </div>
    </div>
  )
})
