import { memo, useEffect, useState } from 'react'

import { MenuItem, Select } from '@mui/material'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getObjectFilteredByKeyArrayWhiteList, objectDeepCompare } from '@utils/object'
import { t } from '@utils/translations'

import { useStyles } from './create-or-edit-services-content.style'

export const CreateOrEditServiceContent = memo(
  ({ data, pathname, onClickCreateBtn, onClickEditBtn, onClickBackBtn, userInfo }) => {
    const { classes: styles } = useStyles()

    const isEdit = pathname?.includes('edit-service')

    const whiteList = userInfo?.allowedSpec?.filter(spec => String(spec) !== '0').map(spec => String(spec)) || []

    const sourceFormFields = {
      spec: data?.spec || undefined,
      title: data?.title || '',
      description: data?.description || '',
      linksToMediaFiles: data?.linksToMediaFiles || [],
    }
    const [formFields, setFormFields] = useState(sourceFormFields)

    useEffect(() => {
      setFormFields(sourceFormFields)
    }, [data])

    const [images, setImages] = useState([])

    useEffect(() => {
      if (formFields.linksToMediaFiles.length > 0) {
        setImages(formFields.linksToMediaFiles)
      }
    }, [formFields.linksToMediaFiles])

    useEffect(() => {
      setFormFields(prevFormFields => ({
        ...prevFormFields,
        linksToMediaFiles: images,
      }))
    }, [images])

    const disabledSubmitButton =
      !formFields.title ||
      !formFields.description ||
      !formFields.spec ||
      (objectDeepCompare(formFields, sourceFormFields) && !images.length)

    const onChangeField = fieldName => event => {
      const newFormFields = { ...formFields }

      newFormFields[fieldName] = event.target.value

      setFormFields(newFormFields)
    }

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
                value={formFields.spec?.type}
                className={styles.requestTypeField}
                onChange={onChangeField('spec')}
              >
                <MenuItem disabled value={''}>
                  {t(TranslationKey['Select from the list'])}
                </MenuItem>

                {Object.keys(getObjectFilteredByKeyArrayWhiteList(freelanceRequestTypeByCode, whiteList)).map(
                  (taskType, taskIndex) => (
                    <MenuItem key={taskIndex} value={taskType}>
                      {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[taskType])}
                    </MenuItem>
                  ),
                )}
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
          images={images}
          setImages={setImages}
          maxNumber={50}
          isNotShowActionsBtns={!images.length}
        />

        <div className={styles.buttonsWrapper}>
          <Button variant={'text'} className={styles.cancelBtn} onClick={onClickBackBtn}>
            {t(TranslationKey.Cancel)}
          </Button>

          <Button
            success
            disabled={disabledSubmitButton}
            className={styles.successBtn}
            onClick={() => (isEdit ? onClickEditBtn(formFields, images) : onClickCreateBtn(formFields, images))}
          >
            {isEdit ? t(TranslationKey.Edit) : t(TranslationKey.Create)}
          </Button>
        </div>
      </div>
    )
  },
)
