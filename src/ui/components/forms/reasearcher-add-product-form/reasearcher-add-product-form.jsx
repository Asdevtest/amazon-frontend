/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { Alert, Box, MenuItem, Select, TextareaAutosize, Typography } from '@mui/material'

import {
  ProductStrategyStatus,
  mapProductStrategyStatusEnum,
  mapProductStrategyStatusEnumToKey,
} from '@constants/product/product-strategy-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { t } from '@utils/translations'
import { errorMessagesTranslate } from '@utils/validation'

import { styles } from './reasearcher-add-product-form.style'

export const ResearcherAddProductFormRaw = observer(
  ({
    user,
    formFields,
    onChangeFormFields,
    onClickCheckAndAddProductBtn,
    classes: styles,
    errorMsg,
    reasonErrorMsg,
    chekedCode,
    actionStatus,
  }) => {
    const disabledNoProvatLabel =
      Number(formFields.strategyStatus) !== mapProductStrategyStatusEnumToKey[ProductStrategyStatus.PRIVATE_LABEL]

    return (
      SettingsModel.languageTag && (
        <div className={styles.mainWrapper}>
          <div className={styles.leftBlockWrapper}>
            <div>
              <Field
                tooltipInfoContent={t(TranslationKey['Copy and paste the link to the product from Amazon'])}
                label={t(TranslationKey['Amazon product link'])}
                value={formFields.amazonLink}
                onChange={onChangeFormFields('amazonLink')}
              />
              <Field
                tooltipInfoContent={t(TranslationKey['Amazon ID number'])}
                inputProps={{ maxLength: 50 }}
                label={`${t(TranslationKey['Product code'])}*`}
                value={formFields.productCode}
                onChange={e => {
                  e.target.value = e.target.value.replace(/ /g, '')
                  onChangeFormFields('productCode')(e)
                }}
              />
            </div>

            {errorMsg ? (
              <Alert classes={{ root: styles.alert }} elevation={0} severity="error">
                {errorMessagesTranslate(errorMsg)}
                {reasonErrorMsg ? (
                  <>
                    <Typography className={styles.reasonTitleAlert}>{`${t(TranslationKey.Reason)}:`}</Typography>
                    <TextareaAutosize className={styles.alertMessage} value={errorMessagesTranslate(reasonErrorMsg)} />
                  </>
                ) : null}
              </Alert>
            ) : undefined}
            {!errorMsg && actionStatus === loadingStatuses.SUCCESS ? (
              <Alert className={styles.alert} elevation={5} severity="success">
                {t(TranslationKey['Operation complete'])}
              </Alert>
            ) : undefined}

            <Box mt={3} className={styles.strategyWrapper}>
              <Field
                tooltipInfoContent={t(TranslationKey['Choose a strategy for your future product card'])}
                label={`${t(TranslationKey['Product Strategy'])}*`}
                inputComponent={
                  <Select
                    displayEmpty
                    // disabled={errorMsg}
                    value={formFields.strategyStatus}
                    className={styles.nativeSelect}
                    input={
                      <Input
                        classes={{
                          input: styles.input,
                          disabled: styles.inputDisabled,
                        }}
                      />
                    }
                    onChange={onChangeFormFields('strategyStatus')}
                    // onClick={() => setDisabledAddButton(true)}
                  >
                    <MenuItem value={''} className={styles.selectOption}>
                      {t(TranslationKey['not selected'])}
                    </MenuItem>

                    {Object.keys(mapProductStrategyStatusEnum)
                      .filter(el => user.allowedStrategies.includes(Number(el)))
                      .map((statusCode, statusIndex) => (
                        <MenuItem key={statusIndex} value={statusCode} className={styles.selectOption}>
                          {mapProductStrategyStatusEnum[statusCode]?.replace(/_/g, ' ')}
                        </MenuItem>
                      ))}
                  </Select>
                }
              />
            </Box>

            <Box className={styles.btnsWrapper}>
              <Button
                success
                tooltipInfoContent={t(TranslationKey['Create a product card based on an Amazon ID number'])}
                disabled={errorMsg || formFields.strategyStatus < 10}
                onClick={onClickCheckAndAddProductBtn}
              >
                {t(TranslationKey['Add a product card'])}
              </Button>
            </Box>
          </div>

          {!disabledNoProvatLabel && (
            <div className={styles.rightBlockWrapper}>
              <div>
                <Field
                  disabled={disabledNoProvatLabel}
                  inputProps={{ maxLength: 255 }}
                  label={t(TranslationKey.Niche)}
                  value={formFields.niche}
                  onChange={onChangeFormFields('niche')}
                />
                <Field
                  disabled={disabledNoProvatLabel}
                  inputProps={{ maxLength: 255 }}
                  label={'Asins'}
                  value={formFields.asins}
                  onChange={onChangeFormFields('asins')}
                />

                <div className={styles.fieldsSubWrapper}>
                  <Field
                    disabled={disabledNoProvatLabel}
                    inputProps={{ maxLength: 10 }}
                    containerClasses={styles.shortInput}
                    label={t(TranslationKey['Average revenue'])}
                    value={formFields.avgRevenue}
                    onChange={onChangeFormFields('avgRevenue')}
                  />
                  <Field
                    disabled={disabledNoProvatLabel}
                    containerClasses={styles.shortInput}
                    inputProps={{ maxLength: 10 }}
                    label={t(TranslationKey['Average BSR'])}
                    value={formFields.avgBSR}
                    onChange={onChangeFormFields('avgBSR')}
                  />
                </div>
              </div>

              <div>
                <Field
                  disabled={disabledNoProvatLabel}
                  inputProps={{ maxLength: 10 }}
                  label={t(TranslationKey['Total Revenue'])}
                  value={formFields.totalRevenue}
                  onChange={onChangeFormFields('totalRevenue')}
                />
                <Field
                  disabled={disabledNoProvatLabel}
                  inputProps={{ maxLength: 10 }}
                  label={t(TranslationKey.Coefficient)}
                  value={formFields.coefficient}
                  onChange={onChangeFormFields('coefficient')}
                />

                <div className={styles.fieldsSubWrapper}>
                  <Field
                    disabled={disabledNoProvatLabel}
                    inputProps={{ maxLength: 10 }}
                    containerClasses={styles.shortInput}
                    label={t(TranslationKey['Average Price'])}
                    value={formFields.avgPrice}
                    onChange={onChangeFormFields('avgPrice')}
                  />
                  <Field
                    disabled={disabledNoProvatLabel}
                    containerClasses={styles.shortInput}
                    inputProps={{ maxLength: 10 }}
                    label={t(TranslationKey['Average Review'])}
                    value={formFields.avgReviews}
                    onChange={onChangeFormFields('avgReviews')}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )
    )
  },
)

export const ResearcherAddProductForm = withStyles(ResearcherAddProductFormRaw, styles)
