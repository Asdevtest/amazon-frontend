import { Form, FormInstance } from 'antd'
import { FC, memo } from 'react'

import { Text } from '@components/shared/text'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './delivery-params.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'
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

      <DeliveryCosts form={form} />
    </div>
  )
})
