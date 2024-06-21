import { useState } from 'react'

import { Checkbox, Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'

import { t } from '@utils/translations'

import { useStyles } from './third-step.style'

export const ThirdStep = ({ formFields, setFormFields, renderBackNextBtns, makeEstimate, setMakeEstimate }) => {
  const { classes: styles, cx } = useStyles()

  const [opportunities, setOpportunities] = useState('')
  const [risks, setRisks] = useState('')
  const [requiredSkills, setrequiredSkills] = useState('')
  const [sellIncludes, setSellIncludes] = useState('')
  const [reasonForSale, setReasonForSale] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')

  const removeAsset = fieldName => index => {
    const newFormFields = { ...formFields }

    newFormFields[fieldName] = formFields[fieldName].filter((asset, i) => i !== index)

    setFormFields(newFormFields)
  }

  const addAsset = fieldName => {
    const newFormFields = { ...formFields }

    switch (fieldName) {
      case 'opportunities':
        newFormFields[fieldName] = [opportunities, ...formFields[fieldName]]
        setOpportunities('')
        break
      case 'risks':
        newFormFields[fieldName] = [risks, ...formFields[fieldName]]
        setRisks('')
        break

      case 'requiredSkills':
        newFormFields[fieldName] = [requiredSkills, ...formFields[fieldName]]
        setrequiredSkills('')
        break
      case 'sellIncludes':
        newFormFields[fieldName] = [sellIncludes, ...formFields[fieldName]]
        setSellIncludes('')
        break
      case 'reasonForSale':
        newFormFields[fieldName] = [reasonForSale, ...formFields[fieldName]]
        setReasonForSale('')
        break
      case 'additionalInfo':
        newFormFields[fieldName] = [additionalInfo, ...formFields[fieldName]]
        setAdditionalInfo('')
        break
    }

    setFormFields(newFormFields)
  }

  return (
    <>
      <div className={styles.infosWrapper}>
        <Field
          multiline
          inputProps={{ maxLength: 100 }}
          labelClasses={styles.spanLabelSmall}
          label={t(TranslationKey.Opportunities)}
          inputComponent={
            <Paper className={styles.assetsPaper}>
              <div className={styles.assetInputWrapper}>
                <Input
                  value={opportunities}
                  placeholder={t(TranslationKey.Add)}
                  className={styles.assetInput}
                  onChange={e => setOpportunities(e.target.value)}
                />

                <div
                  className={cx(styles.actionDelButton, {
                    [styles.disabledActionButton]: !opportunities,
                  })}
                  onClick={() => opportunities && addAsset('opportunities')}
                >
                  {'+'}
                </div>
              </div>

              {formFields.opportunities.map((asset, index) => (
                <div key={index} className={styles.selectedAssetWrapper}>
                  <Typography className={styles.selectedAsset}>{asset}</Typography>

                  <div className={styles.actionDelButton} onClick={() => removeAsset(index)}>
                    {'-'}
                  </div>
                </div>
              ))}
            </Paper>
          }
        />

        <Field
          multiline
          inputProps={{ maxLength: 100 }}
          labelClasses={styles.spanLabelSmall}
          label={t(TranslationKey.Risks)}
          inputComponent={
            <Paper className={styles.assetsPaper}>
              <div className={styles.assetInputWrapper}>
                <Input
                  value={risks}
                  placeholder={t(TranslationKey.Add)}
                  className={styles.assetInput}
                  onChange={e => setRisks(e.target.value)}
                />

                <div
                  className={cx(styles.actionDelButton, {
                    [styles.disabledActionButton]: !risks,
                  })}
                  onClick={() => risks && addAsset('risks')}
                >
                  {'+'}
                </div>
              </div>

              {formFields.risks.map((asset, index) => (
                <div key={index} className={styles.selectedAssetWrapper}>
                  <Typography className={styles.selectedAsset}>{asset}</Typography>

                  <div className={styles.actionDelButton} onClick={() => removeAsset(index)}>
                    {'-'}
                  </div>
                </div>
              ))}
            </Paper>
          }
        />

        <Field
          multiline
          inputProps={{ maxLength: 100 }}
          labelClasses={styles.spanLabelSmall}
          label={t(TranslationKey['Work and skills required'])}
          inputComponent={
            <Paper className={styles.assetsPaper}>
              <div className={styles.assetInputWrapper}>
                <Input
                  value={requiredSkills}
                  placeholder={t(TranslationKey.Add)}
                  className={styles.assetInput}
                  onChange={e => setrequiredSkills(e.target.value)}
                />

                <div
                  className={cx(styles.actionDelButton, {
                    [styles.disabledActionButton]: !requiredSkills,
                  })}
                  onClick={() => requiredSkills && addAsset('requiredSkills')}
                >
                  {'+'}
                </div>
              </div>

              {formFields.requiredSkills.map((asset, index) => (
                <div key={index} className={styles.selectedAssetWrapper}>
                  <Typography className={styles.selectedAsset}>{asset}</Typography>

                  <div className={styles.actionDelButton} onClick={() => removeAsset(index)}>
                    {'-'}
                  </div>
                </div>
              ))}
            </Paper>
          }
        />
      </div>

      <div className={cx(styles.infosWrapper, styles.infosWrapperMarginTop)}>
        <Field
          multiline
          inputProps={{ maxLength: 100 }}
          labelClasses={styles.spanLabelSmall}
          label={t(TranslationKey['Seller support includes'])}
          inputComponent={
            <Paper className={styles.assetsPaper}>
              <div className={styles.assetInputWrapper}>
                <Input
                  value={sellIncludes}
                  placeholder={t(TranslationKey.Add)}
                  className={styles.assetInput}
                  onChange={e => setSellIncludes(e.target.value)}
                />

                <div
                  className={cx(styles.actionDelButton, {
                    [styles.disabledActionButton]: !sellIncludes,
                  })}
                  onClick={() => sellIncludes && addAsset('sellIncludes')}
                >
                  {'+'}
                </div>
              </div>

              {formFields.sellIncludes.map((asset, index) => (
                <div key={index} className={styles.selectedAssetWrapper}>
                  <Typography className={styles.selectedAsset}>{asset}</Typography>

                  <div className={styles.actionDelButton} onClick={() => removeAsset(index)}>
                    {'-'}
                  </div>
                </div>
              ))}
            </Paper>
          }
        />

        <Field
          multiline
          inputProps={{ maxLength: 100 }}
          labelClasses={styles.spanLabelSmall}
          label={t(TranslationKey['Reasons for sale'])}
          inputComponent={
            <Paper className={styles.assetsPaper}>
              <div className={styles.assetInputWrapper}>
                <Input
                  value={reasonForSale}
                  placeholder={t(TranslationKey.Add)}
                  className={styles.assetInput}
                  onChange={e => setReasonForSale(e.target.value)}
                />

                <div
                  className={cx(styles.actionDelButton, {
                    [styles.disabledActionButton]: !reasonForSale,
                  })}
                  onClick={() => reasonForSale && addAsset('reasonForSale')}
                >
                  {'+'}
                </div>
              </div>

              {formFields.reasonForSale.map((asset, index) => (
                <div key={index} className={styles.selectedAssetWrapper}>
                  <Typography className={styles.selectedAsset}>{asset}</Typography>

                  <div className={styles.actionDelButton} onClick={() => removeAsset(index)}>
                    {'-'}
                  </div>
                </div>
              ))}
            </Paper>
          }
        />

        <Field
          multiline
          inputProps={{ maxLength: 100 }}
          labelClasses={styles.spanLabelSmall}
          label={t(TranslationKey['Additional Information'])}
          inputComponent={
            <Paper className={styles.assetsPaper}>
              <div className={styles.assetInputWrapper}>
                <Input
                  value={additionalInfo}
                  placeholder={t(TranslationKey.Add)}
                  className={styles.assetInput}
                  onChange={e => setAdditionalInfo(e.target.value)}
                />

                <div
                  className={cx(styles.actionDelButton, {
                    [styles.disabledActionButton]: !additionalInfo,
                  })}
                  onClick={() => additionalInfo && addAsset('additionalInfo')}
                >
                  {'+'}
                </div>
              </div>

              {formFields.additionalInfo.map((asset, index) => (
                <div key={index} className={styles.selectedAssetWrapper}>
                  <Typography className={styles.selectedAsset}>{asset}</Typography>

                  <div className={styles.actionDelButton} onClick={() => removeAsset(index)}>
                    {'-'}
                  </div>
                </div>
              ))}
            </Paper>
          }
        />
      </div>
      <Field
        oneLine
        label={t(TranslationKey['Make an estimate of the cost?'])}
        labelClasses={styles.spanLabelSmall}
        containerClasses={styles.checkboxWrapper}
        inputComponent={
          <Checkbox color="primary" checked={makeEstimate} onChange={() => setMakeEstimate(!makeEstimate)} />
        }
      />

      {renderBackNextBtns()}
    </>
  )
}
