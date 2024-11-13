import { Form } from 'antd'
import { memo } from 'react'

import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './general-info.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'

export const GeneralInfo = memo(() => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div>
      <div>
        <Form.Item<ICreateSupplierProduct> name="supplierId" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomSelect
            required
            allowClear
            mode="tags"
            // loading={viewModel.paymentMethodsRequestStatus === loadingStatus.IS_LOADING}
            wrapperClassName={sharedStyles.input}
            label="Payment methods"
            // options={viewModel.paymentMethods}
            options={[{ label: 'test', value: 'test' }]}
            // fieldNames={{ label: 'title', value: '_id' }}
          />
        </Form.Item>

        <Form.Item<ICreateSupplierProduct> name="categoryId" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomSelect
            required
            allowClear
            mode="tags"
            // loading={viewModel.paymentMethodsRequestStatus === loadingStatus.IS_LOADING}
            wrapperClassName={sharedStyles.input}
            label="Payment methods"
            // options={viewModel.paymentMethods}
            options={[{ label: 'test', value: 'test' }]}
            // fieldNames={{ label: 'title', value: '_id' }}
          />
        </Form.Item>
      </div>

      <Form.Item<ICreateSupplierProduct> name="cardName" className={sharedStyles.field} rules={getRequiredRules()}>
        <CustomInput required size="large" placeholder="Fullname" wrapperClassName={sharedStyles.input} />
      </Form.Item>

      <Form.Item<ICreateSupplierProduct> name="cardName" className={sharedStyles.field} rules={getRequiredRules()}>
        <CustomInput required size="large" placeholder="Fullname" wrapperClassName={sharedStyles.input} />
      </Form.Item>
    </div>
  )
})
