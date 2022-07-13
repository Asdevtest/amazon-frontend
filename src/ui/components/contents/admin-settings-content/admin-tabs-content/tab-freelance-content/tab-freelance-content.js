import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './tab-freelance-content.style'

export const TabFreelanceContent = ({disabled, disabledSubmit, onChangeField, onSubmit, formFields}) => {
  const classNames = useClassNames()
  return (
    <>
      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Percentage of each proposal']) + ', %'}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        value={formFields.requestPlatformMarginInPercent}
        onChange={onChangeField('requestPlatformMarginInPercent')}
      />
      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Time after which the offer will automatically be accepted, h'])}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        value={formFields.requestTimeLimitInHourForCancelingProposalsByClient}
        onChange={onChangeField('requestTimeLimitInHourForCancelingProposalsByClient')}
      />
      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Minimum price per proposal to the order']) + ', $'}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        value={formFields.requestMinAmountPriceOfProposal}
        onChange={onChangeField('requestMinAmountPriceOfProposal')}
      />
      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Percentage of each proposal for the supervisor']) + ', %'}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        value={formFields.requestSupervisorFeeInPercent}
        onChange={onChangeField('requestSupervisorFeeInPercent')}
      />
      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Time after which the supervisor will automatically be removed from the check, h'])}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        value={formFields.requestTimeLimitInHourForCheckingProposalBySuper}
        onChange={onChangeField('requestTimeLimitInHourForCheckingProposalBySuper')}
      />
      <div className={classNames.placeAddBtnWrapper}>
        <Button disabled={disabledSubmit} className={classNames.submitButton} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>
      </div>
    </>
  )
}
