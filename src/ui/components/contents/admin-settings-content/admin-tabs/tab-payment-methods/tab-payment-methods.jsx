import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field/field'
import { UploadIcon } from '@components/shared/svg-icons'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useClassNames } from './tab-payment-methods.style'

import { AdminSettingsPaymentMethodsModel } from './tab-payment-methods.model'

export const TabPaymentMethods = observer(() => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminSettingsPaymentMethodsModel())

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const [isDisableButton, setIsDisableButton] = useState(true)

  useEffect(() => {
    setIsDisableButton(viewModel.isValidUrl && !!viewModel.method.title)
  }, [viewModel.isValidUrl, viewModel.method.title])

  return (
    <>
      {SettingsModel.languageTag && (
        <div className={classNames.wrapper}>
          <p className={classNames.title}>{t(TranslationKey['Adding a payment method'])}</p>

          <div className={classNames.container}>
            <Field
              label={t(TranslationKey['Add a payment method icon']) + '*'}
              labelClasses={classNames.label}
              classes={{ root: classNames.textField }}
              value={viewModel.method.iconImage?.data_url ?? viewModel.method.iconImage}
              placeholder={t(TranslationKey.Link)}
              onChange={viewModel.onChangeIconImage}
            />

            <label htmlFor="image-upload" className={classNames.inputContainer}>
              <input type="file" accept="image/*" className={classNames.input} onChange={viewModel.onImageUpload} />
              <span className={classNames.text}>{t(TranslationKey['Add photo'])}</span>
              <UploadIcon className={classNames.icon} />
            </label>
          </div>

          {viewModel.method.iconImage && (
            <div className={classNames.container}>
              <div className={cx(classNames.containerImage, { [classNames.error]: !viewModel.isValidUrl })}>
                <img src={viewModel.method.iconImage?.data_url ?? viewModel.method.iconImage} alt="payment method" />
                <span className={classNames.paymentMethodLabel}>{viewModel.currentImageName}</span>
                <div className={classNames.actionIconWrapper}>
                  <div className={classNames.actionIcon}>
                    <input
                      type="file"
                      accept="image/*"
                      className={classNames.input}
                      onChange={viewModel.onImageUpload}
                    />
                    <AutorenewIcon fontSize="small" />
                  </div>

                  <HighlightOffIcon fontSize="small" onClick={viewModel.onRemoveImg} />
                </div>
              </div>
            </div>
          )}

          <div className={classNames.container}>
            <Field
              label={t(TranslationKey['Payment method name']) + '*'}
              labelClasses={classNames.label}
              classes={{ root: classNames.textField }}
              value={viewModel.method.title}
              placeholder={t(TranslationKey.Add)}
              onChange={viewModel.onChangeTitle}
            />
          </div>

          <div className={classNames.paymentMethods}>
            {viewModel.paymentMethods.length !== 0 &&
              viewModel.paymentMethods.map(method => (
                <div key={method._id} className={classNames.paymentMethodWrapper}>
                  <div className={classNames.iconContainer}>
                    <img
                      src={getAmazonImageUrl(method.iconImage)}
                      alt={method.title}
                      className={classNames.iconImage}
                    />
                    <Typography className={classNames.paymentMethod}>{method.title}</Typography>
                  </div>

                  <div className={classNames.iconsWrapper}>
                    <CopyValue text={method.title} />

                    <EditOutlinedIcon
                      className={classNames.iconAction}
                      onClick={() => viewModel.onClickEditPaymentMethod(method._id)}
                    />

                    <DeleteOutlineOutlinedIcon
                      className={classNames.iconAction}
                      onClick={() => viewModel.onClickRemovePaymentMethod(method._id)}
                    />
                  </div>
                </div>
              ))}
          </div>

          <Button disabled={!isDisableButton} className={classNames.button} onClick={viewModel.onSubmitPaymentMethod}>
            {t(TranslationKey.Save)}
          </Button>
        </div>
      )}

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={viewModel.onClickToggleInfoModal}
        title={viewModel.infoModalText}
        btnText={t(TranslationKey.Close)}
        onClickBtn={viewModel.onClickToggleInfoModal}
      />

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={viewModel.onClickToggleConfirmModal}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickSuccess}
        onClickCancelBtn={viewModel.onClickToggleConfirmModal}
      />
    </>
  )
})
