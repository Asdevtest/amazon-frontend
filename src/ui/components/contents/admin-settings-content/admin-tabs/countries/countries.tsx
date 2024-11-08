import { Empty, Form } from 'antd'
import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'
import { MdDeleteOutline, MdEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { CustomButton } from '@components/shared/custom-button'
import { CustomImage } from '@components/shared/custom-image'
import { CustomInput } from '@components/shared/custom-input'
import { Text } from '@components/shared/text'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ICountry } from '@typings/models/others/country'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './countries.style'

import { CountryValues, generateCountryFieldRules, generateCountryIconRules } from './countries.config'
import { CountriesModel } from './countries.model'

export const Countries = observer(() => {
  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new CountriesModel(), [])
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [SettingsModel.languageTag])

  const handleFinish = (values: CountryValues) => {
    viewModel.onSaveCountry(values)
    form.resetFields()
    viewModel.onChangeImages([])
  }
  const handleSetImages = (values: UploadFileType[]) => {
    viewModel.onChangeImages(values)
    form.setFieldValue('image', values)
  }
  const handleEdit = (data: ICountry) => {
    form.setFieldsValue({
      title: data?.title || '',
      shortTitle: data?.shortTitle || '',
      image: [getAmazonImageUrl(data?.image, true) || ''],
      id: data?._id,
    })

    viewModel.onChangeImages([data?.image || ''])
  }

  return (
    <Form name="countries-form" size="large" form={form} rootClassName={styles.form} onFinish={handleFinish}>
      <p className={styles.title}>{t(TranslationKey['Adding a country'])}</p>

      <div className={cx(styles.flexRow, styles.flexStart)}>
        <Form.Item hidden name="id">
          <CustomInput />
        </Form.Item>
        <Form.Item<CountryValues>
          name="title"
          validateTrigger="onBlur"
          rules={generateCountryFieldRules('Country name is required')}
        >
          <CustomInput required fullWidth allowClear label="Name" />
        </Form.Item>
        <Form.Item<CountryValues>
          name="shortTitle"
          validateTrigger="onBlur"
          rules={generateCountryFieldRules('Country code is required')}
        >
          <CustomInput required fullWidth allowClear label="Code" />
        </Form.Item>
      </div>

      <Form.Item<CountryValues> name="image" rules={generateCountryIconRules()}>
        <UploadFilesInput minimized maxNumber={1} images={viewModel.images} setImages={handleSetImages} />
      </Form.Item>

      <div className={styles.countries}>
        {viewModel.countries.length ? (
          viewModel.countries?.map(country => (
            <div key={country._id} className={styles.flexRow}>
              <CustomImage src={country.image} preview={false} width={32} height={32} />
              <Text
                copyable={false}
                rows={1}
                text={`${country.title} (${country.shortTitle})`}
                className={styles.text}
              />

              <div className={styles.flexRow}>
                <CustomButton
                  ghost
                  size="small"
                  type="primary"
                  icon={<MdEdit size={16} />}
                  onClick={() => handleEdit(country)}
                />
                <CustomButton
                  danger
                  ghost
                  size="small"
                  type="primary"
                  icon={<MdDeleteOutline size={16} />}
                  confirmText="Are you sure you want to delete the country?"
                  onClick={() => viewModel.onRemoveCountry(country._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
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
