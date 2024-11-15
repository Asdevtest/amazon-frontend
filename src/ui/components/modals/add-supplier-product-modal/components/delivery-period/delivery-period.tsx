import { Form } from 'antd'
import { memo } from 'react'

import { CustomInputNumber } from '@components/shared/custom-input-number'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './delivery-period.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'

export const DeliveryPeriod = memo(() => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div className={styles.deliveryPeriodWrapper}>
      <div className={styles.deliveryPeriodInputsWrapper}>
        <Form.Item<ICreateSupplierProduct>
          name="minProductionTerm"
          className={sharedStyles.field}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Min production term"
            placeholder="Days"
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <Form.Item<ICreateSupplierProduct>
          name="maxProductionTerm"
          className={sharedStyles.field}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Max production term"
            placeholder="Days"
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>
      </div>

      <Form.Item<ICreateSupplierProduct> name="amount" className={sharedStyles.field} rules={getRequiredRules()}>
        <CustomInputNumber
          required
          size="large"
          label="Purchase quantity for the current price"
          placeholder="Purchase quantity for the current price"
          precision={2}
          wrapperClassName={sharedStyles.input}
        />
      </Form.Item>

      <Form.Item<ICreateSupplierProduct> name="minlot" className={sharedStyles.field} rules={getRequiredRules()}>
        <CustomInputNumber
          required
          size="large"
          label="Minimum batch"
          placeholder="Minimum batch"
          precision={2}
          wrapperClassName={sharedStyles.input}
        />
      </Form.Item>
    </div>
  )
})
