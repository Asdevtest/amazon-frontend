/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/prefer-optional-chain */
import {cx} from '@emotion/css'
import {ClassNamesArg} from '@emotion/react'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import {Checkbox, Input, MenuItem, Select, Typography} from '@mui/material'

import {FC, useEffect, useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field'

import {t} from '@utils/translations'

import {useClassNames} from './custom-select-payment-details.style'

interface PaymentMethodsObject {
  title: string
  _id: string
}

interface CurrentPaymentMethodsObject {
  title: string
  _id: string
  updatedAt: string
}

interface CustomSelectPaymentDetailsProps {
  currentPaymentMethods: Array<CurrentPaymentMethodsObject>
  paymentMethods: Array<PaymentMethodsObject>
  onlyRead?: boolean
  column?: boolean
  disabled?: boolean
  generalText?: boolean
  cursorPointer?: boolean
  labelClass?: ClassNamesArg
  selectWrapper?: ClassNamesArg
  onChangePaymentMethod?: (paymentMethod: PaymentMethodsObject) => void
  onClickButton?: () => void
}

export const CustomSelectPaymentDetails: FC<CustomSelectPaymentDetailsProps> = props => {
  const {classes: classNames} = useClassNames()
  const {
    currentPaymentMethods,
    paymentMethods,
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

  const initValue = currentPaymentMethods.map(item => ({
    title: item?.title,
    _id: item?._id,
  }))

  const [value, setValue] = useState(initValue || [])

  useEffect(() => {
    setValue(initValue)
  }, [currentPaymentMethods])

  const EditIconToRender = () => <EditIcon className={classNames.editIcon} />

  const selectContentToRender = (valuesToRender: Array<PaymentMethodsObject>, isReadOnly: boolean): JSX.Element => {
    if (valuesToRender && valuesToRender.length) {
      setIsEmpty(false)

      return (
        <div className={cx(classNames.paymentMethodsPlaccholder, {[classNames.generalText]: generalText})}>
          <Typography className={classNames.selectedItemText}>
            {valuesToRender?.map(valueToRender => valueToRender?.title).join(' / ')}
          </Typography>
        </div>
      )
    } else {
      setIsEmpty(true)

      return (
        <div className={classNames.paymentMethodsPlaccholder}>
          {!isReadOnly ? (
            <>
              <Typography className={classNames.placeholderText}>{t(TranslationKey.Add)}</Typography>
              <AddIcon className={classNames.addIcon} />
            </>
          ) : (
            <Typography className={classNames.placeholderText}>{t(TranslationKey.Missing)}</Typography>
          )}
        </div>
      )
    }
  }

  return (
    <div className={cx(classNames.root)}>
      <Field
        label={t(TranslationKey['Payment methods']) + ':'}
        labelClasses={cx(classNames.paymentMethodsLabel, labelClass)}
        containerClasses={cx(classNames.paymentMethodsContainer, {
          [classNames.rowPaymentMethodsContainer]: column,
        })}
        inputComponent={
          <div className={cx(selectWrapper)} onClick={onClickButton}>
            <Select
              multiple
              displayEmpty
              disabled={(onlyRead && isEmpty) || disabled || onlyRead}
              value={value} // @ts-ignore
              IconComponent={!isEmpty ? EditIconToRender : ''}
              classes={{
                select: cx(classNames.select, {
                  [classNames.selectIsNotEmpty]: !isEmpty,
                  [classNames.generalText]: generalText,
                  [classNames.cursorPointer]: cursorPointer,
                }),
              }}
              renderValue={selected => selectContentToRender(selected, !!onlyRead && onlyRead)}
              className={cx(classNames.paymentMethodsField, {
                [classNames.grayBorder]: (onlyRead && isEmpty) || onlyRead,
                [classNames.cursorPointer]: cursorPointer,
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
                <MenuItem value={{_id: 'SELECT_ALL'}}>
                  <Checkbox color="primary" checked={value?.length === paymentMethods?.length} />
                  <Typography className={classNames.standartText}>{t(TranslationKey.All)}</Typography>
                </MenuItem>
              )}

              {!onlyRead &&
                paymentMethods?.map((paymentMethod, paymentMethodIndex) => (
                  // @ts-ignore
                  <MenuItem key={paymentMethodIndex} value={paymentMethod}>
                    <Checkbox color="primary" checked={value?.some(item => item?._id === paymentMethod?._id)} />
                    <Typography className={classNames.standartText}>{paymentMethod?.title}</Typography>
                  </MenuItem>
                ))}

              {onlyRead &&
                value?.map((paymentMethod, paymentMethodIndex) => (
                  // @ts-ignore
                  <MenuItem key={paymentMethodIndex} value={paymentMethod}>
                    <Checkbox
                      disabled
                      color="primary"
                      checked={value?.some(item => item?._id === paymentMethod?._id)}
                    />
                    <Typography className={classNames.standartText}>{paymentMethod?.title}</Typography>
                  </MenuItem>
                ))}
            </Select>
          </div>
        }
      />
    </div>
  )
}
