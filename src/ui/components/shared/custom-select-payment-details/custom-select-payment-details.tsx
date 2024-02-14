/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ClassNamesArg } from '@emotion/react'
import { FC, useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Checkbox, Input, MenuItem, Select, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { PaymentMethod } from '@typings/payments'

import { useStyles } from './custom-select-payment-details.style'

interface CustomSelectPaymentDetailsProps {
  orderPayments: PaymentMethod[]
  allPayments: PaymentMethod[]
  onlyRead?: boolean
  column?: boolean
  disabled?: boolean
  generalText?: boolean
  cursorPointer?: boolean
  labelClass?: ClassNamesArg
  selectWrapper?: ClassNamesArg
  onChangePaymentMethod?: (paymentMethod: PaymentMethod) => void
  onClickButton?: () => void
}

export const CustomSelectPaymentDetails: FC<CustomSelectPaymentDetailsProps> = props => {
  const { classes: styles, cx } = useStyles()
  const {
    orderPayments,
    allPayments,
    onlyRead,
    column,
    labelClass,
    disabled,
    generalText,
    cursorPointer,
    selectWrapper,
    onChangePaymentMethod,
    onClickButton,
  } = props

  const [isEmpty, setIsEmpty] = useState(true)

  const initValue = orderPayments.map(item => ({
    iconImage: getAmazonImageUrl(item?.iconImage),
    title: item?.title,
    _id: item?._id,
  }))

  const [value, setValue] = useState(initValue || [])

  useEffect(() => {
    setValue(initValue)
  }, [orderPayments])

  const EditIconToRender = () => <EditIcon className={styles.editIcon} />

  const selectContentToRender = (valuesToRender: PaymentMethod[], isReadOnly: boolean): JSX.Element => {
    if (valuesToRender.length) {
      setIsEmpty(false)

      return (
        <div className={cx(styles.paymentMethods, { [styles.generalText]: generalText })}>
          {valuesToRender?.map((valueToRender, index) => (
            <div key={valueToRender.title} className={styles.paymentMethod}>
              <img src={valueToRender.iconImage} alt={valueToRender.title} className={styles.paymentMethodIcon} />
              <p className={styles.paymentMethodTitle}>{valueToRender.title}</p>
              {index !== valuesToRender.length - 1 && '/'}
            </div>
          ))}
        </div>
      )
    } else {
      setIsEmpty(true)

      return (
        <div className={styles.paymentMethodsPlaceholder}>
          {!isReadOnly ? (
            <>
              <Typography className={styles.placeholderText}>{t(TranslationKey.Add)}</Typography>
              <AddIcon className={styles.addIcon} />
            </>
          ) : (
            <Typography className={styles.placeholderText}>{t(TranslationKey.Missing)}</Typography>
          )}
        </div>
      )
    }
  }

  return (
    <div className={styles.root}>
      <Field
        label={t(TranslationKey['Payment methods']) + ':'}
        labelClasses={cx(styles.paymentMethodsLabel, labelClass)}
        containerClasses={cx(styles.paymentMethodsContainer, {
          [styles.rowPaymentMethodsContainer]: column,
        })}
        inputComponent={
          <div className={cx(selectWrapper)} onClick={onClickButton}>
            <Select
              multiple
              displayEmpty
              disabled={(onlyRead && isEmpty) || disabled || onlyRead}
              value={value} // @ts-ignore
              IconComponent={!isEmpty && !onlyRead ? EditIconToRender : ''}
              classes={{
                select: cx(styles.select, {
                  [styles.selectIsNotEmpty]: !isEmpty,
                  [styles.generalText]: generalText,
                  [styles.cursorPointer]: cursorPointer,
                }),
              }}
              renderValue={selected => selectContentToRender(selected, !!onlyRead && onlyRead)}
              className={cx(styles.paymentMethodsField, {
                [styles.grayBorder]: (onlyRead && isEmpty) || onlyRead,
                [styles.cursorPointer]: cursorPointer,
              })}
              input={<Input /* startAdornment={<InputAdornment position="start" />} */ />}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              onChange={event => {
                if (!onlyRead && !disabled) {
                  // @ts-ignore
                  !!onChangePaymentMethod && onChangePaymentMethod(event.target.value)
                }
              }}
            >
              {!onlyRead && ( // @ts-ignore
                <MenuItem value={{ _id: 'SELECT_ALL' }}>
                  <Checkbox color="primary" checked={value?.length === allPayments?.length} />
                  <Typography>{t(TranslationKey.All)}</Typography>
                </MenuItem>
              )}

              {!onlyRead &&
                allPayments?.map((paymentMethod, paymentMethodIndex) => (
                  // @ts-ignore
                  <MenuItem key={paymentMethodIndex} value={paymentMethod} className={styles.paymentMethod}>
                    <Checkbox color="primary" checked={value?.some(item => item?._id === paymentMethod?._id)} />
                    <img
                      src={getAmazonImageUrl(paymentMethod?.iconImage, false)}
                      alt={paymentMethod.title}
                      className={styles.paymentMethodIcon}
                    />
                    <p className={styles.paymentMethodTitle}>{paymentMethod.title}</p>
                  </MenuItem>
                ))}

              {onlyRead &&
                value?.map((paymentMethod, paymentMethodIndex) => (
                  // @ts-ignore
                  <MenuItem key={paymentMethodIndex} value={paymentMethod} className={styles.paymentMethod}>
                    <Checkbox
                      disabled
                      color="primary"
                      checked={value?.some(item => item?._id === paymentMethod?._id)}
                    />
                    <img
                      src={getAmazonImageUrl(paymentMethod?.iconImage, false)}
                      alt={paymentMethod?.title}
                      className={styles.paymentMethodIcon}
                    />
                    <p className={styles.paymentMethodTitle}>{paymentMethod.title}</p>
                  </MenuItem>
                ))}
            </Select>
          </div>
        }
      />
    </div>
  )
}
