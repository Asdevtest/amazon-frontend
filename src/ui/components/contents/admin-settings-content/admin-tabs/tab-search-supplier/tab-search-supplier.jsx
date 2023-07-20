import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { fieldNameObject } from '../../admin-settings.constants'
import { useClassNames } from '../../admin-settings.style'

export const TabSearchSupplier = ({ formFields, isFormFieldsChanged, onSubmit, onChangeField }) => {
  const { classes: classNames } = useClassNames()

  const disabledSubmit =
    !isFormFieldsChanged ||
    Number(formFields.costOfFindingSupplier) === 0 ||
    Number(formFields.deadlineForFindingSupplier) === 0 ||
    Number(formFields.costOfCheckingProduct) === 0

  return (
    <div className={classNames.wrapper}>
      <Field
        label={t(TranslationKey['Price for the search of a supplier by a Buyer from the Client']) + ', $'}
        labelClasses={classNames.label}
        classes={{ root: classNames.textField }}
        value={formFields.costOfFindingSupplier}
        error={Number(formFields.costOfFindingSupplier) === 0}
        onChange={e => onChangeField(fieldNameObject.costOfFindingSupplier, e)}
      />
      <Field
        labelClasses={classNames.label}
        label={t(TranslationKey['Price for the Supervisor to check the search for a supplier from the Client']) + ', $'}
        classes={{ root: classNames.textField }}
        value={formFields.costOfCheckingProduct}
        error={Number(formFields.costOfCheckingProduct) === 0}
        onChange={e => onChangeField(fieldNameObject.costOfCheckingProduct, e)}
      />
      <Field
        labelClasses={classNames.label}
        label={t(TranslationKey['Time to find a supplier, h'])}
        classes={{ root: classNames.textField }}
        value={formFields.deadlineForFindingSupplier}
        error={Number(formFields.deadlineForFindingSupplier) === 0}
        onChange={e => onChangeField(fieldNameObject.deadlineForFindingSupplier, e)}
      />

      <Button disabled={disabledSubmit} className={classNames.saveButton} onClick={onSubmit}>
        {t(TranslationKey.Save)}
      </Button>
    </div>
  )
}
