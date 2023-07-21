/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Typography, Select, Input, InputAdornment, MenuItem } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { Field } from '@components/shared/field'

import { getObjectFilteredByKeyArrayWhiteList, objectDeepCompare } from '@utils/object'
import { t } from '@utils/translations'

import { useClassNames } from './create-or-edit-services-content.style'
import { UploadFilesInput } from '@components/shared/upload-files-input'

export const CreateOrEditServiceContent = ({
  data,
  pathname,
  onClickCreateBtn,
  onClickEditBtn,
  onClickBackBtn,
  userInfo,
}) => {
  const { classes: classNames } = useClassNames()

  const isEdit = pathname?.includes('edit-service')

  const whiteList = userInfo?.allowedSpec?.filter(spec => String(spec) !== '0').map(spec => String(spec)) || []

  const [images, setImages] = useState([])

  useEffect(() => {
    setFormFields(sourceFormFields)
  }, [data])

  const sourceFormFields = {
    type: data?.type || '',
    title: data?.title || '',
    description: data?.description || '',

    linksToMediaFiles: data?.linksToMediaFiles || [],
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  const disabledSubmitButton =
    !formFields.title ||
    !formFields.description ||
    !formFields.type ||
    (objectDeepCompare(formFields, sourceFormFields) && !images.length)

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }

    newFormFields[fieldName] = event.target.value

    setFormFields(newFormFields)
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.titleWrapper}>
        <Typography className={classNames.announcementTitle}>{t(TranslationKey['Service announcement'])}</Typography>
      </div>
      <div className={classNames.fieldsWrapper}>
        <Field
          inputProps={{ maxLength: 100 }}
          label={t(TranslationKey['Service name']) + '*'}
          className={classNames.nameField}
          containerClasses={classNames.nameFieldContainer}
          labelClasses={classNames.labelClass}
          value={formFields.title}
          onChange={onChangeField('title')}
        />

        <Field
          label={t(TranslationKey['Request type']) + '*'}
          className={classNames.nameField}
          labelClasses={classNames.labelClass}
          containerClasses={classNames.requestTypeContainer}
          inputComponent={
            <Select
              displayEmpty
              value={formFields.type || ''}
              className={classNames.requestTypeField}
              input={<Input startAdornment={<InputAdornment position="start" />} />}
              onChange={onChangeField('type')}
            >
              <MenuItem disabled value={''}>
                {t(TranslationKey['Select from the list'])}
              </MenuItem>

              {Object.keys({
                ...getObjectFilteredByKeyArrayWhiteList(freelanceRequestTypeByCode, whiteList),
              }).map((taskType, taskIndex) => (
                <MenuItem key={taskIndex} value={taskType}>
                  {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[taskType])}
                </MenuItem>
              ))}
            </Select>
          }
        />
      </div>

      <Field
        multiline
        inputProps={{ maxLength: 1100 }}
        className={classNames.descriptionField}
        containerClasses={classNames.descriptionContainer}
        labelClasses={classNames.labelClass}
        minRows={4}
        maxRows={4}
        label={`${t(TranslationKey['Service description'])}*`}
        value={formFields.description}
        onChange={onChangeField('description')}
      />

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput
          fullWidth
          minimized
          images={images}
          setImages={setImages}
          maxNumber={50}
          isNotShowActionsBtns={!images.length}
        />
        {formFields.linksToMediaFiles?.length ? (
          <PhotoAndFilesCarousel small files={formFields.linksToMediaFiles} />
        ) : null}
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button variant={'text'} className={classNames.cancelBtn} onClick={onClickBackBtn}>
          {t(TranslationKey.Cancel)}
        </Button>

        <Button
          success
          disabled={disabledSubmitButton}
          className={classNames.successBtn}
          onClick={() => {
            if (isEdit) {
              onClickEditBtn(formFields, images)
            } else {
              onClickCreateBtn(formFields, images)
            }
          }}
        >
          {isEdit ? t(TranslationKey.Edit) : t(TranslationKey.Create)}
        </Button>
      </div>
    </div>
  )
}
