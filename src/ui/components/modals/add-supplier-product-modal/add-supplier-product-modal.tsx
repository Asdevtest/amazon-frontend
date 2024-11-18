import { Form } from 'antd'
import { observer } from 'mobx-react'
import { FC, useEffect, useMemo } from 'react'

import { CustomSelect } from '@components/shared/custom-select'
import { Modal } from '@components/shared/modal'

import { loadingStatus } from '@typings/enums/loading-status'
import { UploadFileType } from '@typings/shared/upload-file'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles } from './add-supplier-product-modal.styles'
import { useStyles as useSharedStyles } from './shared.style'

import { AddSupplierProductModalModel } from './add-supplier-product-modal.model'
import { ICreateSupplierProduct } from './add-supplier-product-modal.type'
import { BoxDimentions } from './components/box-dimentions'
import { DeliveryParams } from './components/delivery-params'
import { GeneralInfo } from './components/general-info/general-info'
import { PriceVariations } from './components/price-variations'

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

  const handleUploadFiles = (images: UploadFileType[]) => {
    form.setFieldValue('images', images)
    form.validateFields(['images'])
    viewModel.setImages(images)
  }

  // useEffect(() => {
  //   form.setFieldsValue({
  //     systemYuanToDollarRate: viewModel.systemYuanToDollarRate,
  //   })
  // }, [])

  console.log('form :>> ', form?.getFieldsValue())

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <Form
        clearOnDestroy
        name="supplier"
        size="large"
        form={form}
        rootClassName={styles.form}
        initialValues={{
          prices: [
            { label: 'Default', amount: 0, price: 0 },
            { amount: 1, price: 1 },
          ],
          boxProperties: {
            boxHeightCm: 123,
          },
        }}
        onFinish={value => console.log('value :>> ', value)}
      >
        <GeneralInfo
          images={viewModel.images}
          handleUploadFiles={handleUploadFiles}
          categoriesLoading={viewModel.categoriesLoadingStatus === loadingStatus.IS_LOADING}
          categories={viewModel.categories}
        />

        <DeliveryParams form={form} />

        <PriceVariations />

        <BoxDimentions form={form} />
      </Form>
    </Modal>
  )
})
