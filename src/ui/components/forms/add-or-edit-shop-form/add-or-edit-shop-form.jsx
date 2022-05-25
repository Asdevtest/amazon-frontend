import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './add-or-edit-shop-form.style'

export const AddOrEditShopForm = observer(({onCloseModal, onSubmit, shopToEdit}) => {
  const classNames = useClassNames()

  const sourceFormFields = {
    name: shopToEdit?.name || '',
    sellerBoardWarehouseReportUrlDaily: shopToEdit?.sellerBoardWarehouseReportUrlDaily || '',
    sellerBoardWarehouseReportUrlMonthly: shopToEdit?.sellerBoardWarehouseReportUrlMonthly || '',
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

    newFormFields[fieldName] = event.target.value

    setFormFields(newFormFields)
  }

  const disableSubmitBtn =
    JSON.stringify(sourceFormFields) === JSON.stringify(formFields) ||
    formFields.name === '' ||
    formFields.sellerBoardWarehouseReportUrlDaily === '' ||
    formFields.sellerBoardWarehouseReportUrlMonthly === ''

  return (
    <div className={classNames.root}>
      <Typography variant="h5">{t(TranslationKey['Add shop'])}</Typography>

      <div className={classNames.form}>
        <Field
          multiline
          minRows={4}
          rowsMax={4}
          className={classNames.descriptionField}
          label={t(TranslationKey.Title)}
          value={formFields.name}
          placeholder={t(TranslationKey['Store name'])}
          onChange={onChangeField('name')}
        />

        <Field
          multiline
          minRows={4}
          rowsMax={4}
          className={classNames.descriptionField}
          placeholder={t(TranslationKey['Link to report from the warehouse'])}
          label={t(TranslationKey['Warehouse report'])}
          value={formFields.sellerBoardWarehouseReportUrlDaily}
          onChange={onChangeField('sellerBoardWarehouseReportUrlDaily')}
        />

        <Field
          multiline
          minRows={4}
          rowsMax={4}
          className={classNames.descriptionField}
          label={t(TranslationKey['Dashboard by goods/days'])}
          placeholder={t(TranslationKey['Link to dashboard by item/day'])}
          value={formFields.sellerBoardWarehouseReportUrlMonthly}
          onChange={onChangeField('sellerBoardWarehouseReportUrlMonthly')}
        />
      </div>

      <Button
        disableElevation
        disabled={disableSubmitBtn}
        color="primary"
        variant="contained"
        onClick={() => onSubmit(formFields, shopToEdit && shopToEdit._id)}
      >
        {t(TranslationKey.Save)}
      </Button>

      <Button
        disableElevation
        className={classNames.button}
        color="primary"
        variant="contained"
        onClick={() => onCloseModal()}
      >
        {t(TranslationKey.Cancel)}
      </Button>
    </div>
  )
})
