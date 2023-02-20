/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {NewDatePicker} from '@components/date-picker/date-picker'
import {Field} from '@components/field/field'
import {Text} from '@components/text'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'

import {roundHalf} from '@utils/calculation'
import {
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot,
} from '@utils/checks'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './add-or-edit-logistic-tariff-form.style'

export const AddOrEditLogisticTariffForm = observer(
  ({onCloseModal, onCreateSubmit, onEditSubmit, tariffToEdit, sourceYuanToDollarRate}) => {
    const {classes: classNames} = useClassNames()

    const rateSettings = {
      IN_DOLLAR: 'IN_DOLLAR',
      IN_YAN: 'IN_YAN',
    }
    const [currencyType, setCurrencyType] = useState(rateSettings.IN_YAN)

    const [submitIsClicked, setSubmitIsClicked] = useState(false)

    const handleChange = (event, newAlignment) => {
      setCurrencyType(newAlignment)
    }

    const regExp = /^[0-9]*[.,][0-9][1-9]+$/

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
        newFormFields.conditionsByRegion.west.rate = toFixed(
          roundHalf(
            Math.round(formFields.conditionsByRegion.west.rate * formFields.conditionsByRegion.yuanToDollarRate * 100) /
              100,
          ),
          2,
        )

        newFormFields.conditionsByRegion.central.rate = toFixed(
          roundHalf(
            Math.round(
              formFields.conditionsByRegion.central.rate * formFields.conditionsByRegion.yuanToDollarRate * 100,
            ) / 100,
          ),
          2,
        )
        newFormFields.conditionsByRegion.east.rate = toFixed(
          roundHalf(
            Math.round(formFields.conditionsByRegion.east.rate * formFields.conditionsByRegion.yuanToDollarRate * 100) /
              100,
          ),
          2,
        )
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
      Number(formFields.minWeightInKg) <= 0 ||
      toString(formFields.minWeightInKg).match(regExp) ||
      formFields.deliveryTimeInDay === '' ||
      formFields.deliveryTimeInDay === '0' ||
      formFields.cls === null ||
      formFields.etd === null ||
      formFields.eta === null ||
      formFields.cls.toString() === 'Invalid Date' ||
      formFields.etd.toString() === 'Invalid Date' ||
      formFields.eta.toString() === 'Invalid Date' ||
      formFields.conditionsByRegion.west.rate === '' ||
      formFields.conditionsByRegion.central.rate === '' ||
      formFields.conditionsByRegion.east.rate === '' ||
      formFields.conditionsByRegion.west.rate === '0' ||
      formFields.conditionsByRegion.central.rate === '0' ||
      formFields.conditionsByRegion.east.rate === '0' ||
      formFields.description.length > 255 ||
      checkDateByDeadline(formFields.cls) ||
      checkDateByDeadline(formFields.etd) ||
      checkDateByDeadline(formFields.eta) ||
      submitIsClicked

    return (
      <div className={classNames.root}>
        <Typography variant="h5" className={classNames.modalTitle}>
          {t(TranslationKey['Adding tariff'])}
        </Typography>

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
              error={Number(formFields.deliveryTimeInDay) <= 0}
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
            <div className={classNames.costSubBlock}>
              <div className={classNames.ratesTitleWrapper}>
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
              </div>

              <div className={classNames.courseWrapper}>
                <Field
                  oneLine
                  disabled
                  label={t(TranslationKey['Current exchange rate'])}
                  tooltipInfoContent={t(TranslationKey['Course indicated by the system'])}
                  containerClasses={classNames.rateContainer}
                  labelClasses={cx(classNames.rateLabel, classNames.rightMargin)}
                  inputClasses={classNames.middleInput}
                  value={sourceYuanToDollarRate}
                />

                <Field
                  oneLine
                  label={t(TranslationKey['Yuan to USD exchange rate'])}
                  inputProps={{maxLength: 8}}
                  tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
                  containerClasses={classNames.rateContainer}
                  labelClasses={cx(classNames.rateLabel, classNames.rightMargin)}
                  inputClasses={classNames.middleInput}
                  value={formFields.conditionsByRegion.yuanToDollarRate}
                  onChange={onChangeField('yuanToDollarRate')}
                />
              </div>
            </div>

            <div className={classNames.blockWrapper}>
              <div className={classNames.blockItem}>
                <Field
                  label={`US West Coast ${currencyType === rateSettings.IN_DOLLAR ? '$' : '¥'}`}
                  error={Number(formFields.conditionsByRegion.west.rate) <= 0}
                  inputProps={{maxLength: 10}}
                  labelClasses={classNames.fieldLabel}
                  value={formFields.conditionsByRegion.west.rate}
                  onChange={e => {
                    if (
                      checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) &&
                      Number(e.target.value) < 10000
                    ) {
                      onChangeField('rate', 'west')(e)
                    }
                  }}
                />
              </div>

              <div className={classNames.blockItem}>
                <Field
                  label={`US Central ${currencyType === rateSettings.IN_DOLLAR ? '$' : '¥'}`}
                  error={Number(formFields.conditionsByRegion.central.rate) <= 0}
                  inputProps={{maxLength: 10}}
                  labelClasses={classNames.fieldLabel}
                  value={formFields.conditionsByRegion.central.rate}
                  onChange={e => {
                    if (
                      checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) &&
                      Number(e.target.value) < 10000
                    ) {
                      onChangeField('rate', 'central')(e)
                    }
                  }}
                />
              </div>

              <div className={classNames.blockItem}>
                <Field
                  label={`US East Coast ${currencyType === rateSettings.IN_DOLLAR ? '$' : '¥'}`}
                  error={Number(formFields.conditionsByRegion.east.rate) <= 0}
                  inputProps={{maxLength: 10}}
                  labelClasses={classNames.fieldLabel}
                  value={formFields.conditionsByRegion.east.rate}
                  onChange={e => {
                    if (
                      checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) &&
                      Number(e.target.value) < 10000
                    ) {
                      onChangeField('rate', 'east')(e)
                    }
                  }}
                />
              </div>
            </div>

            <Typography variant="h5" className={classNames.modalSubTitle}>
              {t(TranslationKey['Shipping dates'])}
            </Typography>

            <div className={classNames.blockWrapper}>
              <div className={classNames.blockItem}>
                <Field
                  label={t(TranslationKey['CLS (batch closing date)'])}
                  labelClasses={classNames.fieldLabel}
                  containerClasses={classNames.blockItemContainer}
                  inputComponent={
                    <div
                      className={cx({
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
                  containerClasses={classNames.blockItemContainer}
                  inputComponent={
                    <div
                      className={cx({
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
                  containerClasses={classNames.blockItemContainer}
                  inputComponent={
                    <div
                      className={cx({
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
                maxRows={4}
                labelClasses={classNames.fieldLabel}
                inputProps={{maxLength: 320}}
                className={classNames.descriptionField}
                tooltipInfoContent={t(TranslationKey['Additional information about the rate'])}
                placeholder={t(TranslationKey.Description)}
                label={t(TranslationKey.Description)}
                value={formFields.description}
                onChange={onChangeField('description')}
              />
              <span
                className={cx(classNames.standartText, {[classNames.error]: formFields.description.length > 255})}
              >{`${formFields.description.length} ${t(TranslationKey.of)} 255 ${t(TranslationKey.characters)}`}</span>
            </div>
          </div>

          <div className={classNames.btnsWrapper}>
            <Button success disabled={disableSubmitBtn} className={classNames.button} onClick={onSubmit}>
              {t(TranslationKey.Save)}
            </Button>

            <Button
              className={cx(classNames.button, classNames.cancelBtn)}
              variant="text"
              onClick={() => onCloseModal()}
            >
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      </div>
    )
  },
)
