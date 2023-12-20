/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, memo, useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { MenuItem, Select } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'
import { Field } from '@components/shared/field'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { Payment } from '@typings/payments'

import { useClassNames } from './custom-select-payment-details.style'

interface CustomSelectPaymentDetailsProps {
  orderPayments: Payment[]
  allPayments: Payment[]
  onlyRead?: boolean
  column?: boolean
  disabled?: boolean
  onChangePaymentMethod?: (paymentMethod: Payment) => void
}

export const CustomSelectPaymentDetails: FC<CustomSelectPaymentDetailsProps> = memo(props => {
  const { orderPayments, allPayments, onlyRead, column, onChangePaymentMethod } = props
  const { classes: classNames, cx } = useClassNames()

  const [selectedPayments, setSelectedPayments] = useState<Payment[]>(allPayments || [])

  useEffect(() => {
    if (orderPayments.length) {
      const updatedPayments = allPayments
        .map(payment => {
          const foundPayment = orderPayments.find(
            orderPayment => orderPayment.paymentMethod._id === payment.paymentMethod._id,
          )

          return foundPayment ? { ...foundPayment, isChecked: true } : payment
        })
        .sort((a, b) => (a.isChecked === b.isChecked ? 0 : a.isChecked ? -1 : 1))

      setSelectedPayments(updatedPayments)
    } else {
      setSelectedPayments(allPayments)
    }
  }, [orderPayments])

  const selectContentToRender = (payments: Payment[], isReadOnly: boolean): JSX.Element => {
    if (payments.length) {
      return (
        <div className={classNames.paymentMethods}>
          {payments?.map((payment, index) => (
            <div key={index} className={classNames.paymentMethod}>
              <img
                src={getAmazonImageUrl(payment.paymentMethod?.iconImage, false)}
                alt={payment.paymentMethod?.title}
                className={classNames.paymentMethodIcon}
              />
              <p className={classNames.paymentMethodTitle}>{payment.paymentMethod?.title}</p>
              {index !== payments.length - 1 && '/'}
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className={classNames.paymentMethodsPlaceholder}>
          {!isReadOnly ? (
            <>
              <p className={classNames.placeholderText}>{t(TranslationKey.Add)}</p>
              <AddIcon className={classNames.addIcon} />
            </>
          ) : (
            <p className={classNames.placeholderText}>{t(TranslationKey.Missing)}</p>
          )}
        </div>
      )
    }
  }

  return (
    <div className={classNames.root}>
      <Field
        label={t(TranslationKey['Payment methods']) + ':'}
        labelClasses={classNames.paymentMethodsLabel}
        containerClasses={cx(classNames.paymentMethodsContainer, {
          [classNames.rowPaymentMethodsContainer]: column,
        })}
        inputComponent={
          <div>
            <Select
              multiple
              displayEmpty
              disabled={onlyRead}
              value={selectedPayments}
              IconComponent={() => (orderPayments.length ? <EditIcon className={classNames.editIcon} /> : <></>)}
              classes={{
                select: classNames.select,
              }}
              renderValue={selected =>
                selectContentToRender(
                  selected.filter(payment => payment.isChecked),
                  !!onlyRead,
                )
              }
              className={classNames.paymentMethodsField}
              onChange={event => {
                if (!onlyRead) {
                  // @ts-ignore
                  !!onChangePaymentMethod && onChangePaymentMethod(event.target.value)
                }
              }}
            >
              <MenuItem className={classNames.paymentMethod}>
                <Checkbox color="primary" checked={selectedPayments.every(payment => payment.isChecked)} />
                <p>{t(TranslationKey.All)}</p>
              </MenuItem>

              {allPayments?.map((payment, index) => (
                // @ts-ignore
                <MenuItem key={index} value={payment} className={classNames.paymentMethod}>
                  <Checkbox
                    color="primary"
                    checked={selectedPayments?.some(item => item.paymentMethod?._id === payment.paymentMethod?._id)}
                  />
                  <img
                    src={getAmazonImageUrl(payment.paymentMethod?.iconImage, false)}
                    alt={payment.paymentMethod?.title}
                    className={classNames.paymentMethodIcon}
                  />
                  <p className={classNames.paymentMethodTitle}>{payment.paymentMethod?.title}</p>
                </MenuItem>
              ))}
            </Select>
          </div>
        }
      />
    </div>
  )
})
