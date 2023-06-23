import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useClassNames } from './tab-search-supplier-content.style'

export const TabSearchSupplierContent = ({ formFields, disabledSubmit, onSubmit, onChangeField }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.wrapper}>
      <Field
        label={t(TranslationKey['Price for the search of a supplier by a Buyer from the Client']) + ', $'}
        labelClasses={classNames.label}
        classes={{ root: classNames.textField }}
        value={formFields.costOfFindingSupplier}
        onChange={onChangeField('costOfFindingSupplier')}
      />
      <Field
        labelClasses={classNames.label}
        label={t(TranslationKey['Price for the Supervisor to check the search for a supplier from the Client']) + ', $'}
        classes={{ root: classNames.textField }}
        value={formFields.costOfCheckingProduct}
        onChange={onChangeField('costOfCheckingProduct')}
      />
      <Field
        labelClasses={classNames.label}
        label={t(TranslationKey['Time to find a supplier, h'])}
        classes={{ root: classNames.textField }}
        value={formFields.deadlineForFindingSupplier}
        onChange={onChangeField('deadlineForFindingSupplier')}
      />

      <Button disabled={disabledSubmit} className={classNames.saveButton} onClick={onSubmit}>
        {t(TranslationKey.Save)}
      </Button>
    </div>
  )
}
