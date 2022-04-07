import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {DatePicker} from '@components/date-picker'
import {Field} from '@components/field/field'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './add-or-edit-logistic-tariff-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditLogisticTariffForm

export const AddOrEditLogisticTariffForm = observer(({onCloseModal, onCreateSubmit, onEditSubmit, tariffToEdit}) => {
  const classNames = useClassNames()

  const sourceFormFields = {
    name: tariffToEdit?.name || '',
    description: tariffToEdit?.description || '',
    deliveryTimeInDay: tariffToEdit?.deliveryTimeInDay || '',
    minWeightInKg: tariffToEdit?.minWeightInKg || '',
    cls: tariffToEdit?.cls || null,
    etd: tariffToEdit?.etd || null,
    atd: tariffToEdit?.atd || null,
    conditionsByRegion: {
      west: {
        rate: tariffToEdit?.conditionsByRegion.west.rate || '',
      },
      central: {
        rate: tariffToEdit?.conditionsByRegion.central.rate || '',
      },
      east: {
        rate: tariffToEdit?.conditionsByRegion.east.rate || '',
      },
    },
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = (fieldName, direction) => event => {
    const newFormFields = {...formFields}

    if (['cls', 'etd', 'atd'].includes(fieldName)) {
      newFormFields[fieldName] = event
    } else if (['price', 'rate', 'minWeightInKg'].includes(fieldName)) {
      if (!checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)) {
        return
      } else if (['rate'].includes(fieldName)) {
        newFormFields.conditionsByRegion[direction][fieldName] = event.target.value
      } else {
        newFormFields[fieldName] = event.target.value
      }
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  const onSubmit = () => {
    if (tariffToEdit) {
      onEditSubmit(tariffToEdit._id, formFields)
    } else {
      onCreateSubmit(formFields)
    }
  }

  const checkDateByDeadline = date => (date !== null ? date < new Date() : false)

  const disableSubmitBtn =
    JSON.stringify(sourceFormFields) === JSON.stringify(formFields) ||
    formFields.name === '' ||
    formFields.minWeightInKg === '' ||
    formFields.deliveryTimeInDay === '' ||
    formFields.cls === null ||
    formFields.etd === null ||
    formFields.atd === null ||
    formFields.conditionsByRegion.west.rate === '' ||
    formFields.conditionsByRegion.central.rate === '' ||
    formFields.conditionsByRegion.east.rate === '' ||
    checkDateByDeadline(formFields.cls) ||
    checkDateByDeadline(formFields.etd) ||
    checkDateByDeadline(formFields.atd)

  return (
    <div className={classNames.root}>
      <Typography variant="h5">{textConsts.mainTitle}</Typography>

      <div className={classNames.form}>
        <div className={classNames.nameDeliveryWrapper}>
          <Field
            label={textConsts.nameLabel}
            inputProps={{maxLength: 50}}
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.longContainer}
            value={formFields.name}
            placeholder={textConsts.nameHolder}
            onChange={onChangeField('name')}
          />

          <Field
            label={'Срок доставки, дней*'}
            inputProps={{maxLength: 20}}
            labelClasses={classNames.fieldLabel}
            placeholder={textConsts.daysHolder}
            containerClasses={classNames.longContainer}
            value={formFields.deliveryTimeInDay}
            onChange={onChangeField('deliveryTimeInDay')}
          />
        </div>

        <Field
          label={'Минимальный вес, кг*'}
          inputProps={{maxLength: 12}}
          labelClasses={classNames.fieldLabel}
          placeholder={textConsts.weightHolder}
          containerClasses={classNames.longContainer}
          value={formFields.minWeightInKg}
          onChange={onChangeField('minWeightInKg')}
        />

        <Typography variant="h5">{'Rates'}</Typography>

        <div className={classNames.blockWrapper}>
          <div className={classNames.blockItem}>
            <Field
              label={'US West Coast'}
              labelClasses={classNames.fieldLabel}
              value={formFields.conditionsByRegion.west.rate}
              placeholder={textConsts.rateHolder}
              onChange={onChangeField('rate', 'west')}
            />
          </div>

          <div className={classNames.blockItem}>
            <Field
              label={'US Central'}
              labelClasses={classNames.fieldLabel}
              value={formFields.conditionsByRegion.central.rate}
              placeholder={textConsts.rateHolder}
              onChange={onChangeField('rate', 'central')}
            />
          </div>

          <div className={classNames.blockItem}>
            <Field
              label={'US East Coast'}
              labelClasses={classNames.fieldLabel}
              value={formFields.conditionsByRegion.east.rate}
              placeholder={textConsts.rateHolder}
              onChange={onChangeField('rate', 'east')}
            />
          </div>
        </div>

        <Typography variant="h5">{'Shipping date'}</Typography>

        <div className={classNames.blockWrapper}>
          <div className={classNames.blockItem}>
            <Field
              label={'ETD (дата отправки)'}
              labelClasses={classNames.fieldLabel}
              inputComponent={
                <div
                  className={clsx({
                    [classNames.deadlineError]: checkDateByDeadline(formFields.etd),
                  })}
                >
                  <DatePicker value={formFields.etd} onChange={onChangeField('etd')} />

                  {checkDateByDeadline(formFields.etd) && (
                    <p className={classNames.deadlineErrorText}>
                      {'The deadline date cannot be later than the current date'}
                    </p>
                  )}
                </div>
              }
            />
          </div>

          <div className={classNames.blockItem}>
            <Field
              label={'ETA (дата прибытия)'}
              labelClasses={classNames.fieldLabel}
              inputComponent={
                <div
                  className={clsx({
                    [classNames.deadlineError]: checkDateByDeadline(formFields.atd),
                  })}
                >
                  <DatePicker value={formFields.atd} onChange={onChangeField('atd')} />
                  {checkDateByDeadline(formFields.atd) && (
                    <p className={classNames.deadlineErrorText}>
                      {'The deadline date cannot be later than the current date'}
                    </p>
                  )}
                </div>
              }
            />
          </div>

          <div className={classNames.blockItem}>
            <Field
              label={'CLS (дата закрытия партии)'}
              labelClasses={classNames.fieldLabel}
              inputComponent={
                <div
                  className={clsx({
                    [classNames.deadlineError]: checkDateByDeadline(formFields.cls),
                  })}
                >
                  <DatePicker value={formFields.cls} onChange={onChangeField('cls')} />
                  {checkDateByDeadline(formFields.cls) && (
                    <p className={classNames.deadlineErrorText}>
                      {'The deadline date cannot be later than the current date'}
                    </p>
                  )}
                </div>
              }
            />
          </div>
        </div>

        <Field
          multiline
          minRows={4}
          rowsMax={4}
          className={classNames.descriptionField}
          placeholder={textConsts.descriptionHolder}
          label={textConsts.descriptionField}
          value={formFields.description}
          onChange={onChangeField('description')}
        />
      </div>

      <div className={classNames.btnsWrapper}>
        <SuccessButton
          disableElevation
          disabled={disableSubmitBtn}
          color="primary"
          variant="contained"
          onClick={onSubmit}
        >
          {textConsts.saveBtn}
        </SuccessButton>

        <Button
          disableElevation
          className={classNames.button}
          color="primary"
          variant="text"
          onClick={() => onCloseModal()}
        >
          {textConsts.cancelBtn}
        </Button>
      </div>
    </div>
  )
})
