import { memo, useEffect, useState } from 'react'

import { MenuItem, Select } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { objectDeepCompare } from '@utils/object'
import { t } from '@utils/translations'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './create-or-edit-services-content.style'

export const CreateOrEditServiceContent = memo(props => {
  const { data, pathname, specs, onClickCreateBtn, onClickEditBtn, onClickBackBtn } = props

  const { classes: styles } = useStyles()

  const isEdit = pathname?.includes('edit-service')
  const sourceFormFields = {
    specId: data?.spec?._id || '',
    title: data?.title || '',
    description: data?.description || '',
    linksToMediaFiles: data?.linksToMediaFiles || [],
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  useEffect(() => {
    setFormFields(sourceFormFields)
  }, [data])

  const onChangeField = fieldName => event => {
    setFormFields(prevFormFields => ({ ...prevFormFields, [fieldName]: event.target.value }))
  }
  const onChangeImages = fieldName => files => {
    setFormFields(prevFormFields => ({ ...prevFormFields, [fieldName]: files }))
  }

  const disabledSubmitButton =
    !formFields.title ||
    !formFields.description ||
    !formFields.specId ||
    (objectDeepCompare(formFields, sourceFormFields) && !formFields.linksToMediaFiles.length)

  return (
    <div className={styles.root}>
      <p className={styles.announcementTitle}>{t(TranslationKey['Service announcement'])}</p>

      <div className={styles.fieldsWrapper}>
        <Field
          inputProps={{ maxLength: 100 }}
          label={t(TranslationKey['Service name']) + '*'}
          className={styles.nameField}
          containerClasses={styles.nameFieldContainer}
          labelClasses={styles.labelClass}
          value={formFields.title}
          onChange={onChangeField('title')}
        />

        <Field
          label={t(TranslationKey['Request type']) + '*'}
          className={styles.nameField}
          labelClasses={styles.labelClass}
          containerClasses={styles.requestTypeContainer}
          inputComponent={
            <Select
              displayEmpty
              value={formFields.specId || ''}
              className={styles.requestTypeField}
              onChange={onChangeField('specId')}
            >
              <MenuItem disabled value="">
                {t(TranslationKey['Select from the list'])}
              </MenuItem>

              {specs.map(spec => (
                <MenuItem key={spec._id} value={spec?._id} className={styles.capitalize}>
                  {spec?.title}
                </MenuItem>
              ))}
            </Select>
          }
        />
      </div>

      <Field
        multiline
        inputProps={{ maxLength: 1100 }}
        className={styles.descriptionField}
        containerClasses={styles.descriptionContainer}
        labelClasses={styles.labelClass}
        minRows={4}
        maxRows={4}
        label={`${t(TranslationKey['Service description'])}*`}
        value={formFields.description}
        onChange={onChangeField('description')}
      />

      <UploadFilesInput
        fullWidth
        minimized
        images={formFields.linksToMediaFiles}
        setImages={onChangeImages('linksToMediaFiles')}
        maxNumber={50}
        isNotShowActionsBtns={!formFields.linksToMediaFiles}
      />

      <div className={styles.buttonsWrapper}>
        <Button variant={ButtonVariant.OUTLINED} className={styles.cancelBtn} onClick={onClickBackBtn}>
          {t(TranslationKey.Cancel)}
        </Button>

        <Button
          styleType={ButtonType.SUCCESS}
          disabled={disabledSubmitButton}
          className={styles.successBtn}
          onClick={() => (isEdit ? onClickEditBtn(formFields) : onClickCreateBtn(formFields))}
        >
          {isEdit ? t(TranslationKey.Edit) : t(TranslationKey.Create)}
        </Button>
      </div>
    </div>
  )
})
