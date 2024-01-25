import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useStyles } from '../../admin-settings.style'

import { fieldNameObject } from '../../admin-settings.constants'

export const TabSearchSupplier = ({ formFields, isFormFieldsChanged, onSubmit, onChangeField }) => {
  const { classes: styles } = useStyles()

  const disabledSubmit =
    !isFormFieldsChanged ||
    Number(formFields.costOfFindingSupplier) === 0 ||
    Number(formFields.deadlineForFindingSupplier) === 0 ||
    Number(formFields.costOfCheckingProduct) === 0

  return (
    <div className={styles.wrapper}>
      <Field
        label={t(TranslationKey['Price for the search of a supplier by a Buyer from the Client']) + ', $'}
        labelClasses={styles.label}
        classes={{ root: styles.textField }}
        value={formFields.costOfFindingSupplier}
        error={formFields.costOfFindingSupplier === ''}
        onChange={e => onChangeField(fieldNameObject.costOfFindingSupplier, e)}
      />
      <Field
        labelClasses={styles.label}
        label={t(TranslationKey['Price for the Supervisor to check the search for a supplier from the Client']) + ', $'}
        classes={{ root: styles.textField }}
        value={formFields.costOfCheckingProduct}
        error={formFields.costOfCheckingProduct === ''}
        onChange={e => onChangeField(fieldNameObject.costOfCheckingProduct, e)}
      />
      <Field
        labelClasses={styles.label}
        label={t(TranslationKey['Time to find a supplier, h'])}
        classes={{ root: styles.textField }}
        value={formFields.deadlineForFindingSupplier}
        error={formFields.deadlineForFindingSupplier === ''}
        onChange={e => onChangeField(fieldNameObject.deadlineForFindingSupplier, e)}
      />

      <Button disabled={disabledSubmit} className={styles.saveButton} onClick={onSubmit}>
        {t(TranslationKey.Save)}
      </Button>
    </div>
  )
}
