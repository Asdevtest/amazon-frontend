import { Form } from 'antd'
import { FC, memo } from 'react'

import { CustomInputNumber } from '@components/shared/custom-input-number'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './delivery-costs-inputs.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'

interface DeliveryCostsInputsProps {
  controllItemName: keyof ICreateSupplierProduct
  controllInputTitle: string
  uncontrollInputTitle: string
  uncontrollInputValue: number
}

export const DeliveryCostsInputs: FC<DeliveryCostsInputsProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const { controllItemName, controllInputTitle, uncontrollInputTitle, uncontrollInputValue } = props

  return (
    <div className={styles.inputWrapper}>
      <Form.Item<ICreateSupplierProduct> name={controllItemName} className={sharedStyles.field}>
        <CustomInputNumber
          size="large"
          label={controllInputTitle}
          placeholder={controllInputTitle}
          precision={2}
          wrapperClassName={sharedStyles.input}
        />
      </Form.Item>

      <CustomInputNumber
        disabled
        size="large"
        label={uncontrollInputTitle}
        placeholder={uncontrollInputTitle}
        wrapperClassName={sharedStyles.input}
        value={uncontrollInputValue}
      />
    </div>
  )
})
