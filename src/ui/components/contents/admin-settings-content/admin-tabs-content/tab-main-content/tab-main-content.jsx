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
    <div className={classNames.wrapper}>
      <div className={classNames.textFileds}>
        <Field
          label={t(TranslationKey['Yuan to USD exchange rate']) + ', ¥'}
          labelClasses={classNames.label}
          classes={{ root: classNames.textField }}
          value={formFields.yuanToDollarRate}
          onChange={onChangeField('yuanToDollarRate')}
        />

        <Field
          label={t(TranslationKey['Divider for calculating volume weight'])}
          labelClasses={classNames.label}
          classes={{ root: classNames.textField }}
          value={formFields.volumeWeightCoefficient}
          onChange={onChangeField('volumeWeightCoefficient')}
        />

        <Field
          label={t(TranslationKey['Link for financial transactions'])}
          labelClasses={classNames.label}
          classes={{ root: classNames.textField }}
        />
      </div>

      <div className={classNames.proxyContent}>
        <div className={classNames.proxyField}>
          <Field
            label={t(TranslationKey['Proxy servers for parsing'])}
            labelClasses={classNames.label}
            classes={{ root: classNames.textField }}
            placeholder={t(TranslationKey.Link)}
          />
          <Button disabled={disabledAddButton} className={classNames.btnAddProxy} onClick={onClickAddProxyBtn}>
            {t(TranslationKey.Add)}
          </Button>
        </div>

        <div className={classNames.proxyList}>
          {proxyArr.length !== 0 &&
            proxyArr.map((proxy, index) => (
              <div key={index} className={classNames.proxyWrapper}>
                <Typography className={classNames.proxy}>{getShortenStringIfLongerThanCount(proxy, 32)}</Typography>

                <div className={classNames.iconsWrapper}>
                  <CopyValue text={proxy} />
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

        <Button disabled={disabledSubmitProxy} className={classNames.saveProxyButton} onClick={() => onSubmitProxy()}>
          {t(TranslationKey.Save)}
        </Button>
      </div>
    </div>
  )
}
