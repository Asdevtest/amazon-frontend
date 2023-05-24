import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useClassNames } from './tab-orders-content.style'

export const TabOrdersContent = ({ disabled, disabledSubmit, onSubmit, onChangeField, formFields }) => {
  const { classes: classNames } = useClassNames()
  return (
    <>
      <Field
        disabled={disabled}
        label={`${t(TranslationKey['Client notification time before Deadline of the pending order'])}, ${t(
          TranslationKey.hour,
        )}`}
        labelClasses={disabled && classNames.unselectable}
        classes={{ root: disabled ? classNames.textFieldUnSelection : classNames.textField }}
        value={formFields.timeToDeadlinePendingOrder}
        onChange={onChangeField('timeToDeadlinePendingOrder')}
      />

      <div className={classNames.placeAddBtnWrapper}>
        <Button disabled={disabledSubmit} className={classNames.submitButton} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>
      </div>
    </>
  )
}
