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

export const CreateOrEditServiceContent = ({requestToEdit, history}) => {
  const {classes: classNames} = useClassNames()

  const [images, setImages] = useState([])

  const sourceFormFields = {
    request: {
      title: requestToEdit?.request.title || '',
      maxAmountOfProposals: requestToEdit?.request.maxAmountOfProposals || '',
      price: requestToEdit?.request.price || '',
      timeoutAt: requestToEdit?.request.timeoutAt || null,
      direction: requestToEdit?.request.direction || 'IN',
      timeLimitInMinutes: requestToEdit?.request.timeLimitInMinutes || 60,
      roles: requestToEdit?.request.roles.length ? requestToEdit?.request.roles : [10, 35],
      needCheckBySupervisor: requestToEdit?.request.needCheckBySupervisor || false,
      restrictMoreThanOneProposalFromOneAssignee:
        requestToEdit?.request.restrictMoreThanOneProposalFromOneAssignee || false,

      typeTask: requestToEdit?.request?.typeTask || null,
      asin: requestToEdit?.request.asin || '',
      priceAmazon: requestToEdit?.request.priceAmazon || 0,
      cashBackInPercent: requestToEdit?.request.cashBackInPercent || 0,
      discountedPrice: '',
    },
    details: {
      conditions: requestToEdit?.details.conditions || '',
      linksToMediaFiles: requestToEdit?.details.linksToMediaFiles || [],
    },
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = section => fieldName => event => {
    const newFormFields = {...formFields}

    if (['price', 'priceAmazon', 'cashBackInPercent', 'discountedPrice'].includes(fieldName)) {
      if (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(replaceCommaByDot(event.target.value))) {
        return
      }

      if (['priceAmazon'].includes(fieldName)) {
        newFormFields.request.discountedPrice = ''
        newFormFields.request.cashBackInPercent = ''
      }

      if (['cashBackInPercent'].includes(fieldName)) {
        newFormFields.request.discountedPrice =
          calcNumberMinusPercent(formFields?.request.priceAmazon, event.target.value) || ''
      }

      if (['discountedPrice'].includes(fieldName)) {
        newFormFields.request.cashBackInPercent =
          calcPercentAfterMinusNumbers(formFields?.request.priceAmazon, event.target.value) || ''
      }

      newFormFields[section][fieldName] = replaceCommaByDot(event.target.value)
    } else {
      if (['maxAmountOfProposals', 'timeLimitInMinutes'].includes(fieldName)) {
        newFormFields[section][fieldName] = parseInt(event.target.value) || ''
      } else if (['needCheckBySupervisor', 'restrictMoreThanOneProposalFromOneAssignee'].includes(fieldName)) {
        newFormFields[section][fieldName] = event.target.checked
      } else if (['title'].includes(fieldName)) {
        newFormFields[section][fieldName] = event.target.value.replace(/\n/g, '')
      } else {
        newFormFields[section][fieldName] = event.target.value
      }
    }

    setFormFields(newFormFields)
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.mainContentWrapper}>
        <div className={classNames.titleWrapper}>
          <Typography className={classNames.mainSubStepTwoTitle}>
            {t(TranslationKey["All that's left is to check the data"])}
          </Typography>

          <Field
            tooltipInfoContent={t(TranslationKey['Future request title'])}
            inputProps={{maxLength: 100}}
            label={t(TranslationKey['Request title'])}
            className={classNames.nameField}
            containerClasses={classNames.nameFieldContainer}
            labelClasses={classNames.spanLabelSmall}
            value={formFields.request.title}
            onChange={onChangeField('request')('title')}
          />

          <Field
            label={t(TranslationKey['Request type']) + '*'}
            labelClasses={classNames.spanLabelSmall}
            tooltipInfoContent={t(TranslationKey['Current request type'])}
            containerClasses={classNames.requestTypeContainer}
            inputComponent={
              <Select
                displayEmpty
                value={formFields.request.typeTask || null}
                className={classNames.requestTypeField}
                input={<Input startAdornment={<InputAdornment position="start" />} />}
                onChange={onChangeField('request')('typeTask')}
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

          <Field
            multiline
            tooltipInfoContent={t(TranslationKey['Maximize the details of your request'])}
            inputProps={{maxLength: 1100}}
            className={classNames.descriptionField}
            labelClasses={classNames.spanLabelSmall}
            minRows={4}
            maxRows={4}
            label={`${t(TranslationKey['Describe your request'])} *`}
            value={formFields.details.conditions}
            onChange={onChangeField('details')('conditions')}
          />

          <div className={classNames.imageFileInputWrapper}>
            <UploadFilesInputMini images={images} setImages={setImages} maxNumber={50} />
            {formFields.details.linksToMediaFiles?.length ? (
              <PhotoAndFilesCarousel small files={formFields.details.linksToMediaFiles} width="400px" />
            ) : null}
          </div>

          <div className={classNames.buttonsWrapper}>
            <Button
              variant={'text'}
              className={classNames.backBtn}
              // onClick={onClickBackBtn}
            >
              {t(TranslationKey.Cancel)}
            </Button>

            <Button
              success
              // disabled={disableSubmit}
              className={classNames.successBtn}
              // onClick={() => onEditSubmit(formFields, images)}
            >
              {t(TranslationKey.Edit)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
