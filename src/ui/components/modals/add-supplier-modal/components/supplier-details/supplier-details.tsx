import { Form } from 'antd'
import { memo } from 'react'

import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './supplier-details.style'

import { getRequiredRules } from '../../add-supplier-modal.config'
import { FieldType } from '../../add-supplier-modal.types'

export const SupplierDetails = memo(() => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div className={styles.root}>
      <div className={styles.supplierDetailsWrapper}>
        <Form.Item<FieldType> name="title" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomInput
            required
            allowClear
            label="Title"
            size="large"
            placeholder="Title"
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <Form.Item<FieldType> name="country" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomSelect
            required
            allowClear
            wrapperClassName={sharedStyles.input}
            label="Country"
            options={[
              { label: 'Poland', value: 'poland' },
              { label: 'Ukraine', value: 'ukraine' },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType> name="link" className={sharedStyles.field} rules={getRequiredRules()}>
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

      <Form.Item<FieldType> name="link" className={sharedStyles.field} rules={getRequiredRules()}>
        <UploadFilesInput dragAndDropButtonHeight={50} images={[]} setImages={() => console.log('setImages')} />
      </Form.Item>
    </div>
  )
})
