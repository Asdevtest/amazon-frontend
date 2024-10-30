import { Form } from 'antd'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './add-supplier-modal.style'

import { HeaderInfo } from './components/header-info'

interface AddSupplierModalProps {
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
}

export const AddSupplierModal: FC<AddSupplierModalProps> = observer(props => {
  const { openModal, setOpenModal } = props
  const { classes: styles } = useStyles()

  const [form] = Form.useForm()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <Form name="supplier" size="large" form={form} rootClassName={styles.form} onFinish={onFinish}>
        <p className={styles.title}>{t(TranslationKey['Add a supplier'])}</p>

        <HeaderInfo />
      </Form>
    </Modal>
  )
})
