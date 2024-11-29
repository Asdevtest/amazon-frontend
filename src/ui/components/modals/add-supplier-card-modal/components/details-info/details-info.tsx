import { Form } from 'antd'
import { memo } from 'react'

import { CustomTextarea } from '@components/shared/custom-textarea'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './details-info.style'

import { ICreateSupplierProductModal } from '../../add-supplier-card-modal.type'

export const DetailsInfo = memo(() => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div className={cx(styles.root, sharedStyles.sectionWrapper)}>
      <Form.Item<ICreateSupplierProductModal> name="material" className={cx(sharedStyles.field, 'detailsArea')}>
        <CustomTextarea
          size="large"
          rows={3}
          label="Material"
          placeholder="Plastic, metal, wooden, ABS, PP, not defined"
          maxLength={512}
        />
      </Form.Item>

      <Form.Item<ICreateSupplierProductModal>
        name="includedComponents"
        className={cx(sharedStyles.field, 'detailsArea')}
      >
        <CustomTextarea size="large" rows={3} label="Included components" maxLength={512} />
      </Form.Item>
    </div>
  )
})
