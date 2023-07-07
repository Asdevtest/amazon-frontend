import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useState, useEffect } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { IconButton, Typography } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Field } from '@components/shared/field/field'
import { UploadIcon } from '@components/shared/svg-icons'
import { WarningInfoModal } from '@components/modals/warning-info-modal'

import { t } from '@utils/translations'
import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { AdminSettingsPaymentMethodsModel } from './tab-payment-methods.model'

import { useClassNames } from './tab-payment-methods.style'

export const TabPaymentMethods = observer(() => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminSettingsPaymentMethodsModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const [method, setMethod] = useState({ title: '', iconImage: '' })
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [currentImageName, setCurrentImageName] = useState('true')

  useEffect(() => {
    if (viewModel.paymentMethods.length > 0) {
      setPaymentMethods(viewModel.paymentMethods)
    }
  }, [viewModel.paymentMethods])

  const checkIsValidImageUrl = imageUrl => {
    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      setIsValidUrl(true)
    }

    img.onerror = () => {
      setIsValidUrl(false)
    }
  }

  const handleSubmitPaymentMethod = async () => {
    const result =
      typeof method.iconImage === 'string'
        ? await uploadFileByUrl(method.iconImage)
        : await onPostImage(method.iconImage)

    const updatedMethod = { ...method, iconImage: result }

    await viewModel.createPaymentMethod(updatedMethod)

    setMethod({ title: '', iconImage: '' })
  }

  const handleChangeTitle = event => {
    setMethod(state => ({
      ...state,
      title: event.target.value,
    }))
  }

  const handleChangeIconImage = event => {
    checkIsValidImageUrl(event.target.value)

    setCurrentImageName(method.title)

    setMethod(state => ({
      ...state,
      iconImage: event.target.value,
    }))
  }

  const handleRemoveImg = () => {
    setMethod(state => ({
      ...state,
      iconImage: '',
    }))
  }

  const handleImageUpload = event => {
    const file = event.target.files?.[0]
    const reader = new FileReader()

    if (file) {
      reader.onload = e => {
        setCurrentImageName(file.name)

        checkIsValidImageUrl(e.target.result)

        setMethod(state => ({
          ...state,
          iconImage: {
            data_url: e.target.result,
            file,
          },
        }))
      }

      reader.readAsDataURL(file)
    }
  }

  console.log(isValidUrl, !!method.title)

  const isDisableButton = isValidUrl && !!method.title

  return (
    <>
      <div className={classNames.wrapper}>
        <p className={classNames.title}>{t(TranslationKey['Adding a payment method'])}</p>

        <div className={classNames.container}>
          <Field
            label={t(TranslationKey['Add a payment method icon']) + '*'}
            labelClasses={classNames.label}
            classes={{ root: classNames.textField }}
            value={method.iconImage?.data_url ?? method.iconImage}
            placeholder={t(TranslationKey.Link)}
            onChange={handleChangeIconImage}
          />

          <label htmlFor="image-upload" className={classNames.inputContainer}>
            <input type="file" accept="image/*" className={classNames.input} onChange={handleImageUpload} />
            <span className={classNames.text}>{t(TranslationKey['Add photo'])}</span>
            <UploadIcon className={classNames.icon} />
          </label>
        </div>

        {method.iconImage && (
          <div className={classNames.container}>
            <div className={cx(classNames.containerImage, { [classNames.error]: !isValidUrl })}>
              <img src={method.iconImage?.data_url ?? method.iconImage} alt="payment method" />
              <span className={classNames.paymentMethodLabel}>{currentImageName}</span>
              <div className={classNames.actionIconWrapper}>
                <div className={classNames.actionIcon}>
                  <input type="file" accept="image/*" className={classNames.input} onChange={handleImageUpload} />
                  <AutorenewIcon fontSize="small" />
                </div>

                <HighlightOffIcon fontSize="small" onClick={handleRemoveImg} />
              </div>
            </div>
          </div>
        )}

        <Field
          label={t(TranslationKey['Payment method name']) + '*'}
          labelClasses={classNames.label}
          classes={{ root: classNames.textField }}
          value={method.title}
          placeholder={t(TranslationKey.Add)}
          onChange={handleChangeTitle}
        />

        <div className={classNames.paymentMethods}>
          {paymentMethods.length !== 0 &&
            paymentMethods.map(method => (
              <div key={method._id} className={classNames.paymentMethodWrapper}>
                <div className={classNames.iconContainer}>
                  <img src={method.iconImage} alt={method.title} className={classNames.iconImage} />

                  <Typography className={classNames.paymentMethod}>{method.title}</Typography>
                </div>

                <div className={classNames.iconsWrapper}>
                  <CopyValue text={method} />
                  <IconButton
                    size="small"
                    classes={{ root: classNames.iconDelete }}
                    onClick={() => viewModel.onClickRemovePaymentMethod(method._id)}
                  >
                    <DeleteOutlineOutlinedIcon className={classNames.deleteIcon} />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>

        <Button disabled={!isDisableButton} className={classNames.button} onClick={() => handleSubmitPaymentMethod()}>
          {t(TranslationKey.Save)}
        </Button>
      </div>

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={viewModel.onClickToggleInfoModal}
        title={viewModel.infoModalText}
        btnText={t(TranslationKey.Close)}
        onClickBtn={viewModel.onClickToggleInfoModal}
      />

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings.isWarning}
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
