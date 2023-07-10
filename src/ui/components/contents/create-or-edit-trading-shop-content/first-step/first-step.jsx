import { cx } from '@emotion/css'
import { Typography, Paper } from '@mui/material'

import React, { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './first-step.style'

export const FirstStep = ({
  formFields,
  setFormFields,
  onChangeField,
  renderBackNextBtns,
  images,
  setImages,
  deadlineError,
}) => {
  const { classes: classNames } = useClassNames()

  const [assetLine, setAssetLine] = useState('')

  const removeAsset = index => {
    const newFormFields = { ...formFields }

    newFormFields.shopAssets = formFields.shopAssets.filter((asset, i) => i !== index)

    setFormFields(newFormFields)
  }

  const addAsset = () => {
    const newFormFields = { ...formFields }

    newFormFields.shopAssets = [assetLine, ...formFields.shopAssets]

    setFormFields(newFormFields)

    setAssetLine('')
  }

  return (
    <div className={classNames.mainSubRightWrapper}>
      <div className={classNames.middleWrapper}>
        <div className={classNames.nameFieldWrapper}>
          <Field
            inputProps={{ maxLength: 100 }}
            label={`${t(TranslationKey['Store name'])} *`}
            className={classNames.nameField}
            labelClasses={classNames.spanLabelSmall}
            value={formFields.title}
            onChange={onChangeField('title')}
          />
          <span className={cx(classNames.charactersHints, { [classNames.error]: formFields.title.length > 80 })}>{`${
            formFields.title.length
          } ${t(TranslationKey.of)} 80 ${t(TranslationKey.characters)}`}</span>
        </div>

        <div className={classNames.descriptionFieldWrapper}>
          <Field
            multiline
            inputProps={{ maxLength: 1100 }}
            className={classNames.descriptionField}
            labelClasses={classNames.spanLabelSmall}
            minRows={11}
            maxRows={11}
            label={`${t(TranslationKey['Store Details'])} *`}
            value={formFields.shopDetails}
            onChange={onChangeField('shopDetails')}
          />
          <span
            className={cx(classNames.charactersHints, { [classNames.error]: formFields.shopDetails.length > 1000 })}
          >{`${formFields.shopDetails.length} ${t(TranslationKey.of)} 1000 ${t(TranslationKey.characters)}`}</span>
        </div>

        <div className={classNames.descriptionFieldWrapper}>
          <Field
            inputProps={{ maxLength: 1900 }}
            className={classNames.nameField}
            labelClasses={classNames.spanLabelSmall}
            label={`${t(TranslationKey['Store link'])} *`}
            value={formFields.shopLink}
            onChange={onChangeField('shopLink')}
          />
        </div>
      </div>

      <div className={classNames.rightWrapper}>
        <div>
          <div className={classNames.dateAndTimeWrapper}>
            <Field
              inputProps={{ maxLength: 100 }}
              label={`${t(TranslationKey['Enter store cost'])}, $ *`}
              className={classNames.nameField}
              labelClasses={classNames.spanLabelSmall}
              value={formFields.price}
              onChange={onChangeField('price')}
            />

            <Field
              label={`${t(TranslationKey['When did business start?'])} *`}
              labelClasses={classNames.spanLabelSmall}
              inputComponent={
                <div className={cx({ [classNames.deadlineError]: deadlineError })}>
                  <NewDatePicker value={formFields.businessStartDate} onChange={onChangeField('businessStartDate')} />

                  {deadlineError && (
                    <p className={classNames.deadlineErrorText}>
                      {t(TranslationKey['The deadline date cannot be later than the current date'])}
                    </p>
                  )}
                </div>
              }
            />
          </div>

          <div className={classNames.assetsAndFilesWrapper}>
            <Field
              multiline
              inputProps={{ maxLength: 100 }}
              labelClasses={classNames.spanLabelSmall}
              label={`${t(TranslationKey['Assets included in sale'])} *`}
              inputComponent={
                <Paper className={classNames.assetsPaper}>
                  <div className={classNames.assetInputWrapper}>
                    <div className={classNames.leftContentWrapper}>
                      <Input
                        value={assetLine}
                        placeholder={t(TranslationKey['Add assets'])}
                        className={classNames.assetInput}
                        onChange={e => setAssetLine(e.target.value)}
                      />
                    </div>

                    <div
                      className={cx(classNames.actionDelButton, {
                        [classNames.disabledActionButton]: !assetLine,
                      })}
                      onClick={() => assetLine && addAsset()}
                    >
                      {'+'}
                    </div>
                  </div>

                  {formFields.shopAssets.map((asset, index) => (
                    <div key={index} className={classNames.selectedRoleWrapper}>
                      <div className={classNames.leftContentWrapper}>
                        <Typography className={classNames.selectedRole}>{asset}</Typography>
                      </div>

                      <div className={classNames.actionDelButton} onClick={() => removeAsset(index)}>
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
              labelClasses={classNames.spanLabelSmall}
              label={`${t(TranslationKey['Attach files'])} *`}
              inputComponent={
                <div className={classNames.imageFileInputWrapper}>
                  <UploadFilesInput withoutTitle images={images} setImages={setImages} maxNumber={50} />
                  {formFields.files?.length ? <PhotoAndFilesCarousel files={formFields.files} width="400px" /> : null}
                </div>
              }
            />
          </div>
        </div>
        {renderBackNextBtns()}
      </div>
    </div>
  )
}
