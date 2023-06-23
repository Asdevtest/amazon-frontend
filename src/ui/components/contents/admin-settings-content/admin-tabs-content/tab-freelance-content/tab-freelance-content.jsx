import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useClassNames } from './tab-freelance-content.style'

export const TabFreelanceContent = ({ formFields, disabledSubmit, onSubmit, onChangeField }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.textFileds}>
        <Field
          labelClasses={classNames.label}
          label={t(TranslationKey['Percentage of each proposal']) + ', %'}
          classes={{ root: classNames.textField }}
          value={formFields.requestPlatformMarginInPercent}
          onChange={onChangeField('requestPlatformMarginInPercent')}
        />
        <Field
          labelClasses={classNames.label}
          label={t(TranslationKey['Time after which the offer will automatically be accepted, h'])}
          classes={{ root: classNames.textField }}
          value={formFields.requestTimeLimitInHourForCancelingProposalsByClient}
          onChange={onChangeField('requestTimeLimitInHourForCancelingProposalsByClient')}
        />
        <Field
          labelClasses={classNames.label}
          label={t(TranslationKey['Minimum price per proposal to the order']) + ', $'}
          classes={{ root: classNames.textField }}
          value={formFields.requestMinAmountPriceOfProposal}
          onChange={onChangeField('requestMinAmountPriceOfProposal')}
        />
      </div>

      <div className={classNames.textFileds}>
        <div>
          <Field
            labelClasses={classNames.label}
            label={t(TranslationKey['Percentage of each proposal for the supervisor']) + ', %'}
            classes={{ root: classNames.textField }}
            value={formFields.requestSupervisorFeeInPercent}
            onChange={onChangeField('requestSupervisorFeeInPercent')}
          />
          <Field
            labelClasses={classNames.label}
            label={t(TranslationKey['Time after which the supervisor will automatically be removed from the check, h'])}
            classes={{ root: classNames.textField }}
            value={formFields.requestTimeLimitInHourForCheckingProposalBySuper}
            onChange={onChangeField('requestTimeLimitInHourForCheckingProposalBySuper')}
          />
        </div>

        <Button disabled={disabledSubmit} className={classNames.saveButton} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>
      </div>
    </div>
  )
}
