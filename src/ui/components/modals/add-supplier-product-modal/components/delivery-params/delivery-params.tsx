import { Form, FormInstance } from 'antd'
import { FC, memo } from 'react'

import { Text } from '@components/shared/text'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './delivery-params.style'

import { ICreateSupplierProduct, SupplierCurrency } from '../../add-supplier-product-modal.type'
import { getBatchPrice } from '../../helpers/get-batch-price'
import { getBatchPriceUsd } from '../../helpers/get-batch-price-usd'
import { getPriceWithDeliveryPerUnit } from '../../helpers/get-price-with-delivery-per-unit'
import { getPriceWithDeliveryPerUnitUsd } from '../../helpers/get-price-with-delivery-per-unit-usd'
import { DeliveryCosts } from '../delivery-costs'
import { SupplierCourse } from '../supplier-course'

interface IDeliveryParamsProps {
  form: FormInstance<ICreateSupplierProduct>
}

export const DeliveryParams: FC<IDeliveryParamsProps> = memo(({ form }) => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div>
      <SupplierCourse />

      <DeliveryCosts
        currency={SupplierCurrency.CNY}
        form={form}
        getBatchPrice={getBatchPrice}
        getPriceWithDeliveryPerUnit={getPriceWithDeliveryPerUnit}
      />

      <DeliveryCosts
        currency={SupplierCurrency.USD}
        form={form}
        getBatchPrice={getBatchPriceUsd}
        getPriceWithDeliveryPerUnit={getPriceWithDeliveryPerUnitUsd}
      />
    </div>
  )
})
