import { Form } from 'antd'
import { FC, memo } from 'react'

import { CustomInputNumber } from '@components/shared/custom-input-number'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './delivery-costs-inputs.style'

import { ICreateSupplierProductModal } from '../../add-supplier-product-modal.type'

interface DeliveryCostsInputsProps {
  controllItemName: keyof ICreateSupplierProductModal
  controllInputTitle: string
  uncontrollInputTitle: string
  uncontrollInputValue: number

  onChangeDelivery: (value: number) => void
}

export const DeliveryCostsInputs: FC<DeliveryCostsInputsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const { controllItemName, controllInputTitle, uncontrollInputTitle, uncontrollInputValue, onChangeDelivery } = props

  return (
    <div className={styles.inputWrapper}>
      <Form.Item<ICreateSupplierProductModal>
        name={controllItemName}
        className={cx(sharedStyles.field, styles.deliveryField)}
        rules={getRequiredRules()}
      >
        <CustomInputNumber
          required
          size="large"
          label={controllInputTitle}
          precision={2}
          wrapperClassName={sharedStyles.input}
          onChange={value => onChangeDelivery(value as number)}
        />
      </Form.Item>

      <CustomInputNumber
        disabled
        size="large"
        label={uncontrollInputTitle}
        wrapperClassName={sharedStyles.input}
        value={uncontrollInputValue}
      />
    </div>
  )
})
