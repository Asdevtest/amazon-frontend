import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useStyles } from './tab-freelance.style'

import { fieldNameObject } from '../../admin-settings.constants'

export const TabFreelance = ({ formFields, isFormFieldsChanged, onSubmit, onChangeField }) => {
  const { classes: styles } = useStyles()

  const disabledSubmit =
    !isFormFieldsChanged ||
    Number(formFields.requestPlatformMarginInPercent) === 0 ||
    Number(formFields.requestMinAmountPriceOfProposal) === 0 ||
    Number(formFields.requestSupervisorFeeInPercent) === 0 ||
    Number(formFields.requestTimeLimitInHourForCancelingProposalsByClient) === 0 ||
    Number(formFields.requestTimeLimitInHourForCheckingProposalBySuper) === 0

  return (
    <div className={styles.wrapper}>
      <div className={styles.textFileds}>
        <Field
          labelClasses={styles.label}
          label={t(TranslationKey['Percentage of each proposal']) + ', %'}
          classes={{ root: styles.textField }}
          value={formFields.requestPlatformMarginInPercent}
          error={formFields.requestPlatformMarginInPercent === ''}
          onChange={e => onChangeField(fieldNameObject.requestPlatformMarginInPercent, e)}
        />
        <Field
          labelClasses={styles.label}
          label={t(TranslationKey['Time after which the offer will automatically be accepted, h'])}
          classes={{ root: styles.textField }}
          value={formFields.requestTimeLimitInHourForCancelingProposalsByClient}
          error={formFields.requestTimeLimitInHourForCancelingProposalsByClient === ''}
          onChange={e => onChangeField(fieldNameObject.requestTimeLimitInHourForCancelingProposalsByClient, e)}
        />
        <Field
          labelClasses={styles.label}
          label={t(TranslationKey['Minimum price per proposal to the order']) + ', $'}
          classes={{ root: styles.textField }}
          value={formFields.requestMinAmountPriceOfProposal}
          error={formFields.requestMinAmountPriceOfProposal === ''}
          onChange={e => onChangeField(fieldNameObject.requestMinAmountPriceOfProposal, e)}
        />
      </div>

      <div className={styles.textFileds}>
        <div>
          <Field
            labelClasses={styles.label}
            label={t(TranslationKey['Percentage of each proposal for the supervisor']) + ', %'}
            classes={{ root: styles.textField }}
            value={formFields.requestSupervisorFeeInPercent}
            error={formFields.requestSupervisorFeeInPercent === ''}
            onChange={e => onChangeField(fieldNameObject.requestSupervisorFeeInPercent, e)}
          />

          <Field
            labelClasses={styles.label}
            label={t(TranslationKey['Time after which the supervisor will automatically be removed from the check, h'])}
            classes={{ root: styles.textField }}
            value={formFields.requestTimeLimitInHourForCheckingProposalBySuper}
            error={formFields.requestTimeLimitInHourForCheckingProposalBySuper === ''}
            onChange={e => onChangeField(fieldNameObject.requestTimeLimitInHourForCheckingProposalBySuper, e)}
          />
        </div>

        <Button disabled={disabledSubmit} className={styles.saveButton} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>
      </div>
    </div>
  )
}
