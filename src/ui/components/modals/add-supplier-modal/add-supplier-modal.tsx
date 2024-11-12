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
import { ISupplierV2 } from '@typings/models/suppliers/supplier-v2'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './add-supplier-modal.style'
import { useStyles as useSharedStyles } from './shared.style'

import { getRequiredRules } from './add-supplier-modal.config'
import { AddSupplierModalModel } from './add-supplier-modal.model'
import { CreateSupplier } from './add-supplier-modal.types'
import { Contacts } from './components/contacts'
import { SupplierDetails } from './components/supplier-details'
import { getInitialFormState } from './helpers/get-initial-form-state'

interface AddSupplierModalProps {
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
  supplierId?: string
}

export const AddSupplierModal: FC<AddSupplierModalProps> = observer(props => {
  const { supplierId, openModal, setOpenModal } = props

  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const title = supplierId ? 'Editing supplier' : 'Add a supplier'

  const [form] = Form.useForm<CreateSupplier>()

  const viewModel = useMemo(() => new AddSupplierModalModel(supplierId), [])

  const onCloseModal = () => {
    form.resetFields()
    setOpenModal(false)
  }

  const handleUploadFiles = (images: UploadFileType[]) => {
    form.setFieldValue('images', images)
    form.validateFields(['images'])
    viewModel.setImages(images)
  }

  const onFinish = async (value: CreateSupplier) => {
    if (supplierId) {
      viewModel?.editSupplier(supplierId, value)
    } else {
      await viewModel.createSupplier(value)
    }

    onCloseModal()
  }

  useEffect(() => {
    const currentSupplier = viewModel.currentData as unknown as ISupplierV2

    if (currentSupplier) {
      form.setFieldsValue(getInitialFormState(currentSupplier))
      viewModel.setImages(currentSupplier?.images || [])
    }
  }, [viewModel?.currentData])

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <Form clearOnDestroy name="supplier" size="large" form={form} rootClassName={styles.form} onFinish={onFinish}>
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
            mode="tags"
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
          <CustomTextarea size="large" rows={4} label="Description" placeholder="Description" />
        </Form.Item>

        <div className={styles.footerWrapper}>
          <CustomButton disabled={!supplierId}>{t(TranslationKey['Import products'])}</CustomButton>

          <div className={styles.buttons}>
            <Form.Item shouldUpdate className={sharedStyles.field}>
              <CustomButton type="primary" htmlType="submit" /* loading={loading} disabled={loading} */>
                {t(TranslationKey.Save)}
              </CustomButton>
            </Form.Item>

            <CustomButton onClick={onCloseModal}>{t(TranslationKey.Close)}</CustomButton>
          </div>
        </div>
      </Form>
    </Modal>
  )
})
