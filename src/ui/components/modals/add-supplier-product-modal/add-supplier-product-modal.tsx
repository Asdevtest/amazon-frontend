import { Form } from 'antd'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'
import { FaStar } from 'react-icons/fa6'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { Dimensions } from '@typings/enums/dimensions'
import { loadingStatus } from '@typings/enums/loading-status'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './add-supplier-product-modal.styles'
import { useStyles as useSharedStyles } from './shared.style'

import { AddSupplierProductModalModel } from './add-supplier-product-modal.model'
import { ICreateSupplierProduct, SupplierCurrency } from './add-supplier-product-modal.type'
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

  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const [form] = Form.useForm<ICreateSupplierProduct>()

  const viewModel = useMemo(() => new AddSupplierProductModalModel(), [])

  const handleUploadFiles = (images: UploadFileType[]) => {
    form.setFieldValue('images', images)
    form.validateFields(['images'])
    viewModel.setImages(images)
  }

  const handleUploadUnitFiles = (images: UploadFileType[]) => {
    form.setFieldValue('imageUnit', images)
    form.validateFields(['imageUnit'])
    viewModel.setUnitImages(images)
  }

  const onCloseModal = () => {
    form.resetFields()
    setOpenModal(false)
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
            { label: `0 / 5${SupplierCurrency.CNY}`, amount: 0, price: 0 },
            { label: `1 / 1${SupplierCurrency.CNY}`, amount: 1, price: 1 },
          ],
          boxProperties: {
            dimensionType: Dimensions.EU,
          },
          unitDimensionType: Dimensions.EU,
        }}
        onFinish={value => console.log('value :>> ', value)}
      >
        <div className={styles.header}>
          <p className={styles.title}>{t(TranslationKey['Add product'])}</p>

          <Form.Item<ICreateSupplierProduct> name="isPrime" className={cx(sharedStyles.field, styles.markAsTop)}>
            <CustomCheckbox>{'Mark as top'}</CustomCheckbox>
            <FaStar className={styles.icon} />
          </Form.Item>
        </div>

        <div className={styles.contentWrapper}>
          <GeneralInfo
            images={viewModel.images}
            handleUploadFiles={handleUploadFiles}
            categoriesLoading={viewModel.categoriesLoadingStatus === loadingStatus.IS_LOADING}
            categories={viewModel.categories}
          />

          <DeliveryParams form={form} />

          <PriceVariations />

          <BoxDimentions
            form={form}
            unitImages={viewModel.unitImages}
            handleUploadUnitFiles={handleUploadUnitFiles}
            volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          />

          <Form.Item<ICreateSupplierProduct> name="comment" className={sharedStyles.field}>
            <CustomTextarea size="large" rows={4} label="Comment" placeholder="Comment" maxLength={512} />
          </Form.Item>
        </div>

        <div className={styles.footerWrapper}>
          <Form.Item shouldUpdate className={sharedStyles.field}>
            <CustomButton type="primary" htmlType="submit" /* loading={loading} disabled={loading} */>
              {t(TranslationKey.Save)}
            </CustomButton>
          </Form.Item>

          <CustomButton onClick={onCloseModal}>{t(TranslationKey.Close)}</CustomButton>
        </div>
      </Form>
    </Modal>
  )
})
