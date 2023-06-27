import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useClassNames } from '../../admin-settings-content.style'

export const TabOrders = ({ formFields, disabledSubmit, onSubmit, onChangeField }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.wrapper}>
      <Field
        label={`${t(TranslationKey['Client notification time before Deadline of the pending order'])}, ${t(
          TranslationKey.hour,
        )}`}
        labelClasses={classNames.label}
        classes={{ root: classNames.textField, inputClasses: classNames.input }}
        value={formFields.timeToDeadlinePendingOrder}
        onChange={onChangeField('timeToDeadlinePendingOrder')}
      />
      <Button disabled={disabledSubmit} className={classNames.saveButton} onClick={onSubmit}>
        {t(TranslationKey.Save)}
      </Button>
    </div>
  )
}
