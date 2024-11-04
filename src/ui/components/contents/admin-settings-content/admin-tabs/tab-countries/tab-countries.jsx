import { Form } from 'antd'
import { observer } from 'mobx-react'
import { useCallback, useMemo, useState } from 'react'
import { MdDeleteOutline, MdEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomImage } from '@components/shared/custom-image'
import { CustomInput } from '@components/shared/custom-input'
import { Text } from '@components/shared/text'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useStyles } from './tab-countries.style'

import { AdminSettingsCountriesModel } from './tab-countries.model'

export const TabCountries = observer(() => {
  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new AdminSettingsCountriesModel(), [])

  const [form] = Form.useForm()
  const [images, setImages] = useState([])

  const onFinish = values => {
    viewModel.onSaveCountry(values)
  }
  const handleSetImages = useCallback(values => {
    setImages(values)
    form.setFieldValue('media', values)
  }, [])

  return (
    <Form name="countries-form" size="large" form={form} rootClassName={styles.form} onFinish={onFinish}>
      <p className={styles.title}>{t(TranslationKey['Adding a country'])}</p>

      <Form.Item
        name="title"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: 'Country name is required' },
          () => ({
            validator(_, value) {
              if (!value?.trim()) {
                return Promise.reject()
              }

              return Promise.resolve()
            },
          }),
        ]}
      >
        <CustomInput fullWidth label="Country name" />
      </Form.Item>

      <Form.Item name="media" rules={[{ required: true, message: 'Icon is required' }]}>
        <UploadFilesInput minimized maxNumber={1} images={images} setImages={handleSetImages} />
      </Form.Item>

      <div className={styles.countries}>
        {viewModel.countries?.map(method => (
          <div key={method._id} className={styles.flexRow}>
            <div className={styles.flexRow}>
              <CustomImage src={method.image || ''} preview={false} width={32} height={32} />

              <Text text={method.title} />
            </div>

            <div className={styles.flexRow}>
              <CustomButton
                ghost
                size="small"
                type="primary"
                icon={<MdEdit size={16} />}
                onClick={() => viewModel.onClickEditPaymentMethod(method._id)}
              />

              <CustomButton
                danger
                ghost
                size="small"
                type="primary"
                icon={<MdDeleteOutline size={16} />}
                confirmText="Are you sure you want to delete the payment method?"
                onClick={() => viewModel.onRemovePaymentMethod(method._id)}
              />
            </div>
          </div>
        ))}
      </div>

      <Form.Item shouldUpdate>
        <div className={styles.buttons}>
          <CustomButton type="primary" htmlType="submit">
            {t(TranslationKey.Save)}
          </CustomButton>
        </div>
      </Form.Item>
    </Form>
  )
})
