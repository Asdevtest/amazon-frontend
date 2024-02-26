import { memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
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
      <Button disabled={disabledSubmit} className={styles.saveButton} onClick={onSubmit}>
        {t(TranslationKey.Save)}
      </Button>
    </div>
  )
})
