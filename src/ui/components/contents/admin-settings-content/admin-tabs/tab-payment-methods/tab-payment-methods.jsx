import { useState } from 'react'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { IconButton, Typography } from '@mui/material'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { UploadIcon } from '@components/shared/svg-icons'
import { CopyValue } from '@components/shared/copy-value'

import { t } from '@utils/translations'

import { useClassNames } from './tab-payment-methods.style'

export const TabPaymentMethods = ({
  imageUrl,
  imageName,
  onImageUpload,
  onRemoveImage,
  fieldMethod,
  paymentMethods,
  onChangeFieldMethod,
  setPaymentMethods,
  onSubmitPaymentMethod,
}) => {
  const { classes: classNames } = useClassNames()

  const [externalImageUrl, setExternalImageUrl] = useState('')

  const handleChangeExternalImageUrl = event => {
    setExternalImageUrl(event.target.value)
  }

  const onClickDeleteMethod = method => {
    const removeMethod = paymentMethods.filter(m => m !== method)

    setPaymentMethods(removeMethod)
  }

  const externalImageNameArr = externalImageUrl.split('/')
  const currentImageName = imageName ? imageName : externalImageNameArr[externalImageNameArr.length - 1]
  const currentImageUrl = imageUrl ? imageUrl : externalImageUrl
  const handleRemoveImg = () => {
    if (imageUrl) {
      onRemoveImage()
    } else {
      setExternalImageUrl('')
    }
  }

  return (
    <div className={classNames.wrapper}>
      <p className={classNames.title}>{t(TranslationKey['Adding a payment method'])}</p>

      <div className={classNames.container}>
        <Field
          disabled={imageUrl}
          label={t(TranslationKey['Add a payment method icon']) + '*'}
          labelClasses={classNames.label}
          classes={{ root: classNames.textField }}
          value={externalImageUrl}
          placeholder={t(TranslationKey.Link)}
          onChange={handleChangeExternalImageUrl}
        />

        <label disabled={externalImageUrl} htmlFor="image-upload" className={classNames.inputContainer}>
          <input type="file" accept="image/*" className={classNames.input} onChange={onImageUpload} />
          <span className={classNames.text}>{t(TranslationKey['Add photo'])}</span>
          <UploadIcon className={classNames.icon} />
        </label>

        <Button disabled className={classNames.buttonAdd}>
          {t(TranslationKey.Load)}
        </Button>
      </div>

      {currentImageUrl && (
        <div className={classNames.container}>
          <div className={classNames.containerImage}>
            <img src={currentImageUrl} alt="payment method" />
            <span className={classNames.paymentMethodLabel}>{currentImageName}</span>
            <div className={classNames.actionIconsWrapper}>
              <div className={classNames.actionIconWrapper}>
                <input type="file" accept="image/*" className={classNames.input} onChange={onImageUpload} />
                <AutorenewIcon fontSize="small" />
              </div>

              <HighlightOffIcon fontSize="small" onClick={handleRemoveImg} />
            </div>
          </div>
        </div>
      )}

      <div className={classNames.container}>
        <Field
          label={t(TranslationKey['Payment method name']) + '*'}
          labelClasses={classNames.label}
          classes={{ root: classNames.textFieldFullWidth }}
          value={fieldMethod}
          placeholder={t(TranslationKey.Add)}
          onChange={onChangeFieldMethod}
        />

        <Button disabled className={classNames.buttonAdd}>
          {t(TranslationKey.Add)}
        </Button>
      </div>

      <div className={classNames.paymentMethods}>
        {paymentMethods?.length !== 0 &&
          paymentMethods?.map((method, index) => (
            <div key={index} className={classNames.paymentMethodWrapper}>
              <Typography className={classNames.paymentMethod}>{method.title}</Typography>

              <div className={classNames.iconsWrapper}>
                <CopyValue text={method} />
                <IconButton size="small" classes={{ root: classNames.iconDelete }}>
                  <DeleteOutlineOutlinedIcon
                    className={classNames.deletePaymentMethod}
                    onClick={() => onClickDeleteMethod(method)}
                  />
                </IconButton>
              </div>
            </div>
          ))}
      </div>

      <Button disabled={!fieldMethod} className={classNames.button} onClick={() => onSubmitPaymentMethod()}>
        {t(TranslationKey.Save)}
      </Button>
    </div>
  )
}
