import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './tab-search-supplier-content.style'

export const TabSearchSupplierContent = ({disabled, disabledSubmit, onChangeField, onSubmit, formFields}) => {
  const classNames = useClassNames()
  return (
    <>
      <Field
        disabled={disabled}
        label={t(TranslationKey['Price to find a supplier']) + ', $'}
        labelClasses={disabled && classNames.unselectable}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        value={formFields.costOfFindingSupplier}
        onChange={onChangeField('costOfFindingSupplier')}
      />
      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Price for the Supervisor to check the search for a supplier from the Client']) + ', $'}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        value={formFields.costOfCheckingProduct}
        onChange={onChangeField('costOfCheckingProduct')}
      />
      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Time to find a supplier, h'])}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        value={formFields.deadlineForFindingSupplier}
        onChange={onChangeField('deadlineForFindingSupplier')}
      />
      <div className={classNames.placeAddBtnWrapper}>
        <Button disabled={disabledSubmit} className={classNames.submitButton} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>
      </div>
    </>
  )
}
