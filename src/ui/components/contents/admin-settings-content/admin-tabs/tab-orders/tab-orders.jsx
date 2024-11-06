import { memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useStyles } from '../../admin-settings.style'

import { fieldNameObject } from '../../admin-settings.constants'

export const TabOrders = memo(props => {
  const { formFields, isFormFieldsChanged, onSubmit, onChangeField } = props

  const { classes: styles } = useStyles()

  const disabledSubmit = !isFormFieldsChanged || Number(formFields.timeToDeadlinePendingOrder) === 0

  return (
    <div className={styles.wrapper}>
      <Field
        label={`${t(TranslationKey['Client notification time before Deadline of the pending order'])}, ${t(
          TranslationKey.hour,
        )}`}
        labelClasses={styles.label}
        classes={{ root: styles.textField, inputClasses: styles.input }}
        value={formFields.timeToDeadlinePendingOrder}
        error={formFields.timeToDeadlinePendingOrder === ''}
        onChange={e => onChangeField(fieldNameObject.timeToDeadlinePendingOrder, e)}
      />
      <Field
        label={t(TranslationKey['Minimum order amount, $'])}
        labelClasses={styles.label}
        classes={{ root: styles.textField, inputClasses: styles.input }}
        value={formFields.orderAmountLimit}
        error={formFields.orderAmountLimit === ''}
        onChange={e => onChangeField(fieldNameObject.orderAmountLimit, e)}
      />
      <CustomButton type="primary" size="large" disabled={disabledSubmit} onClick={onSubmit}>
        {t(TranslationKey.Save)}
      </CustomButton>
    </div>
  )
})
