/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import {Avatar, Checkbox, Input, InputAdornment, MenuItem, Select, Tooltip, Typography} from '@mui/material'

import {FC, useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {NoPhotoIcon} from '@constants/svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {BigObjectImagesModal} from '@components/modals/big-object-images-modal'

import {checkIsImageLink} from '@utils/checks'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {useClassNames} from './custom-select-payment-details.style'

export const CustomSelectPaymentDetails = props => {
  const {classes: classNames} = useClassNames()
  const {
    currentPaymentMethods,
    paymentMethods,
    onlyRead,
    onChangePaymentMethod,
    column,
    labelClass,
    disabled,
    generalText,
    cursorPointer,
    onClickButton,
    selectWrapper,
  } = props

  const [isEmpty, setIsEmpty] = useState(true)

  const [value, setValue] = useState(currentPaymentMethods || [])

  useEffect(() => {
    setValue(currentPaymentMethods)
  }, [currentPaymentMethods])

  const EditIconToRender = () => <EditIcon className={classNames.editIcon} />

  const selectContentToRender = (valuesToRender, onlyRead) => {
    console.log('valuesToRender', valuesToRender)
    if (valuesToRender && valuesToRender.length) {
      setIsEmpty(false)

      return (
        <div className={cx(classNames.paymentMethodsPlaccholder, {[classNames.generalText]: generalText})}>
          <Typography className={classNames.selectedItemText}>
            {valuesToRender?.map(value => value?.title).join(' / ')}
          </Typography>
        </div>
      )
    } else {
      setIsEmpty(true)

      return (
        <div className={classNames.paymentMethodsPlaccholder}>
          {!onlyRead ? (
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
              displayEmpty
              disabled={(onlyRead && isEmpty) || disabled}
              value={value}
              IconComponent={!isEmpty ? EditIconToRender : ''}
              classes={{
                root: classNames.selectRoot,
                select: cx(classNames.select, {
                  [classNames.selectIsNotEmpty]: !isEmpty,
                  [classNames.generalText]: generalText,
                  [classNames.cursorPointer]: cursorPointer,
                }),
              }}
              renderValue={selected => selectContentToRender(selected, onlyRead)}
              className={cx(classNames.paymentMethodsField, {
                [classNames.grayBorder]: onlyRead && isEmpty,
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
                onChangePaymentMethod(event.target.value)
              }}
            >
              {!onlyRead && (
                <MenuItem value={paymentMethods}>
                  <Checkbox color="primary" checked={value?.length === paymentMethods?.length} />
                  <Typography className={classNames.standartText}>{t(TranslationKey.All)}</Typography>
                </MenuItem>
              )}

              {!onlyRead &&
                paymentMethods?.map((paymentMethod, paymentMethodIndex) => (
                  <MenuItem key={paymentMethodIndex} value={paymentMethod}>
                    <Checkbox color="primary" checked={value?.some(item => item?._id === paymentMethod?._id)} />
                    <Typography className={classNames.standartText}>{paymentMethod?.title}</Typography>
                  </MenuItem>
                ))}

              {onlyRead &&
                value?.map((paymentMethod, paymentMethodIndex) => (
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
