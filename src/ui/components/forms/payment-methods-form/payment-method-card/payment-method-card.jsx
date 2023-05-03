/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Checkbox, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {UploadFilesInput} from '@components/upload-files-input'

import {t} from '@utils/translations'

import {useClassNames} from './payment-method-card.style'

export const PaymentMethodCard = props => {
  const {classes: classNames} = useClassNames()

  const {payment, readOnly, onStateChange} = props

  const initialState = {
    paymentDetails: payment?.paymentDetails || '',
    paymentImages: payment?.paymentImages || [],
    paymentMethod: {
      _id: payment?.paymentMethod?._id || '',
      title: payment?.paymentMethod?.title || '',
    },
    photosForLoad: payment.photosForLoad || [],
  }

  const [paymentsFields, setPaymentsFields] = useState(initialState)

  const setFielData = filedName => event => {
    const newPaymentsFieldsState = {...paymentsFields}

    if (filedName.includes(['paymentDetails'])) {
      newPaymentsFieldsState[filedName] = event.target.value
    } else if (filedName.includes(['isCheckedPayment'])) {
      if (newPaymentsFieldsState?.paymentMethod?._id) {
        newPaymentsFieldsState.paymentMethod = {
          _id: '',
          title: '',
        }
      } else {
        newPaymentsFieldsState.paymentMethod = {
          _id: payment?.paymentMethod?._id ? payment?.paymentMethod?._id : payment._id,
          title: payment?.paymentMethod?.title ? payment?.paymentMethod?.title : payment.title,
        }
      }
    } else {
      newPaymentsFieldsState[filedName] = event
    }

    setPaymentsFields(newPaymentsFieldsState)
    onStateChange(newPaymentsFieldsState)
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.paymentMethodTitleWrapper}>
        <Checkbox
          disabled={readOnly}
          color="primary"
          checked={!!paymentsFields?.paymentMethod?._id}
          onClick={setFielData('isCheckedPayment')}
        />
        <Typography className={classNames.paymentMethodTitle}>
          {payment?.paymentMethod?.title || payment?.title}
        </Typography>
      </div>

      <div
        className={cx(classNames.cardManageWrapper, {[classNames.notActiceCard]: !paymentsFields?.paymentMethod?._id})}
      >
        <Field
          multiline
          disabled={readOnly}
          minRows={2}
          maxRows={2}
          inputProps={{maxLength: 250}}
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
            сontainerStyles={classNames.containerClasses}
            imageListWrapperStyles={classNames.imageListWrapperStyles}
            images={paymentsFields.photosForLoad}
            filesLength={paymentsFields?.paymentImages?.length}
            setImages={setFielData('photosForLoad')}
            maxNumber={50}
          />
          {!!paymentsFields?.paymentImages?.length && (
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
