/* eslint-disable no-unused-vars */
import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {DatePicker} from '@components/date-picker'
import {Field} from '@components/field/field'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './add-or-edit-logistic-tariff-form.style'

export const AddOrEditLogisticTariffForm = observer(
  ({onCloseModal, onCreateSubmit, onEditSubmit, tariffToEdit, sourceYuanToDollarRate}) => {
    const classNames = useClassNames()

    const sourceFormFields = {
      yuanToDollarRate: tariffToEdit?.yuanToDollarRate || 1,
      name: tariffToEdit?.name || '',
      description: tariffToEdit?.description || '',
      deliveryTimeInDay: tariffToEdit?.deliveryTimeInDay || '',
      minWeightInKg: tariffToEdit?.minWeightInKg || '',
      cls: tariffToEdit?.cls || null,
      etd: tariffToEdit?.etd || null,
      eta: tariffToEdit?.eta || null,
      conditionsByRegion: {
        west: {
          rate: tariffToEdit
            ? Math.round(tariffToEdit.conditionsByRegion.west.rate * (tariffToEdit?.yuanToDollarRate || 1) * 100) / 100
            : '',
        },
        central: {
          rate: tariffToEdit
            ? Math.round(tariffToEdit.conditionsByRegion.central.rate * (tariffToEdit?.yuanToDollarRate || 1) * 100) /
              100
            : '',
        },
        east: {
          rate: tariffToEdit
            ? Math.round(tariffToEdit.conditionsByRegion.east.rate * (tariffToEdit?.yuanToDollarRate || 1) * 100) / 100
            : '',
        },
      },
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    const onChangeField = (fieldName, direction) => event => {
      const newFormFields = {...formFields}

      if (['cls', 'etd', 'eta'].includes(fieldName)) {
        newFormFields[fieldName] = event
      } else if (['price', 'rate', 'minWeightInKg', 'yuanToDollarRate'].includes(fieldName)) {
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

    const calculateFieldsToSubmit = () => {
      const res = {
        ...formFields,

        conditionsByRegion: {
          west: {
            rate: Math.round((formFields.conditionsByRegion.west.rate / formFields.yuanToDollarRate) * 100) / 100,
          },
          central: {
            rate: Math.round((formFields.conditionsByRegion.central.rate / formFields.yuanToDollarRate) * 100) / 100,
          },
          east: {
            rate: Math.round((formFields.conditionsByRegion.east.rate / formFields.yuanToDollarRate) * 100) / 100,
          },
        },
      }

      return res
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
      formFields.yuanToDollarRate === '' ||
      Number(formFields.yuanToDollarRate) > 0 ||
      formFields.name === '' ||
      formFields.minWeightInKg === '' ||
      formFields.deliveryTimeInDay === '' ||
      formFields.cls === null ||
      formFields.etd === null ||
      formFields.eta === null ||
      formFields.conditionsByRegion.west.rate === '' ||
      formFields.conditionsByRegion.central.rate === '' ||
      formFields.conditionsByRegion.east.rate === '' ||
      checkDateByDeadline(formFields.cls) ||
      checkDateByDeadline(formFields.etd) ||
      checkDateByDeadline(formFields.eta)

    return (
      <div className={classNames.root}>
        <Typography variant="h5">{t(TranslationKey['Adding tariff'])}</Typography>

        <div className={classNames.form}>
          <div className={classNames.nameDeliveryWrapper}>
            <Field
              label={t(TranslationKey.Title) + '*'}
              inputProps={{maxLength: 50}}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.longContainer}
              value={formFields.name}
              placeholder={t(TranslationKey.Title)}
              onChange={onChangeField('name')}
            />

            <Field
              label={t(TranslationKey['Delivery time, days']) + '*'}
              inputProps={{maxLength: 20}}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.longContainer}
              value={formFields.deliveryTimeInDay}
              onChange={onChangeField('deliveryTimeInDay')}
            />
          </div>

          <Field
            label={t(TranslationKey['Min. weight, kg']) + '*'}
            inputProps={{maxLength: 12}}
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.longContainer}
            value={formFields.minWeightInKg}
            onChange={onChangeField('minWeightInKg')}
          />

          <div className={classNames.costBlock}>
            <Typography variant="h5">{t(TranslationKey.Rates) + ' ¥'}</Typography>

            <Field
              oneLine
              disabled
              label={t(TranslationKey['Current exchange rate'])}
              containerClasses={classNames.rateContainer}
              labelClasses={clsx(classNames.rateLabel, classNames.rightMargin)}
              inputClasses={classNames.middleInput}
              value={sourceYuanToDollarRate}
            />

            <Field
              oneLine
              label={t(TranslationKey['Yuan to USD exchange rate'])}
              inputProps={{maxLength: 8}}
              containerClasses={classNames.rateContainer}
              labelClasses={clsx(classNames.rateLabel, classNames.rightMargin)}
              inputClasses={classNames.middleInput}
              value={formFields.yuanToDollarRate}
              onChange={onChangeField('yuanToDollarRate')}
            />
          </div>

          <div className={classNames.blockWrapper}>
            <div className={classNames.blockItem}>
              <Field
                label={'US West Coast'}
                labelClasses={classNames.fieldLabel}
                value={formFields.conditionsByRegion.west.rate}
                onChange={onChangeField('rate', 'west')}
              />

              <Field
                disabled
                labelClasses={classNames.fieldLabel}
                value={
                  Math.round((formFields.conditionsByRegion.west.rate / (formFields.yuanToDollarRate || 1)) * 100) /
                    100 +
                  '$'
                }
              />
            </div>

            <div className={classNames.blockItem}>
              <Field
                label={'US Central'}
                labelClasses={classNames.fieldLabel}
                value={formFields.conditionsByRegion.central.rate}
                onChange={onChangeField('rate', 'central')}
              />

              <Field
                disabled
                labelClasses={classNames.fieldLabel}
                value={
                  Math.round((formFields.conditionsByRegion.central.rate / (formFields.yuanToDollarRate || 1)) * 100) /
                    100 +
                  '$'
                }
              />
            </div>

            <div className={classNames.blockItem}>
              <Field
                label={'US East Coast'}
                labelClasses={classNames.fieldLabel}
                value={formFields.conditionsByRegion.east.rate}
                onChange={onChangeField('rate', 'east')}
              />

              <Field
                disabled
                labelClasses={classNames.fieldLabel}
                value={
                  Math.round((formFields.conditionsByRegion.east.rate / (formFields.yuanToDollarRate || 1)) * 100) /
                    100 +
                  '$'
                }
              />
            </div>
          </div>

          <Typography variant="h5">{t(TranslationKey['Shipping dates'])}</Typography>

          <div className={classNames.blockWrapper}>
            <div className={classNames.blockItem}>
              <Field
                label={t(TranslationKey['ETD (date of shipment)'])}
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
                label={t(TranslationKey['ETA (arrival date)'])}
                labelClasses={classNames.fieldLabel}
                inputComponent={
                  <div
                    className={clsx({
                      [classNames.deadlineError]: checkDateByDeadline(formFields.eta),
                    })}
                  >
                    <DatePicker value={formFields.eta} onChange={onChangeField('eta')} />
                    {checkDateByDeadline(formFields.eta) && (
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
                label={t(TranslationKey['CLS (batch closing date)'])}
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
            placeholder={t(TranslationKey.Description)}
            label={t(TranslationKey.Description)}
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
            {t(TranslationKey.Save)}
          </SuccessButton>

          <Button
            disableElevation
            className={classNames.button}
            color="primary"
            variant="text"
            onClick={() => onCloseModal()}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  },
)
