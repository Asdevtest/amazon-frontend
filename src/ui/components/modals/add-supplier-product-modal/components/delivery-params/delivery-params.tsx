import { FormInstance } from 'antd'
import { FC, memo } from 'react'

import { useStyles } from './delivery-params.style'

import { ICreateSupplierProduct, SupplierCurrency } from '../../add-supplier-product-modal.type'
import { getBatchPrice } from '../../helpers/get-batch-price'
import { getBatchPriceUsd } from '../../helpers/get-batch-price-usd'
import { getPriceWithDeliveryPerUnit } from '../../helpers/get-price-with-delivery-per-unit'
import { getPriceWithDeliveryPerUnitUsd } from '../../helpers/get-price-with-delivery-per-unit-usd'
import { DeliveryCosts } from '../delivery-costs'
import { DeliveryPeriod } from '../delivery-period'
import { SupplierCourse } from '../supplier-course'

interface IDeliveryParamsProps {
  form: FormInstance<ICreateSupplierProduct>
}

export const DeliveryParams: FC<IDeliveryParamsProps> = memo(({ form }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.deliveryParamsWrapper}>
      <div className={styles.supplierCourseWrapper}>
        <SupplierCourse />

        <div className={styles.deliveryCostsWrapper}>
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
      </div>

      <DeliveryPeriod />
    </div>
  )
})
