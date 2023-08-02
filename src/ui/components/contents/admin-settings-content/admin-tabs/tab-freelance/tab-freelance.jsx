import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useClassNames } from './tab-freelance.style'

import { fieldNameObject } from '../../admin-settings.constants'

export const TabFreelance = ({ formFields, isFormFieldsChanged, onSubmit, onChangeField }) => {
  const { classes: classNames } = useClassNames()

  const disabledSubmit =
    !isFormFieldsChanged ||
    Number(formFields.requestPlatformMarginInPercent) === 0 ||
    Number(formFields.requestMinAmountPriceOfProposal) === 0 ||
    Number(formFields.requestSupervisorFeeInPercent) === 0 ||
    Number(formFields.requestTimeLimitInHourForCancelingProposalsByClient) === 0 ||
    Number(formFields.requestTimeLimitInHourForCheckingProposalBySuper) === 0

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.textFileds}>
        <Field
          labelClasses={classNames.label}
          label={t(TranslationKey['Percentage of each proposal']) + ', %'}
          classes={{ root: classNames.textField }}
          value={formFields.requestPlatformMarginInPercent}
          error={formFields.requestPlatformMarginInPercent === ''}
          onChange={e => onChangeField(fieldNameObject.requestPlatformMarginInPercent, e)}
        />
        <Field
          labelClasses={classNames.label}
          label={t(TranslationKey['Time after which the offer will automatically be accepted, h'])}
          classes={{ root: classNames.textField }}
          value={formFields.requestTimeLimitInHourForCancelingProposalsByClient}
          error={formFields.requestTimeLimitInHourForCancelingProposalsByClient === ''}
          onChange={e => onChangeField(fieldNameObject.requestTimeLimitInHourForCancelingProposalsByClient, e)}
        />
        <Field
          labelClasses={classNames.label}
          label={t(TranslationKey['Minimum price per proposal to the order']) + ', $'}
          classes={{ root: classNames.textField }}
          value={formFields.requestMinAmountPriceOfProposal}
          error={formFields.requestMinAmountPriceOfProposal === ''}
          onChange={e => onChangeField(fieldNameObject.requestMinAmountPriceOfProposal, e)}
        />
      </div>

      <div className={classNames.textFileds}>
        <div>
          <Field
            labelClasses={classNames.label}
            label={t(TranslationKey['Percentage of each proposal for the supervisor']) + ', %'}
            classes={{ root: classNames.textField }}
            value={formFields.requestSupervisorFeeInPercent}
            error={formFields.requestSupervisorFeeInPercent === ''}
            onChange={e => onChangeField(fieldNameObject.requestSupervisorFeeInPercent, e)}
          />

          <Field
            labelClasses={classNames.label}
            label={t(TranslationKey['Time after which the supervisor will automatically be removed from the check, h'])}
            classes={{ root: classNames.textField }}
            value={formFields.requestTimeLimitInHourForCheckingProposalBySuper}
            error={formFields.requestTimeLimitInHourForCheckingProposalBySuper === ''}
            onChange={e => onChangeField(fieldNameObject.requestTimeLimitInHourForCheckingProposalBySuper, e)}
          />
        </div>

        <Button disabled={disabledSubmit} className={classNames.saveButton} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>
      </div>
    </div>
  )
}
