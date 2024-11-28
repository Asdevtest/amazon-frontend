import { Avatar, Form } from 'antd'
import { FC, memo } from 'react'

import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { ICountry } from '@typings/shared/country'
import { UploadFileType } from '@typings/shared/upload-file'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './supplier-details.style'

import { getRequiredLinkRules } from '../../add-supplier-modal.config'
import { CreateSupplier } from '../../add-supplier-modal.types'

interface SupplierDetailsProps {
  images: UploadFileType[]
  countries: ICountry[]
  handleUploadFiles: (images: UploadFileType[]) => void
}

export const SupplierDetails: FC<SupplierDetailsProps> = memo(({ images = [], countries, handleUploadFiles }) => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div className={styles.root}>
      <div className={styles.supplierDetailsWrapper}>
        <Form.Item<CreateSupplier> name="companyName" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomInput required allowClear label="Title" size="large" wrapperClassName={sharedStyles.input} />
        </Form.Item>

        <Form.Item<CreateSupplier> name="countryId" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomSelect
            required
            allowClear
            wrapperClassName={sharedStyles.input}
            label="Country"
            options={countries}
            fieldNames={{ label: 'title', value: '_id' }}
            optionRender={option => (
              <div className={sharedStyles.selectOption}>
                <Avatar size={20} src={getAmazonImageUrl(option.data.image)} />
                <p>{`${option.data.title} (${option.data.shortTitle})`}</p>
              </div>
            )}
          />
        </Form.Item>

        <Form.Item<CreateSupplier> name="link" className={sharedStyles.field} rules={getRequiredLinkRules()}>
          <CustomInput required allowClear label="Link" size="large" wrapperClassName={sharedStyles.input} />
        </Form.Item>
      </div>

      <Form.Item<CreateSupplier>
        name="images"
        className={cx(sharedStyles.field, styles?.uploadFiles)}
        validateTrigger={['onChange', 'onBlur']}
      >
        <UploadFilesInput
          wrapperClassName={styles?.uploadFilesWrapper}
          dragAndDropButtonHeight={50}
          images={images}
          setImages={handleUploadFiles}
        />
      </Form.Item>
    </div>
  )
})
