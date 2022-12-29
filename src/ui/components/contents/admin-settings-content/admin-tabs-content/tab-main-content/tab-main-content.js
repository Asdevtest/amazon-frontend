import {cx} from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {IconButton, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
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
  const {classes: classNames} = useClassNames()
  const [proxy, setProxy] = useState('')
  const [error, setError] = useState(false)
  const [showFullCard, setShowFullCard] = useState(false)

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

  return (
    <>
      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Yuan to USD exchange rate']) + ', ¥'}
        classes={{root: disabled ? classNames.textFieldUnSelection : classNames.textField}}
        value={formFields.yuanToDollarRate}
        onChange={onChangeField('yuanToDollarRate')}
      />

      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Divider for calculating volume weight'])}
        classes={{root: disabled ? classNames.textFieldUnSelection : classNames.textField}}
        value={formFields.volumeWeightCoefficient}
        onChange={onChangeField('volumeWeightCoefficient')}
      />

      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Link for financial transactions'])}
        classes={{root: disabled ? classNames.textFieldUnSelection : classNames.textField}}
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
            classes={{root: disabled ? classNames.textFieldUnSelection : classNames.textField}}
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
        <div
          className={cx(classNames.proxiesWrapper, {
            [classNames.halfProxiesWrapper]: !showFullCard,
          })}
        >
          {proxyArr.length !== 0 &&
            proxyArr.map((proxy, index) => (
              <div key={index} className={classNames.proxyWrapper}>
                <div className={classNames.proxySubWrapper}>
                  <Typography className={cx(classNames.proxy, {[classNames.unselectable]: disabled})}>
                    {proxy.length > 32 ? proxy.slice(0, 32) + '...' : proxy}
                  </Typography>
                </div>
                <div className={classNames.iconsWrapper}>
                  <CopyValue text={proxy} disabled={disabled} />
                  <IconButton size="small" disabled={disabledAddButton}>
                    <DeleteOutlineOutlinedIcon
                      className={classNames.deleteProxy}
                      onClick={() => onClickDeleteProxy(proxy)}
                    />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
        {proxyArr.length > 5 ? (
          <div
            className={cx(classNames.tablePanelSortWrapper, {[classNames.disabledTablePanelSortWrapper]: disabled})}
            onClick={() => !disabled && setShowFullCard(!showFullCard)}
          >
            <Typography className={cx(classNames.tablePanelViewText, {[classNames.unselectable]: disabled})}>
              {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey['View all'])}
            </Typography>

            {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
          </div>
        ) : null}

        <div className={classNames.proxyButtonWrapper}>
          <Button disabled={disabledSubmitProxy} className={classNames.submitButton} onClick={() => onSubmitProxy()}>
            {t(TranslationKey['Save Proxy'])}
          </Button>
        </div>
      </div>
    </>
  )
}
