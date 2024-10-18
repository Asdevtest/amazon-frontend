import { Form } from 'antd'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import { MdOutlineAttachFile } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './content-editor-form.style'

export interface EditorFormFieldData {
  title: string
  text: string
  media: UploadFileType[]
}

interface ContentEditorFormProps {
  onSubmit: (values: EditorFormFieldData) => void
  onClose: () => void
  data?: EditorFormFieldData
  title?: string
  loading?: boolean
}

export const ContentEditorForm: FC<ContentEditorFormProps> = memo(props => {
  const { onSubmit, onClose, loading, data, title } = props

  const { classes: styles } = useStyles()
  const [form] = Form.useForm()
  const [showMediaBlock, setShowMediaBlock] = useState(false)
  const [images, setImages] = useState<UploadFileType[]>([])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data?.title || '',
        text: data?.text || '',
        media: data?.media || [],
      })

      setImages(data?.media)
    } else {
      form.resetFields()
    }
  }, [data])

  const onFinish = useCallback(
    (values: EditorFormFieldData) => {
      console.log('values', values)
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

      <Form.Item<EditorFormFieldData> name="title" validateTrigger="onBlur" rules={[{ required: true, message: '' }]}>
        <CustomInput fullWidth placeholder="Title" />
      </Form.Item>

      <Form.Item<EditorFormFieldData> name="text" validateTrigger="onBlur" rules={[{ required: true, message: '' }]}>
        <CustomTextarea rows={6} placeholder="Description" />
      </Form.Item>

      {showMediaBlock ? (
        <Form.Item<EditorFormFieldData> name="media">
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
          <Form.Item<EditorFormFieldData> shouldUpdate>
            <CustomButton type="primary" htmlType="submit" loading={loading} disabled={loading}>
              {t(TranslationKey[data ? 'Save' : 'Create'])}
            </CustomButton>
          </Form.Item>

          <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
        </div>
      </div>
    </Form>
  )
})
