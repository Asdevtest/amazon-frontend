import React, {useState} from 'react'

import {Typography, Paper} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {DatePickerDate} from '@components/date-picker/date-picker'
import {Field} from '@components/field/field'
import {Input} from '@components/input'
import {UploadFilesInput} from '@components/upload-files-input'

import {t} from '@utils/translations'

import {useClassNames} from './first-step.style'

export const FirstStep = ({
  formFields,
  setFormFields,
  onChangeField,
  renderBackNextBtns,
  images,
  setImages,
  deadlineError,
}) => {
  const classNames = useClassNames()

  const [assetLine, setAssetLine] = useState('')

  const removeAsset = index => {
    const newFormFields = {...formFields}

    newFormFields.assets = formFields.assets.filter((asset, i) => i !== index)

    setFormFields(newFormFields)
  }

  const addAsset = () => {
    const newFormFields = {...formFields}

    newFormFields.assets = [assetLine, ...formFields.assets]

    setFormFields(newFormFields)

    setAssetLine('')
  }

  return (
    <div className={classNames.mainSubRightWrapper}>
      <div className={classNames.middleWrapper}>
        <div className={classNames.nameFieldWrapper}>
          <Field
            multiline
            inputProps={{maxLength: 100}}
            label={`${t(TranslationKey['Store name'])} *`}
            className={classNames.nameField}
            labelClasses={classNames.spanLabelSmall}
            minRows={1}
            rowsMax={2}
            value={formFields.title}
            onChange={onChangeField('title')}
          />
          <span className={clsx(formFields.title.length > 80 && classNames.error)}>{`${formFields.title.length} ${t(
            TranslationKey.of,
          )} 80 ${t(TranslationKey.characters)}`}</span>
        </div>

        <div className={classNames.descriptionFieldWrapper}>
          <Field
            multiline
            inputProps={{maxLength: 1100}}
            className={classNames.descriptionField}
            labelClasses={classNames.spanLabelSmall}
            minRows={11}
            rowsMax={11}
            label={`${t(TranslationKey['Store Details'])} *`}
            value={formFields.shopDetails}
            onChange={onChangeField('shopDetails')}
          />
          <span className={clsx(formFields.shopDetails.length > 1000 && classNames.error)}>{`${
            formFields.shopDetails.length
          } ${t(TranslationKey.of)} 1000 ${t(TranslationKey.characters)}`}</span>
        </div>

        <div className={classNames.descriptionFieldWrapper}>
          <Field
            inputProps={{maxLength: 1900}}
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
              multiline
              inputProps={{maxLength: 100}}
              label={`${t(TranslationKey['Enter store cost'])}, $ *`}
              className={classNames.nameField}
              labelClasses={classNames.spanLabelSmall}
              minRows={1}
              rowsMax={2}
              value={formFields.price}
              onChange={onChangeField('price')}
            />

            <Field
              label={`${t(TranslationKey['When did business start?'])}`}
              labelClasses={classNames.spanLabelSmall}
              inputComponent={
                <div className={clsx({[classNames.deadlineError]: deadlineError})}>
                  <DatePickerDate value={formFields.businessStartDate} onChange={onChangeField('businessStartDate')} />
                  {deadlineError && (
                    <p className={classNames.deadlineErrorText}>
                      {'The deadline date cannot be later than the current date'}
                    </p>
                  )}
                </div>
              }
            />
          </div>

          <div className={classNames.assetsAndFilesWrapper}>
            <Field
              multiline
              inputProps={{maxLength: 100}}
              labelClasses={classNames.spanLabelSmall}
              label={`${t(TranslationKey['Assets included in sale'])} *`}
              inputComponent={
                <Paper className={classNames.assetsPaper}>
                  <div className={classNames.assetInputWrapper}>
                    <div className={classNames.leftContentWrapper}>
                      {/* <Typography className={classNames.selectedRole}>{asset}</Typography> */}
                      <Input
                        value={assetLine}
                        placeholder={t(TranslationKey['Add assets'])}
                        className={classNames.assetInput}
                        onChange={e => setAssetLine(e.target.value)}
                      />
                    </div>

                    <div
                      className={clsx(classNames.actionDelButton, {
                        [classNames.disabledActionButton]: !assetLine,
                      })}
                      onClick={assetLine && addAsset}
                    >
                      {'+'}
                    </div>
                  </div>

                  {formFields.assets.map((asset, index) => (
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
              inputProps={{maxLength: 100}}
              labelClasses={classNames.spanLabelSmall}
              label={`${t(TranslationKey['Attach file with data for logging in to store'])} *`}
              inputComponent={
                <div className={classNames.imageFileInputWrapper}>
                  <UploadFilesInput withoutTitle images={images} setImages={setImages} maxNumber={50} />
                  {formFields.linksToMediaFiles?.length ? (
                    <PhotoAndFilesCarousel files={formFields.linksToMediaFiles} width="400px" />
                  ) : null}
                </div>
              }
            />
          </div>
        </div>
        {/* {requestToEdit ? (
          <div className={classNames.footerWrapper}>
            <div className={classNames.footerRightWrapper}>
              <div className={classNames.buttonsWrapper}>
                <Button variant={'text'} className={classNames.backBtn} onClick={onClickBackBtn}>
                  {t(TranslationKey.Cancel)}
                </Button>

                <Button
                  success
                  // disabled={disableSubmit}
                  className={classNames.successBtn}
                  onClick={() => onEditSubmit(formFields, images)}
                >
                  {t(TranslationKey.Edit)}
                </Button>
              </div>
            </div>
          </div>
        ) : ( */}
        {renderBackNextBtns()}
        {/* )} */}
      </div>
    </div>
  )
}
