import { Avatar, Form } from 'antd'
import { observer } from 'mobx-react'
import { FC, useEffect, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Modal } from '@components/shared/modal'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { SupplierCardStatus } from '@typings/models/suppliers/supplier-card'
import { ISupplierV2 } from '@typings/models/suppliers/supplier-v2'
import { UploadFileType } from '@typings/shared/upload-file'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles } from './add-supplier-modal.style'
import { useStyles as useSharedStyles } from './shared.style'

import { AddSupplierCardModal } from '../add-supplier-card-modal'
import { ImportTemplateModal } from '../import-template-modal'

import { AddSupplierModalModel } from './add-supplier-modal.model'
import { CreateSupplier } from './add-supplier-modal.types'
import { Contacts } from './components/contacts'
import { ProductList } from './components/product-list'
import { SupplierDetails } from './components/supplier-details'
import { getInitialFormState } from './helpers/get-initial-form-state'

interface AddSupplierModalProps {
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
  disabled?: boolean
  hideStatusButton?: boolean
  supplierId?: string
  updateHandler?: () => void
}

export const AddSupplierModal: FC<AddSupplierModalProps> = observer(props => {
  const { supplierId, openModal, disabled, hideStatusButton, setOpenModal, updateHandler } = props

  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const title = supplierId ? 'Editing supplier' : 'Create a supplier'

  const [form] = Form.useForm<CreateSupplier>()

  const viewModel = useMemo(() => new AddSupplierModalModel(supplierId), [])

  const isPublished = SupplierCardStatus.PUBLISHED === (viewModel.currentData as unknown as ISupplierV2)?.status

  const onCloseModal = () => {
    form.resetFields()
    setOpenModal(false)
  }

  const handleUploadFiles = (images: UploadFileType[]) => {
    form.setFieldValue('images', images)
    form.validateFields(['images'])
    viewModel.setImages(images)
  }

  const onSaveSupplier = async (value: CreateSupplier) => {
    let result = supplierId

    if (supplierId) {
      await viewModel?.editSupplier(supplierId, value)
    } else {
      result = await viewModel.createSupplier(value)
    }

    return result
  }

  const onFinish = async (value: CreateSupplier) => {
    await onSaveSupplier(value)
    updateHandler?.()
    onCloseModal()
  }

  const handleChangeStatus = async (status: SupplierCardStatus) => {
    try {
      await form.validateFields()
      const result = (await onSaveSupplier(form.getFieldsValue())) as string
      await viewModel.changeSupplierStatus(result, status)
      updateHandler?.()

      onCloseModal()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const currentSupplier = viewModel.currentData as unknown as ISupplierV2

    if (currentSupplier) {
      form.setFieldsValue(getInitialFormState(currentSupplier))
      viewModel.setImages(currentSupplier?.images || [])
    }
  }, [viewModel?.currentData])

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <Form
        scrollToFirstError
        clearOnDestroy
        disabled={disabled}
        name="supplier"
        size="large"
        form={form}
        rootClassName={styles.form}
        onFinish={onFinish}
      >
        <p className={styles.title}>{t(TranslationKey[title])}</p>

        <SupplierDetails
          images={viewModel.images}
          countries={viewModel.countries}
          handleUploadFiles={handleUploadFiles}
        />

        <Form.Item<CreateSupplier> name="paymentMethodIds" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomSelect
            required
            allowClear
            showSearch={false}
            mode="multiple"
            loading={viewModel.paymentMethodsRequestStatus === loadingStatus.IS_LOADING}
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
        </Form.Item>

        <Contacts />

        <Form.Item<CreateSupplier> name="comment" className={sharedStyles.field}>
          <CustomTextarea size="large" rows={4} label="Description" maxLength={2000} />
        </Form.Item>

        {supplierId ? (
          <ProductList
            disabled={!supplierId}
            isLoading={viewModel.productsInfinityModel?.loading || false}
            products={viewModel.productsInfinityModel?.data || []}
            loadMoreProducts={viewModel.productsInfinityModel?.loadMoreData}
            onOpenAddProductModal={viewModel.onOpenAddSupplierProductModal}
          />
        ) : null}

        <div className={styles.footerWrapper}>
          {supplierId ? (
            <CustomButton disabled={!supplierId} onClick={viewModel.onOpenImportTemplateModal}>
              {t(TranslationKey['Import products'])}
            </CustomButton>
          ) : (
            <div />
          )}

          <div className={styles.buttons}>
            {!hideStatusButton ? (
              <CustomButton
                type="primary"
                loading={viewModel.requestIsloading}
                onClick={() =>
                  handleChangeStatus(isPublished ? SupplierCardStatus.DRAFT : SupplierCardStatus.PUBLISHED)
                }
              >
                {t(TranslationKey[isPublished ? 'Draft' : 'Publish'])}
              </CustomButton>
            ) : null}

            <Form.Item shouldUpdate className={sharedStyles.field}>
              <CustomButton loading={viewModel.requestIsloading} type="primary" htmlType="submit">
                {t(TranslationKey.Save)}
              </CustomButton>
            </Form.Item>

            <CustomButton onClick={onCloseModal}>{t(TranslationKey.Close)}</CustomButton>
          </div>
        </div>
      </Form>

      {viewModel.showImportTemplateModal ? (
        <ImportTemplateModal
          supplierId={supplierId as string}
          updateHandler={viewModel.onImportProducts}
          openModal={viewModel.showImportTemplateModal}
          setOpenModal={viewModel.onCloseImportTemplateModal}
        />
      ) : null}

      {viewModel.showAddSupplierProductModal ? (
        <AddSupplierCardModal
          supplierId={supplierId as string}
          handleUpdate={viewModel.onImportProducts}
          openModal={viewModel.showAddSupplierProductModal}
          setOpenModal={viewModel.onCloseAddSupplierProductModal}
        />
      ) : null}
    </Modal>
  )
})
