import { Form, FormInstance } from 'antd'
import { FC, memo } from 'react'

import { useStyles } from './box-dimentions.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'
import { BoxInfo } from '../box-info'

interface IBoxDimentionsProps {
  form: FormInstance<ICreateSupplierProduct>
}

export const BoxDimentions: FC<IBoxDimentionsProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { form } = props

  const boxInfoVolumeWeight = Form.useWatch(values => {
    const result = getBatchPrice(values)

    return result ? toFixed(result) : ''
  }, form)

  const as = ''

  return (
    <div>
      <BoxInfo />
    </div>
  )
})
