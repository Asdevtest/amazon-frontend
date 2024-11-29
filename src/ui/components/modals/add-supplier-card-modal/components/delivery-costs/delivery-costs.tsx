import { Form } from 'antd'
import { FC, memo } from 'react'

import { CustomButton } from '@components/shared/custom-button'

import { toFixed } from '@utils/text'

import { useStyles } from './delivery-costs.style'

import { ICreateSupplierProductModal, SupplierCurrency } from '../../add-supplier-card-modal.type'
import { DeliveryCostsInputs } from '../delivery-costs-inputs'

interface IDeliveryCostsProps {
  currency: SupplierCurrency

  getBatchPrice: (values: ICreateSupplierProductModal) => number
  getPriceWithDeliveryPerUnit: (values: ICreateSupplierProductModal) => number

  onChangePricePerUnit: (currency: SupplierCurrency, value: number) => void
  onChangeBatchDelivery: (currency: SupplierCurrency, value: number) => void
}

export const DeliveryCosts: FC<IDeliveryCostsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { currency, getBatchPrice, getPriceWithDeliveryPerUnit, onChangePricePerUnit, onChangeBatchDelivery } = props

  const deliveryPerUnitName = currency === SupplierCurrency.CNY ? 'priceInYuan' : 'priceInUsd'
  const batchDelivery = currency === SupplierCurrency.CNY ? 'batchDeliveryCostInYuan' : 'batchDeliveryCostInDollar'

  const priceWithDeliveryPerUnit = Form.useWatch(values => {
    const result = getPriceWithDeliveryPerUnit(values)

    return result ? toFixed(result) : ''
  })

  const batchPrice = Form.useWatch(values => {
    const result = getBatchPrice(values)

    return result ? toFixed(result) : ''
  })

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
        onChangeDelivery={value => onChangePricePerUnit?.(currency, value)}
      />

      <DeliveryCostsInputs
        controllItemName={batchDelivery}
        controllInputTitle="Batch delivery"
        uncontrollInputTitle="Batch price"
        uncontrollInputValue={batchPrice}
        onChangeDelivery={value => onChangeBatchDelivery?.(currency, value)}
      />
    </div>
  )
})
