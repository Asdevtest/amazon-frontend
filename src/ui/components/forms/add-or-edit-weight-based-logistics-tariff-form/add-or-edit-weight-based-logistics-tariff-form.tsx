/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, useState } from 'react'
import { observer } from 'mobx-react'
import { useClassNames } from './add-or-edit-weight-based-logistics-tariff-form.style'
import { Typography } from '@mui/material'
import { t } from '@utils/translations'
import { Input } from '@components/shared/input'
import { TranslationKey } from '@constants/translations/translation-key'
import { Field } from '@components/shared/field'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { checkDateByDeadline } from '@utils/checks'
import { cx } from '@emotion/css'
import { Button } from '@components/shared/buttons/button'

import AddIcon from '@mui/icons-material/Add'

interface AddOrEditWeightBasedLogisticsTariffFormProps {}

export const AddOrEditWeightBasedLogisticsTariffForm: FC<AddOrEditWeightBasedLogisticsTariffFormProps> = observer(
  props => {
    const { classes: classNames } = useClassNames()

    const { tariffToEdit, sourceYuanToDollarRate, logisticsTariffsData, destinationData } = props

    const initialState = {
      name: tariffToEdit?.name || '',
      deliveryTimeInDay: tariffToEdit?.deliveryTimeInDay || '',
      destinationVariations: tariffToEdit?.destinationVariations || '',
    }

    const [formFields, setFormFields] = useState(initialState)

    const onChangeField = (fieldName: string) => (value: string) => {
      const newFormFields = { ...formFields }
      newFormFields[fieldName] = value
      setFormFields(newFormFields)
    }

    const currency = '$'

    return (
      <div className={classNames.root}>
        <Typography className={classNames.modalTitle}>{t(TranslationKey['Adding tariff'])}</Typography>

        <div className={classNames.nameWrapper}>
          <div className={classNames.fieldsWrapper}>
            <Field
              label={t(TranslationKey.Title) + '*'}
              // @ts-ignore
              placeholder={t(TranslationKey['Service name'])}
              value={formFields.name}
              inputProps={{ maxLength: 50 }}
              inputClasses={classNames.fieldInput}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              onChange={onChangeField('name')}
            />

            <Field
              inputClasses={classNames.fieldInput}
              labelClasses={classNames.fieldLabel}
              // @ts-ignore
              inputProps={{ maxLength: 50 }}
              containerClasses={classNames.fieldContainer}
              value={formFields.deliveryTimeInDay}
              placeholder={t(TranslationKey['Amount of days'])}
              label={t(TranslationKey['Delivery time, days']) + '*'}
              onChange={onChangeField('days')}
            />
          </div>

          <div className={classNames.fieldsWrapper}>
            {/* <Field
              inputClasses={classNames.fieldInput}
              labelClasses={classNames.fieldLabel}
              // @ts-ignore
              inputProps={{ maxLength: 50 }}
              containerClasses={classNames.fieldContainer}
              value={formFields.deliveryTimeInDay}
              placeholder={t(TranslationKey['Amount of days'])}
              label={t(TranslationKey['Minimum weight']) + ', ' + t(TranslationKey.kg)}
              onChange={onChangeField('days')}
            /> */}

            <Field
              label={t(TranslationKey['Add data from tariff']) + '*'}
              placeholder={t(TranslationKey.Title)}
              inputClasses={classNames.fieldInput}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              value={formFields.destinationVariations}
              inputComponent={
                /* @ts-ignore */
                <WithSearchSelect
                  grayBorder
                  blackSelectedItem
                  darkIcon
                  chosenItemNoHover
                  data={logisticsTariffsData}
                  width={'100%'}
                  searchFields={['name']}
                  fieldNamesWrapperStyles={classNames.fieldNamesWrapperStyles}
                  buttonStyles={classNames.buttonStyles}
                  fieldNameStyles={classNames.fieldNameStyles}
                  customItemsWrapper={classNames.customItemsWrapper}
                  customSubMainWrapper={classNames.customSubMainWrapper}
                  customSearchInput={classNames.customSearchInput}
                  selectedItemName={t(TranslationKey['Select Tariff'])}
                  // onClickSelect={el => {
                  //   onChangeField('request')('asin')(el.asin)
                  //   onChangeField('request')('productId')(el._id)
                  // }}
                />
              }
              onChange={onChangeField('name')}
            />
          </div>
        </div>

        <div>
          <div className={classNames.rateWrapper}>
            <Typography className={classNames.modalTitle}>{t(TranslationKey.Rates)}</Typography>

            <div className={classNames.customSwitcherWrapper}>
              <CustomSwitcher
                condition={'$'}
                nameFirstArg={' $ '}
                nameSecondArg={' ¥ '}
                firstArgValue={'$'}
                secondArgValue={'¥'}
                // changeConditionHandler={() => {}}
              />
            </div>

            <div className={classNames.currentRateWrapper}>
              <Typography className={classNames.currentRate}>{t(TranslationKey['Current exchange rate'])}</Typography>
              <Typography className={classNames.currentRateText}>{sourceYuanToDollarRate}</Typography>
            </div>

            <Field
              inputClasses={classNames.rateFieldInput}
              labelClasses={classNames.currentRate}
              containerClasses={classNames.rateFieldContainer}
              // @ts-ignore
              inputProps={{ maxLength: 6 }}
              value={formFields.deliveryTimeInDay}
              label={t(TranslationKey['Yuan to USD exchange rate'])}
              onChange={onChangeField('days')}
            />
          </div>

          <div className={classNames.optionsWrapper}>
            <Field
              label={t(TranslationKey.Destination)}
              placeholder={t(TranslationKey.Title)}
              inputClasses={classNames.fieldInput}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.destinationContainer}
              value={formFields.destinationVariations}
              inputComponent={
                /* @ts-ignore */
                <WithSearchSelect
                  grayBorder
                  blackSelectedItem
                  darkIcon
                  chosenItemNoHover
                  data={destinationData}
                  width={'100%'}
                  searchFields={['name']}
                  fieldNamesWrapperStyles={classNames.fieldNamesWrapperStyles}
                  buttonStyles={classNames.buttonStyles}
                  fieldNameStyles={classNames.fieldNameStyles}
                  customItemsWrapper={classNames.customItemsWrapper}
                  customSubMainWrapper={classNames.destinationWrapper}
                  customSearchInput={classNames.destinationSearchInput}
                  selectedItemName={t(TranslationKey.Select)}
                  // onClickSelect={el => {
                  //   onChangeField('request')('asin')(el.asin)
                  //   onChangeField('request')('productId')(el._id)
                  // }}
                />
              }
              onChange={onChangeField('name')}
            />

            <Field
              label={t(TranslationKey['Weight, kg'])}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.weightContainer}
              inputComponent={
                <div className={classNames.weightMainWrapper}>
                  <div className={classNames.weightItemWrapper}>
                    <Typography className={classNames.weightText}>{t(TranslationKey.From)}</Typography>
                    <Input
                      placeholder={'0.00'}
                      inputProps={{ maxLength: 10 }}
                      className={classNames.weightInput}
                      // onChange={onChangeField('asin')}
                    />
                  </div>

                  <div className={classNames.weightItemWrapper}>
                    <Typography className={classNames.weightText}>{t(TranslationKey.To)}</Typography>
                    <Input
                      placeholder={'0.00'}
                      inputProps={{ maxLength: 10 }}
                      className={classNames.weightInput}
                      // onChange={onChangeField('asin')}
                    />
                  </div>
                </div>
              }
            />

            <Field
              label={t(TranslationKey['Price per kg'])}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.regionContainer}
              inputComponent={
                <div className={classNames.regionMainWrapper}>
                  <div className={classNames.regionWrapper}>
                    <Input
                      placeholder={'0.00'}
                      inputProps={{ maxLength: 10 }}
                      className={classNames.regionFieldInput}
                      // onChange={onChangeField('asin')}
                    />
                    <Typography className={classNames.currencyStyle}>{currency}</Typography>
                  </div>

                  <Button className={classNames.plusButton} /* onClick={onTriggerArchive} */>
                    <AddIcon className={classNames.plusIcon} />
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        <div className={classNames.shippingDateWrapper}>
          <Typography className={classNames.modalTitle}>{'Shipping date'}</Typography>

          <div className={classNames.dateBlockWrapper}>
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
        </div>

        <div className={classNames.descriptionFieldWrapper}>
          <Field
            multiline
            minRows={4}
            maxRows={4}
            value={formFields.description}
            label={t(TranslationKey.Description)}
            labelClasses={classNames.fieldLabel}
            classes={{ root: classNames.inputClass }}
            inputProps={{ maxLength: 320, padding: '10px' }}
            className={classNames.descriptionField}
            tooltipInfoContent={t(TranslationKey['Additional information about the rate'])}
            placeholder={t(TranslationKey['Service description'])}
            onChange={onChangeField('description')}
          />
        </div>

        <div className={classNames.btnsWrapper}>
          <Button success /* disabled={disableSubmitBtn} */ className={classNames.button} /* onClick={onSubmit} */>
            {t(TranslationKey.Save)}
          </Button>

          <Button
            className={cx(classNames.button, classNames.cancelBtn)}
            variant="text" /* onClick={() => onCloseModal()} */
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  },
)

{
  /* <div className={classNames.regionsWrapper}>
            <Field
              label={'US West Coast'}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.regionContainer}
              inputComponent={
                <div className={classNames.regionWrapper}>
                  <Input
                    placeholder={'0.00'}
                    inputProps={{ maxLength: 10 }}
                    className={classNames.regionFieldInput}
                    // onChange={onChangeField('asin')}
                  />
                  <Typography className={classNames.currencyStyle}>{currency}</Typography>
                </div>
              }
            />

            <Field
              label={'US Central'}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.regionContainer}
              inputComponent={
                <div className={classNames.regionWrapper}>
                  <Input
                    placeholder={'0.00'}
                    inputProps={{ maxLength: 10 }}
                    className={classNames.regionFieldInput}
                    // onChange={onChangeField('asin')}
                  />
                  <Typography className={classNames.currencyStyle}>{currency}</Typography>
                </div>
              }
            />

            <Field
              label={'US East Coast'}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.regionContainer}
              inputComponent={
                <div className={classNames.regionWrapper}>
                  <Input
                    placeholder={'0.00'}
                    inputProps={{ maxLength: 10 }}
                    className={classNames.regionFieldInput}
                    // onChange={onChangeField('asin')}
                  />
                  <Typography className={classNames.currencyStyle}>{currency}</Typography>
                </div>
              }
            />
          </div> */
}
