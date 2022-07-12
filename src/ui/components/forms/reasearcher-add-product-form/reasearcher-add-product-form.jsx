import React from 'react'

import {Box, NativeSelect} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {
  mapProductStrategyStatusEnum,
  mapProductStrategyStatusEnumToKey,
  ProductStrategyStatus,
} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {t} from '@utils/translations'
import {errorMessagesTranslate} from '@utils/validation'

import {styles} from './reasearcher-add-product-form.style'

export const ResearcherAddProductFormRaw = observer(
  ({
    formFields,
    onChangeFormFields,
    onClickCheckBtn,
    onClickAddBtn,
    classes: classNames,
    errorMsg,
    chekedCode,
    actionStatus,
  }) => {
    const disabledNoProvatLabel =
      Number(formFields.strategyStatus) !== mapProductStrategyStatusEnumToKey[ProductStrategyStatus.PRIVATE_LABEL]

    return (
      SettingsModel.languageTag && (
        <div className={classNames.mainWrapper}>
          <div className={classNames.leftBlockWrapper}>
            <div>
              <Field
                tooltipInfoContent={t(TranslationKey['Copy and paste the link to the product from Amazon'])}
                label={t(TranslationKey['Amazon product link'])}
                value={formFields.amazonLink}
                onChange={onChangeFormFields('amazonLink')}
              />
              <Field
                tooltipInfoContent={t(TranslationKey['Amazon ID number'])}
                inputProps={{maxLength: 50}}
                label={t(TranslationKey['Product code'])}
                value={formFields.productCode.toUpperCase()}
                onChange={onChangeFormFields('productCode')}
              />
            </div>
            {errorMsg ? (
              <Alert className={classNames.alert} elevation={0} severity="error">
                {errorMessagesTranslate(errorMsg)}
              </Alert>
            ) : undefined}
            {!errorMsg && actionStatus === loadingStatuses.success ? (
              <Alert className={classNames.alert} elevation={0} severity="success">
                {t(TranslationKey['Operation complete'])}
              </Alert>
            ) : undefined}

            <Box mt={3} className={classNames.strategyWrapper}>
              <Field
                tooltipInfoContent={t(TranslationKey['Choose a strategy for your future product card'])}
                label={t(TranslationKey['Product Strategy'])}
                inputComponent={
                  <NativeSelect
                    disabled={chekedCode === '' || errorMsg}
                    value={formFields.strategyStatus}
                    className={classNames.nativeSelect}
                    input={<Input />}
                    onChange={onChangeFormFields('strategyStatus')}
                  >
                    {Object.keys(mapProductStrategyStatusEnum).map((statusCode, statusIndex) => (
                      <option key={statusIndex} value={statusCode}>
                        {mapProductStrategyStatusEnum[statusCode]}
                      </option>
                    ))}
                  </NativeSelect>
                }
              />
            </Box>

            <Box className={classNames.btnsWrapper}>
              <Button
                tooltipInfoContent={t(
                  TranslationKey['Checking Amazon ID number for uniqueness and absence in the database'],
                )}
                className={classNames.button}
                onClick={onClickCheckBtn}
              >
                {t(TranslationKey.Check)}
              </Button>
              <Button
                tooltipInfoContent={t(TranslationKey['Create a product card based on an Amazon ID number'])}
                disabled={chekedCode === '' || errorMsg || formFields.strategyStatus < 10}
                className={classNames.addBtn}
                onClick={onClickAddBtn}
              >
                {t(TranslationKey['Add a product card'])}
              </Button>
            </Box>
          </div>

          <div className={classNames.rightBlockWrapper}>
            <div className={classNames.fieldsWrapper}>
              <Field
                disabled={disabledNoProvatLabel}
                inputProps={{maxLength: 255}}
                label={t(TranslationKey.Niche)}
                value={formFields.niche}
                onChange={onChangeFormFields('niche')}
              />
              <Field
                disabled={disabledNoProvatLabel}
                inputProps={{maxLength: 255}}
                label={'Asins'}
                value={formFields.asins}
                onChange={onChangeFormFields('asins')}
              />

              <div className={classNames.fieldsSubWrapper}>
                <Field
                  disabled={disabledNoProvatLabel}
                  inputProps={{maxLength: 10}}
                  containerClasses={classNames.shortInput}
                  label={t(TranslationKey['Average revenue'])}
                  value={formFields.avgRevenue}
                  onChange={onChangeFormFields('avgRevenue')}
                />
                <Field
                  disabled={disabledNoProvatLabel}
                  containerClasses={classNames.shortInput}
                  inputProps={{maxLength: 10}}
                  label={t(TranslationKey['Average BSR'])}
                  value={formFields.avgBSR}
                  onChange={onChangeFormFields('avgBSR')}
                />
              </div>
            </div>

            <div className={classNames.fieldsWrapper}>
              <Field
                disabled={disabledNoProvatLabel}
                inputProps={{maxLength: 10}}
                label={t(TranslationKey['Total Revenue'])}
                value={formFields.totalRevenue}
                onChange={onChangeFormFields('totalRevenue')}
              />
              <Field
                disabled={disabledNoProvatLabel}
                inputProps={{maxLength: 10}}
                label={t(TranslationKey.Coefficient)}
                value={formFields.coefficient}
                onChange={onChangeFormFields('coefficient')}
              />

              <div className={classNames.fieldsSubWrapper}>
                <Field
                  disabled={disabledNoProvatLabel}
                  inputProps={{maxLength: 10}}
                  containerClasses={classNames.shortInput}
                  label={t(TranslationKey['Average Price'])}
                  value={formFields.avgPrice}
                  onChange={onChangeFormFields('avgPrice')}
                />
                <Field
                  disabled={disabledNoProvatLabel}
                  containerClasses={classNames.shortInput}
                  inputProps={{maxLength: 10}}
                  label={t(TranslationKey['Average Review'])}
                  value={formFields.avgReviews}
                  onChange={onChangeFormFields('avgReviews')}
                />
              </div>
            </div>
          </div>
        </div>
      )
    )
  },
)

export const ResearcherAddProductForm = withStyles(styles)(ResearcherAddProductFormRaw)
