import { Divider, FormInstance } from 'antd'
import { FC, memo, useCallback } from 'react'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './delivery-params.style'

import { ICreateSupplierProductModal, SupplierCurrency } from '../../add-supplier-product-modal.type'
import { getBatchPrice } from '../../helpers/get-batch-price'
import { getBatchPriceUsd } from '../../helpers/get-batch-price-usd'
import { getPriceWithDeliveryPerUnit } from '../../helpers/get-price-with-delivery-per-unit'
import { getPriceWithDeliveryPerUnitUsd } from '../../helpers/get-price-with-delivery-per-unit-usd'
import { DeliveryCosts } from '../delivery-costs'
import { DeliveryPeriod } from '../delivery-period'
import { SupplierCourse } from '../supplier-course'

interface IDeliveryParamsProps {
  form: FormInstance<ICreateSupplierProductModal>
  systemYuanToDollarRate: number
}

export const DeliveryParams: FC<IDeliveryParamsProps> = memo(({ form, systemYuanToDollarRate }) => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const onChangePricePerUnit = useCallback(
    (currency: SupplierCurrency) => (value: number) => {
      const currentCourse = form.getFieldValue('yuanToDollarRate')
      const valueToUpdate: Partial<ICreateSupplierProductModal> = {}

      if (currency === SupplierCurrency.CNY) {
        valueToUpdate.priceInYuan = value
        valueToUpdate.priceInUsd = value / currentCourse
      } else {
        valueToUpdate.priceInYuan = value * currentCourse
        valueToUpdate.priceInUsd = value
      }

      form.setFieldsValue(valueToUpdate)
    },
    [],
  )

  const onChangeBatchDelivery = useCallback(
    (currency: SupplierCurrency) => (value: number) => {
      const currentCourse = form.getFieldValue('yuanToDollarRate')
      const valueToUpdate: Partial<ICreateSupplierProductModal> = {}

      if (currency === SupplierCurrency.CNY) {
        valueToUpdate.batchDeliveryCostInYuan = value
        valueToUpdate.batchDeliveryCostInDollar = value / currentCourse
      } else {
        valueToUpdate.batchDeliveryCostInYuan = value * currentCourse
        valueToUpdate.batchDeliveryCostInDollar = value
      }

      form.setFieldsValue(valueToUpdate)
    },
    [],
  )

  const onChangeSupplierCourse = useCallback((value: number) => {
    const priceInUsd = form.getFieldValue('priceInUsd')
    const batchDeliveryCostInDollar = form.getFieldValue('batchDeliveryCostInDollar')

    form.setFieldsValue({
      yuanToDollarRate: value,
      priceInYuan: priceInUsd * value || 0,
      batchDeliveryCostInYuan: batchDeliveryCostInDollar * value || 0,
    })
  }, [])

  return (
    <div className={cx(styles.deliveryParamsWrapper, sharedStyles.sectionWrapper)}>
      <div className={styles.supplierCourseWrapper}>
        <SupplierCourse
          systemYuanToDollarRate={systemYuanToDollarRate}
          onChangeSupplierCourse={onChangeSupplierCourse}
        />

        <div className={styles.deliveryCostsWrapper}>
          <DeliveryCosts
            currency={SupplierCurrency.CNY}
            getBatchPrice={getBatchPrice}
            getPriceWithDeliveryPerUnit={getPriceWithDeliveryPerUnit}
            onChangePricePerUnit={onChangePricePerUnit(SupplierCurrency.CNY)}
            onChangeBatchDelivery={onChangeBatchDelivery(SupplierCurrency.CNY)}
          />

          <Divider type="vertical" className={sharedStyles.divider} />

          <DeliveryCosts
            currency={SupplierCurrency.USD}
            getBatchPrice={getBatchPriceUsd}
            getPriceWithDeliveryPerUnit={getPriceWithDeliveryPerUnitUsd}
            onChangePricePerUnit={onChangePricePerUnit(SupplierCurrency.USD)}
            onChangeBatchDelivery={onChangeBatchDelivery(SupplierCurrency.USD)}
          />
        </div>
      </div>

      <div>
        <Divider type="vertical" className={sharedStyles.divider} />
      </div>

      <DeliveryPeriod />
    </div>
  )
})
