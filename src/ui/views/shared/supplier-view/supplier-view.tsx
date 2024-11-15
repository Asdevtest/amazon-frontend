import { Checkbox, Drawer, Form, Space } from 'antd'
import { observer } from 'mobx-react'
import { useMemo, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectShopsForm } from '@components/forms/select-shops-form'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './supplier-view.style'

import { SupplierViewModel } from './supplier-view.model'

export const SupplierView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new SupplierViewModel(), [])
  const history = useHistory()
  const [form] = Form.useForm()

  const handleFinish = (values: any) => {
    console.log('value', values)
  }

  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className="viewWrapper">
        <div className={styles.header}>
          <CustomButton size="large" onClick={history.goBack}>
            {t(TranslationKey.Back)}
          </CustomButton>
          <CustomInputSearch allowClear enterButton size="large" placeholder="Search" />
        </div>

        <div className={styles.content}>
          <CustomButton size="large" icon={<FaArrowLeft />} className={styles.filterButton} onClick={showDrawer}>
            {t(TranslationKey.Filters)}
          </CustomButton>

          <Drawer title={t(TranslationKey.Filters)} placement="right" open={open} onClose={onClose}>
            <Form name="categories-form" size="large" form={form} rootClassName={styles.form} onFinish={handleFinish}>
              <Space.Compact rootClassName={styles.space}>
                <Form.Item name="priceMin">
                  <CustomInput fullWidth addonBefore={t(TranslationKey.min)} label="Price" />
                </Form.Item>
                <Form.Item name="priceMax">
                  <CustomInput fullWidth addonBefore={t(TranslationKey.max)} />
                </Form.Item>
              </Space.Compact>

              <Form.Item name="categories" validateTrigger="onBlur">
                <Checkbox.Group>
                  <Checkbox value="A">A</Checkbox>
                  <Checkbox value="B">B</Checkbox>
                  <Checkbox value="C">C</Checkbox>
                  <Checkbox value="D">D</Checkbox>
                  <Checkbox value="E">E</Checkbox>
                  <Checkbox value="F">F</Checkbox>
                  <Checkbox value="G">G</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              <Space.Compact rootClassName={styles.space}>
                <Form.Item name="moqMin">
                  <CustomInput fullWidth label="MOQ" addonBefore={t(TranslationKey.min)} />
                </Form.Item>
                <Form.Item name="moqMax">
                  <CustomInput fullWidth addonBefore={t(TranslationKey.max)} />
                </Form.Item>
              </Space.Compact>

              <Form.Item shouldUpdate>
                <CustomButton type="primary" htmlType="submit">
                  {t(TranslationKey.Apply)}
                </CustomButton>
              </Form.Item>
            </Form>
          </Drawer>
        </div>
      </div>

      <Modal openModal={viewModel.showSelectShopsModal} setOpenModal={viewModel.onToggleSelectShopsModal}>
        <SelectShopsForm
          title={t(TranslationKey['Link a store to a product'])}
          onSubmit={viewModel.onAddToInventory}
          onClose={viewModel.onToggleSelectShopsModal}
        />
      </Modal>
    </>
  )
})
