import { useState } from 'react'

import { Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useStyles } from './first-step.style'

export const FirstStep = ({
  formFields,
  setFormFields,
  onChangeField,
  renderBackNextBtns,
  images,
  setImages,
  deadlineError,
}) => {
  const { classes: styles, cx } = useStyles()

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
    <div className={styles.mainSubRightWrapper}>
      <div className={styles.middleWrapper}>
        <div className={styles.nameFieldWrapper}>
          <Field
            inputProps={{ maxLength: 100 }}
            label={`${t(TranslationKey['Store name'])} *`}
            className={styles.nameField}
            labelClasses={styles.spanLabelSmall}
            value={formFields.title}
            onChange={onChangeField('title')}
          />
          <span className={cx(styles.charactersHints, { [styles.error]: formFields.title.length > 80 })}>{`${
            formFields.title.length
          } ${t(TranslationKey.of)} 80 ${t(TranslationKey.characters)}`}</span>
        </div>

        <div className={styles.descriptionFieldWrapper}>
          <Field
            multiline
            inputProps={{ maxLength: 1100 }}
            className={styles.descriptionField}
            labelClasses={styles.spanLabelSmall}
            minRows={11}
            maxRows={11}
            label={`${t(TranslationKey['Store Details'])} *`}
            value={formFields.shopDetails}
            onChange={onChangeField('shopDetails')}
          />
          <span className={cx(styles.charactersHints, { [styles.error]: formFields.shopDetails.length > 1000 })}>{`${
            formFields.shopDetails.length
          } ${t(TranslationKey.of)} 1000 ${t(TranslationKey.characters)}`}</span>
        </div>

        <div className={styles.descriptionFieldWrapper}>
          <Field
            inputProps={{ maxLength: 1900 }}
            className={styles.nameField}
            labelClasses={styles.spanLabelSmall}
            label={`${t(TranslationKey['Store link'])} *`}
            value={formFields.shopLink}
            onChange={onChangeField('shopLink')}
          />
        </div>
      </div>

      <div className={styles.rightWrapper}>
        <div>
          <div className={styles.dateAndTimeWrapper}>
            <Field
              inputProps={{ maxLength: 100 }}
              label={`${t(TranslationKey['Enter store cost'])}, $ *`}
              className={styles.nameField}
              labelClasses={styles.spanLabelSmall}
              value={formFields.price}
              onChange={onChangeField('price')}
            />

            <Field
              label={`${t(TranslationKey['When did business start?'])} *`}
              labelClasses={styles.spanLabelSmall}
              inputComponent={
                <div className={cx({ [styles.deadlineError]: deadlineError })}>
                  <NewDatePicker value={formFields.businessStartDate} onChange={onChangeField('businessStartDate')} />

                  {deadlineError && (
                    <p className={styles.deadlineErrorText}>
                      {t(TranslationKey['The deadline date cannot be later than the current date'])}
                    </p>
                  )}
                </div>
              }
            />
          </div>

          <div className={styles.assetsAndFilesWrapper}>
            <Field
              multiline
              inputProps={{ maxLength: 100 }}
              labelClasses={styles.spanLabelSmall}
              label={`${t(TranslationKey['Assets included in sale'])} *`}
              inputComponent={
                <Paper className={styles.assetsPaper}>
                  <div className={styles.assetInputWrapper}>
                    <div className={styles.leftContentWrapper}>
                      <Input
                        value={assetLine}
                        placeholder={t(TranslationKey['Add assets'])}
                        className={styles.assetInput}
                        onChange={e => setAssetLine(e.target.value)}
                      />
                    </div>

                    <div
                      className={cx(styles.actionDelButton, {
                        [styles.disabledActionButton]: !assetLine,
                      })}
                      onClick={() => assetLine && addAsset()}
                    >
                      {'+'}
                    </div>
                  </div>

                  {formFields.shopAssets.map((asset, index) => (
                    <div key={index} className={styles.selectedRoleWrapper}>
                      <div className={styles.leftContentWrapper}>
                        <Typography className={styles.selectedRole}>{asset}</Typography>
                      </div>

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
              label={`${t(TranslationKey['Attach files'])} *`}
              inputComponent={
                <div className={styles.imageFileInputWrapper}>
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
