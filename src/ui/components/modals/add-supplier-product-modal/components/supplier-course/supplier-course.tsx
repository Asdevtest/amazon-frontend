import { Form } from 'antd'
import { memo } from 'react'

import { CustomInput } from '@components/shared/custom-input'
import { CustomInputNumber } from '@components/shared/custom-input-number'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './supplier-course.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'

export const SupplierCourse = memo(() => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div className={styles.root}>
      <div className={styles.systemCourseWrapper}>
        <p>Current supplier course</p>
        <p className={styles.systemCourse}>{123132}</p>
      </div>

      <Form.Item<ICreateSupplierProduct>
        name="yuanToDollarRate"
        className={sharedStyles.field} /* rules={getRequiredRules()} */
      >
        <CustomInputNumber
          size="large"
          label="Current supplier course"
          placeholder="Current supplier course"
          wrapperClassName={cx(sharedStyles.input, 'rowInput')}
        />
      </Form.Item>
    </div>
  )
})
