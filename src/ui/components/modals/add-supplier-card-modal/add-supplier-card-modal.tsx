import { Form } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { observer } from 'mobx-react'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { FaStar } from 'react-icons/fa6'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ISupplierCardFull, SupplierCardStatus } from '@typings/models/suppliers/supplier-card'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './add-supplier-card-modal.styles'
import { useStyles as useSharedStyles } from './shared.style'

import { AddSupplierProductModalModel } from './add-supplier-card-modal.model'
import { ICreateSupplierPrice, ICreateSupplierProductModal } from './add-supplier-card-modal.type'
import { BoxDimentions } from './components/box-dimentions'
import { DeliveryParams } from './components/delivery-params'
import { DetailsInfo } from './components/details-info'
import { GeneralInfo } from './components/general-info/general-info'
import { PriceVariations } from './components/price-variations'
import { getInitialFormState } from './helpers/get-initial-form-state'
import { getPriceVariation } from './helpers/get-price-variation'

interface AddSupplierCardModalProps {
  openModal: boolean
  supplierId?: string
  supplierCardId?: string
  disabled?: boolean
  setOpenModal: (openModal?: boolean) => void
  handleUpdate?: (supplierCardId?: string) => void
}

export const AddSupplierCardModal: FC<AddSupplierCardModalProps> = observer(props => {
  const { supplierId, supplierCardId, openModal, disabled, setOpenModal, handleUpdate } = props

  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const [form] = Form.useForm<ICreateSupplierProductModal>()

  const viewModel = useMemo(() => new AddSupplierProductModalModel({ supplierId, supplierCardId }), [])

  const isPublished = SupplierCardStatus.PUBLISHED === (viewModel.currentData as unknown as ISupplierCardFull)?.status

  const isPrimeValue = Form.useWatch('isPrime', form)

  const handleChangeIsPrime = useCallback(
    (e: CheckboxChangeEvent) => form.setFieldValue('isPrime', e.target.checked),
    [],
  )

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
      label: getPriceVariation(priceVariation),
    }

    form.setFieldsValue({
      priceVariations: prices?.concat([variationToAdd]),
    })
  }, [])

  const handleFinish = async (values: ICreateSupplierProductModal) => {
    let result = supplierCardId

    if (supplierCardId) {
      await viewModel.editSupplierCard(supplierCardId, values)
    } else {
      result = await viewModel.createSupplierCard(values)
    }

    handleUpdate?.(result)
    onCloseModal()

    return result
  }

  const handleChangeStatus = async (status: SupplierCardStatus) => {
    try {
      await form.validateFields()
      const result = (await handleFinish(form.getFieldsValue())) as string

      viewModel.changeSupplierCardStatus(result, status)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const currentSupplierCard = viewModel.currentData as unknown as ISupplierCardFull

    form.setFieldsValue(
      getInitialFormState({
        supplierCard: currentSupplierCard,
        supplierId,
        systemYuanToDollarRate: viewModel.systemYuanToDollarRate,
      }),
    )

    handleUploadFiles(currentSupplierCard?.images || [])
    handleUploadUnitFiles(currentSupplierCard?.imageUnit || [])
  }, [viewModel?.currentData])

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <Form
        clearOnDestroy
        disabled={disabled}
        name="supplier"
        size="large"
        form={form}
        rootClassName={styles.form}
        onFinish={handleFinish}
      >
        <div className={styles.header}>
          <p className={styles.title}>{t(TranslationKey[supplierCardId ? 'Editing the card' : 'Add a new card'])}</p>

          <Form.Item<ICreateSupplierProductModal> name="isPrime" className={cx(sharedStyles.field, styles.markAsTop)}>
            <CustomCheckbox checked={isPrimeValue} onChange={handleChangeIsPrime}>
              Mark as top
            </CustomCheckbox>
            <FaStar className={styles.icon} />
          </Form.Item>
        </div>

        <div className={styles.contentWrapper}>
          <GeneralInfo
            disabled={disabled}
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

          <DetailsInfo />

          <BoxDimentions
            disabled={disabled}
            form={form}
            unitImages={viewModel.unitImages}
            handleUploadUnitFiles={handleUploadUnitFiles}
            volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          />

          <Form.Item<ICreateSupplierProductModal> name="comment" className={sharedStyles.field}>
            <CustomTextarea size="large" rows={4} label="Comment" maxLength={512} />
          </Form.Item>
        </div>

        <div className={styles.footerWrapper}>
          <CustomButton
            type="primary"
            onClick={() => handleChangeStatus(isPublished ? SupplierCardStatus.ON_HOLD : SupplierCardStatus.PUBLISHED)}
          >
            {t(TranslationKey[isPublished ? 'On hold' : 'Publish'])}
          </CustomButton>

          <Form.Item shouldUpdate className={sharedStyles.field}>
            <CustomButton type="primary" htmlType="submit" loading={viewModel.loading}>
              {t(TranslationKey.Save)}
            </CustomButton>
          </Form.Item>

          <CustomButton onClick={onCloseModal}>{t(TranslationKey.Close)}</CustomButton>
        </div>
      </Form>
    </Modal>
  )
})