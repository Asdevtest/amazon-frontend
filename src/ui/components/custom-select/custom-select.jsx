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

import {useClassNames} from './custom-select.style'

export const CustomSelectPay = props => {
  const {classes: classNames} = useClassNames()
  const {tmpSupplier, paymentMethods, onlyRead, onChangePaymentMethod} = props

  const [isEmpty, setIsEmpty] = useState(true)

  const EditIconToRender = () => <EditIcon className={classNames.editIcon} />

  const selectContentToRender = (valuesToRender, onlyRead) => {
    if (valuesToRender && valuesToRender.length) {
      setIsEmpty(false)

      return (
        <div className={classNames.paymentMethodsPlaccholder}>
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
    <div className={classNames.root}>
      <Field
        label={t(TranslationKey['Payment methods']) + ':'}
        labelClasses={classNames.paymentMethodsLabel}
        // tooltipInfoContent={t(TranslationKey['Current request type'])}
        containerClasses={classNames.paymentMethodsContainer}
        inputComponent={
          <Select
            multiple
            displayEmpty
            disabled={onlyRead && isEmpty}
            value={tmpSupplier?.paymentMethods}
            IconComponent={!isEmpty ? EditIconToRender : ''}
            classes={{
              root: classNames.selectRoot,
              select: cx(classNames.select, {[classNames.selectIsNotEmpty]: !isEmpty}),
            }}
            renderValue={selected => selectContentToRender(selected, onlyRead)}
            className={cx(classNames.paymentMethodsField, {[classNames.grayBorder]: onlyRead && isEmpty})}
            input={<Input /* startAdornment={<InputAdornment position="start" />} */ />}
            onChange={event => {
              if (!onlyRead) {
                onChangePaymentMethod(event.target.value)
              }
            }}
          >
            {!onlyRead && (
              <MenuItem onClick={() => onChangePaymentMethod(paymentMethods, true)}>
                <Checkbox color="primary" checked={tmpSupplier?.paymentMethods?.length === paymentMethods?.length} />
                <Typography className={classNames.standartText}>{t(TranslationKey.All)}</Typography>
              </MenuItem>
            )}

            {!onlyRead &&
              paymentMethods?.map((paymentMethod, paymentMethodIndex) => (
                <MenuItem key={paymentMethodIndex} value={paymentMethod}>
                  <Checkbox
                    color="primary"
                    checked={tmpSupplier?.paymentMethods?.some(item => item._id === paymentMethod?._id)}
                  />
                  <Typography className={classNames.standartText}>{paymentMethod?.title}</Typography>
                </MenuItem>
              ))}

            {onlyRead &&
              tmpSupplier?.paymentMethods.map((paymentMethod, paymentMethodIndex) => (
                <MenuItem key={paymentMethodIndex} value={paymentMethod}>
                  <Checkbox
                    disabled
                    color="primary"
                    checked={tmpSupplier.paymentMethods.some(item => item._id === paymentMethod._id)}
                  />
                  <Typography className={classNames.standartText}>{paymentMethod.title}</Typography>
                </MenuItem>
              ))}
          </Select>
        }
      />
    </div>
  )
}
