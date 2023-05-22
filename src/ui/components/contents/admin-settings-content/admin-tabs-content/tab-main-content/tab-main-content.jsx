/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { IconButton, Typography } from '@mui/material'

import React, { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field/field'

import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './tab-main-content.style'

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
  onClickAddProxyBtn,
}) => {
  const { classes: classNames } = useClassNames()
  const [showFullCard, setShowFullCard] = useState(false)

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
        classes={{ root: disabled ? classNames.textFieldUnSelection : classNames.textField }}
        value={formFields.yuanToDollarRate}
        onChange={onChangeField('yuanToDollarRate')}
      />

      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Divider for calculating volume weight'])}
        classes={{ root: disabled ? classNames.textFieldUnSelection : classNames.textField }}
        value={formFields.volumeWeightCoefficient}
        onChange={onChangeField('volumeWeightCoefficient')}
      />

      <Field
        disabled={disabled}
        labelClasses={disabled && classNames.unselectable}
        label={t(TranslationKey['Link for financial transactions'])}
        classes={{ root: disabled ? classNames.textFieldUnSelection : classNames.textField }}
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
          <Button disabled={disabledAddButton /* || error */} onClick={onClickAddProxyBtn}>
            {t(TranslationKey['Add proxy'])}
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
                  <Typography className={cx(classNames.proxy, { [classNames.unselectable]: disabled })}>
                    {getShortenStringIfLongerThanCount(proxy, 32)}
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
            className={cx(classNames.tablePanelSortWrapper, { [classNames.disabledTablePanelSortWrapper]: disabled })}
            onClick={() => !disabled && setShowFullCard(!showFullCard)}
          >
            <Typography className={cx(classNames.tablePanelViewText, { [classNames.unselectable]: disabled })}>
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
