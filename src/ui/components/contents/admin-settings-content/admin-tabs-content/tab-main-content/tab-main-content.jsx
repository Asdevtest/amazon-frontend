/* eslint-disable no-unused-vars */
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { IconButton, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { useClassNames } from './tab-main-content.style'

export const TabMainContent = ({
  onChangeField,
  onSubmitProxy,
  formFields,
  disabledSubmitProxy,
  setProxyArr,
  proxyArr,
  onClickAddProxyBtn,
  disabledSubmit,
  onSubmit,
}) => {
  const { classes: classNames } = useClassNames()

  const onClickDeleteProxy = proxy => {
    const removeProxy = proxyArr.filter(p => p !== proxy)

    setProxyArr(removeProxy)
  }

  const handleSaveButtonClick = (disabledSubmit, disabledSubmitProxy) => {
    let disabled = true
    let handleClick = null

    if (!disabledSubmit && !disabledSubmitProxy) {
      handleClick = () => {
        onSubmit()
        onSubmitProxy()
      }
      disabled = false
    } else if (!disabledSubmit) {
      handleClick = () => onSubmit()
      disabled = false
    } else if (!disabledSubmitProxy) {
      handleClick = () => onSubmitProxy()
      disabled = false
    }

    return { disabled, handleClick }
  }
  const saveButtonData = handleSaveButtonClick(disabledSubmit, disabledSubmitProxy)

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
        <div className={classNames.proxyAdd}>
          <Typography className={classNames.label}>{t(TranslationKey['Proxy servers for parsing'])}</Typography>
          <Button className={classNames.buttonAdd} onClick={onClickAddProxyBtn}>
            {t(TranslationKey['Add proxy'])}
          </Button>
        </div>

        <div className={classNames.proxyList}>
          {proxyArr?.length !== 0 &&
            proxyArr?.map((proxy, index) => (
              <div key={index} className={classNames.proxyWrapper}>
                <Typography className={classNames.proxy}>{proxy}</Typography>

                <div className={classNames.iconsWrapper}>
                  <CopyValue text={proxy} />
                  <IconButton size="small" classes={{ root: classNames.iconDelete }}>
                    <DeleteOutlineOutlinedIcon
                      className={classNames.deleteProxy}
                      onClick={() => onClickDeleteProxy(proxy)}
                    />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>

        <Button
          disabled={saveButtonData.disabled}
          className={classNames.buttonSave}
          onClick={() => saveButtonData.handleClick()}
        >
          {t(TranslationKey.Save)}
        </Button>
      </div>
    </div>
  )
}
