import { IconButton, Typography } from '@material-ui/core'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { UploadIcon } from '@components/shared/svg-icons'
import { CopyValue } from '@components/shared/copy-value'

import { useAddPaymentMethodIcon } from './use-add-payment-method-icon.ts'

import { useClassNames } from './tab-payment-methods-content.style'

export const TabPaymentMethodsContent = ({ formFields, disabledSubmit, onSubmit, onChangeField }) => {
  const { classes: classNames } = useClassNames()

  const { imageUrl, imageName, onImageUpload, onRemoveImage } = useAddPaymentMethodIcon()

  const paymentMethods = []

  return (
    <div className={classNames.wrapper}>
      <p className={classNames.title}>{t(TranslationKey['Adding a payment method'])}</p>

      <div className={classNames.container}>
        <Field
          label={t(TranslationKey['Add a payment method icon']) + '*'}
          labelClasses={classNames.label}
          classes={{ root: classNames.textField }}
          value={null}
          placeholder={t(TranslationKey.Link)}
          onChange={() => {}}
        />

        <label htmlFor="image-upload" className={classNames.inputContainer}>
          <input type="file" accept="image/*" className={classNames.input} onChange={onImageUpload} />
          <div className={classNames.inputContent}>
            <span className={classNames.text}>{imageUrl ? imageName : t(TranslationKey['Add photo'])}</span>
            {!imageUrl && <UploadIcon className={classNames.icon} />}
          </div>

          {imageUrl && (
            <span className={classNames.deleteImage} onClick={onRemoveImage}>
              &times;
            </span>
          )}
        </label>

        <Button disabled={!imageUrl} className={classNames.buttonAdd} onClick={() => {}}>
          {t(TranslationKey.Load)}
        </Button>
      </div>

      <div className={classNames.container}>
        <Field
          label={t(TranslationKey['Payment method name']) + '*'}
          labelClasses={classNames.label}
          classes={{ root: classNames.textFieldFullWidth }}
          value={null}
          placeholder={t(TranslationKey.Add)}
          onChange={() => {}}
        />

        <Button disabled className={classNames.buttonAdd} onClick={() => {}}>
          {t(TranslationKey.Add)}
        </Button>
      </div>

      <div className={classNames.paymentMethods}>
        {paymentMethods?.length !== 0 &&
          paymentMethods?.map((method, index) => (
            <div key={index} className={classNames.paymentMethodWrapper}>
              <Typography className={classNames.paymentMethod}>{method}</Typography>

              <div className={classNames.iconsWrapper}>
                <CopyValue text={method} />
                <IconButton size="small" classes={{ root: classNames.iconDelete }}>
                  <DeleteOutlineOutlinedIcon className={classNames.deletePaymentMethod} onClick={() => {}} />
                </IconButton>
              </div>
            </div>
          ))}
      </div>

      <Button disabled className={classNames.button} onClick={() => {}}>
        {t(TranslationKey.Save)}
      </Button>
    </div>
  )
}
