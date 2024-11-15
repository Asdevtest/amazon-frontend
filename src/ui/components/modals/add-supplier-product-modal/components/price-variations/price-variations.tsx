import { Form } from 'antd'
import { memo } from 'react'

import { CustomSelect } from '@components/shared/custom-select'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './price-variations.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'

export const PriceVariations = memo(() => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div>
      {/* <Form.Item<ICreateSupplierProduct>
        name="paymentMethodIds"
        className={sharedStyles.field}
        rules={getRequiredRules()}
      >
        <CustomSelect
          required
          allowClear
          mode="tags"
          wrapperClassName={sharedStyles.input}
          label="Payment methods"
          options={viewModel.paymentMethods}
          fieldNames={{ label: 'title', value: '_id' }}
          optionRender={option => {
            return (
              <div className={sharedStyles.selectOption}>
                <Avatar size={20} src={getAmazonImageUrl(option.data.iconImage)} />
                <p>{option.data.title}</p>
              </div>
            )
          }}
        />
      </Form.Item> */}
    </div>
  )
})
