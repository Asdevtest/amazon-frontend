import { Form } from 'antd'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomSelect } from '@components/shared/custom-select'
import { Modal } from '@components/shared/modal'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles } from './add-supplier-product-modal.styles'
import { useStyles as useSharedStyles } from './shared.style'

import { AddSupplierProductModalModel } from './add-supplier-product-modal.model'
import { ICreateSupplierProduct } from './add-supplier-product-modal.type'

interface AddSupplierProductModalProps {
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
}

export const AddSupplierProductModal: FC<AddSupplierProductModalProps> = observer(props => {
  const { openModal, setOpenModal } = props

  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const [form] = Form.useForm<ICreateSupplierProduct>()

  const viewModel = useMemo(() => new AddSupplierProductModalModel(), [])

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <Form
        clearOnDestroy
        name="supplier"
        size="large"
        form={form}
        rootClassName={styles.form}
        onFinish={value => console.log('value :>> ', value)}
      >
        <div>
          <Form.Item name="paymentMethodIds" className={sharedStyles.field} rules={getRequiredRules()}>
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

          <Form.Item name="categoryId" className={sharedStyles.field} rules={getRequiredRules()}>
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
      </Form>
    </Modal>
  )
})
