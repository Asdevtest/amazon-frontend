import { Form, FormInstance } from 'antd'
import { FC, memo } from 'react'

import { CustomButton } from '@components/shared/custom-button'

import { toFixed } from '@utils/text'

import { useStyles } from './delivery-costs.style'

import { ICreateSupplierProduct, SupplierCurrency } from '../../add-supplier-product-modal.type'
import { DeliveryCostsInputs } from '../delivery-costs-inputs'

interface IDeliveryCostsProps {
  form: FormInstance<ICreateSupplierProduct>
  currency: SupplierCurrency

  getBatchPrice: (values: ICreateSupplierProduct) => number
  getPriceWithDeliveryPerUnit: (values: ICreateSupplierProduct) => number
}

export const DeliveryCosts: FC<IDeliveryCostsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { currency, form, getBatchPrice, getPriceWithDeliveryPerUnit } = props

  const deliveryPerUnitName = currency === SupplierCurrency.CNY ? 'priceInYuan' : 'priceInUsd'
  const batchDelivery = currency === SupplierCurrency.CNY ? 'batchDeliveryCostInYuan' : 'batchDeliveryCostInDollar'

  const priceWithDeliveryPerUnit = Form.useWatch(values => {
    const result = getPriceWithDeliveryPerUnit(values)

    return result ? toFixed(result) : ''
  }, form)

  const batchPrice = Form.useWatch(values => {
    const result = getBatchPrice(values)

    return result ? toFixed(result) : ''
  }, form)

  return (
    <div className={styles.root}>
      <CustomButton
        size="small"
        type="default"
        icon={currency}
        className={cx(styles.currency, { [styles.alignLeft]: currency === SupplierCurrency.USD })}
      />

      <DeliveryCostsInputs
        controllItemName={deliveryPerUnitName}
        controllInputTitle="Price per unit"
        uncontrollInputTitle="Price with delivery per unit"
        uncontrollInputValue={priceWithDeliveryPerUnit}
      />

      <DeliveryCostsInputs
        controllItemName={batchDelivery}
        controllInputTitle="Batch delivery"
        uncontrollInputTitle="Batch price"
        uncontrollInputValue={batchPrice}
      />
    </div>
  )
})
