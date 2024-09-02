import { FC, useEffect, useState } from 'react'
import { MdAdd, MdEdit } from 'react-icons/md'

import { Checkbox, MenuItem, Select, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { IPaymentMethod } from '@typings/shared/payment-method'

import { useStyles } from './custom-select-payment-details.style'

interface CustomSelectPaymentDetailsProps {
  orderPayments: IPaymentMethod[]
  allPayments: IPaymentMethod[]
  onlyRead?: boolean
  column?: boolean
  disabled?: boolean
  generalText?: boolean
  cursorPointer?: boolean
  labelClass?: string
  onChangePaymentMethod?: (paymentMethod: IPaymentMethod) => void
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

  const EditIconToRender = () => <MdEdit className={styles.editIcon} />

  const selectContentToRender = (valuesToRender: IPaymentMethod[], isReadOnly: boolean): JSX.Element => {
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
              <MdAdd className={styles.addIcon} />
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
            // @ts-ignore
            renderValue={selected => selectContentToRender(selected, !!onlyRead && onlyRead)}
            className={cx(styles.paymentMethodsField, {
              [styles.grayBorder]: (onlyRead && isEmpty) || onlyRead,
              [styles.cursorPointer]: cursorPointer,
            })}
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
            onClick={onClickButton}
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
                    alt={paymentMethod?.title}
                    className={styles.paymentMethodIcon}
                  />
                  <p className={styles.paymentMethodTitle}>{paymentMethod?.title}</p>
                </MenuItem>
              ))}

            {onlyRead &&
              value?.map((paymentMethod, paymentMethodIndex) => (
                // @ts-ignore
                <MenuItem key={paymentMethodIndex} value={paymentMethod} className={styles.paymentMethod}>
                  <Checkbox disabled color="primary" checked={value?.some(item => item?._id === paymentMethod?._id)} />
                  <img
                    src={getAmazonImageUrl(paymentMethod?.iconImage, false)}
                    alt={paymentMethod?.title}
                    className={styles.paymentMethodIcon}
                  />
                  <p className={styles.paymentMethodTitle}>{paymentMethod.title}</p>
                </MenuItem>
              ))}
          </Select>
        }
      />
    </div>
  )
}
