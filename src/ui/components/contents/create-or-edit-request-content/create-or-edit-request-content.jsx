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

import {toJS} from 'mobx'

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
import {CustomTextEditor} from '@components/custom-text-editor'
import {NewDatePicker, DatePickerTime} from '@components/date-picker/date-picker'
import {Field} from '@components/field'
import {Modal} from '@components/modal'
import {ChoiceOfPerformerModal} from '@components/modals/choice-of-performer-modal'
import {WithSearchSelect} from '@components/selects/with-search-select'
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
  permissionsData,
  choosenAnnouncements,
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

  // console.log('requestToEdit', requestToEdit)

  const [images, setImages] = useState(
    requestToEdit
      ? requestToEdit.request.media.map(el => ({
          file: el.fileLink,
          comment: el.commentByClient,
          commentByPerformer: el.commentByPerformer,
          _id: `${Date.now()}`,
        }))
      : [],
  )

  const [openModal, setOpenModal] = useState(false)

  const [curStep, setCurStep] = useState(stepVariant.STEP_ONE)

  const [announcementsData, setAnnouncementsData] = useState(announcements)

  useEffect(() => {
    if (requestToEdit) {
      onClickChoosePerformer(requestToEdit?.request.typeTask)
    }
  }, [])

  useEffect(() => {
    setAnnouncementsData(announcements)
  }, [announcements])

  const [clearСonditionsText, setСonditionsClearText] = useState('')

  const getSourceFormFields = currentFields => ({
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

      typeTask:
        /* currentFields?.request?.typeTask ?? */ requestToEdit?.request?.typeTask ??
        choosenAnnouncements?.type ??
        null,
      asin: requestToEdit?.request.asin || undefined,
      priceAmazon: requestToEdit?.request.priceAmazon || 0,
      cashBackInPercent: requestToEdit?.request.cashBackInPercent || 0,
      announcementId:
        (requestToEdit?.request.announcementId &&
          announcementsData.find(el => el._id === requestToEdit?.request.announcementId)) ||
        (choosenAnnouncements.length && choosenAnnouncements) ||
        '',

      productId: requestToEdit?.request?.productId || null,
      withoutConfirmation: requestToEdit?.request?.withoutConfirmation || false,

      discountedPrice: requestToEdit
        ? toFixed(
            calcNumberMinusPercent(requestToEdit?.request.priceAmazon, requestToEdit?.request.cashBackInPercent),
            2,
          )
        : 0,
    },
    details: {
      conditions: requestToEdit?.details.conditions || '',
      linksToMediaFiles: requestToEdit?.details.linksToMediaFiles || [],
    },
  })

  const [formFields, setFormFields] = useState(getSourceFormFields())

  useEffect(() => {
    if (formFields.details.conditions) {
      try {
        const obj = JSON.parse(formFields.details.conditions)
        const text = obj?.blocks?.map(block => block?.text).join('')
        setСonditionsClearText(text)
      } catch (error) {
        console.log('error', error)
      }
    }
  }, [formFields.details.conditions])

  useEffect(() => {
    if (requestToEdit) {
      setFormFields(() => getSourceFormFields())
    }
  }, [choosenAnnouncements, announcementsData])

  const [deadlineError, setDeadlineError] = useState(false)

  const onChangeField = section => fieldName => event => {
    const newFormFields = {...formFields}

    if (['price', 'priceAmazon', 'cashBackInPercent', 'discountedPrice'].includes(fieldName)) {
      if (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(replaceCommaByDot(event.target.value))) {
        return
      }

      if (['priceAmazon'].includes(fieldName)) {
        newFormFields.request.discountedPrice = 0
        newFormFields.request.cashBackInPercent = 0
      }

      if (['cashBackInPercent'].includes(fieldName)) {
        newFormFields.request.discountedPrice = calcNumberMinusPercent(
          formFields?.request.priceAmazon,
          event.target.value || 0,
        )
      }

      if (['discountedPrice'].includes(fieldName)) {
        newFormFields.request.cashBackInPercent = calcPercentAfterMinusNumbers(
          formFields?.request.priceAmazon,
          event.target.value || 0,
        )
      }

      newFormFields[section][fieldName] = replaceCommaByDot(event.target.value)
    } else {
      if (['maxAmountOfProposals', 'timeLimitInMinutes'].includes(fieldName)) {
        newFormFields[section][fieldName] = parseInt(event.target.value) || ''
      } else if (['timeoutAt'].includes(fieldName)) {
        newFormFields[section][fieldName] = event
        setDeadlineError(false)
      } else if (
        ['needCheckBySupervisor', 'restrictMoreThanOneProposalFromOneAssignee', 'withoutConfirmation'].includes(
          fieldName,
        )
      ) {
        newFormFields[section][fieldName] = !newFormFields[section][fieldName]
      } else if (['title'].includes(fieldName)) {
        newFormFields[section][fieldName] = event.target.value.replace(/\n/g, '')
      } else if (['announcementId'].includes(fieldName)) {
        newFormFields[section][fieldName] = event
        setOpenModal(false)
      } else if (['typeTask'].includes(fieldName)) {
        newFormFields.request.needCheckBySupervisor = false
        newFormFields.request.restrictMoreThanOneProposalFromOneAssignee = false
        newFormFields.request.announcementId = ''
        newFormFields[section][fieldName] = event.target.value

        if (`${event.target.value}` !== `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}`) {
          newFormFields.request.discountedPrice = 0
          newFormFields.request.cashBackInPercent = 0
          newFormFields.request.priceAmazon = 0
        }
      } else if (['productId'].includes(fieldName)) {
        newFormFields[section][fieldName] = event
      } else if (['asin'].includes(fieldName)) {
        newFormFields[section][fieldName] = event
      } else if (['conditions'].includes(fieldName)) {
        newFormFields[section][fieldName] = event
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
    clearСonditionsText.length >= 6000 ||
    !clearСonditionsText.length ||
    !formFields.request.typeTask ||
    !formFields.request.productId ||
    formFields?.request?.timeoutAt?.toString() === 'Invalid Date' ||
    platformSettingsData?.requestMinAmountPriceOfProposal > formFields?.request?.price

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.mainSubWrapper}>
        <div className={classNames.headerWrapper}>
          <Typography
            className={cx(classNames.mainTitle, {[classNames.mainTitleStapTwo]: curStep === stepVariant.STEP_TWO})}
          >
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

        <div className={classNames.mainContentWrapper}>
          {curStep === stepVariant.STEP_ONE && (
            <div className={classNames.mainSubRightWrapper}>
              <div className={classNames.middleWrapper}>
                <div className={classNames.nameFieldWrapper}>
                  <Field
                    tooltipInfoContent={t(TranslationKey['Future request title'])}
                    inputProps={{maxLength: 100}}
                    label={t(TranslationKey['Request title']) + '*'}
                    className={classNames.nameField}
                    containerClasses={classNames.nameFieldContainer}
                    labelClasses={classNames.spanLabelSmall}
                    value={formFields.request.title}
                    onChange={onChangeField('request')('title')}
                  />

                  <Field
                    tooltipInfoContent={t(TranslationKey['Select a product card for the order'])}
                    label={t(TranslationKey.ASIN) + '*'}
                    labelClasses={classNames.spanLabelSmall}
                    containerClasses={classNames.asinContainer}
                    className={classNames.nameField}
                    inputComponent={
                      <WithSearchSelect
                        asinSelect
                        grayBorder
                        blackSelectedItem
                        darkIcon
                        chosenItemNoHover
                        data={permissionsData}
                        width={185}
                        searchOnlyFields={['asin', 'skusByClient']}
                        customSubMainWrapper={classNames.customSubMainWrapper}
                        customSearchInput={classNames.customSearchInput}
                        selectedItemName={
                          formFields?.request?.asin ||
                          (formFields?.request?.asin === '' && t(TranslationKey.Missing)) ||
                          t(TranslationKey['Select ASIN'])
                        }
                        onClickSelect={el => {
                          onChangeField('request')('asin')(el.asin)
                          onChangeField('request')('productId')(el._id)
                        }}
                      />
                    }
                  />

                  <Field
                    label={t(TranslationKey['Request type']) + '*'}
                    labelClasses={classNames.spanLabelSmall}
                    tooltipInfoContent={t(TranslationKey['Current request type'])}
                    containerClasses={classNames.requestTypeContainer}
                    inputComponent={
                      <Select
                        displayEmpty
                        value={formFields.request.typeTask + '' ?? null}
                        className={classNames.requestTypeField}
                        input={<Input startAdornment={<InputAdornment position="start" />} />}
                        onChange={onChangeField('request')('typeTask')}
                      >
                        <MenuItem disabled value={null}>
                          {t(TranslationKey['Select from the list'])}
                        </MenuItem>

                        {Object.keys(freelanceRequestTypeByCode)
                          .filter(el => String(el) !== String(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]))
                          .map((taskType, taskIndex) => (
                            <MenuItem key={taskIndex} value={taskType}>
                              {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[taskType])}
                            </MenuItem>
                          ))}
                      </Select>
                    }
                  />

                  {/* <span
                  className={cx(classNames.charactersHints, {[classNames.error]: formFields.request.title.length > 80})}
                >{`${formFields.request.title.length} ${t(TranslationKey.of)} 80 ${t(
                  TranslationKey.characters,
                )}`}</span> */}
                </div>

                {`${formFields?.request?.typeTask}` ===
                  `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` && (
                  <div className={classNames.bloggerFieldsWrapper}>
                    <Field
                      className={classNames.nameField}
                      containerClasses={classNames.bloggerFieldContainer}
                      inputProps={{maxLength: 8}}
                      label={t(TranslationKey['Price on Amazon']) + ', $'}
                      labelClasses={classNames.spanLabelSmall}
                      value={formFields.request.priceAmazon}
                      onChange={onChangeField('request')('priceAmazon')}
                    />

                    <Field
                      className={classNames.nameField}
                      containerClasses={classNames.bloggerFieldContainer}
                      inputProps={{maxLength: 8}}
                      label={t(TranslationKey['Discounted price']) + ', $'}
                      labelClasses={classNames.spanLabelSmall}
                      value={toFixed(formFields.request.discountedPrice, 2)}
                      onChange={e => {
                        if (
                          formFields.request.priceAmazon &&
                          Number(replaceCommaByDot(e.target.value)) <= Number(formFields.request.priceAmazon)
                        ) {
                          onChangeField('request')('discountedPrice')(e)
                        }
                      }}
                    />

                    <Field
                      className={classNames.nameField}
                      containerClasses={classNames.bloggerFieldContainer}
                      inputProps={{maxLength: 8}}
                      label={t(TranslationKey['CashBack Percentage']) + ', %'}
                      labelClasses={classNames.spanLabelSmall}
                      value={toFixed(formFields.request.cashBackInPercent, 2)}
                      onChange={e => {
                        if (Number(e.target.value) <= 100 && formFields.request.priceAmazon) {
                          onChangeField('request')('cashBackInPercent')(e)
                        }
                      }}
                    />
                  </div>
                )}

                <div className={classNames.imageFileInputWrapper}>
                  <UploadFilesInputMini
                    withComment
                    // oneLineMaxHeight
                    maxHeight={160}
                    images={images}
                    setImages={setImages}
                    maxNumber={50}
                  />
                  {/* {formFields.details.linksToMediaFiles?.length ? (
                    <PhotoAndFilesCarousel
                      small
                      files={formFields.details.linksToMediaFiles.map(el => el.fileLink)}
                      width="400px"
                    />
                  ) : null} */}
                </div>

                <div className={classNames.descriptionFieldWrapper}>
                  {/* <Field
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
                  /> */}

                  <CustomTextEditor
                    conditions={formFields.details.conditions}
                    editorMaxHeight={classNames.editorMaxHeight}
                    changeConditions={onChangeField('details')('conditions')}
                  />

                  {/* <span
                    className={cx(classNames.charactersHints, {
                      [classNames.error]: formFields.details.conditions.length > 1000,
                    })}
                  >{`${formFields.details.conditions.length} ${t(TranslationKey.of)} 1000 ${t(
                    TranslationKey.characters,
                  )}`}</span> */}
                </div>
              </div>

              <div className={classNames.rightWrapper}>
                <div>
                  <div className={classNames.dateAndTimeWrapper}>
                    <Field
                      containerClasses={cx(classNames.dateAndTimeContainerleft)}
                      tooltipInfoContent={t(TranslationKey['Indicate the date by which proposals may be received'])}
                      label={`${t(TranslationKey['When do you want results?'])}`}
                      labelClasses={classNames.spanLabelSmall}
                      inputComponent={
                        <div>
                          <NewDatePicker
                            disablePast
                            className={classNames.dateField}
                            value={formFields.request.timeoutAt}
                            onChange={onChangeField('request')('timeoutAt')}
                          />
                          {deadlineError && (
                            <span className={classNames.deadlineErrorText}>
                              {t(TranslationKey['The deadline cannot be earlier than the current date'])}
                            </span>
                          )}
                        </div>
                      }
                    />
                    <Field
                      containerClasses={classNames.dateAndTimeContainerRight}
                      tooltipInfoContent={t(TranslationKey['Indicate the time until which offers may be received'])}
                      label={`${t(TranslationKey['What time do you want the result?'])}`}
                      labelClasses={classNames.spanLabelSmall}
                      inputComponent={
                        <div>
                          <DatePickerTime
                            className={classNames.dateField}
                            value={formFields.request.timeoutAt}
                            onChange={onChangeField('request')('timeoutAt')}
                          />
                          {deadlineError && (
                            <span className={classNames.deadlineErrorText}>
                              {t(TranslationKey['The deadline cannot be earlier than the current date'])}
                            </span>
                          )}
                        </div>
                      }
                    />
                  </div>

                  {/* <div className={classNames.checkboxesWrapper}> */}
                  {/* <div
                      className={cx(classNames.checkboxWrapper, classNames.checkboxWrapperLeft)}
                      onClick={e => {
                        onChangeField('request')('maxAmountOfProposals')({...e, target: {value: ''}})
                      }}
                    >
                      <div className={classNames.checkboxSubWrapper}>
                        <Checkbox color="primary" classes={{root: classNames.checkbox}} />
                      </div>
                      <Text
                        className={classNames.checkboxText}
                        tooltipInfoContent={t(TranslationKey['Limit the number of proposals'])}
                      >
                        {t(TranslationKey['Limit the number of proposals'])}
                      </Text>
                    </div> */}

                  {/* {`${formFields?.request?.typeTask}` !==
                      `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
                      `${formFields?.request?.typeTask}` !==
                        `${freelanceRequestTypeByKey[freelanceRequestType.DESIGNER]}` && (
                        <div
                          className={cx(classNames.checkboxWrapper, classNames.checkboxWrapperRight)}
                          onClick={onChangeField('request')('needCheckBySupervisor')}
                        >
                          <div className={classNames.checkboxSubWrapper}>
                            <Checkbox
                              color="primary"
                              checked={formFields.request.needCheckBySupervisor}
                              classes={{root: classNames.checkbox}}
                            />
                          </div>
                          <Text
                            className={classNames.checkboxText}
                            tooltipInfoContent={t(
                              TranslationKey['Add a service for checking the result of proposals by a supervisor'],
                            )}
                          >
                            {t(TranslationKey['Need a supervisor check'])}
                          </Text>
                        </div>
                      )} */}
                  {/* </div> */}

                  <div className={classNames.priceAndAmountWrapper}>
                    <Field
                      tooltipInfoContent={t(TranslationKey['How many proposals are you willing to consider'])}
                      inputProps={{maxLength: 8}}
                      label={`${t(TranslationKey['Enter the number of proposals'])} *`}
                      labelClasses={classNames.spanLabelSmall}
                      value={formFields.request.maxAmountOfProposals}
                      onChange={onChangeField('request')('maxAmountOfProposals')}
                    />

                    <Field
                      error={
                        formFields?.request?.price &&
                        platformSettingsData?.requestMinAmountPriceOfProposal > formFields.request.price &&
                        `${t(TranslationKey['The price should be greater than'])} ${
                          platformSettingsData?.requestMinAmountPriceOfProposal
                        } $`
                      }
                      tooltipInfoContent={t(TranslationKey['The price you are willing to pay for the result'])}
                      inputProps={{maxLength: 8}}
                      label={`${t(TranslationKey['Enter the offer price'])}`}
                      labelClasses={classNames.spanLabelSmall}
                      value={formFields.request.price}
                      onChange={onChangeField('request')('price')}
                    />
                  </div>

                  <div className={classNames.checkboxAndButtonWrapper}>
                    <div className={cx(classNames.checkboxProposalWrapper)}>
                      <div
                        className={classNames.checkboxWrapper}
                        onClick={onChangeField('request')('withoutConfirmation')}
                      >
                        <Checkbox color="primary" checked={formFields.request.withoutConfirmation} />
                        <Text
                          tooltipPosition={'corner'}
                          tooltipInfoContent={t(
                            TranslationKey['Allow the performer to take the request for work without confirmation'],
                          )}
                        >
                          {t(TranslationKey['Allow the performer to take the request for work without confirmation'])}
                        </Text>
                      </div>
                    </div>

                    <div className={cx(classNames.checkboxProposalWrapper)}>
                      <div
                        className={classNames.checkboxWrapper}
                        onClick={onChangeField('request')('restrictMoreThanOneProposalFromOneAssignee')}
                      >
                        <Checkbox
                          color="primary"
                          checked={formFields.request.restrictMoreThanOneProposalFromOneAssignee}
                        />
                        <Text
                          tooltipPosition={'corner'}
                          tooltipInfoContent={t(
                            TranslationKey['After providing the result, the same performer may make a new proposal'],
                          )}
                        >
                          {t(TranslationKey['Prohibit multiple performances by the same performer'])}
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className={classNames.performerAndButtonWrapper}>
                    <div className={classNames.performerAndButtonSubWrapper}>
                      {formFields.request.announcementId ? (
                        <div className={classNames.performerWrapper}>
                          <Typography className={classNames.spanLabelSmall}>{t(TranslationKey.Performer)}</Typography>
                          <div className={classNames.userInfo}>
                            <Avatar
                              src={getUserAvatarSrc(formFields?.request?.announcementId?.createdBy?._id)}
                              className={classNames.cardImg}
                            />

                            <div className={classNames.nameWrapper}>
                              <UserLink
                                blackText
                                name={formFields?.request?.announcementId?.createdBy?.name}
                                userId={formFields?.request?.announcementId?.createdBy?._id}
                              />
                              <Rating disabled value={5} size="small" classes={classNames.rating} />
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <Button
                        disabled={!formFields?.request?.typeTask}
                        variant={'contained'}
                        className={classNames.changePerformerBtn}
                        onClick={async () => {
                          await onClickChoosePerformer(formFields.request.typeTask)
                          setOpenModal(true)
                        }}
                      >
                        {formFields.request.announcementId
                          ? t(TranslationKey['Change performer'])
                          : t(TranslationKey['Select a Performer'])}
                      </Button>
                    </div>
                    {formFields.request.announcementId.title && (
                      <div className={classNames.performerDescriptionWrapper}>
                        <Typography className={classNames.performerDescriptionText}>
                          {formFields.request.announcementId.title}
                        </Typography>
                      </div>
                    )}
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
                          disabled={disableSubmit}
                          className={classNames.successBtn}
                          onClick={() => onEditSubmit(formFields, images)}
                        >
                          {t(TranslationKey.Edit)}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={classNames.footerWrapper}>
                    <div className={classNames.footerRightWrapper}>
                      <div className={classNames.buttonsWrapper}>
                        <Button
                          tooltipInfoContent={
                            curStep === stepVariant.STEP_TWO
                              ? t(TranslationKey['Back to Step 1'])
                              : t(TranslationKey['Cancel request creation'])
                          }
                          variant={'text'}
                          className={classNames.backBtn}
                          onClick={onClickBackBtn}
                        >
                          {curStep === stepVariant.STEP_TWO
                            ? t(TranslationKey['Back to editing'])
                            : t(TranslationKey.Cancel)}
                        </Button>

                        <Button
                          success
                          tooltipInfoContent={
                            curStep === stepVariant.STEP_TWO
                              ? t(TranslationKey['Creates a completed request'])
                              : t(TranslationKey['Go to Step 2'])
                          }
                          disabled={disableSubmit}
                          className={classNames.successBtn}
                          onClick={onSuccessSubmit}
                        >
                          {curStep === stepVariant.STEP_TWO ? (
                            t(TranslationKey['Create a request'])
                          ) : (
                            <div className={classNames.successBtnTextWrapper}>
                              <Typography>{t(TranslationKey.Next)}</Typography>
                              <img
                                src="/assets/icons/right-arrow.svg"
                                className={cx(classNames.successBtnArrow, {
                                  [classNames.disablesBtnArrow]: disableSubmit,
                                })}
                              />
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          )}

          {curStep === stepVariant.STEP_TWO && (
            <div className={classNames.mainTwoStepWrapper}>
              <div className={classNames.mainSubRightTwoStepWrapper}>
                <div className={classNames.adviceWrapper}>
                  <Typography className={classNames.adviceTitle}>
                    {t(TranslationKey['Choosing a performer:'])}
                  </Typography>

                  <List>
                    <ListItem className={classNames.adviceListItem}>
                      <CircleIcon color="primary" classes={{root: classNames.listItemDot}} />

                      <ListItemText className={classNames.adviceListItemText}>
                        {t(TranslationKey['Read the reviews about the performer'])}
                      </ListItemText>
                    </ListItem>
                    <ListItem className={classNames.adviceListItem}>
                      <CircleIcon color="primary" classes={{root: classNames.listItemDot}} />

                      <ListItemText className={classNames.adviceListItemText}>
                        {t(
                          TranslationKey[
                            'Do not confirm the result of the work until you are sure that it is complete'
                          ],
                        )}
                      </ListItemText>
                    </ListItem>
                    <ListItem className={classNames.adviceListItem}>
                      <CircleIcon color="primary" classes={{root: classNames.listItemDot}} />

                      <ListItemText className={classNames.adviceListItemText}>
                        {t(
                          TranslationKey[
                            'Try to study market prices and choose a performer and choose relevant terms and conditions'
                          ],
                        )}
                      </ListItemText>
                    </ListItem>
                  </List>
                  <div className={classNames.trainingTextWrapper}>
                    <Typography className={classNames.trainingText}>
                      {t(TranslationKey['You can also take a free'])}
                      <Link className={classNames.trainingLink}>{t(TranslationKey.Training)}</Link>
                      {t(TranslationKey['on our freelance exchange.'])}
                    </Typography>
                  </div>
                </div>

                <div className={classNames.middleStepTwoMainWrapper}>
                  <div className={classNames.middleStepTwoWrapper}>
                    <div className={classNames.middleStepTwoSubWrapper}>
                      <div className={classNames.titleAndAsinWrapper}>
                        <Field
                          label={t(TranslationKey.Title)}
                          labelClasses={classNames.spanLabel}
                          containerClasses={cx(classNames.titleContainer)}
                          inputComponent={
                            <Typography className={cx(classNames.twoStepFieldResult, classNames.requestTitle)}>
                              {formFields.request.title}
                            </Typography>
                          }
                        />
                        {formFields?.request?.asin && (
                          <Field
                            label={t(TranslationKey.ASIN)}
                            labelClasses={cx(classNames.spanLabel, classNames.fitContentContainer)}
                            containerClasses={cx(classNames.asinContainerStapTwo)}
                            inputComponent={
                              <div className={classNames.asinWrapper}>
                                <Typography className={classNames.orderText}>
                                  {formFields.request.asin ? (
                                    <a
                                      target="_blank"
                                      rel="noreferrer"
                                      href={`https://www.amazon.com/dp/${formFields.request.asin}`}
                                      className={classNames.normalizeLink}
                                    >
                                      <span className={classNames.linkSpan}>{shortAsin(formFields.request.asin)}</span>
                                    </a>
                                  ) : (
                                    <span className={classNames.typoSpan}>{t(TranslationKey.Missing)}</span>
                                  )}
                                </Typography>
                                {formFields.request.asin ? <CopyValue text={formFields.request.asin} /> : null}
                              </div>
                            }
                          />
                        )}
                      </div>

                      <Typography className={classNames.imagesTitle}>{t(TranslationKey.Files)}</Typography>
                      <PhotoAndFilesCarousel
                        small
                        direction={'column'}
                        files={images.map(el => el.file)}
                        imagesTitles={images.map(el => el.comment)}
                        width={399}
                      />
                    </div>

                    <div className={classNames.rightTwoStepMainWrapper}>
                      <div className={classNames.rightTwoStepWrapper}>
                        {`${formFields?.request?.typeTask}` ===
                          `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
                        formFields.request.priceAmazon &&
                        formFields.request.priceAmazon !== '0' ? (
                          <div className={classNames.infoColumn}>
                            {`${formFields?.request?.typeTask}` ===
                              `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
                            formFields?.request?.priceAmazon &&
                            formFields?.request?.priceAmazon !== '0' ? (
                              <Field
                                label={t(TranslationKey['Price per product'])}
                                labelClasses={classNames.spanLabel}
                                containerClasses={cx(classNames.fitContentContainer)}
                                inputComponent={
                                  <div className={classNames.pricesWrapper}>
                                    {formFields.request.discountedPrice && formFields.request.cashBackInPercent ? (
                                      <Typography
                                        className={cx(classNames.twoStepFieldResult, {
                                          [classNames.newPrice]:
                                            formFields.request.discountedPrice && formFields.request.cashBackInPercent,
                                        })}
                                      >
                                        {'$ ' + toFixed(+formFields.request.discountedPrice, 2)}
                                      </Typography>
                                    ) : null}

                                    <Typography
                                      className={cx(classNames.twoStepFieldResult, {
                                        [classNames.oldPrice]:
                                          formFields.request.discountedPrice && formFields.request.cashBackInPercent,
                                      })}
                                    >
                                      {'$ ' + toFixed(+formFields.request.priceAmazon, 2)}
                                    </Typography>
                                  </div>
                                }
                              />
                            ) : null}

                            {`${formFields?.request?.typeTask}` ===
                              `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
                            formFields.request.cashBackInPercent &&
                            formFields?.request?.cashBackInPercent ? (
                              <Field
                                label={t(TranslationKey.CashBack)}
                                containerClasses={cx(classNames.fitContentContainer)}
                                labelClasses={classNames.spanLabel}
                                inputComponent={
                                  <Typography className={classNames.twoStepFieldResult}>
                                    {toFixed(formFields.request.cashBackInPercent, 0) + ' %'}
                                  </Typography>
                                }
                              />
                            ) : null}
                          </div>
                        ) : null}

                        <div className={classNames.infoColumn}>
                          <Field
                            label={t(TranslationKey['Request type'])}
                            containerClasses={cx(classNames.fitContentContainer)}
                            labelClasses={classNames.spanLabel}
                            inputComponent={
                              <Typography className={classNames.twoStepFieldResult}>
                                {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[formFields.request.typeTask])}
                              </Typography>
                            }
                          />

                          <Field
                            label={t(TranslationKey['Number of proposals'])}
                            labelClasses={classNames.spanLabel}
                            containerClasses={cx(classNames.fitContentContainer)}
                            inputComponent={
                              <Typography className={classNames.twoStepFieldResult}>
                                {formFields.request.maxAmountOfProposals}
                              </Typography>
                            }
                          />
                        </div>

                        <div className={classNames.infoColumn}>
                          <Field
                            label={t(TranslationKey['Request price']) + ', $'}
                            labelClasses={classNames.spanLabel}
                            containerClasses={cx(classNames.fitContentContainer)}
                            inputComponent={
                              <Typography className={classNames.twoStepFieldResult}>
                                {formFields.request.price + '$'}
                              </Typography>
                            }
                          />

                          <Field
                            label={t(TranslationKey['Deadline for the request'])}
                            containerClasses={cx(classNames.fitContentContainer)}
                            labelClasses={classNames.spanLabel}
                            inputComponent={
                              <Typography className={classNames.twoStepFieldResult}>
                                {formFields.request.timeoutAt &&
                                  formatDateForShowWithoutParseISO(formFields.request.timeoutAt)}
                              </Typography>
                            }
                          />
                        </div>
                      </div>
                      <div className={classNames.infoTextWrapper}>
                        {formFields.request.announcementId && (
                          <div className={classNames.performerWrapperStepTwo}>
                            <Typography className={classNames.spanLabelSmall}>{t(TranslationKey.Performer)}</Typography>
                            <div className={classNames.userInfo}>
                              <Avatar
                                src={getUserAvatarSrc(formFields.request.announcementId.createdBy._id)}
                                className={classNames.cardImg}
                              />

                              <div className={classNames.nameWrapperStepTwo}>
                                <UserLink
                                  blackText
                                  name={formFields.request.announcementId.createdBy.name}
                                  userId={formFields.request.announcementId.createdBy._id}
                                  customStyles={{maxWidth: 300}}
                                />
                                <Rating disabled value={5} size="small" classes={classNames.rating} />
                              </div>
                            </div>
                            <Typography className={classNames.performerDescriptionText}>
                              {formFields.request.announcementId.description}
                            </Typography>
                          </div>
                        )}

                        {formFields.request.needCheckBySupervisor && (
                          <Typography className={classNames.restrictMoreThanOneProposal}>
                            {t(TranslationKey['A supervisor check is necessary'])}
                          </Typography>
                        )}

                        {formFields.request.restrictMoreThanOneProposalFromOneAssignee && (
                          <Typography className={classNames.restrictMoreThanOneProposal}>
                            {t(TranslationKey['Multiple performances by the same performer are prohibited'])}
                          </Typography>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={classNames.performerDescriptionWrapperTextStepTwo}>
                    <Typography className={classNames.spanLabel}>
                      {t(TranslationKey['Description of your request'])}
                    </Typography>

                    <CustomTextEditor
                      readOnly
                      conditions={formFields.details.conditions}
                      editorMaxHeight={classNames.editorMaxHeight}
                    />
                  </div>
                </div>
              </div>
              {/* <div className={classNames.footerWrapper}>
                <div className={classNames.footerRightWrapper}>
                  <div className={classNames.buttonsWrapper}>
                    <Button
                      tooltipInfoContent={
                        curStep === stepVariant.STEP_TWO
                          ? t(TranslationKey['Back to Step 1'])
                          : t(TranslationKey['Cancel request creation'])
                      }
                      variant={'text'}
                      className={classNames.backBtn}
                      onClick={onClickBackBtn}
                    >
                      {curStep === stepVariant.STEP_TWO ? t(TranslationKey.Back) : t(TranslationKey.Cancel)}
                    </Button>

                    <Button
                      success
                      tooltipInfoContent={
                        curStep === stepVariant.STEP_TWO
                          ? t(TranslationKey['Creates a completed request'])
                          : t(TranslationKey['Go to Step 2'])
                      }
                      disabled={disableSubmit}
                      className={classNames.successBtn}
                      onClick={onSuccessSubmit}
                    >
                      {curStep === stepVariant.STEP_TWO ? (
                        t(TranslationKey['Create a request'])
                      ) : (
                        <div className={classNames.successBtnTextWrapper}>
                          <Typography>{t(TranslationKey.Next)}</Typography>
                          <img
                            src="/assets/icons/right-arrow.svg"
                            className={cx(classNames.successBtnArrow, {
                              [classNames.disablesBtnArrow]: disableSubmit,
                            })}
                          />
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div> */}
            </div>
          )}
        </div>
        {curStep === stepVariant.STEP_ONE &&
          (requestToEdit ? (
            <div className={classNames.footerWrapper}>
              <div className={classNames.footerRightWrapper}>
                <div className={classNames.buttonsWrapper}>
                  <Button variant={'text'} className={classNames.backBtn} onClick={onClickBackBtn}>
                    {t(TranslationKey.Cancel)}
                  </Button>

                  <Button
                    success
                    disabled={disableSubmit}
                    className={classNames.successBtn}
                    onClick={() => onEditSubmit(formFields, images)}
                  >
                    {t(TranslationKey.Edit)}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className={classNames.footerWrapper}>
              <div className={classNames.footerRightWrapper}>
                <div className={classNames.buttonsWrapper}>
                  <Button
                    tooltipInfoContent={
                      curStep === stepVariant.STEP_TWO
                        ? t(TranslationKey['Back to Step 1'])
                        : t(TranslationKey['Cancel request creation'])
                    }
                    variant={'text'}
                    className={classNames.backBtn}
                    onClick={onClickBackBtn}
                  >
                    {curStep === stepVariant.STEP_TWO ? t(TranslationKey['Back to editing']) : t(TranslationKey.Cancel)}
                  </Button>

                  <Button
                    success
                    tooltipInfoContent={
                      curStep === stepVariant.STEP_TWO
                        ? t(TranslationKey['Creates a completed request'])
                        : t(TranslationKey['Go to Step 2'])
                    }
                    disabled={disableSubmit}
                    className={classNames.successBtn}
                    onClick={onSuccessSubmit}
                  >
                    {curStep === stepVariant.STEP_TWO ? (
                      t(TranslationKey['Create a request'])
                    ) : (
                      <div className={classNames.successBtnTextWrapper}>
                        <Typography>{t(TranslationKey.Next)}</Typography>
                        <img
                          src="/assets/icons/right-arrow.svg"
                          className={cx(classNames.successBtnArrow, {
                            [classNames.disablesBtnArrow]: disableSubmit,
                          })}
                        />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}

        {curStep === stepVariant.STEP_TWO && (
          <div className={classNames.footerWrapper}>
            <div className={classNames.footerRightWrapper}>
              <div className={classNames.buttonsWrapper}>
                <Button
                  tooltipInfoContent={
                    curStep === stepVariant.STEP_TWO
                      ? t(TranslationKey['Back to Step 1'])
                      : t(TranslationKey['Cancel request creation'])
                  }
                  variant={'text'}
                  className={classNames.backBtn}
                  onClick={onClickBackBtn}
                >
                  {curStep === stepVariant.STEP_TWO ? t(TranslationKey.Back) : t(TranslationKey.Cancel)}
                </Button>

                <Button
                  success
                  tooltipInfoContent={
                    curStep === stepVariant.STEP_TWO
                      ? t(TranslationKey['Creates a completed request'])
                      : t(TranslationKey['Go to Step 2'])
                  }
                  disabled={disableSubmit}
                  className={classNames.successBtn}
                  onClick={onSuccessSubmit}
                >
                  {curStep === stepVariant.STEP_TWO ? (
                    t(TranslationKey['Create a request'])
                  ) : (
                    <div className={classNames.successBtnTextWrapper}>
                      <Typography>{t(TranslationKey.Next)}</Typography>
                      <img
                        src="/assets/icons/right-arrow.svg"
                        className={cx(classNames.successBtnArrow, {
                          [classNames.disablesBtnArrow]: disableSubmit,
                        })}
                      />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
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
          onClickResetPerformerBtn={onChangeField('request')('announcementId')}
        />
      </Modal>
    </div>
  )
}
