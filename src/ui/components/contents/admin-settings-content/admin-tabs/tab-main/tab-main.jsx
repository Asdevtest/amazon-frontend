import isEqual from 'lodash.isequal'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { AsinProxyCheckerForm } from '@components/forms/asin-proxy-checker-form'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { fieldNameObject } from '../../admin-settings.constants'

import { useClassNames } from './tab-main.style'

export const TabMain = observer(
  ({
    user,
    serverProxy,
    showAsinCheckerModal,
    showInfoModal,
    infoModalText,
    formFields,
    isFormFieldsChanged,
    onClickToggleProxyModal,
    onClickToggleInfoModal,
    onChangeField,
    onSubmit,
  }) => {
    const { classes: classNames } = useClassNames()

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

    const disabledSubmitProxy = isEqual(serverProxy, updatedProxy)
    const disabledSubmitFields =
      (!isFormFieldsChanged ||
        Number(formFields.yuanToDollarRate) === 0 ||
        Number(formFields.volumeWeightCoefficient) === 0) &&
      disabledSubmitProxy

    return (
      SettingsModel.languageTag && (
        <>
          <div className={classNames.wrapper}>
            <div className={classNames.textFileds}>
              <Field
                label={t(TranslationKey['Yuan to USD exchange rate']) + ', ¥'}
                labelClasses={classNames.label}
                classes={{ root: classNames.textField }}
                value={formFields.yuanToDollarRate}
                error={formFields.yuanToDollarRate === ''}
                onChange={e => onChangeField(fieldNameObject.yuanToDollarRate, e)}
              />

              <Field
                label={t(TranslationKey['Divider for calculating volume weight'])}
                labelClasses={classNames.label}
                classes={{ root: classNames.textField }}
                value={formFields.volumeWeightCoefficient}
                error={formFields.volumeWeightCoefficient === ''}
                onChange={e => onChangeField(fieldNameObject.volumeWeightCoefficient, e)}
              />

              <Field
                disabled
                label={t(TranslationKey['Link for financial transactions'])}
                labelClasses={classNames.label}
                classes={{ root: classNames.textField }}
              />
            </div>

            <div className={classNames.proxyContent}>
              <div className={classNames.proxyAdd}>
                <Typography className={classNames.label}>{t(TranslationKey['Proxy servers for parsing'])}</Typography>
                <Button className={classNames.buttonAdd} onClick={onClickToggleProxyModal}>
                  {t(TranslationKey['Add proxy'])}
                </Button>
              </div>

              <div className={classNames.proxyList}>
                {updatedProxy?.length !== 0 &&
                  updatedProxy?.map((proxy, index) => (
                    <div key={index} className={classNames.proxyWrapper}>
                      <Typography className={classNames.proxy}>{proxy}</Typography>

                      <div className={classNames.iconsWrapper}>
                        <CopyValue text={proxy} />
                        <DeleteOutlineOutlinedIcon
                          className={classNames.deleteProxy}
                          onClick={() => handleDeleteProxy(proxy)}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <Button
                disabled={disabledSubmitFields}
                className={classNames.buttonSave}
                onClick={() => onSubmit(updatedProxy)}
              >
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
    )
  },
)
