/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import CircleIcon from '@mui/icons-material/Circle'
import {
  Checkbox,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Select,
  Input,
  InputAdornment,
  MenuItem,
} from '@mui/material'

import React, {useState} from 'react'

import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/freelance-request-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {CopyValue} from '@components/copy-value'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {NewDatePicker, DatePickerTime} from '@components/date-picker/date-picker'
import {Field} from '@components/field'
import {UploadFilesInputMini} from '@components/upload-files-input-mini'

import {calcNumberMinusPercent, calcPercentAfterMinusNumbers} from '@utils/calculation'
import {
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot,
} from '@utils/checks'
import {formatDateForShowWithoutParseISO} from '@utils/date-time'
import {shortAsin, clearEverythingExceptNumbers, replaceCommaByDot, toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './create-or-edit-services-content.style'

export const CreateOrEditServiceContent = ({data, onClickCreateOrEditBtn, onClickBackBtn}) => {
  const {classes: classNames} = useClassNames()

  const [images, setImages] = useState([])

  const sourceFormFields = {
    type: data?.type || '',
    title: data?.title || '',
    description: data?.description || '',
    createdBy: data?.createdBy || '',

    linksToMediaFiles: data?.linksToMediaFiles || [],
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

    newFormFields[fieldName] = event.target.value

    setFormFields(newFormFields)
  }

  console.log('formFields', formFields)
  console.log('images', images)

  return (
    <div className={classNames.root}>
      <div className={classNames.titleWrapper}>
        <Typography className={classNames.announcementTitle}>{t(TranslationKey['Service announcement'])}</Typography>
      </div>
      <div className={classNames.fieldsWrapper}>
        <Field
          inputProps={{maxLength: 100}}
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
              value={formFields.type || null}
              className={classNames.requestTypeField}
              input={<Input startAdornment={<InputAdornment position="start" />} />}
              onChange={onChangeField('type')}
            >
              <MenuItem disabled value={null}>
                {t(TranslationKey['Select from the list'])}
              </MenuItem>

              {Object.keys(freelanceRequestTypeByCode).map((taskType, taskIndex) => (
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
        inputProps={{maxLength: 1100}}
        className={classNames.descriptionField}
        containerClasses={classNames.descriptionContainer}
        labelClasses={classNames.labelClass}
        minRows={4}
        maxRows={4}
        label={`${t(TranslationKey['Describe your request'])}*`}
        value={formFields.description}
        onChange={onChangeField('description')}
      />

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInputMini images={images} setImages={setImages} maxNumber={50} />
        {formFields.linksToMediaFiles?.length ? (
          <PhotoAndFilesCarousel small files={formFields.linksToMediaFiles} width="400px" />
        ) : null}
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button variant={'text'} className={classNames.cancelBtn} onClick={onClickBackBtn}>
          {t(TranslationKey.Cancel)}
        </Button>

        <Button
          success
          // disabled={disableSubmit}
          className={classNames.successBtn}
          onClick={() => onClickCreateOrEditBtn(formFields, images)}
        >
          {t(TranslationKey.Add)}
        </Button>
      </div>
    </div>
  )
}
