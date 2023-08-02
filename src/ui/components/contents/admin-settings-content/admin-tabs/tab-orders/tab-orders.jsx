import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useClassNames } from '../../admin-settings.style'

import { fieldNameObject } from '../../admin-settings.constants'

export const TabOrders = ({ formFields, isFormFieldsChanged, onSubmit, onChangeField }) => {
  const { classes: classNames } = useClassNames()

  const disabledSubmit = !isFormFieldsChanged || Number(formFields.timeToDeadlinePendingOrder) === 0

  return (
    <div className={classNames.wrapper}>
      <Field
        label={`${t(TranslationKey['Client notification time before Deadline of the pending order'])}, ${t(
          TranslationKey.hour,
        )}`}
        labelClasses={classNames.label}
        classes={{ root: classNames.textField, inputClasses: classNames.input }}
        value={formFields.timeToDeadlinePendingOrder}
        error={formFields.timeToDeadlinePendingOrder === ''}
        onChange={e => onChangeField(fieldNameObject.timeToDeadlinePendingOrder, e)}
      />
      <Button disabled={disabledSubmit} className={classNames.saveButton} onClick={onSubmit}>
        {t(TranslationKey.Save)}
      </Button>
    </div>
  )
}
