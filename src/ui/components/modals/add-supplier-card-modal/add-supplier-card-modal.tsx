import { Form } from 'antd'
import { observer } from 'mobx-react'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { FaStar } from 'react-icons/fa6'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { Dimensions } from '@typings/enums/dimensions'
import { loadingStatus } from '@typings/enums/loading-status'
import { ISupplierCardFull } from '@typings/models/suppliers/supplier-card'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './add-supplier-card-modal.styles'
import { useStyles as useSharedStyles } from './shared.style'

import { AddSupplierProductModalModel } from './add-supplier-card-modal.model'
import { ICreateSupplierPrice, ICreateSupplierProductModal, SupplierCurrency } from './add-supplier-card-modal.type'
import { BoxDimentions } from './components/box-dimentions'
import { DeliveryParams } from './components/delivery-params'
import { GeneralInfo } from './components/general-info/general-info'
import { PriceVariations } from './components/price-variations'
import { getInitialFormState } from './helpers/get-initial-form-state'

interface AddSupplierCardModalProps {
  supplierCardId?: string
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
  handleUpdate: () => void
  supplierId?: string
}

export const AddSupplierCardModal: FC<AddSupplierCardModalProps> = observer(props => {
  const { supplierId, supplierCardId, openModal, setOpenModal, handleUpdate } = props

  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const [form] = Form.useForm<ICreateSupplierProductModal>()

  const viewModel = useMemo(() => new AddSupplierProductModalModel({ supplierId, supplierCardId }), [])

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

  const onAddPriceVariations = useCallback((priceVariation: ICreateSupplierPrice) => {
    const prices = form.getFieldValue('priceVariations') || []

    const variationToAdd = {
      ...priceVariation,
      label: `${priceVariation.quantity} / ${priceVariation.price}${SupplierCurrency.CNY}`,
    }

    form.setFieldsValue({
      priceVariations: prices?.concat([variationToAdd]),
    })
  }, [])

  const handleFinish = async (values: ICreateSupplierProductModal) => {
    await viewModel.createSupplierCard(values)
    handleUpdate()
    onCloseModal()
  }

  useEffect(() => {
    form.setFieldsValue(
      getInitialFormState({
        supplierCard: viewModel.currentData as unknown as ISupplierCardFull,
        supplierId,
        systemYuanToDollarRate: viewModel.systemYuanToDollarRate,
      }),
    )

    console.log('form :>> ', form?.getFieldsValue())
  }, [[viewModel?.currentData]])

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <Form clearOnDestroy name="supplier" size="large" form={form} rootClassName={styles.form} onFinish={handleFinish}>
        <div className={styles.header}>
          <p className={styles.title}>{t(TranslationKey['Add product'])}</p>

          <Form.Item<ICreateSupplierProductModal> name="isPrime" className={cx(sharedStyles.field, styles.markAsTop)}>
            <CustomCheckbox>Mark as top</CustomCheckbox>
            <FaStar className={styles.icon} />
          </Form.Item>
        </div>

        <div className={styles.contentWrapper}>
          <GeneralInfo
            isSuppliersLoading={viewModel?.suppliersInfinityModel?.loading}
            suppliers={viewModel?.suppliersInfinityModel?.data}
            loadMoreSuppliers={viewModel?.suppliersInfinityModel?.loadMoreData}
            searchSuppliers={viewModel.suppliersInfinityModel?.onSearchSubmit}
            images={viewModel.images}
            handleUploadFiles={handleUploadFiles}
            categoriesLoading={viewModel.categoriesLoadingStatus === loadingStatus.IS_LOADING}
            categories={viewModel.categories}
          />

          <DeliveryParams form={form} systemYuanToDollarRate={viewModel.systemYuanToDollarRate} />

          <PriceVariations form={form} onAddPriceVariations={onAddPriceVariations} />

          <BoxDimentions
            form={form}
            unitImages={viewModel.unitImages}
            handleUploadUnitFiles={handleUploadUnitFiles}
            volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          />

          <Form.Item<ICreateSupplierProductModal> name="comment" className={sharedStyles.field}>
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
