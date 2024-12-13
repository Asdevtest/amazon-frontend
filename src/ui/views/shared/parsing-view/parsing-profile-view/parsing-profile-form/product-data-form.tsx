import { Form } from 'antd'
import { observer } from 'mobx-react'
import { FC, useEffect, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'

import { t } from '@utils/translations'

import { IParsingProfile } from '@typings/models/parser/parsing-profile'

import { useStyles } from './product-data-form.style'

import { ParsingDataBlock } from './parsing-data-block'
import { ParsingProfileFormModel } from './product-data-form.model'
import { FieldType } from './product-data-form.type'

interface ParsingProfileFormProps {
  profile?: IParsingProfile
  onClose?: () => void
  onUpdateData?: () => void
}

export const ParsingProfileForm: FC<ParsingProfileFormProps> = observer(props => {
  const { profile, onClose, onUpdateData } = props

  const isEditMode = !!profile

  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new ParsingProfileFormModel(profile), [])
  const [form] = Form.useForm()

  useEffect(() => {
    if (isEditMode) {
      form.setFieldsValue({
        name: profile?.name || '',
        gologinId: profile?.gologinId || '',
        email: profile?.email || '',
        spreadsheetsIdPerformance: profile?.spreadsheetsIdPerformance || '',
        spreadsheetsIdImport: profile?.spreadsheetsIdImport || '',
        spreadsheetsIdMain: profile?.spreadsheetsIdMain || '',
        otp: profile?.otp || '',
      })
    }
  }, [])

  const handleSendForm = async (values: FieldType, isRemove?: boolean) => {
    isEditMode ? await viewModel.onEditProfile(profile?._id, values, isRemove) : await viewModel.onCreateProfile(values)

    if (isRemove) {
      await viewModel.onParsingProfileRemoved()
    }

    form.resetFields()
    onClose?.()
    onUpdateData?.()
  }

  const title = (isEditMode ? 'Edit' : 'Add') + ' parsing profile'
  const isUnlinked = isEditMode && !profile?.client && !!profile?.shop?._id

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexRow}>
        <p className={styles.title}>{t(TranslationKey[title as TranslationKey])}</p>

        {isUnlinked ? <p className={styles.unlinked}>{t(TranslationKey.Unlinked)}</p> : null}
      </div>

      <Form name="parsing profile" autoComplete="off" form={form} onFinish={handleSendForm}>
        <div className={styles.container}>
          <ParsingDataBlock
            shop={viewModel.profile?.shop}
            client={viewModel.profile?.client}
            isActive={viewModel.profile?.isActive}
            access={viewModel.profile?.access}
            onResetParsingData={viewModel.onResetParsingData}
            onToggleParsingData={viewModel.onToggleParsingData}
          />
          <Form.Item<FieldType> name="email" className={styles.field} rules={[{ required: !isEditMode, message: '' }]}>
            <CustomInput
              allowClear
              required={!isEditMode}
              disabled={isEditMode}
              size="large"
              label="Email"
              wrapperClassName={styles.input}
            />
          </Form.Item>
          <Form.Item<FieldType>
            name="password"
            className={styles.field}
            rules={[{ required: !isEditMode, message: '' }]}
          >
            <CustomInput
              allowClear
              password={!isEditMode}
              required={!isEditMode}
              disabled={isEditMode}
              size="large"
              label="Password"
              type="password"
              autoComplete="new-password"
              wrapperClassName={styles.input}
            />
          </Form.Item>
          <Form.Item<FieldType> name="name" className={styles.field} rules={[{ required: !isEditMode, message: '' }]}>
            <CustomInput allowClear required={!isEditMode} size="large" label="Name" wrapperClassName={styles.input} />
          </Form.Item>
          <Form.Item<FieldType> name="otp" className={styles.field} rules={[{ required: !isEditMode, message: '' }]}>
            <CustomInput allowClear required={!isEditMode} size="large" label="OTP" wrapperClassName={styles.input} />
          </Form.Item>
          <Form.Item<FieldType>
            name="gologinId"
            className={styles.field}
            rules={[{ required: !isEditMode, message: '' }]}
          >
            <CustomInput
              allowClear
              required={!isEditMode}
              disabled={isEditMode}
              size="large"
              label="Gologin ID"
              wrapperClassName={styles.input}
            />
          </Form.Item>
          <Form.Item<FieldType> name="spreadsheetsIdPerformance" className={styles.field}>
            <CustomInput allowClear size="large" label="Performance ID" wrapperClassName={styles.input} />
          </Form.Item>
          <Form.Item<FieldType> name="spreadsheetsIdImport" className={styles.field}>
            <CustomInput allowClear size="large" label="Import ID" wrapperClassName={styles.input} />
          </Form.Item>
          <Form.Item<FieldType> name="spreadsheetsIdMain" className={styles.field}>
            <CustomInput allowClear size="large" label="SpeadsheetMain ID" wrapperClassName={styles.input} />
          </Form.Item>
        </div>

        <div className={styles.buttons}>
          <CustomButton
            danger
            type="primary"
            size="large"
            disabled={!!viewModel.profile?.shop}
            confirmText="Are you sure you want to delete profile?"
            onClick={() => handleSendForm(form.getFieldsValue(), true)}
          >
            {t(TranslationKey.Delete)}
          </CustomButton>

          <Form.Item shouldUpdate className={styles.field}>
            <CustomButton loading={viewModel.loading} size="large" type="primary" htmlType="submit">
              {t(TranslationKey.Save)}
            </CustomButton>
          </Form.Item>

          <CustomButton size="large" onClick={onClose}>
            {t(TranslationKey.Close)}
          </CustomButton>
        </div>
      </Form>
    </div>
  )
})
