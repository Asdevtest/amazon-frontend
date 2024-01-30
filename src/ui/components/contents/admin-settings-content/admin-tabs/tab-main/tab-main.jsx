import isEqual from 'lodash.isequal'
import { memo, useEffect, useState } from 'react'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinProxyCheckerForm } from '@components/forms/asin-proxy-checker-form'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './tab-main.style'

import { fieldNameObject } from '../../admin-settings.constants'

export const TabMain = memo(props => {
  const {
    user,
    serverProxy,
    showAsinCheckerModal,
    showInfoModal,
    infoModalText,
    formFields,
    isFormFieldsChanged,
    isEqualServerProxy,
    onClickToggleProxyModal,
    onClickToggleInfoModal,
    onChangeField,
    onSubmit,
  } = props

  const { classes: styles } = useStyles()

  const [updatedProxy, setUpdatedProxy] = useState(serverProxy)

  useEffect(() => {
    if (serverProxy.length > 0) {
      setUpdatedProxy(serverProxy)
    }
  }, [serverProxy])

  const handleDeleteProxy = selectedProxy => {
    const result = updatedProxy?.filter(proxy => proxy !== selectedProxy)

    setUpdatedProxy(result)
  }

  useEffect(() => {
    isEqualServerProxy(updatedProxy)
  }, [updatedProxy])

  const disabledSubmitProxy = isEqual(serverProxy, updatedProxy)
  const disabledSubmitFields =
    (!isFormFieldsChanged ||
      Number(formFields.yuanToDollarRate) === 0 ||
      Number(formFields.volumeWeightCoefficient) === 0) &&
    disabledSubmitProxy

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.textFileds}>
          <Field
            label={t(TranslationKey['Yuan to USD exchange rate']) + ', ¥'}
            labelClasses={styles.label}
            classes={{ root: styles.textField }}
            value={formFields.yuanToDollarRate}
            error={formFields.yuanToDollarRate === ''}
            onChange={e => onChangeField(fieldNameObject.yuanToDollarRate, e)}
          />

          <Field
            label={t(TranslationKey['Divider for calculating volume weight'])}
            labelClasses={styles.label}
            classes={{ root: styles.textField }}
            value={formFields.volumeWeightCoefficient}
            error={formFields.volumeWeightCoefficient === ''}
            onChange={e => onChangeField(fieldNameObject.volumeWeightCoefficient, e)}
          />

          <Field
            disabled
            label={t(TranslationKey['Link for financial transactions'])}
            labelClasses={styles.label}
            classes={{ root: styles.textField }}
          />
        </div>

        <div className={styles.proxyContent}>
          <div className={styles.proxyAdd}>
            <Typography className={styles.label}>{t(TranslationKey['Proxy servers for parsing'])}</Typography>
            <Button className={styles.buttonAdd} onClick={onClickToggleProxyModal}>
              {t(TranslationKey['Add proxy'])}
            </Button>
          </div>

          <div className={styles.proxyList}>
            {updatedProxy?.length !== 0 &&
              updatedProxy?.map((proxy, index) => (
                <div key={index} className={styles.proxyWrapper}>
                  <Typography className={styles.proxy}>{proxy}</Typography>

                  <div className={styles.iconsWrapper}>
                    <CopyValue text={proxy} />
                    <DeleteOutlineOutlinedIcon
                      className={styles.deleteProxy}
                      onClick={() => handleDeleteProxy(proxy)}
                    />
                  </div>
                </div>
              ))}
          </div>

          <Button disabled={disabledSubmitFields} className={styles.buttonSave} onClick={() => onSubmit(updatedProxy)}>
            {t(TranslationKey.Save)}
          </Button>
        </div>
      </div>

      <Modal openModal={showAsinCheckerModal} setOpenModal={onClickToggleProxyModal}>
        <AsinProxyCheckerForm user={user} onSubmit={setUpdatedProxy} onClose={onClickToggleProxyModal} />
      </Modal>

      <WarningInfoModal
        openModal={showInfoModal}
        setOpenModal={onClickToggleInfoModal}
        title={infoModalText}
        btnText={t(TranslationKey.Close)}
        onClickBtn={onClickToggleInfoModal}
      />
    </>
  )
})
