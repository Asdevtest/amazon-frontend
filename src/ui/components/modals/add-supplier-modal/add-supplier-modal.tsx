import { Form } from 'antd'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './add-supplier-modal.style'
import { useStyles as useSharedStyles } from './shared.style'

import { getRequiredRules } from './add-supplier-modal.config'
import { FieldType } from './add-supplier-modal.types'
import { Contacts } from './components/contacts'
import { SupplierDetails } from './components/supplier-details'

interface AddSupplierModalProps {
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
}

export const AddSupplierModal: FC<AddSupplierModalProps> = observer(props => {
  const { openModal, setOpenModal } = props
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const [form] = Form.useForm<FieldType>()

  const handleUploadFiles = (images: UploadFileType[]) => {
    form.setFieldValue('files', images)
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <Form
        clearOnDestroy
        name="supplier"
        size="large"
        form={form}
        rootClassName={styles.form} /* onFinish={onFinish} */
        initialValues={{
          contacts: [
            {
              name: 'First',
              phones: ['UserName'],
              email: [''],
              optionals: [''],
            },
          ],
        }}
      >
        <p className={styles.title}>{t(TranslationKey['Add a supplier'])}</p>

        <SupplierDetails handleUploadFiles={handleUploadFiles} />

        <Form.Item<FieldType> name="paymentMethods" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomSelect
            required
            allowClear
            wrapperClassName={sharedStyles.input}
            label="Payment methods"
            options={[
              { label: 'Poland', value: 'poland' },
              { label: 'Ukraine', value: 'ukraine' },
            ]}
          />
        </Form.Item>

        <Contacts />

        <Form.Item<FieldType> name="description" className={sharedStyles.field}>
          <CustomTextarea size="large" rows={4} label="Description" placeholder="Description" />
        </Form.Item>

        <div className={styles.footerWrapper}>
          <CustomButton>{t(TranslationKey['Import products'])}</CustomButton>

          <div className={styles.buttons}>
            <Form.Item shouldUpdate className={sharedStyles.field}>
              <CustomButton type="primary" htmlType="submit" /* loading={loading} disabled={loading} */>
                {t(TranslationKey.Save)}
              </CustomButton>
            </Form.Item>

            <CustomButton
            // type={editUser ? 'default' : 'link'}
            // className={editUser ? undefined : styles.link}
            // onClick={onRedirect}
            >
              {t(TranslationKey.Close)}
            </CustomButton>
          </div>
        </div>
      </Form>
    </Modal>
  )
})
