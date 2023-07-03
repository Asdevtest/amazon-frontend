import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import isEqual from 'lodash.isequal'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { IconButton, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinProxyCheckerForm } from '@components/forms/asin-proxy-checker-form'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'

import { t } from '@utils/translations'

import { AdminSettingsMainModel } from './tab-main.model'

import { useClassNames } from './tab-main.style'

export const TabMain = observer(({ formFields, isFormFieldsChanged, onChangeField, onSubmit }) => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminSettingsMainModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const [proxyArr, setProxyArr] = useState([])

  useEffect(() => {
    if (viewModel.serverProxy.length > 0) {
      setProxyArr(viewModel.serverProxy)
    }
  }, [viewModel.serverProxy])

  const handleClickDeleteProxy = selectedProxy => {
    const updatedProxyArr = proxyArr.filter(proxy => proxy !== selectedProxy)

    setProxyArr(updatedProxyArr)
  }

  const disabledSubmitProxy = isEqual(viewModel.serverProxy, proxyArr)
  const disabledSubmitFields =
    !isFormFieldsChanged ||
    Number(formFields.yuanToDollarRate) === 0 ||
    Number(formFields.volumeWeightCoefficient) === 0

  const [disabledSubmit, setDisabledSubmit] = useState(true)

  useEffect(() => {
    if (!disabledSubmitFields || !disabledSubmitProxy) {
      setDisabledSubmit(false)
    } else {
      setDisabledSubmit(true)
    }
  }, [disabledSubmitFields, disabledSubmitProxy])

  const handleSaveButton = (disabledSubmitFields, disabledSubmitProxy) => {
    let handleClick = null

    if (!disabledSubmitFields && !disabledSubmitProxy) {
      handleClick = () => {
        onSubmit()
        viewModel.createProxy(proxyArr)
      }
    } else if (!disabledSubmitFields) {
      handleClick = () => onSubmit()
    } else if (!disabledSubmitProxy) {
      handleClick = () => viewModel.createProxy(proxyArr)
    }

    setDisabledSubmit(true)

    return handleClick()
  }

  return (
    <>
      <div className={classNames.wrapper}>
        <div className={classNames.textFileds}>
          <Field
            label={t(TranslationKey['Yuan to USD exchange rate']) + ', ¥'}
            labelClasses={classNames.label}
            classes={{ root: classNames.textField }}
            value={formFields?.yuanToDollarRate}
            onChange={onChangeField('yuanToDollarRate')}
          />

          <Field
            label={t(TranslationKey['Divider for calculating volume weight'])}
            labelClasses={classNames.label}
            classes={{ root: classNames.textField }}
            value={formFields?.volumeWeightCoefficient}
            onChange={onChangeField('volumeWeightCoefficient')}
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
            <Button className={classNames.buttonAdd} onClick={viewModel.onClickToggleProxyModal}>
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
                    <IconButton
                      size="small"
                      classes={{ root: classNames.iconDelete }}
                      onClick={() => handleClickDeleteProxy(proxy)}
                    >
                      <DeleteOutlineOutlinedIcon className={classNames.deleteProxy} />
                    </IconButton>
                  </div>
                </div>
              ))}
          </div>

          <Button
            disabled={disabledSubmit}
            className={classNames.buttonSave}
            onClick={() => handleSaveButton(disabledSubmitFields, disabledSubmitProxy)}
          >
            {t(TranslationKey.Save)}
          </Button>
        </div>
      </div>

      <Modal openModal={viewModel.showAsinCheckerModal} setOpenModal={viewModel.onClickToggleProxyModal}>
        <AsinProxyCheckerForm
          user={viewModel.user}
          onSubmit={setProxyArr}
          onClose={viewModel.onClickToggleProxyModal}
        />
      </Modal>

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={viewModel.onClickToggleInfoModal}
        title={viewModel.infoModalText}
        btnText={t(TranslationKey.Close)}
        onClickBtn={viewModel.onClickToggleInfoModal}
      />
    </>
  )
})
