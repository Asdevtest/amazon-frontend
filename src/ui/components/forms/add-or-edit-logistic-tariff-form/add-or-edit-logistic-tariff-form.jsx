import React, {useEffect, useState} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {NewDatePicker} from '@components/date-picker/date-picker'
import {Field} from '@components/field/field'
import {Text} from '@components/text'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './add-or-edit-logistic-tariff-form.style'

export const AddOrEditLogisticTariffForm = observer(
  ({onCloseModal, onCreateSubmit, onEditSubmit, tariffToEdit, sourceYuanToDollarRate}) => {
    const classNames = useClassNames()

    const rateSettings = {
      IN_DOLLAR: 'IN_DOLLAR',
      IN_YAN: 'IN_YAN',
    }
    const [currencyType, setCurrencyType] = useState(rateSettings.IN_YAN)

    const [submitIsClicked, setSubmitIsClicked] = useState(false)

    const handleChange = (event, newAlignment) => {
      setCurrencyType(newAlignment)
    }

    const sourceFormFields = {
      name: tariffToEdit?.name || '',
      description: tariffToEdit?.description || '',
      deliveryTimeInDay: tariffToEdit?.deliveryTimeInDay || '',
      minWeightInKg: tariffToEdit?.minWeightInKg || '',
      cls: tariffToEdit?.cls || null,
      etd: tariffToEdit?.etd || null,
      eta: tariffToEdit?.eta || null,
      conditionsByRegion: {
        west: {
          rate: tariffToEdit ? tariffToEdit.conditionsByRegion.west.rate : '',
        },
        central: {
          rate: tariffToEdit ? tariffToEdit.conditionsByRegion.central.rate : '',
        },
        east: {
          rate: tariffToEdit ? tariffToEdit.conditionsByRegion.east.rate : '',
        },
        yuanToDollarRate: tariffToEdit?.conditionsByRegion.yuanToDollarRate || sourceYuanToDollarRate,
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
        } else if (['yuanToDollarRate'].includes(fieldName)) {
          newFormFields.conditionsByRegion[fieldName] = event.target.value
        } else {
          newFormFields[fieldName] = event.target.value
        }
      } else {
        newFormFields[fieldName] = event.target.value
      }

      setFormFields(newFormFields)
    }

    useEffect(() => {
      const newFormFields = {...formFields}

      if (currencyType === rateSettings.IN_YAN) {
        newFormFields.conditionsByRegion.west.rate =
          Math.round(formFields.conditionsByRegion.west.rate * formFields.conditionsByRegion.yuanToDollarRate * 100) /
          100

        newFormFields.conditionsByRegion.central.rate =
          Math.round(
            formFields.conditionsByRegion.central.rate * formFields.conditionsByRegion.yuanToDollarRate * 100,
          ) / 100
        newFormFields.conditionsByRegion.east.rate =
          Math.round(formFields.conditionsByRegion.east.rate * formFields.conditionsByRegion.yuanToDollarRate * 100) /
          100
      } else {
        newFormFields.conditionsByRegion.west.rate =
          Math.round((formFields.conditionsByRegion.west.rate / formFields.conditionsByRegion.yuanToDollarRate) * 100) /
          100

        newFormFields.conditionsByRegion.central.rate =
          Math.round(
            (formFields.conditionsByRegion.central.rate / formFields.conditionsByRegion.yuanToDollarRate) * 100,
          ) / 100
        newFormFields.conditionsByRegion.east.rate =
          Math.round((formFields.conditionsByRegion.east.rate / formFields.conditionsByRegion.yuanToDollarRate) * 100) /
          100
      }

      setFormFields(newFormFields)
    }, [currencyType])

    const calculateFieldsToSubmit = () => {
      const res = {
        ...formFields,

        conditionsByRegion: {
          west: {
            rate:
              currencyType === rateSettings.IN_YAN
                ? Math.round(
                    (formFields.conditionsByRegion.west.rate / formFields.conditionsByRegion.yuanToDollarRate) * 100,
                  ) / 100
                : formFields.conditionsByRegion.west.rate,
          },
          central: {
            rate:
              currencyType === rateSettings.IN_YAN
                ? Math.round(
                    (formFields.conditionsByRegion.central.rate / formFields.conditionsByRegion.yuanToDollarRate) * 100,
                  ) / 100
                : formFields.conditionsByRegion.central.rate,
          },
          east: {
            rate:
              currencyType === rateSettings.IN_YAN
                ? Math.round(
                    (formFields.conditionsByRegion.east.rate / formFields.conditionsByRegion.yuanToDollarRate) * 100,
                  ) / 100
                : formFields.conditionsByRegion.east.rate,
          },
          yuanToDollarRate: formFields.conditionsByRegion.yuanToDollarRate,
        },
      }

      return res
    }
    const onSubmit = () => {
      if (tariffToEdit) {
        onEditSubmit(tariffToEdit._id, calculateFieldsToSubmit())
      } else {
        onCreateSubmit(calculateFieldsToSubmit())
      }

      setSubmitIsClicked(true)
    }

    const checkDateByDeadline = date => (date !== null ? date < new Date() : false)

    const disableSubmitBtn =
      JSON.stringify(sourceFormFields) === JSON.stringify(calculateFieldsToSubmit()) ||
      formFields.conditionsByRegion.yuanToDollarRate === '' ||
      Number(formFields.conditionsByRegion.yuanToDollarRate) <= 0 ||
      formFields.name === '' ||
      formFields.minWeightInKg === '' ||
      formFields.deliveryTimeInDay === '' ||
      formFields.cls === null ||
      formFields.etd === null ||
      formFields.eta === null ||
      formFields.conditionsByRegion.west.rate === '' ||
      formFields.conditionsByRegion.central.rate === '' ||
      formFields.conditionsByRegion.east.rate === '' ||
      formFields.description.length > 255 ||
      checkDateByDeadline(formFields.cls) ||
      checkDateByDeadline(formFields.etd) ||
      checkDateByDeadline(formFields.eta) ||
      submitIsClicked

    return (
      <div className={classNames.root}>
        <Typography variant="h5">{t(TranslationKey['Adding tariff'])}</Typography>

        <div className={classNames.form}>
          <div className={classNames.nameDeliveryWrapper}>
            <Field
              label={t(TranslationKey.Title) + '*'}
              tooltipInfoContent={t(TranslationKey['Rate name'])}
              inputProps={{maxLength: 50}}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.longContainer}
              value={formFields.name}
              placeholder={t(TranslationKey.Title)}
              onChange={onChangeField('name')}
            />

            <Field
              label={t(TranslationKey['Delivery time, days']) + '*'}
              tooltipInfoContent={t(TranslationKey['Approximate delivery time'])}
              inputProps={{maxLength: 20}}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.longContainer}
              value={formFields.deliveryTimeInDay}
              onChange={onChangeField('deliveryTimeInDay')}
            />
          </div>

          <Field
            label={t(TranslationKey['Min. weight, kg']) + '*'}
            tooltipInfoContent={t(TranslationKey['Minimum box weight available for this rate'])}
            inputProps={{maxLength: 12}}
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.longContainer}
            value={formFields.minWeightInKg}
            onChange={onChangeField('minWeightInKg')}
          />

          <div className={classNames.costBlock}>
            <Text
              tooltipInfoContent={t(TranslationKey['Shipping cost per kilogram to the region'])}
              className={classNames.rateTitle}
            >
              {t(TranslationKey.Rates)}
            </Text>

            <ToggleBtnGroup exclusive size="small" color="primary" value={currencyType} onChange={handleChange}>
              <ToggleBtn disabled={currencyType === rateSettings.IN_DOLLAR} value={rateSettings.IN_DOLLAR}>
                {'$'}
              </ToggleBtn>
              <ToggleBtn disabled={currencyType === rateSettings.IN_YAN} value={rateSettings.IN_YAN}>
                {'¥'}
              </ToggleBtn>
            </ToggleBtnGroup>

            <Field
              oneLine
              disabled
              label={t(TranslationKey['Current exchange rate'])}
              tooltipInfoContent={t(TranslationKey['Course indicated by the system'])}
              containerClasses={classNames.rateContainer}
              labelClasses={clsx(classNames.rateLabel, classNames.rightMargin)}
              inputClasses={classNames.middleInput}
              value={sourceYuanToDollarRate}
            />

            <Field
              oneLine
              label={t(TranslationKey['Yuan to USD exchange rate'])}
              inputProps={{maxLength: 8}}
              tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
              containerClasses={classNames.rateContainer}
              labelClasses={clsx(classNames.rateLabel, classNames.rightMargin)}
              inputClasses={classNames.middleInput}
              value={formFields.conditionsByRegion.yuanToDollarRate}
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
            </div>

            <div className={classNames.blockItem}>
              <Field
                label={'US Central'}
                labelClasses={classNames.fieldLabel}
                value={formFields.conditionsByRegion.central.rate}
                onChange={onChangeField('rate', 'central')}
              />
            </div>

            <div className={classNames.blockItem}>
              <Field
                label={'US East Coast'}
                labelClasses={classNames.fieldLabel}
                value={formFields.conditionsByRegion.east.rate}
                onChange={onChangeField('rate', 'east')}
              />
            </div>
          </div>

          <Typography variant="h5">{t(TranslationKey['Shipping dates'])}</Typography>

          <div className={classNames.blockWrapper}>
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
                    <NewDatePicker disablePast value={formFields.cls} onChange={onChangeField('cls')} />
                    {checkDateByDeadline(formFields.cls) && (
                      <p className={classNames.deadlineErrorText}>
                        {t(TranslationKey['Deadline date cannot be earlier than the current date'])}
                      </p>
                    )}
                  </div>
                }
              />
            </div>

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
                    <NewDatePicker disablePast value={formFields.etd} onChange={onChangeField('etd')} />

                    {checkDateByDeadline(formFields.etd) && (
                      <p className={classNames.deadlineErrorText}>
                        {t(TranslationKey['Deadline date cannot be earlier than the current date'])}
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
                    <NewDatePicker disablePast value={formFields.eta} onChange={onChangeField('eta')} />
                    {checkDateByDeadline(formFields.eta) && (
                      <p className={classNames.deadlineErrorText}>
                        {t(TranslationKey['Deadline date cannot be earlier than the current date'])}
                      </p>
                    )}
                  </div>
                }
              />
            </div>
          </div>
          <div className={classNames.descriptionFieldWrapper}>
            <Field
              multiline
              minRows={4}
              rowsMax={4}
              inputProps={{maxLength: 320}}
              className={classNames.descriptionField}
              tooltipInfoContent={t(TranslationKey['Additional information about the rate'])}
              placeholder={t(TranslationKey.Description)}
              label={t(TranslationKey.Description)}
              value={formFields.description}
              onChange={onChangeField('description')}
            />
            <span className={clsx(formFields.description.length > 255 && classNames.error)}>{`${
              formFields.description.length
            } ${t(TranslationKey.of)} 255 ${t(TranslationKey.characters)}`}</span>
          </div>
        </div>

        <div className={classNames.btnsWrapper}>
          <Button
            success
            disableElevation
            disabled={disableSubmitBtn}
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            {t(TranslationKey.Save)}
          </Button>

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
