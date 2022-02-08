import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './add-or-edit-shop-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditShopForm

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
      <Typography variant="h5">{textConsts.mainTitle}</Typography>

      <div className={classNames.form}>
        <Field
          multiline
          minRows={4}
          rowsMax={4}
          className={classNames.descriptionField}
          label={textConsts.nameLabel}
          value={formFields.name}
          placeholder={textConsts.nameHolder}
          onChange={onChangeField('name')}
        />

        <Field
          multiline
          minRows={4}
          rowsMax={4}
          className={classNames.descriptionField}
          label={textConsts.dailyLabel}
          placeholder={textConsts.dailyHolder}
          value={formFields.sellerBoardWarehouseReportUrlDaily}
          onChange={onChangeField('sellerBoardWarehouseReportUrlDaily')}
        />

        <Field
          multiline
          minRows={4}
          rowsMax={4}
          className={classNames.descriptionField}
          label={textConsts.monthlyLabel}
          placeholder={textConsts.monthlyHolder}
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
        {textConsts.saveBtn}
      </Button>

      <Button
        disableElevation
        className={classNames.button}
        color="primary"
        variant="contained"
        onClick={() => onCloseModal()}
      >
        {textConsts.cancelBtn}
      </Button>
    </div>
  )
})
