import React from 'react'

import {Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './tab-main-content.style'

export const TabMainContent = ({disabled, disabledSubmit, onChangeField, onSubmit, formFields, disabledAddButton}) => {
  const classNames = useClassNames()
  return (
    <>
      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Yuan to USD exchange rate']) + ', ¥'}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        value={formFields.yuanToDollarRate}
        onChange={onChangeField('yuanToDollarRate')}
      />

      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Divider for calculating volume weight'])}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        value={formFields.volumeWeightCoefficient}
        onChange={onChangeField('volumeWeightCoefficient')}
      />

      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Link for financial transactions'])}
        className={disabled ? classNames.textFieldUnSelection : classNames.textField}
        // value={formFields.volumeWeightCoefficient}
        // onChange={onChangeField('volumeWeightCoefficient')}
      />
      <div className={classNames.proxyFieldWrapper}>
        <Typography className={disabled ? classNames.proxyFieldTextUnSelection : classNames.proxyFieldText}>
          {t(TranslationKey['Proxy servers for parsing'])}
        </Typography>
        <div className={classNames.proxyField}>
          <Field
            disabled={disabled}
            // label={t(TranslationKey['Proxy servers for parsing'])}
            containerClasses={classNames.textContainer}
            className={disabled ? classNames.textFieldUnSelection : classNames.textField}
            // value={formFields.volumeWeightCoefficient}
            // onChange={onChangeField('volumeWeightCoefficient')}
          />
          <Button disabled={disabledAddButton} className={classNames.addProxyButton}>
            {t(TranslationKey.Add)}
          </Button>
        </div>
      </div>

      <div className={classNames.placeAddBtnWrapper}>
        <Button disabled={disabledSubmit} className={classNames.submitButton} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>
      </div>
    </>
  )
}
