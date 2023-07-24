/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import React, { ChangeEvent, FC, useState } from 'react'

import { Checkbox, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './payment-method-card.style'

type FieldName = 'paymentDetails' | 'paymentImages' | 'paymentMethod' | 'isCheckedPayment' | 'photosForLoad'

interface PaymentMethod {
  _id: string
  title: string
}

interface Payments {
  paymentDetails: string
  paymentImages: Array<string>
  paymentMethod: PaymentMethod
  photosForLoad: Array<string>
}

interface PaymentMethodCardProps {
  payment: Payments | PaymentMethod
  readOnly?: boolean
  onStateChange?: (newPaymentsFieldsState: Payments) => void
}

export const PaymentMethodCard: FC<PaymentMethodCardProps> = props => {
  const { classes: classNames } = useClassNames()

  const { payment, readOnly, onStateChange } = props

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
          }
        }
      } else {
        // @ts-ignore
        newPaymentsFieldsState[filedName] = event
      }

      setPaymentsFields(newPaymentsFieldsState)
      !!onStateChange && onStateChange(newPaymentsFieldsState)
    }

  return (
    <div className={classNames.root}>
      <div className={classNames.paymentMethodTitleWrapper}>
        <Checkbox
          disabled={readOnly}
          color="primary"
          checked={!!paymentsFields?.paymentMethod?._id} // @ts-ignore
          onClick={setFielData('isCheckedPayment')}
        />
        <Typography className={classNames.paymentMethodTitle}>
          {/* {payment?.paymentMethod?.title || payment?.title} */}
          {'paymentMethod' in payment && payment?.paymentMethod?.title
            ? payment?.paymentMethod?.title
            : 'title' in payment
            ? payment.title
            : ''}
        </Typography>
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
            disabled={readOnly} // @ts-ignore
            dragAndDropBtnHeight={40} // @ts-ignore
            maxHeight={90} // @ts-ignore
            imageListWrapperStyles={classNames.imageListWrapperStyles} // @ts-ignore
            filesLength={paymentsFields?.paymentImages?.length}
            сontainerStyles={classNames.containerClasses}
            images={paymentsFields.photosForLoad}
            setImages={setFielData('photosForLoad')}
            maxNumber={50}
          />
          {!!paymentsFields?.paymentImages?.length && ( // @ts-ignore
            <PhotoAndFilesCarousel
              small
              withoutMakeMainImage
              isEditable={!readOnly}
              width="100%"
              files={paymentsFields?.paymentImages}
              imagesForLoad={paymentsFields?.paymentImages}
              onChangeImagesForLoad={setFielData('paymentImages')}
            />
          )}
        </div>
      </div>
    </div>
  )
}
