import { Form } from 'antd'
import { FC, memo, useState } from 'react'

import { CustomInputNumber } from '@components/shared/custom-input-number'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './box-info.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'
import { DimentionsHeader } from '../dimentions-header'
import { Dimensions } from '@typings/enums/dimensions'

interface IBoxDimentionsProps {
  volumeWeight: number
}

export const BoxInfo: FC<IBoxDimentionsProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()
  const { volumeWeight } = props

  const [dimensionSetting, setDimensionSetting] = useState<Dimensions>(Dimensions.EU)


  return (
    <div>
      <DimentionsHeader />

      <div>
        <Form.Item<ICreateSupplierProduct>
          name={['boxProperties', 'boxHeightCm']}
          className={sharedStyles.field}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Height"
            placeholder="Height"
            precision={2}
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <Form.Item<ICreateSupplierProduct>
          name={['boxProperties', 'boxWidthCm']}
          className={sharedStyles.field}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Height"
            placeholder="Height"
            precision={2}
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <Form.Item<ICreateSupplierProduct>
          name={['boxProperties', 'boxLengthCm']}
          className={sharedStyles.field}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Height"
            placeholder="Height"
            precision={2}
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <Form.Item<ICreateSupplierProduct>
          name={['boxProperties', 'boxWeighGrossKg']}
          className={sharedStyles.field}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Height"
            placeholder="Height"
            precision={2}
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <Form.Item<ICreateSupplierProduct>
          name={['boxProperties', 'amountInBox']}
          className={sharedStyles.field}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Height"
            placeholder="Height"
            precision={2}
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <CustomInputNumber
          disabled
          value={volumeWeight}
          size="large"
          label="Height"
          placeholder="Height"
          precision={2}
          wrapperClassName={sharedStyles.input}
        />
      </div>
    </div>
  )
})
