/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { ChangeEvent, FC, useEffect, useState } from 'react'

import { Checkbox } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { Payment, Payments } from '@typings/payments'
import { IUploadFile } from '@typings/upload-file'

import { useClassNames } from './payment-method-card.style'

type FieldName = 'paymentDetails' | 'paymentImages' | 'paymentMethod' | 'isCheckedPayment' | 'photosForLoad'

interface PaymentMethodCardProps {
  payment: Payments | Payment
  readOnly?: boolean
  onStateChange?: (newPaymentsFieldsState: Payments) => void
}

export const PaymentMethodCard: FC<PaymentMethodCardProps> = observer(({ payment, readOnly, onStateChange }) => {
  const { classes: classNames, cx } = useClassNames()

  const initialState = {
    paymentDetails: 'paymentDetails' in payment ? payment?.paymentDetails : '',
    paymentImages: 'paymentImages' in payment ? payment?.paymentImages : [],
    paymentMethod: {
      _id:
        'paymentMethod' in payment && '_id' in payment.paymentMethod && payment?.paymentMethod?._id
          ? payment?.paymentMethod?._id
          : '',
      title:
        'paymentMethod' in payment && 'title' in payment.paymentMethod && payment?.paymentMethod?.title
          ? payment?.paymentMethod?.title
          : '',
      iconImage:
        'paymentMethod' in payment && 'iconImage' in payment.paymentMethod && payment?.paymentMethod?.iconImage
          ? payment?.paymentMethod?.iconImage
          : '',
    },
    photosForLoad: 'photosForLoad' in payment ? payment.photosForLoad : [],
  }

  const [paymentsFields, setPaymentsFields] = useState(initialState)

  const setFielData =
    (filedName: FieldName) =>
    (event: string | ChangeEvent<HTMLInputElement>): void => {
      const newPaymentsFieldsState = { ...paymentsFields }

      if (filedName === 'paymentDetails') {
        if (typeof event !== 'string') {
          newPaymentsFieldsState[filedName] = event.target.value
        }
      } else if (filedName === 'isCheckedPayment') {
        if (newPaymentsFieldsState?.paymentMethod?._id) {
          newPaymentsFieldsState.paymentMethod = {
            _id: '',
            title: '',
            iconImage: '',
          }
        } else {
          newPaymentsFieldsState.paymentMethod = {
            _id:
              'paymentMethod' in payment && payment.paymentMethod._id
                ? payment.paymentMethod._id
                : '_id' in payment
                ? payment._id
                : '',
            title:
              'paymentMethod' in payment && payment?.paymentMethod?.title
                ? payment?.paymentMethod?.title
                : 'title' in payment
                ? payment.title
                : '',
            iconImage:
              'paymentMethod' in payment && payment?.paymentMethod?.iconImage
                ? payment?.paymentMethod?.iconImage
                : 'title' in payment
                ? payment.iconImage
                : '',
          }
        }
      } else {
        // @ts-ignore
        newPaymentsFieldsState[filedName] = event
      }

      setPaymentsFields(newPaymentsFieldsState)
      !!onStateChange && onStateChange(newPaymentsFieldsState)
    }

  const handleChangeImagesForLoad = (changedImages: Array<string | IUploadFile>) => {
    setPaymentsFields(state => ({ ...state, paymentImages: changedImages }))
  }

  useEffect(() => {
    !!onStateChange && onStateChange(paymentsFields)
  }, [paymentsFields.paymentImages])

  return (
    <div className={classNames.root}>
      <div className={classNames.paymentMethodTitleWrapper}>
        <Checkbox
          disabled={readOnly}
          color="primary"
          checked={!!paymentsFields?.paymentMethod?._id} // @ts-ignore
          onClick={setFielData('isCheckedPayment')}
        />
        <img
          src={
            'paymentMethod' in payment && payment?.paymentMethod?.iconImage
              ? getAmazonImageUrl(payment?.paymentMethod?.iconImage, false)
              : 'iconImage' in payment
              ? getAmazonImageUrl(payment.iconImage, false)
              : ''
          }
          alt={
            'paymentMethod' in payment && payment?.paymentMethod?.title
              ? payment?.paymentMethod?.title
              : 'title' in payment
              ? payment.title
              : ''
          }
          className={classNames.paymentMethodIcon}
        />
        <p className={classNames.paymentMethodTitle}>
          {/* {payment?.paymentMethod?.title || payment?.title} */}
          {'paymentMethod' in payment && payment?.paymentMethod?.title
            ? payment?.paymentMethod?.title
            : 'title' in payment
            ? payment.title
            : ''}
        </p>
      </div>

      <div
        className={cx(classNames.cardManageWrapper, {
          [classNames.notActiceCard]: !paymentsFields?.paymentMethod?._id,
        })}
      >
        <Field
          // @ts-ignore
          multiline
          disabled={readOnly}
          minRows={2}
          maxRows={2}
          inputProps={{ maxLength: 250 }}
          inputClasses={classNames.commentInput}
          value={paymentsFields.paymentDetails}
          labelClasses={cx(classNames.paymentMethodTitle, classNames.label)}
          label={t(TranslationKey['Payment details'])}
          onChange={setFielData('paymentDetails')}
        />

        <div className={classNames.imageFileInputWrapper}>
          <UploadFilesInput
            withoutTitle
            disabled={readOnly}
            dragAndDropBtnHeight={40}
            maxHeight={90}
            imageListWrapperStyles={classNames.imageListWrapperStyles}
            filesLength={paymentsFields?.paymentImages?.length}
            сontainerStyles={classNames.containerClasses}
            images={paymentsFields.photosForLoad}
            setImages={setFielData('photosForLoad')}
            maxNumber={50}
          />
          {!!paymentsFields?.paymentImages?.length && (
            <PhotoAndFilesSlider
              smallSlider
              showPreviews
              withoutMakeMainImage
              isEditable={!readOnly}
              files={paymentsFields?.paymentImages}
              onChangeImagesForLoad={handleChangeImagesForLoad}
            />
          )}
        </div>
      </div>
    </div>
  )
})
