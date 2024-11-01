import { Form } from 'antd'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './add-supplier-modal.style'

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

  const [form] = Form.useForm()

  console.log('form :>> ', form)

  // {
  //   name: string
  //   phones: string[]
  //   email: string[]
  //   optionals: string[]
  // }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <Form
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
            {
              name: 'Seconed',
              phones: ['SeconedUserName'],
              email: [''],
              optionals: [''],
            },
          ],
        }}
      >
        <p className={styles.title}>{t(TranslationKey['Add a supplier'])}</p>

        <SupplierDetails />

        <Form.Item<FieldType> name="paymentMethods" className={styles.field} rules={getRequiredRules()}>
          <CustomSelect
            required
            allowClear
            wrapperClassName={styles.input}
            label="Payment methods"
            options={[
              { label: 'Poland', value: 'poland' },
              { label: 'Ukraine', value: 'ukraine' },
            ]}
          />
        </Form.Item>

        <Contacts />
      </Form>
    </Modal>
  )
})
