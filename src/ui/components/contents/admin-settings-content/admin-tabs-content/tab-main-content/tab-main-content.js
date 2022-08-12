import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import React, {useEffect, useState} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './tab-main-content.style'

export const TabMainContent = ({
  disabled,
  disabledSubmit,
  onChangeField,
  onSubmit,
  onSubmitProxy,
  formFields,
  disabledAddButton,
  disabledSubmitProxy,
  setProxyArr,
  proxyArr,
}) => {
  const classNames = useClassNames()
  const [proxy, setProxy] = useState('')
  const [error, setError] = useState(false)

  const regExp =
    /\b[a-zA-Z0-9]+:[a-zA-Z0-9]+@(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):\d{1,5}\b/

  const onClickAddProxy = () => {
    setProxyArr(prev => [...new Set([...prev, proxy])])

    setProxy('')
  }

  useEffect(() => {
    if (proxy?.length && !proxy.match(regExp)) {
      setError(true)
    } else {
      setError(false)
    }
  }, [proxy])

  const onClickDeleteProxy = proxy => {
    const removeProxy = proxyArr.filter(p => p !== proxy)
    setProxyArr(removeProxy)
  }

  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }

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
      <div className={classNames.placeAddBtnWrapper}>
        <Button disabled={disabledSubmit} className={classNames.submitButton} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>
      </div>
      <div className={classNames.proxyFieldWrapper}>
        <Typography className={disabled ? classNames.proxyFieldTextUnSelection : classNames.proxyFieldText}>
          {t(TranslationKey['Proxy servers for parsing'])}
        </Typography>
        <div className={classNames.proxyField}>
          <Field
            disabled={disabled}
            error={error && t(TranslationKey['Invalid proxy'])}
            // label={t(TranslationKey['Proxy servers for parsing'])}
            containerClasses={classNames.textContainer}
            className={disabled ? classNames.textFieldUnSelection : classNames.textField}
            value={proxy}
            onChange={e => setProxy(e.target.value)}
          />
          <Button
            disabled={disabledAddButton || !proxy || error}
            className={classNames.addProxyButton}
            onClick={onClickAddProxy}
          >
            {t(TranslationKey.Add)}
          </Button>
        </div>
        {proxyArr.length !== 0 &&
          proxyArr.map((proxy, index) => (
            <div key={index} className={classNames.proxyWrapper}>
              <div className={classNames.proxySubWrapper}>
                <Typography className={clsx(classNames.proxy)}>
                  {proxy.length > 32 ? proxy.slice(0, 32) + '...' : proxy}
                </Typography>
                <img
                  className={classNames.copyImg}
                  src="/assets/icons/copy-img.svg"
                  alt=""
                  onClick={() => copyValue(proxy)}
                />
              </div>

              <DeleteOutlineOutlinedIcon className={classNames.deleteProxy} onClick={() => onClickDeleteProxy(proxy)} />
            </div>
          ))}

        <div className={classNames.proxyButtonWrapper}>
          <Button disabled={disabledSubmitProxy} className={classNames.submitButton} onClick={() => onSubmitProxy()}>
            {t(TranslationKey['Save Proxy'])}
          </Button>
        </div>
      </div>
    </>
  )
}
