import dayjs from 'dayjs'
import { memo, useEffect, useRef, useState } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import {
  Checkbox,
  Input,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

import { MAX_COMMENT_LEGTH } from '@constants/requests/request'
import { difficultyLevelByCode, difficultyLevelTranslate } from '@constants/statuses/difficulty-level'
import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { CheckRequestByTypeExists } from '@components/forms/check-request-by-type-exists'
import { ChoiceOfPerformerModal } from '@components/modals/choice-of-performer-modal'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { DatePickerTime, NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field'
import { MasterUserItem } from '@components/shared/master-user-item'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { ScrollToTopOrBottom } from '@components/shared/scroll-to-top-or-bottom/scroll-to-top-or-bottom'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { SelectProductButton } from '@components/shared/selects/with-search-select/select-product-button'
import { Text } from '@components/shared/text'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { calcNumberMinusPercent, calcPercentAfterMinusNumbers } from '@utils/calculation'
import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { formatDateForShowWithoutParseISO } from '@utils/date-time'
import { replaceCommaByDot, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './create-or-edit-request-content.style'

const stepVariant = {
  STEP_ONE: 'STEP_ONE',
  STEP_TWO: 'STEP_TWO',
}

export const CreateOrEditRequestContent = memo(props => {
  const {
    announcements,
    permissionsData,
    masterUsersData,
    choosenAnnouncements,
    executor,
    requestToEdit,
    history,
    platformSettingsData,
    showProgress,
    progressValue,
    mainContentRef,
    checkRequestByTypeExists,
    createRequestForIdeaData,
    getMasterUsersData,
    loadMorePermissionsDataHadler,
    onClickSubmitSearch,
    onClickExistingRequest,
    onClickChoosePerformer,
    onClickThumbnail,
    onCreateSubmit,
    onEditSubmit,
  } = props
  const { classes: styles, cx } = useStyles()

  const mainContentRefElement = mainContentRef.current

  const componentRef = useRef(null)

  const [showScrollUp, setShowScrollUp] = useState(false)
  const [showScrollDown, setShowScrollDown] = useState(false)
  const [showCheckRequestByTypeExists, setShowCheckRequestByTypeExists] = useState(false)

  const [announcementsData, setAnnouncementsData] = useState([])

  const [announcement, setAnnouncement] = useState(choosenAnnouncements || undefined)
  const [chosenExecutor, setChosenExecutor] = useState(requestToEdit?.request?.executor || executor || undefined)

  const [openModal, setOpenModal] = useState(false)

  const [curStep, setCurStep] = useState(stepVariant.STEP_ONE)

  const handleScroll = () => {
    const scrollTop = mainContentRefElement.scrollTop
    const scrollHeight = mainContentRefElement.scrollHeight
    const clientHeight = mainContentRefElement.clientHeight

    setShowScrollUp(scrollTop > 100)
    setShowScrollDown(scrollHeight - scrollTop - clientHeight > 100)
  }

  useEffect(() => {
    if (mainContentRefElement) {
      mainContentRefElement.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (mainContentRefElement) {
        mainContentRefElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [mainContentRefElement])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === componentRef.current) {
          componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
        }
      }
    })

    resizeObserver.observe(componentRef.current)

    return () => {
      if (componentRef?.current) {
        resizeObserver?.unobserve(componentRef.current)
      }
    }
  }, [SettingsModel.languageTag])

  const createImagesArray = () => {
    if (requestToEdit?.request?.media?.length) {
      return requestToEdit?.request?.media?.map(el => ({
        file: el?.fileLink,
        comment: el?.commentByClient,
        commentByPerformer: el?.commentByPerformer,
        _id: el?._id,
      }))
    } else {
      return []
    }
  }

  const [images, setImages] = useState(createImagesArray())

  useEffect(() => {
    setImages(createImagesArray())
  }, [requestToEdit])

  const showScrollArrows = curStep === stepVariant.STEP_ONE && (showScrollUp || showScrollDown)

  useEffect(() => {
    if (requestToEdit) {
      onClickChoosePerformer(requestToEdit?.request.typeTask)
    }
  }, [])

  useEffect(() => {
    if (announcements?.length) {
      setAnnouncementsData(announcements)
    }
  }, [announcements])

  useEffect(() => {
    setChosenExecutor(requestToEdit?.request?.executor || executor)
  }, [requestToEdit?.request?.executor, executor])

  const getSourceFormFields = () => ({
    request: {
      title: requestToEdit?.request?.title || '',
      maxAmountOfProposals: requestToEdit?.request?.maxAmountOfProposals || '',
      price: requestToEdit?.request?.price || '',
      timeoutAt: requestToEdit?.request?.timeoutAt || null,
      direction: requestToEdit?.request?.direction || 'IN',
      timeLimitInMinutes: requestToEdit?.request?.timeLimitInMinutes || 60,
      roles: requestToEdit?.request?.roles?.length ? requestToEdit?.request?.roles : [10, 35],
      needCheckBySupervisor: requestToEdit?.request?.needCheckBySupervisor || false,
      restrictMoreThanOneProposalFromOneAssignee:
        requestToEdit?.request?.restrictMoreThanOneProposalFromOneAssignee || false,
      typeTask: requestToEdit?.request?.typeTask || choosenAnnouncements?.type || null,
      asin: requestToEdit
        ? requestToEdit?.request?.asin
        : createRequestForIdeaData
        ? createRequestForIdeaData?.asin
        : undefined,
      priceAmazon: requestToEdit?.request?.priceAmazon || 0,
      cashBackInPercent: requestToEdit?.request?.cashBackInPercent || 0,
      announcementId: requestToEdit?.request?.announcementId || undefined,
      productId: requestToEdit
        ? requestToEdit?.request?.productId
        : createRequestForIdeaData
        ? createRequestForIdeaData?.productId
        : undefined,
      withoutConfirmation: requestToEdit?.request?.withoutConfirmation || false,
      priority: requestToEdit?.request?.priority || 20,
      executorId: requestToEdit?.request?.executor?._id || executor?._id || null,

      discountedPrice: requestToEdit
        ? toFixed(
            calcNumberMinusPercent(requestToEdit?.request?.priceAmazon, requestToEdit?.request?.cashBackInPercent),
            2,
          )
        : 0,
      taskComplexity: requestToEdit?.request?.taskComplexity || 20,
    },
    details: {
      conditions: requestToEdit?.details?.conditions || '',
      linksToMediaFiles: requestToEdit?.details?.linksToMediaFiles || [],
    },
  })

  const [formFields, setFormFields] = useState(getSourceFormFields())

  const [requestIds, setRequestIds] = useState([])

  useEffect(() => {
    setFormFields(getSourceFormFields())
  }, [])

  useEffect(() => {
    setAnnouncement(choosenAnnouncements)

    const newFormFields = { ...formFields }
    newFormFields.request.typeTask = choosenAnnouncements?.type || null
    setFormFields(newFormFields)
  }, [choosenAnnouncements])

  useEffect(() => {
    if (!requestToEdit) {
      return
    }
    setFormFields(getSourceFormFields())
  }, [choosenAnnouncements, requestToEdit])

  useEffect(() => {
    if (formFields.request.typeTask) {
      getMasterUsersData(formFields.request.typeTask)
    }
  }, [formFields.request.typeTask])

  const [deadlineError, setDeadlineError] = useState(false)

  const onChangeField = section => fieldName => event => {
    const newFormFields = { ...formFields }

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
        newFormFields.request.executorId = ''
        setAnnouncement('')
        setChosenExecutor(undefined)

        newFormFields[section][fieldName] = event.target.value
        // getMasterUsersData(event.target.value)

        if (`${event.target.value}` !== `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}`) {
          newFormFields.request.discountedPrice = 0
          newFormFields.request.cashBackInPercent = 0
          newFormFields.request.priceAmazon = 0
        }
      } else if (['executorId'].includes(fieldName)) {
        setChosenExecutor(event)
        newFormFields[section][fieldName] = event?._id
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

  const [withPublish, setWithPublish] = useState({ withPublish: false })
  const onSuccessSubmit = withPublish => {
    if (isDeadlineError) {
      setDeadlineError(!deadlineError)
    } else {
      if (curStep === stepVariant.STEP_ONE) {
        setCurStep(stepVariant.STEP_TWO)
      } else {
        onCreateSubmit(formFields, images, withPublish, announcement)
      }
    }
  }

  const onClickCreate = async ({ withPublish }) => {
    await setWithPublish(withPublish)
    const result = await checkRequestByTypeExists(formFields.request.typeTask, formFields.request.productId)
    if (result.length) {
      setRequestIds(result)
      setShowCheckRequestByTypeExists(!showCheckRequestByTypeExists)
    } else {
      onSuccessSubmit(withPublish)
    }
  }

  const onClickBackBtn = () => {
    if (curStep === stepVariant.STEP_ONE) {
      if (createRequestForIdeaData?.productId) {
        history.push('/client/freelance/my-requests')
      } else {
        history.goBack()
      }
    } else {
      if (isDeadlineError) {
        setDeadlineError(!deadlineError)
      } else {
        setCurStep(stepVariant.STEP_ONE)
      }
    }
  }

  const disableSubmit =
    !formFields.request.title ||
    formFields.request.title.length > 100 ||
    !formFields.request.maxAmountOfProposals ||
    !formFields.request.timeLimitInMinutes ||
    !formFields.request.price ||
    !formFields.request.timeoutAt ||
    !formFields.details.conditions ||
    formFields.details.conditions >= 6000 ||
    !formFields.details.conditions.length ||
    !formFields.request.typeTask ||
    !formFields.request.productId ||
    formFields?.request?.timeoutAt?.toString() === 'Invalid Date' ||
    platformSettingsData?.requestMinAmountPriceOfProposal > formFields?.request?.price

  const minDate = dayjs().add(1, 'day')

  return (
    <div ref={componentRef} className={styles.mainWrapper}>
      <div className={styles.mainSubWrapper}>
        {showScrollArrows && (
          <ScrollToTopOrBottom
            showScrollUp={showScrollUp}
            showScrollDown={showScrollDown}
            customStyles={{ bottom: '180px', right: '55px' }}
            сomponentWillScroll={componentRef}
          />
        )}
        <div className={styles.headerWrapper}>
          <Typography className={cx(styles.mainTitle, { [styles.mainTitleStapTwo]: curStep === stepVariant.STEP_TWO })}>
            {curStep === stepVariant.STEP_TWO
              ? t(TranslationKey['The request is ready'])
              : t(TranslationKey['We will find a reliable performer for you'])}
          </Typography>

          {curStep === stepVariant.STEP_TWO ? (
            <Typography className={styles.mainSubStepTwoTitle}>
              {t(TranslationKey["All that's left is to check the data"])}
            </Typography>
          ) : (
            <Typography className={styles.mainSubTitle}>
              {t(TranslationKey['By getting to know your needs, we will select the best performer for your task.'])}
            </Typography>
          )}
        </div>

        <div className={styles.mainContentWrapper}>
          {curStep === stepVariant.STEP_ONE && (
            <div className={styles.mainSubRightWrapper}>
              <div className={styles.middleWrapper}>
                <Field
                  tooltipInfoContent={t(TranslationKey['Future request title'])}
                  inputProps={{ maxLength: 100 }}
                  placeholder={t(TranslationKey['Request title'])}
                  label={t(TranslationKey['Request title']) + '*'}
                  className={styles.nameField}
                  containerClasses={styles.nameFieldContainer}
                  labelClasses={styles.spanLabelSmall}
                  value={formFields.request.title}
                  onChange={onChangeField('request')('title')}
                />

                <div className={styles.nameFieldWrapper}>
                  <Field
                    label={t(TranslationKey['Difficulty level'])}
                    labelClasses={styles.spanLabelSmall}
                    tooltipInfoContent={t(TranslationKey['Difficulty level'])}
                    containerClasses={styles.difficultylevelContainer}
                    inputComponent={
                      <Select
                        displayEmpty
                        value={formFields.request.taskComplexity}
                        className={styles.requestTypeField}
                        input={<Input startAdornment={<InputAdornment position="start" />} />}
                        onChange={onChangeField('request')('taskComplexity')}
                      >
                        <MenuItem disabled value={null}>
                          {t(TranslationKey['Select from the list'])}
                        </MenuItem>

                        {Object.keys(difficultyLevelByCode).map((difficultyLevel, difficultyLevelIndex) => (
                          <MenuItem key={difficultyLevelIndex} value={difficultyLevel}>
                            {difficultyLevelTranslate(difficultyLevelByCode[difficultyLevel])}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                  />

                  <Field
                    tooltipInfoContent={t(TranslationKey['Select a product card for the order'])}
                    label={t(TranslationKey.ASIN) + '*'}
                    labelClasses={styles.spanLabelSmall}
                    containerClasses={styles.asinContainer}
                    className={styles.nameField}
                    inputComponent={
                      <WithSearchSelect
                        grayBorder
                        blackSelectedItem
                        darkIcon
                        chosenItemNoHover
                        CustomButton={componentProps => <SelectProductButton {...componentProps} />}
                        data={permissionsData || []}
                        width={'100%'}
                        customSubMainWrapper={styles.customSubMainWrapperAsin}
                        customSearchInput={styles.customSearchInput}
                        selectedItemName={
                          formFields?.request?.asin ||
                          (formFields?.request?.asin === '' && t(TranslationKey.Missing)) ||
                          t(TranslationKey['Select ASIN'])
                        }
                        onScrollItemList={loadMorePermissionsDataHadler}
                        onClickSubmitSearch={onClickSubmitSearch}
                        onClickSelect={el => {
                          onChangeField('request')('asin')(el.asin)
                          onChangeField('request')('productId')(el._id)
                        }}
                      />
                    }
                  />

                  <Field
                    label={t(TranslationKey['Request type']) + '*'}
                    labelClasses={styles.spanLabelSmall}
                    tooltipInfoContent={t(TranslationKey['Current request type'])}
                    containerClasses={styles.requestTypeContainer}
                    inputComponent={
                      <Select
                        displayEmpty
                        value={formFields.request.typeTask + '' ?? null}
                        className={styles.requestTypeField}
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
                </div>

                {`${formFields?.request?.typeTask}` ===
                  `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` && (
                  <div className={styles.bloggerFieldsWrapper}>
                    <Field
                      className={styles.nameField}
                      containerClasses={styles.bloggerFieldContainer}
                      inputProps={{ maxLength: 8 }}
                      label={t(TranslationKey['Price on Amazon']) + ', $'}
                      labelClasses={styles.spanLabelSmall}
                      value={formFields.request.priceAmazon}
                      onChange={onChangeField('request')('priceAmazon')}
                    />

                    <Field
                      className={styles.nameField}
                      containerClasses={styles.bloggerFieldContainer}
                      inputProps={{ maxLength: 8 }}
                      label={t(TranslationKey['Discounted price']) + ', $'}
                      labelClasses={styles.spanLabelSmall}
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
                      className={styles.nameField}
                      containerClasses={styles.bloggerFieldContainer}
                      inputProps={{ maxLength: 8 }}
                      label={t(TranslationKey['CashBack Percentage']) + ', %'}
                      labelClasses={styles.spanLabelSmall}
                      value={toFixed(formFields.request.cashBackInPercent, 2)}
                      onChange={e => {
                        if (Number(e.target.value) <= 100 && formFields.request.priceAmazon) {
                          onChangeField('request')('cashBackInPercent')(e)
                        }
                      }}
                    />
                  </div>
                )}

                <div className={styles.imageFileInputWrapper}>
                  <UploadFilesInput
                    minimized
                    fullWidth
                    withComment
                    images={images}
                    setImages={setImages}
                    maxNumber={50}
                    maxHeight={160}
                    addFilesButtonTitle={t(TranslationKey['Add file'])}
                  />
                </div>

                <div className={styles.descriptionFieldWrapper}>
                  <CustomTextEditor
                    verticalResize
                    maxlength={MAX_COMMENT_LEGTH}
                    conditions={formFields.details.conditions}
                    onChangeConditions={onChangeField('details')('conditions')}
                  />
                </div>
              </div>

              <div className={styles.rightWrapper}>
                <div>
                  <div className={styles.dateAndTimeWrapper}>
                    <Field
                      containerClasses={styles.dateAndTimeContainer}
                      tooltipInfoContent={t(TranslationKey['Indicate the date by which proposals may be received'])}
                      label={`${t(TranslationKey['When do you want results?'])}*`}
                      labelClasses={styles.spanLabelSmall}
                      inputComponent={
                        <div>
                          <NewDatePicker
                            disablePast
                            minDate={minDate}
                            className={styles.dateField}
                            value={formFields.request.timeoutAt}
                            onChange={e => {
                              onChangeField('request')('timeoutAt')(e)
                            }}
                          />
                          {deadlineError && (
                            <span className={styles.deadlineErrorText}>
                              {t(TranslationKey['The deadline cannot be earlier than the current date'])}
                            </span>
                          )}
                        </div>
                      }
                    />
                    <Field
                      containerClasses={styles.dateAndTimeContainer}
                      tooltipInfoContent={t(TranslationKey['Indicate the time until which offers may be received'])}
                      label={`${t(TranslationKey['What time do you want the result?'])}*`}
                      labelClasses={styles.spanLabelSmall}
                      inputComponent={
                        <div>
                          <DatePickerTime
                            className={styles.dateField}
                            value={formFields.request.timeoutAt}
                            onChange={onChangeField('request')('timeoutAt')}
                          />
                          {deadlineError && (
                            <span className={styles.deadlineErrorText}>
                              {t(TranslationKey['The deadline cannot be earlier than the current date'])}
                            </span>
                          )}
                        </div>
                      }
                    />
                  </div>

                  <div className={styles.priceAndAmountWrapper}>
                    <Field
                      tooltipInfoContent={t(TranslationKey['How many proposals are you willing to consider'])}
                      inputProps={{ maxLength: 8 }}
                      label={`${t(TranslationKey['Enter the number of proposals'])} *`}
                      labelClasses={styles.spanLabelSmall}
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
                      inputProps={{ maxLength: 8 }}
                      label={`${t(TranslationKey['Enter the offer price'])}`}
                      labelClasses={styles.spanLabelSmall}
                      value={formFields.request.price}
                      onChange={onChangeField('request')('price')}
                    />
                  </div>

                  <div className={styles.checkboxAndButtonWrapper}>
                    <div className={styles.checkboxProposalWrapper}>
                      <div className={styles.checkboxWrapper} onClick={onChangeField('request')('withoutConfirmation')}>
                        <Checkbox color="primary" checked={formFields.request.withoutConfirmation} />
                        <Text
                          tooltipPosition={'corner'}
                          className={styles.textInCheckbox}
                          tooltipInfoContent={t(
                            TranslationKey['Allow the performer to take the request for work without confirmation'],
                          )}
                        >
                          {t(TranslationKey['Allow the performer to take the request for work without confirmation'])}
                        </Text>
                      </div>
                    </div>

                    <div className={styles.checkboxProposalWrapper}>
                      <div
                        className={styles.checkboxWrapper}
                        onClick={onChangeField('request')('restrictMoreThanOneProposalFromOneAssignee')}
                      >
                        <Checkbox
                          color="primary"
                          checked={formFields.request.restrictMoreThanOneProposalFromOneAssignee}
                        />
                        <Text
                          tooltipPosition={'corner'}
                          className={styles.textInCheckbox}
                          tooltipInfoContent={t(
                            TranslationKey['After providing the result, the same performer may make a new proposal'],
                          )}
                        >
                          {t(TranslationKey['Prohibit multiple performances by the same performer'])}
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className={cx(styles.checkboxAndButtonWrapper, styles.checkboxAndButtonWrapperMarginTop)}>
                    <div className={styles.checkboxProposalWrapper}>
                      <div
                        className={styles.checkboxWrapper}
                        onClick={() => {
                          if (formFields.request.priority === 20) {
                            onChangeField('request')('priority')({ target: { value: 30 } })
                          } else {
                            onChangeField('request')('priority')({ target: { value: 20 } })
                          }
                        }}
                      >
                        <Checkbox color="primary" checked={formFields.request.priority === 30} />
                        <Text className={styles.priorityText} tooltipPosition={'corner'}>
                          {t(TranslationKey['Set urgent priority'])}
                          <img src="/assets/icons/fire.svg" />
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className={cx(styles.checkboxAndButtonWrapper, styles.checkboxAndButtonWrapperMarginTop)}>
                    <Field
                      label={t(TranslationKey.Performer)}
                      labelClasses={styles.spanLabelSmall}
                      containerClasses={styles.executorContainer}
                      className={styles.nameField}
                      inputComponent={
                        announcement?._id ? (
                          <div className={styles.executorWrapper}>
                            <MasterUserItem
                              id={chosenExecutor?._id}
                              name={chosenExecutor?.name}
                              rating={chosenExecutor?.rating}
                            />

                            <Button
                              disabled={!formFields?.request?.typeTask}
                              variant={'contained'}
                              className={styles.changePerformerBtn}
                              onClick={async () => {
                                await onClickChoosePerformer(formFields.request.typeTask)
                                setOpenModal(true)
                              }}
                            >
                              {t(TranslationKey['Change announcement'])}
                            </Button>
                          </div>
                        ) : (
                          <WithSearchSelect
                            darkIcon
                            grayBorder
                            masterUserSelect
                            blackSelectedItem
                            chosenItemNoHover
                            width={'100%'}
                            disabled={!formFields?.request?.typeTask}
                            data={masterUsersData}
                            searchOnlyFields={['name']}
                            customSubMainWrapper={styles.customSubMainWrapper}
                            customSearchInput={styles.customSearchInput}
                            selectedItemName={
                              chosenExecutor ? (
                                <MasterUserItem
                                  id={chosenExecutor?._id}
                                  name={chosenExecutor?.name}
                                  rating={chosenExecutor?.rating}
                                />
                              ) : (
                                t(TranslationKey['Choose an executor'])
                              )
                            }
                            onClickSelect={el => {
                              onChangeField('request')('executorId')(el)
                              setAnnouncement(undefined)
                            }}
                            onClickNotChosen={() => {
                              onChangeField('request')('executorId')(undefined)
                              setAnnouncement(undefined)
                            }}
                          />
                        )
                      }
                    />

                    <Field
                      containerClasses={styles.executorContainer}
                      label={`${t(TranslationKey.Announcement)}`}
                      labelClasses={styles.spanLabelSmall}
                      inputComponent={
                        <div className={styles.performerAndButtonWrapper}>
                          {announcement?.title && (
                            <p className={styles.performerDescriptionText}>{announcement?.title}</p>
                          )}

                          {!announcement?._id && (
                            <Button
                              disabled={!formFields?.request?.typeTask}
                              variant={'contained'}
                              className={styles.changePerformerBtn}
                              onClick={async () => {
                                await onClickChoosePerformer(formFields.request.typeTask)
                                setOpenModal(true)
                              }}
                            >
                              {t(TranslationKey['Select announcement'])}
                            </Button>
                          )}
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {curStep === stepVariant.STEP_TWO && (
            <div className={styles.mainTwoStepWrapper}>
              <div className={styles.mainSubRightTwoStepWrapper}>
                <div className={styles.adviceWrapper}>
                  <Typography className={styles.adviceTitle}>{t(TranslationKey['Choosing a performer:'])}</Typography>

                  <List>
                    <ListItem className={styles.adviceListItem}>
                      <CircleIcon color="primary" classes={{ root: styles.listItemDot }} />

                      <ListItemText className={styles.adviceListItemText}>
                        {t(TranslationKey['Read the reviews about the performer'])}
                      </ListItemText>
                    </ListItem>
                    <ListItem className={styles.adviceListItem}>
                      <CircleIcon color="primary" classes={{ root: styles.listItemDot }} />

                      <ListItemText className={styles.adviceListItemText}>
                        {t(
                          TranslationKey[
                            'Do not confirm the result of the work until you are sure that it is complete'
                          ],
                        )}
                      </ListItemText>
                    </ListItem>
                    <ListItem className={styles.adviceListItem}>
                      <CircleIcon color="primary" classes={{ root: styles.listItemDot }} />

                      <ListItemText className={styles.adviceListItemText}>
                        {t(
                          TranslationKey[
                            'Try to study market prices and choose a performer and choose relevant terms and conditions'
                          ],
                        )}
                      </ListItemText>
                    </ListItem>
                  </List>
                  <div className={styles.trainingTextWrapper}>
                    <Typography className={styles.trainingText}>
                      {t(TranslationKey['You can also take a free'])}
                      <Link className={styles.trainingLink}>{t(TranslationKey.Training)}</Link>
                      {t(TranslationKey['on our freelance exchange.'])}
                    </Typography>
                  </div>
                </div>

                <div className={styles.middleStepTwoMainWrapper}>
                  <div className={styles.middleStepTwoWrapper}>
                    <div className={styles.middleStepTwoSubWrapper}>
                      <div className={styles.titleAndAsinWrapper}>
                        <Field
                          label={t(TranslationKey.Title)}
                          labelClasses={styles.spanLabel}
                          containerClasses={styles.titleContainer}
                          inputComponent={
                            <Typography className={cx(styles.twoStepFieldResult, styles.requestTitle)}>
                              {formFields.request.title}
                            </Typography>
                          }
                        />
                        {formFields?.request?.asin && (
                          <Field
                            label={t(TranslationKey.ASIN)}
                            labelClasses={cx(styles.spanLabel, styles.fitContentContainer)}
                            containerClasses={styles.asinContainerStapTwo}
                            inputComponent={
                              <AsinOrSkuLink
                                withCopyValue
                                link={formFields?.request?.asin}
                                textStyles={styles.copyAsinlinkSpan}
                              />
                            }
                          />
                        )}
                      </div>

                      <Typography className={styles.imagesTitle}>{t(TranslationKey.Files)}</Typography>
                      <PhotoAndFilesSlider
                        smallSlider
                        customSlideHeight={98}
                        files={images.map(el => el.file)}
                        imagesTitles={images.map(el => el.comment)}
                      />
                    </div>

                    <div className={styles.rightTwoStepMainWrapper}>
                      <div className={styles.rightTwoStepWrapper}>
                        {`${formFields?.request?.typeTask}` ===
                          `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
                        formFields.request.priceAmazon &&
                        formFields.request.priceAmazon !== '0' ? (
                          <div className={styles.infoColumn}>
                            {`${formFields?.request?.typeTask}` ===
                              `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
                            formFields?.request?.priceAmazon &&
                            formFields?.request?.priceAmazon !== '0' ? (
                              <Field
                                label={t(TranslationKey['Price per product'])}
                                labelClasses={styles.spanLabel}
                                containerClasses={styles.fitContentContainer}
                                inputComponent={
                                  <div className={styles.pricesWrapper}>
                                    {formFields.request.discountedPrice && formFields.request.cashBackInPercent ? (
                                      <Typography
                                        className={cx(styles.twoStepFieldResult, {
                                          [styles.newPrice]:
                                            formFields.request.discountedPrice && formFields.request.cashBackInPercent,
                                        })}
                                      >
                                        {'$ ' + toFixed(+formFields.request.discountedPrice, 2)}
                                      </Typography>
                                    ) : null}

                                    <Typography
                                      className={cx(styles.twoStepFieldResult, {
                                        [styles.oldPrice]:
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
                                containerClasses={styles.fitContentContainer}
                                labelClasses={styles.spanLabel}
                                inputComponent={
                                  <Typography className={styles.twoStepFieldResult}>
                                    {toFixed(formFields.request.cashBackInPercent, 0) + ' %'}
                                  </Typography>
                                }
                              />
                            ) : null}
                          </div>
                        ) : null}

                        <div className={styles.infoColumn}>
                          <Field
                            label={t(TranslationKey['Request type'])}
                            containerClasses={styles.fitContentContainer}
                            labelClasses={styles.spanLabel}
                            inputComponent={
                              <Typography className={styles.twoStepFieldResult}>
                                {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[formFields.request.typeTask])}
                              </Typography>
                            }
                          />

                          <Field
                            label={t(TranslationKey['Number of proposals'])}
                            labelClasses={styles.spanLabel}
                            containerClasses={styles.fitContentContainer}
                            inputComponent={
                              <Typography className={styles.twoStepFieldResult}>
                                {formFields.request.maxAmountOfProposals}
                              </Typography>
                            }
                          />
                        </div>

                        <div className={styles.infoColumn}>
                          <Field
                            label={t(TranslationKey['Request price']) + ', $'}
                            labelClasses={styles.spanLabel}
                            containerClasses={styles.fitContentContainer}
                            inputComponent={
                              <Typography className={styles.twoStepFieldResult}>
                                {formFields.request.price + '$'}
                              </Typography>
                            }
                          />

                          <Field
                            label={t(TranslationKey['Deadline for the request'])}
                            containerClasses={styles.fitContentContainer}
                            labelClasses={styles.spanLabel}
                            inputComponent={
                              <Typography className={styles.twoStepFieldResult}>
                                {formFields.request.timeoutAt &&
                                  formatDateForShowWithoutParseISO(formFields.request.timeoutAt)}
                              </Typography>
                            }
                          />
                        </div>
                      </div>
                      <div className={styles.infoTextWrapper}>
                        {announcement?._id ? (
                          <div className={styles.performerWrapperStepTwo}>
                            <Typography className={styles.spanLabelSmall}>{t(TranslationKey.Performer)}</Typography>

                            <MasterUserItem
                              id={chosenExecutor?._id}
                              name={chosenExecutor?.name}
                              rating={chosenExecutor?.rating}
                            />

                            <Typography className={styles.performerDescriptionText}>
                              {announcement?.description}
                            </Typography>
                          </div>
                        ) : chosenExecutor ? (
                          <div className={styles.performerWrapperStepTwo}>
                            <Typography className={styles.spanLabelSmall}>{t(TranslationKey.Performer)}</Typography>

                            <MasterUserItem
                              id={chosenExecutor?._id}
                              name={chosenExecutor?.name}
                              rating={chosenExecutor?.rating}
                            />
                          </div>
                        ) : null}

                        {formFields.request.needCheckBySupervisor && (
                          <div className={styles.selectedCheckbox}>
                            <Checkbox checked disabled color="primary" />
                            <Typography className={styles.restrictMoreThanOneProposal}>
                              {t(TranslationKey['A supervisor check is necessary'])}
                            </Typography>
                          </div>
                        )}

                        {formFields.request.restrictMoreThanOneProposalFromOneAssignee && (
                          <div className={styles.selectedCheckbox}>
                            <Checkbox checked disabled color="primary" />
                            <Typography className={styles.restrictMoreThanOneProposal}>
                              {t(TranslationKey['Multiple performances by the same performer are prohibited'])}
                            </Typography>
                          </div>
                        )}

                        {formFields.request.withoutConfirmation && (
                          <div className={styles.selectedCheckbox}>
                            <Checkbox checked disabled color="primary" />
                            <Typography className={styles.restrictMoreThanOneProposal}>
                              {t(
                                TranslationKey['Allow the performer to take the request for work without confirmation'],
                              )}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.performerDescriptionWrapperTextStepTwo}>
                    <Typography className={styles.spanLabel}>
                      {t(TranslationKey['Description of your request'])}
                    </Typography>

                    <CustomTextEditor
                      readOnly
                      conditions={formFields.details.conditions}
                      editorClassName={styles.editorClassName}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {curStep === stepVariant.STEP_ONE &&
          (requestToEdit ? (
            <div className={styles.footerWrapper}>
              <div className={styles.footerRightWrapper}>
                <div className={styles.buttonsWrapper}>
                  <Button variant={'text'} className={styles.backBtn} onClick={onClickBackBtn}>
                    {t(TranslationKey.Cancel)}
                  </Button>

                  <Button
                    success
                    disabled={disableSubmit}
                    className={styles.successBtn}
                    onClick={() => onEditSubmit(formFields, images, announcement)}
                  >
                    {t(TranslationKey.Edit)}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.footerWrapper}>
              <div className={styles.footerRightWrapper}>
                <div className={styles.buttonsWrapper}>
                  <Button
                    tooltipInfoContent={
                      curStep === stepVariant.STEP_TWO
                        ? t(TranslationKey['Back to Step 1'])
                        : t(TranslationKey['Cancel request creation'])
                    }
                    variant={'text'}
                    className={styles.backBtn}
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
                    className={styles.successBtn}
                    onClick={onSuccessSubmit}
                  >
                    {curStep === stepVariant.STEP_TWO ? (
                      t(TranslationKey['Create a request'])
                    ) : (
                      <div className={styles.successBtnTextWrapper}>
                        <Typography>{t(TranslationKey.Next)}</Typography>
                        <img
                          src="/assets/icons/right-arrow.svg"
                          className={cx(styles.successBtnArrow, {
                            [styles.disablesBtnArrow]: disableSubmit,
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
          <div className={styles.footerWrapper}>
            <div className={styles.footerRightWrapper}>
              <div className={styles.buttonsWrapper}>
                <Button
                  tooltipInfoContent={
                    curStep === stepVariant.STEP_TWO
                      ? t(TranslationKey['Back to Step 1'])
                      : t(TranslationKey['Cancel request creation'])
                  }
                  variant={'text'}
                  className={styles.backBtn}
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
                  className={styles.successBtn}
                  onClick={() => onClickCreate({ withPublish: false })}
                >
                  {curStep === stepVariant.STEP_TWO ? (
                    t(TranslationKey['Create a request'])
                  ) : (
                    <div className={styles.successBtnTextWrapper}>
                      <Typography>{t(TranslationKey.Next)}</Typography>
                      <img
                        src="/assets/icons/right-arrow.svg"
                        className={cx(styles.successBtnArrow, {
                          [styles.disablesBtnArrow]: disableSubmit,
                        })}
                      />
                    </div>
                  )}
                </Button>

                {curStep === stepVariant.STEP_TWO && (
                  <Button
                    success
                    disabled={disableSubmit}
                    className={styles.successBtn}
                    onClick={() => onClickCreate({ withPublish: true })}
                  >
                    {t(TranslationKey['Create and publish a request'])}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.steps}>
        <div className={styles.stepPagination}>
          <div className={styles.stepPaginationStartBar}></div>
          <div className={styles.stepPaginationBar}>
            <div className={styles.step} style={{ width: curStep === stepVariant.STEP_ONE ? '50%' : '100%' }}></div>
          </div>
          <div
            className={styles.stepPaginationEndBar}
            style={{ backgroundColor: curStep === stepVariant.STEP_TWO ? '#00B746' : '#c4c4c4' }}
          ></div>
        </div>
        <Typography className={styles.stepTitle}>
          {curStep === stepVariant.STEP_ONE ? `${t(TranslationKey.Step)} 1` : `${t(TranslationKey.Step)} 2`}
        </Typography>
      </div>
      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}

      <Modal openModal={openModal} setOpenModal={() => setOpenModal(!openModal)}>
        <ChoiceOfPerformerModal
          announcements={announcementsData}
          masterUsersData={masterUsersData}
          chosenExecutor={chosenExecutor}
          chosenAnnouncement={announcement}
          onClickThumbnail={onClickThumbnail}
          onClickSelectButton={(selectenService, chosenExecutor) => {
            if (selectenService) {
              setAnnouncement(selectenService)
              onChangeField('request')('executorId')(selectenService?.createdBy)
            } else {
              onChangeField('request')('executorId')(chosenExecutor)
              setAnnouncement(undefined)
            }
            setOpenModal(false)
          }}
          onClickResetPerformerBtn={() => {
            setAnnouncement(undefined)
            onChangeField('request')('executorId')(undefined)
          }}
          onClickCloseBtn={() => setOpenModal(false)}
        />
      </Modal>

      <Modal
        openModal={showCheckRequestByTypeExists}
        setOpenModal={() => setShowCheckRequestByTypeExists(!showCheckRequestByTypeExists)}
        dialogClassName={styles.dialogClassName}
      >
        <CheckRequestByTypeExists
          requestsData={requestIds}
          asin={formFields?.request?.asin}
          type={formFields.request.typeTask}
          onClickRequest={onClickExistingRequest}
          onClickContinue={() => onCreateSubmit(formFields, images, withPublish, announcement)}
          onClickCancel={() => setShowCheckRequestByTypeExists(!showCheckRequestByTypeExists)}
        />
      </Modal>
    </div>
  )
})
