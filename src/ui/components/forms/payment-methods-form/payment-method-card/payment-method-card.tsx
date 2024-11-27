import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { Field } from '@components/shared/field'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { IPayment } from '@typings/shared/payment'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './payment-method-card.style'

interface PaymentMethodCardProps {
  payment: IPayment
  setSelectedPayments: (state: (prevState: IPayment[]) => IPayment[]) => void
  readOnly?: boolean
}

export const PaymentMethod: FC<PaymentMethodCardProps> = memo(({ payment, setSelectedPayments, readOnly }) => {
  const { classes: styles, cx } = useStyles()

  const handleFieldChange = (field: string, value: string | UploadFileType[] | boolean) => {
    setSelectedPayments((prevSelectedPayments: IPayment[]) => {
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
  const handleChangeIsChecked = (event: CheckboxChangeEvent) => {
    handleFieldChange('isChecked', event.target.checked)
  }

  return (
    <div className={styles.root}>
      <div className={styles.paymentMethodTitleWrapper}>
        <CustomCheckbox disabled={readOnly} checked={payment.isChecked} onChange={handleChangeIsChecked} />

        <img
          src={getAmazonImageUrl(payment.paymentMethod?.iconImage, false)}
          alt={payment.paymentMethod?.title}
          className={styles.paymentMethodIcon}
        />
        <p className={styles.paymentMethodTitle}>{payment.paymentMethod?.title}</p>
      </div>

      <div
        className={cx({
          [styles.notActiceCard]: !payment.isChecked,
        })}
      >
        <Field
          multiline
          disabled={readOnly}
          minRows={5}
          maxRows={5}
          inputProps={{ maxLength: 250 }}
          inputClasses={styles.commentInput}
          value={payment.paymentDetails}
          labelClasses={cx(styles.paymentMethodTitle, styles.label)}
          label={t(TranslationKey['Payment details'])}
          onChange={handleChangePaymentDetails}
        />

        <div className={styles.imageFileInputWrapper}>
          {readOnly ? (
            <SlideshowGallery slidesToShow={2} files={payment?.paymentImages || []} />
          ) : (
            <UploadFilesInput
              withoutTitles
              disabled={readOnly}
              dragAndDropButtonHeight={40}
              maxHeight={95}
              images={payment.paymentImages}
              setImages={handleChangeImagesForLoad}
            />
          )}
        </div>
      </div>
    </div>
  )
})
