import { Form, FormItemProps } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInputNumber } from '@components/shared/custom-input-number'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './supplier-course.style'

import { ICreateSupplierProductModal } from '../../add-supplier-card-modal.type'

interface ISupplierCourseProps {
  systemYuanToDollarRate: number
  onChangeSupplierCourse: (value: number) => void
}

export const SupplierCourse: FC<ISupplierCourseProps> = memo(({ systemYuanToDollarRate, onChangeSupplierCourse }) => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const checkYuanToDollarRate = Form.useWatch<
    ICreateSupplierProductModal,
    FormItemProps<ICreateSupplierProductModal>['validateStatus']
  >(({ yuanToDollarRate }) => (systemYuanToDollarRate !== yuanToDollarRate ? 'warning' : ''))

  return (
    <div className={styles.root}>
      <div className={styles.systemCourseWrapper}>
        <p>{t(TranslationKey['Actual course'])}</p>
        <p className={styles.systemCourse}>{toFixed(systemYuanToDollarRate)?.replace('.', ',')}</p>
      </div>

      <Form.Item<ICreateSupplierProductModal>
        name="yuanToDollarRate"
        className={sharedStyles.field}
        validateStatus={checkYuanToDollarRate}
      >
        <CustomInputNumber
          size="large"
          label="Current supplier course"
          placeholder="Current supplier course"
          className={styles.inputNumber}
          wrapperClassName={cx(sharedStyles.input, 'rowInput')}
          onChange={value => onChangeSupplierCourse(value as number)}
        />
      </Form.Item>
    </div>
  )
})
