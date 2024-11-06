import { Avatar, Form } from 'antd'
import { FC, memo, useState } from 'react'

import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { ICountry } from '@typings/models/others/country'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './supplier-details.style'

import { getRequiredRules } from '../../add-supplier-modal.config'
import { CreateSupplier } from '../../add-supplier-modal.types'

interface SupplierDetailsProps {
  countries: ICountry[]
  handleUploadFiles: (images: UploadFileType[]) => void
}

export const SupplierDetails: FC<SupplierDetailsProps> = memo(({ countries, handleUploadFiles }) => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const [images, setImages] = useState<UploadFileType[]>([])

  const onUploadFiles = (uploadedImages: UploadFileType[]) => {
    setImages(uploadedImages)
    handleUploadFiles(uploadedImages)
  }

  return (
    <div className={styles.root}>
      <div className={styles.supplierDetailsWrapper}>
        <Form.Item<CreateSupplier> name="companyName" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomInput
            required
            allowClear
            label="Title"
            size="large"
            placeholder="Title"
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <Form.Item<CreateSupplier> name="countryId" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomSelect
            required
            allowClear
            wrapperClassName={sharedStyles.input}
            label="Country"
            placeholder="Country"
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

        <Form.Item<CreateSupplier> name="link" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomInput
            required
            allowClear
            label="Link"
            size="large"
            placeholder="Link"
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>
      </div>

      <Form.Item<CreateSupplier>
        name="companyLogo"
        className={cx(sharedStyles.field, styles?.uploadFiles)}
        rules={getRequiredRules()}
        validateTrigger={['onChange', 'onBlur']}
      >
        <UploadFilesInput dragAndDropButtonHeight={50} images={images} setImages={onUploadFiles} />
      </Form.Item>
    </div>
  )
})
