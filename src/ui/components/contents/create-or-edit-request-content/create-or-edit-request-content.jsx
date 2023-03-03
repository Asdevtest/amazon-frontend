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
  Avatar,
  Rating,
} from '@mui/material'

import React, {useEffect, useState} from 'react'

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
import {Modal} from '@components/modal'
import {ChoiceOfPerformerModal} from '@components/modals/choice-of-performer-modal'
import {Text} from '@components/text'
import {UploadFilesInputMini} from '@components/upload-files-input-mini'
import {UserLink} from '@components/user-link'

import {calcNumberMinusPercent, calcPercentAfterMinusNumbers} from '@utils/calculation'
import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {formatDateForShowWithoutParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {shortAsin, replaceCommaByDot, toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './create-or-edit-request-content.style'

const stepVariant = {
  STEP_ONE: 'STEP_ONE',
  STEP_TWO: 'STEP_TWO',
}

export const CreateOrEditRequestContent = ({
  announcements,
  requestToEdit,
  history,
  platformSettingsData,
  onCreateSubmit,
  onEditSubmit,
  showProgress,
  progressValue,
  onClickChoosePerformer,
  onClickThumbnail,
}) => {
  const {classes: classNames} = useClassNames()

  console.log('platformSettingsData', platformSettingsData)

  const [images, setImages] = useState([])

  const [openModal, setOpenModal] = useState(false)

  const [curStep, setCurStep] = useState(stepVariant.STEP_ONE)

  const [isLimited, setIsLimited] = useState(false)

  const [announcementsData, setAnnouncementsData] = useState(announcements)

  useEffect(() => {
    setAnnouncementsData(announcements)
  }, [announcements])

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
      announcementId: requestToEdit?.request.announcementId || '',

      discountedPrice: '',
    },
    details: {
      conditions: requestToEdit?.details.conditions || '',
      linksToMediaFiles: requestToEdit?.details.linksToMediaFiles || [],
    },
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  const [deadlineError, setDeadlineError] = useState(false)

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
      } else if (['timeoutAt'].includes(fieldName)) {
        newFormFields[section][fieldName] = event
        setDeadlineError(false)
      } else if (['needCheckBySupervisor', 'restrictMoreThanOneProposalFromOneAssignee'].includes(fieldName)) {
        newFormFields[section][fieldName] = !newFormFields[section][fieldName]
      } else if (['title'].includes(fieldName)) {
        newFormFields[section][fieldName] = event.target.value.replace(/\n/g, '')
      } else if (['announcementId'].includes(fieldName)) {
        newFormFields[section][fieldName] = event
        setOpenModal(false)
      } else if (['typeTask'].includes(fieldName)) {
        newFormFields.request.needCheckBySupervisor = false
        newFormFields.request.restrictMoreThanOneProposalFromOneAssignee = false
        newFormFields[section][fieldName] = event.target.value
      } else {
        newFormFields[section][fieldName] = event.target.value
      }
    }

    setFormFields(newFormFields)
  }

  const isDeadlineError = formFields.request.timeoutAt < new Date()

  const onSuccessSubmit = () => {
    if (isDeadlineError) {
      setDeadlineError(!deadlineError)
    } else {
      if (curStep === stepVariant.STEP_ONE) {
        setCurStep(stepVariant.STEP_TWO)
      } else {
        onCreateSubmit(formFields, images)
      }
    }
  }

  const onClickBackBtn = () => {
    if (curStep === stepVariant.STEP_ONE) {
      history.goBack()
    } else {
      if (isDeadlineError) {
        setDeadlineError(!deadlineError)
      } else {
        setCurStep(stepVariant.STEP_ONE)
      }
    }
  }

  const disableSubmit =
    formFields.request.title === '' ||
    formFields.request.title.length > 100 ||
    formFields.request.maxAmountOfProposals === '' ||
    formFields.request.timeLimitInMinutes === '' ||
    formFields.request.price === '' ||
    formFields.request.timeoutAt === '' ||
    formFields.details.conditions === '' ||
    formFields.details.conditions.length > 1000 ||
    !formFields.request.typeTask ||
    formFields?.request?.timeoutAt?.toString() === 'Invalid Date' ||
    platformSettingsData.requestMinAmountPriceOfProposal > formFields.request.price

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.mainSubWrapper}>
        <div className={classNames.headerWrapper}>
          <Typography className={classNames.mainTitle}>
            {curStep === stepVariant.STEP_TWO
              ? t(TranslationKey['The request is ready'])
              : t(TranslationKey['We will find a reliable performer for you'])}
          </Typography>

          {curStep === stepVariant.STEP_TWO ? (
            <Typography className={classNames.mainSubStepTwoTitle}>
              {t(TranslationKey["All that's left is to check the data"])}
            </Typography>
          ) : (
            <Typography className={classNames.mainSubTitle}>
              {t(TranslationKey['By getting to know your needs, we will select the best performer for your task.'])}
            </Typography>
          )}
        </div>

        <div className={classNames.mainContentWrapper}></div>
        <div className={classNames.steps}>
          <div className={classNames.stepPagination}>
            <div className={classNames.stepPaginationStartBar}></div>
            <div className={classNames.stepPaginationBar}>
              <div className={classNames.step} style={{width: curStep === stepVariant.STEP_ONE ? '50%' : '100%'}}></div>
            </div>
            <div
              className={classNames.stepPaginationEndBar}
              style={{backgroundColor: curStep === stepVariant.STEP_TWO ? '#00B746' : '#c4c4c4'}}
            ></div>
          </div>
          <Typography className={classNames.stepTitle}>
            {curStep === stepVariant.STEP_ONE ? `${t(TranslationKey.Step)} 1` : `${t(TranslationKey.Step)} 2`}
          </Typography>
        </div>
        {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}

        <Modal openModal={openModal} setOpenModal={() => setOpenModal(!openModal)}>
          <ChoiceOfPerformerModal
            announcements={announcementsData}
            onClickThumbnail={onClickThumbnail}
            onClickChooseBtn={onChangeField('request')('announcementId')}
          />
        </Modal>
      </div>
    </div>
  )
}
