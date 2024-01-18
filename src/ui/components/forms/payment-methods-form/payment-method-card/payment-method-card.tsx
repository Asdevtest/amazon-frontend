import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'
import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { Payment } from '@typings/payments'
import { UploadFileType } from '@typings/upload-file'

import { useStyles } from './payment-method-card.style'

interface PaymentMethodCardProps {
  payment: Payment
  setSelectedPayments: (state: (prevState: Payment[]) => Payment[]) => void
  readOnly?: boolean
}

export const PaymentMethodCard: FC<PaymentMethodCardProps> = memo(({ payment, setSelectedPayments, readOnly }) => {
  const { classes: styles, cx } = useStyles()

  const handleFieldChange = (field: string, value: string | UploadFileType[] | boolean) => {
    setSelectedPayments((prevSelectedPayments: Payment[]) => {
      const findPaymentIndex = prevSelectedPayments.findIndex(
        prevSelectedPayment => prevSelectedPayment.paymentMethod?._id === payment.paymentMethod?._id,
      )

      if (findPaymentIndex !== -1) {
        const updatedSelectedPayments = [...prevSelectedPayments]
        updatedSelectedPayments[findPaymentIndex] = {
          ...updatedSelectedPayments[findPaymentIndex],
          [field]: value,
        }

        return updatedSelectedPayments
      }

      return prevSelectedPayments
    })
  }
  const handleChangePaymentDetails = (event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('paymentDetails', event.target.value)
  }
  const handleChangeImagesForLoad = (files: UploadFileType[]) => {
    handleFieldChange('paymentImages', files)
  }
  const handleChangeIsChecked = (event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('isChecked', event.target.checked)
  }

  return (
    <div className={styles.root}>
      <div className={styles.paymentMethodTitleWrapper}>
        <Checkbox disabled={readOnly} checked={payment.isChecked} onChange={handleChangeIsChecked} />
        <img
          src={getAmazonImageUrl(payment.paymentMethod?.iconImage, false)}
          alt={payment.paymentMethod?.title}
          className={styles.paymentMethodIcon}
        />
        <p className={styles.paymentMethodTitle}>{payment.paymentMethod?.title}</p>
      </div>

      <div
        className={cx(styles.cardManageWrapper, {
          [styles.notActiceCard]: !payment.isChecked,
        })}
      >
        <Field
          multiline
          disabled={readOnly}
          minRows={2}
          maxRows={2}
          inputProps={{ maxLength: 250 }}
          inputClasses={styles.commentInput}
          value={payment.paymentDetails}
          labelClasses={cx(styles.paymentMethodTitle, styles.label)}
          label={t(TranslationKey['Payment details'])}
          onChange={handleChangePaymentDetails}
        />

        <div className={styles.imageFileInputWrapper}>
          <UploadFilesInput
            withoutTitle
            fullWidth
            disabled={readOnly}
            dragAndDropBtnHeight={40}
            maxHeight={90}
            imageListWrapperStyles={styles.imageListWrapperStyles}
            filesLength={payment.paymentImages.length}
            сontainerStyles={styles.containerClasses}
            images={payment.paymentImages}
            setImages={handleChangeImagesForLoad}
            maxNumber={50}
          />

          {readOnly && (
            <PhotoAndFilesSlider smallSlider showPreviews withoutMakeMainImage files={payment.paymentImages} />
          )}
        </div>
      </div>
    </div>
  )
})
