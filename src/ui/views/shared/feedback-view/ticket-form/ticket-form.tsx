import { Form } from 'antd'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import { MdOutlineAttachFile } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './ticket-form.style'

interface FieldData {
  title: string
  text: string
  media: UploadFileType[]
}

interface TicketFormProps {
  onSubmit: (values: FieldData) => void
  onClose: () => void
  loading?: boolean
  data?: FieldData
  title?: string
}

export const TicketForm: FC<TicketFormProps> = memo(props => {
  const { onSubmit, onClose, loading, data, title } = props

  const { classes: styles } = useStyles()
  const [form] = Form.useForm()
  const [showMediaBlock, setShowMediaBlock] = useState(false)
  const [images, setImages] = useState<UploadFileType[]>([])

  useEffect(() => {
    if (!data) {
      form.resetFields()
    }
  }, [SettingsModel.languageTag])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data?.title || '',
        text: data?.text || '',
        media: data?.media || [],
      })

      setImages(data?.media)
    }
  }, [data])

  const onFinish = useCallback(
    (values: FieldData) => {
      onSubmit(values)
    },
    [onSubmit],
  )

  const handleSetImages = useCallback((values: UploadFileType[]) => {
    setImages(values)
    form.setFieldValue('media', values)
  }, [])

  return (
    <Form name="ticket-form" size="large" form={form} rootClassName={styles.form} onFinish={onFinish}>
      <p className={styles.title}>{t(TranslationKey[title as TranslationKey])}</p>

      <Form.Item<FieldData> name="title" validateTrigger="onBlur" rules={[{ required: true, message: '' }]}>
        <CustomInput fullWidth placeholder="Title" />
      </Form.Item>

      <Form.Item<FieldData> name="text" validateTrigger="onBlur" rules={[{ required: true, message: '' }]}>
        <CustomTextarea rows={6} placeholder="Description" />
      </Form.Item>

      {showMediaBlock ? (
        <Form.Item<FieldData> name="media">
          <UploadFilesInput images={images} setImages={handleSetImages} />
        </Form.Item>
      ) : null}

      <div className={styles.flexRow}>
        <CustomButton
          type={showMediaBlock ? 'primary' : 'default'}
          icon={<MdOutlineAttachFile />}
          onClick={() => setShowMediaBlock(!showMediaBlock)}
        />

        <div className={styles.flexRow}>
          <Form.Item<FieldData> shouldUpdate>
            <CustomButton type="primary" htmlType="submit" loading={loading} disabled={loading}>
              {t(TranslationKey[data ? 'Save' : 'Create ticket'])}
            </CustomButton>
          </Form.Item>

          <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
        </div>
      </div>
    </Form>
  )
})
