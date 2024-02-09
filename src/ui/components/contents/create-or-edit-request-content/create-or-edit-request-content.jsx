import dayjs from 'dayjs'
import { memo, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Checkbox, Link, MenuItem, Select } from '@mui/material'

import { MAX_COMMENT_LEGTH } from '@constants/requests/request'
import { difficultyLevelByCode, difficultyLevelTranslate } from '@constants/statuses/difficulty-level'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { CheckRequestByTypeExists } from '@components/forms/check-request-by-type-exists'
import { ChoiceOfPerformerModal } from '@components/modals/choice-of-performer-modal'
import { GalleryRequestModal } from '@components/modals/gallery-request-modal'
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
import { CustomPlusIcon, FireIcon } from '@components/shared/svg-icons'
import { Text } from '@components/shared/text'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { calcNumberMinusPercent, calcPercentAfterMinusNumbers } from '@utils/calculation'
import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { formatDateForShowWithoutParseISO } from '@utils/date-time'
import { parseTextString, replaceCommaByDot, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { Specs } from '@typings/enums/specs'

import { useStyles } from './create-or-edit-request-content.style'

const stepVariant = {
  STEP_ONE: 'STEP_ONE',
  STEP_TWO: 'STEP_TWO',
}

export const CreateOrEditRequestContent = memo(props => {
  const {
    announcements,
    specs,
    permissionsData,
    masterUsersData,
    choosenAnnouncements,
    executor,
    requestToEdit,
    platformSettingsData,
    showProgress,
    progressValue,
    mainContentRef,
    showGalleryModal,
    productMedia,
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
    onClickAddMediaFromProduct,
    onTriggerGalleryModal,
  } = props
  const { classes: styles, cx } = useStyles()
  const history = useHistory()

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

  useEffect(() => {
    if (requestToEdit) {
      onClickChoosePerformer(requestToEdit?.request?.spec?.type)
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
      specId: requestToEdit?.request?.spec?._id || choosenAnnouncements?.spec?._id || '',
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

  useEffect(() => {
    setFormFields(getSourceFormFields())
  }, [requestToEdit])

  const [currentSpec, setCurrentSpec] = useState(null)

  useEffect(() => {
    const findCurrentSpec = specs?.find(spec => spec?._id === formFields.request.specId)

    if (findCurrentSpec) {
      getMasterUsersData(findCurrentSpec.type)
      setCurrentSpec(findCurrentSpec)
    }
  }, [formFields.request.specId, specs])

  const [requestIds, setRequestIds] = useState([])

  useEffect(() => {
    setAnnouncement(choosenAnnouncements)

    setFormFields(prevFormFields => ({
      ...prevFormFields,
      request: {
        ...prevFormFields.request,
        specId: choosenAnnouncements?.spec?._id || '',
      },
    }))
  }, [choosenAnnouncements])

  useEffect(() => {
    if (!requestToEdit) {
      return
    }
    setFormFields(getSourceFormFields())
  }, [choosenAnnouncements, requestToEdit])

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
      } else if (['specId'].includes(fieldName)) {
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
      if (isFirstStep) {
        setCurStep(stepVariant.STEP_TWO)
      } else {
        onCreateSubmit(formFields, images, withPublish, announcement)
      }
    }
  }

  const onClickCreate = async ({ withPublish }) => {
    await setWithPublish(withPublish)

    const result = await checkRequestByTypeExists(formFields.request.productId, currentSpec?.type)

    if (result?.length) {
      setRequestIds(result)
      setShowCheckRequestByTypeExists(!showCheckRequestByTypeExists)
    } else {
      onSuccessSubmit(withPublish)
    }
  }

  const onClickBackBtn = () => {
    if (isFirstStep) {
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
    parseTextString(formFields.details.conditions).length >= 6000 ||
    !parseTextString(formFields.details.conditions).length ||
    !formFields.request.specId ||
    !formFields.request.productId ||
    formFields?.request?.timeoutAt?.toString() === 'Invalid Date' ||
    platformSettingsData?.requestMinAmountPriceOfProposal > formFields?.request?.price

  const minDate = dayjs().add(1, 'day')
  const isFirstStep = curStep === stepVariant.STEP_ONE
  const isSecondStep = curStep === stepVariant.STEP_TWO
  const showScrollArrows = isFirstStep && (showScrollUp || showScrollDown)

  return (
    <div ref={componentRef} className={styles.wrapper}>
      <div className={styles.mainWrapper}>
        {showScrollArrows && (
          <ScrollToTopOrBottom
            showScrollUp={showScrollUp}
            showScrollDown={showScrollDown}
            customStyles={{ bottom: '180px', right: '55px' }}
            сomponentWillScroll={componentRef}
          />
        )}

        <div className={cx(styles.header, { [styles.headerColumn]: isSecondStep })}>
          <p className={styles.title}>
            {isSecondStep
              ? t(TranslationKey['The request is ready'])
              : t(TranslationKey['We will find a reliable performer for you'])}
          </p>

          <p className={styles.subTitle}>
            {isSecondStep
              ? t(TranslationKey["All that's left is to check the data"])
              : t(TranslationKey['By getting to know your needs, we will select the best performer for your task.'])}
          </p>
        </div>

        {isFirstStep && (
          <div className={styles.stepWrapper}>
            <div className={styles.stepContent}>
              <Field
                tooltipInfoContent={t(TranslationKey['Future request title'])}
                inputProps={{ maxLength: 100 }}
                placeholder={t(TranslationKey['Request title'])}
                label={t(TranslationKey['Request title']) + '*'}
                className={styles.field}
                labelClasses={styles.label}
                value={formFields.request.title}
                onChange={onChangeField('request')('title')}
              />

              <div className={styles.fields}>
                <Field
                  label={t(TranslationKey['Difficulty level'])}
                  labelClasses={styles.label}
                  tooltipInfoContent={t(TranslationKey['Difficulty level'])}
                  inputComponent={
                    <Select
                      displayEmpty
                      value={formFields.request.taskComplexity}
                      className={styles.field}
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
                  labelClasses={styles.label}
                  inputComponent={
                    <WithSearchSelect
                      grayBorder
                      blackSelectedItem
                      darkIcon
                      chosenItemNoHover
                      CustomButton={componentProps => <SelectProductButton {...componentProps} />}
                      data={permissionsData || []}
                      width="100%"
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
                  labelClasses={styles.label}
                  tooltipInfoContent={t(TranslationKey['Current request type'])}
                  inputComponent={
                    <Select
                      displayEmpty
                      value={formFields.request.specId || ''}
                      className={styles.field}
                      onChange={onChangeField('request')('specId')}
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

              {currentSpec?.type === Specs.BLOGGER && (
                <div className={styles.fields}>
                  <Field
                    className={styles.field}
                    inputProps={{ maxLength: 8 }}
                    label={t(TranslationKey['Price on Amazon']) + ', $'}
                    labelClasses={styles.label}
                    value={formFields.request.priceAmazon}
                    onChange={onChangeField('request')('priceAmazon')}
                  />

                  <Field
                    className={styles.field}
                    inputProps={{ maxLength: 8 }}
                    label={t(TranslationKey['Discounted price']) + ', $'}
                    labelClasses={styles.label}
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
                    className={styles.field}
                    inputProps={{ maxLength: 8 }}
                    label={t(TranslationKey['CashBack Percentage']) + ', %'}
                    labelClasses={styles.label}
                    value={toFixed(formFields.request.cashBackInPercent, 2)}
                    onChange={e => {
                      if (Number(e.target.value) <= 100 && formFields.request.priceAmazon) {
                        onChangeField('request')('cashBackInPercent')(e)
                      }
                    }}
                  />
                </div>
              )}

              <UploadFilesInput
                minimized
                fullWidth
                withComment
                images={images}
                setImages={setImages}
                maxNumber={50}
                maxHeight={120}
                addFilesButtonTitle={t(TranslationKey['Add file'])}
              />

              <div className={styles.defaultMarginTop}>
                <Button
                  disabled={!formFields.request?.productId}
                  className={styles.button}
                  onClick={() => onClickAddMediaFromProduct(formFields.request?.productId)}
                >
                  <CustomPlusIcon />
                  {t(TranslationKey['Add from product'])}
                </Button>
              </div>

              <CustomTextEditor
                title={t(TranslationKey['Describe your task']) + '*'}
                placeholder={t(TranslationKey['Task description'])}
                maxLength={MAX_COMMENT_LEGTH}
                value={formFields.details.conditions}
                onChange={onChangeField('details')('conditions')}
              />
            </div>

            <div className={styles.stepContent}>
              <div className={styles.fields}>
                <Field
                  tooltipInfoContent={t(TranslationKey['Indicate the date by which proposals may be received'])}
                  label={`${t(TranslationKey['When do you want results?'])}*`}
                  labelClasses={styles.label}
                  inputComponent={
                    <div>
                      <NewDatePicker
                        disablePast
                        minDate={minDate}
                        className={cx(styles.field, styles.datePicker)}
                        value={formFields.request.timeoutAt}
                        onChange={e => onChangeField('request')('timeoutAt')(e)}
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
                  tooltipInfoContent={t(TranslationKey['Indicate the time until which offers may be received'])}
                  label={`${t(TranslationKey['What time do you want the result?'])}*`}
                  labelClasses={styles.label}
                  inputComponent={
                    <div>
                      <DatePickerTime
                        className={cx(styles.field, styles.datePicker)}
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

              <div className={styles.fields}>
                <Field
                  tooltipInfoContent={t(TranslationKey['How many proposals are you willing to consider'])}
                  inputProps={{ maxLength: 8 }}
                  label={`${t(TranslationKey['Enter the number of proposals'])} *`}
                  labelClasses={styles.label}
                  className={styles.field}
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
                  labelClasses={styles.label}
                  className={styles.field}
                  value={formFields.request.price}
                  onChange={onChangeField('request')('price')}
                />
              </div>

              <div className={styles.fields}>
                <div className={styles.checkbox}>
                  <Checkbox
                    color="primary"
                    checked={formFields.request.withoutConfirmation}
                    onChange={onChangeField('request')('withoutConfirmation')}
                  />
                  <Text
                    tooltipPosition={'corner'}
                    className={styles.subTitle}
                    tooltipInfoContent={t(
                      TranslationKey['Allow the performer to take the request for work without confirmation'],
                    )}
                  >
                    {t(TranslationKey['Allow the performer to take the request for work without confirmation'])}
                  </Text>
                </div>

                <div className={styles.checkbox}>
                  <Checkbox
                    color="primary"
                    checked={formFields.request.restrictMoreThanOneProposalFromOneAssignee}
                    onChange={onChangeField('request')('restrictMoreThanOneProposalFromOneAssignee')}
                  />
                  <Text
                    tooltipPosition={'corner'}
                    className={styles.subTitle}
                    tooltipInfoContent={t(
                      TranslationKey['After providing the result, the same performer may make a new proposal'],
                    )}
                  >
                    {t(TranslationKey['Prohibit multiple performances by the same performer'])}
                  </Text>
                </div>
              </div>

              <div className={styles.fields}>
                <div className={cx(styles.checkbox, styles.defaultMarginTop)}>
                  <Checkbox
                    color="primary"
                    checked={formFields.request.priority === 30}
                    onChange={() => {
                      if (formFields.request.priority === 20) {
                        onChangeField('request')('priority')({ target: { value: 30 } })
                      } else {
                        onChangeField('request')('priority')({ target: { value: 20 } })
                      }
                    }}
                  />
                  <Text className={styles.subTitle} tooltipPosition={'corner'}>
                    {t(TranslationKey['Set urgent priority'])}
                  </Text>
                  <FireIcon className={styles.fireIcon} />
                </div>
              </div>

              <div className={cx(styles.fields, styles.defaultMarginTop)}>
                <Field
                  label={t(TranslationKey.Performer)}
                  labelClasses={styles.label}
                  className={styles.field}
                  inputComponent={
                    announcement?._id ? (
                      <div className={styles.executorWrapper}>
                        <MasterUserItem
                          id={chosenExecutor?._id}
                          name={chosenExecutor?.name}
                          rating={chosenExecutor?.rating}
                        />

                        <Button
                          disabled={!formFields.request.specId}
                          variant={'contained'}
                          onClick={async () => {
                            await onClickChoosePerformer(currentSpec?.type)
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
                        width="100%"
                        disabled={!formFields.request.specId}
                        data={masterUsersData}
                        searchOnlyFields={['name']}
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
                  label={t(TranslationKey.Announcement)}
                  labelClasses={styles.label}
                  className={styles.field}
                  inputComponent={
                    <div className={styles.executorWrapper}>
                      {announcement?.title && <p className={styles.performerDescriptionText}>{announcement?.title}</p>}

                      {!announcement?._id && (
                        <Button
                          disabled={!formFields?.request?.specId}
                          variant={'contained'}
                          onClick={async () => {
                            await onClickChoosePerformer(currentSpec?.type)
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
        )}

        {isSecondStep && (
          <div className={styles.stepWrapper}>
            <div className={styles.advices}>
              <p className={styles.text}>{t(TranslationKey['Choosing a performer:'])}</p>

              <div className={styles.advice}>
                <div className={styles.point} />
                <p className={styles.text}>{t(TranslationKey['Read the reviews about the performer'])}</p>
              </div>

              <div className={styles.advice}>
                <div className={styles.point} />
                <p className={styles.text}>
                  {t(TranslationKey['Do not confirm the result of the work until you are sure that it is complete'])}
                </p>
              </div>

              <div className={styles.advice}>
                <div className={styles.point} />
                <p className={styles.text}>
                  {t(
                    TranslationKey[
                      'Try to study market prices and choose a performer and choose relevant terms and conditions'
                    ],
                  )}
                </p>
              </div>

              <p className={styles.text}>
                {t(TranslationKey['You can also take a free'])}
                <Link className={styles.link}>{t(TranslationKey.Training)}</Link>
                {t(TranslationKey['on our freelance exchange.'])}
              </p>
            </div>

            <div className={styles.fieldsDataWrapper}>
              <div className={styles.middleStepTwoWrapper}>
                <div className={styles.middleStepTwoSubWrapper}>
                  <div className={styles.titleAndAsinWrapper}>
                    <Field
                      label={t(TranslationKey.Title)}
                      className={styles.field}
                      labelClasses={styles.label}
                      inputComponent={<p className={cx(styles.resultText)}>{formFields.request.title}</p>}
                    />

                    {formFields?.request?.asin && (
                      <Field
                        label={t(TranslationKey.ASIN)}
                        className={styles.field}
                        labelClasses={styles.label}
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

                  <Field
                    label={t(TranslationKey.Files)}
                    labelClasses={styles.label}
                    className={styles.field}
                    inputComponent={
                      <PhotoAndFilesSlider
                        smallSlider
                        customSlideHeight={98}
                        files={images.map(el => el.file)}
                        imagesTitles={images.map(el => el.comment)}
                      />
                    }
                  />
                </div>

                <div className={styles.middleStepTwoSubWrapper}>
                  <div className={styles.middleStepTwoWrapper}>
                    {currentSpec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] &&
                    formFields.request.priceAmazon &&
                    formFields.request.priceAmazon !== '0' ? (
                      <div className={styles.infoColumn}>
                        {currentSpec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] &&
                        formFields?.request?.priceAmazon &&
                        formFields?.request?.priceAmazon !== '0' ? (
                          <Field
                            label={t(TranslationKey['Price per product'])}
                            className={styles.field}
                            labelClasses={styles.slabel}
                            inputComponent={
                              <div className={styles.pricesWrapper}>
                                {formFields.request.discountedPrice && formFields.request.cashBackInPercent ? (
                                  <p
                                    className={cx(styles.resultText, styles.twoStepFieldResult, {
                                      [styles.newPrice]:
                                        formFields.request.discountedPrice && formFields.request.cashBackInPercent,
                                    })}
                                  >
                                    {'$ ' + toFixed(+formFields.request.discountedPrice, 2)}
                                  </p>
                                ) : null}

                                <p
                                  className={cx(styles.resultText, styles.twoStepFieldResult, {
                                    [styles.oldPrice]:
                                      formFields.request.discountedPrice && formFields.request.cashBackInPercent,
                                  })}
                                >
                                  {'$ ' + toFixed(+formFields.request.priceAmazon, 2)}
                                </p>
                              </div>
                            }
                          />
                        ) : null}

                        {currentSpec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] &&
                        formFields.request.cashBackInPercent &&
                        formFields?.request?.cashBackInPercent ? (
                          <Field
                            label={t(TranslationKey.CashBack)}
                            className={styles.field}
                            labelClasses={styles.label}
                            inputComponent={
                              <p className={styles.resultText}>
                                {toFixed(formFields.request.cashBackInPercent, 0) + ' %'}
                              </p>
                            }
                          />
                        ) : null}
                      </div>
                    ) : null}

                    <div className={styles.infoColumn}>
                      <Field
                        label={t(TranslationKey['Request type'])}
                        className={styles.field}
                        labelClasses={styles.label}
                        inputComponent={<p className={styles.resultText}>{currentSpec?.title}</p>}
                      />

                      <Field
                        label={t(TranslationKey['Number of proposals'])}
                        className={styles.field}
                        labelClasses={styles.label}
                        inputComponent={<p className={styles.resultText}>{formFields.request.maxAmountOfProposals}</p>}
                      />
                    </div>

                    <div className={styles.infoColumn}>
                      <Field
                        label={t(TranslationKey['Request price']) + ', $'}
                        className={styles.field}
                        labelClasses={styles.label}
                        inputComponent={<p className={styles.resultText}>{formFields.request.price + '$'}</p>}
                      />

                      <Field
                        label={t(TranslationKey['Deadline for the request'])}
                        className={styles.field}
                        labelClasses={styles.label}
                        inputComponent={
                          <p className={styles.resultText}>
                            {formFields.request.timeoutAt &&
                              formatDateForShowWithoutParseISO(formFields.request.timeoutAt)}
                          </p>
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.infoTextWrapper}>
                    {announcement?._id ? (
                      <div className={styles.performerWrapperStepTwo}>
                        <Field
                          label={t(TranslationKey.Performer)}
                          labelClasses={styles.label}
                          className={styles.field}
                          inputComponent={
                            <MasterUserItem
                              id={chosenExecutor?._id}
                              name={chosenExecutor?.name}
                              rating={chosenExecutor?.rating}
                            />
                          }
                        />

                        <p className={styles.performerDescriptionText}>{announcement?.description}</p>
                      </div>
                    ) : chosenExecutor ? (
                      <Field
                        label={t(TranslationKey.Performer)}
                        labelClasses={styles.label}
                        className={styles.field}
                        inputComponent={
                          <MasterUserItem
                            id={chosenExecutor?._id}
                            name={chosenExecutor?.name}
                            rating={chosenExecutor?.rating}
                          />
                        }
                      />
                    ) : null}

                    {formFields.request.needCheckBySupervisor && (
                      <div className={styles.checkbox}>
                        <Checkbox checked disabled color="primary" />
                        <p className={styles.subTitle}>{t(TranslationKey['A supervisor check is necessary'])}</p>
                      </div>
                    )}

                    {formFields.request.restrictMoreThanOneProposalFromOneAssignee && (
                      <div className={styles.checkbox}>
                        <Checkbox checked disabled color="primary" />
                        <p className={styles.subTitle}>
                          {t(TranslationKey['Multiple performances by the same performer are prohibited'])}
                        </p>
                      </div>
                    )}

                    {formFields.request.withoutConfirmation && (
                      <div className={styles.checkbox}>
                        <Checkbox checked disabled color="primary" />
                        <p className={styles.subTitle}>
                          {t(TranslationKey['Allow the performer to take the request for work without confirmation'])}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.editorContainer}>
                <p className={styles.label}>{t(TranslationKey['Description of your request'])}</p>

                <CustomTextEditor
                  readOnly
                  value={formFields.details.conditions}
                  editorClassName={styles.editorClassName}
                />
              </div>
            </div>
          </div>
        )}

        {isFirstStep &&
          (requestToEdit ? (
            <div className={styles.buttonsWrapper}>
              <Button variant="text" className={styles.button} onClick={onClickBackBtn}>
                {t(TranslationKey.Cancel)}
              </Button>

              <Button
                success
                disabled={disableSubmit}
                className={styles.button}
                onClick={() => onEditSubmit(formFields, images, announcement)}
              >
                {t(TranslationKey.Edit)}
              </Button>
            </div>
          ) : (
            <div className={styles.buttonsWrapper}>
              <Button
                tooltipInfoContent={
                  isSecondStep ? t(TranslationKey['Back to Step 1']) : t(TranslationKey['Cancel request creation'])
                }
                variant="text"
                className={styles.button}
                onClick={onClickBackBtn}
              >
                {isSecondStep ? t(TranslationKey['Back to editing']) : t(TranslationKey.Cancel)}
              </Button>

              <Button
                success
                tooltipInfoContent={
                  isSecondStep ? t(TranslationKey['Creates a completed request']) : t(TranslationKey['Go to Step 2'])
                }
                disabled={disableSubmit}
                className={styles.button}
                onClick={onSuccessSubmit}
              >
                {isSecondStep ? (
                  t(TranslationKey['Create a request'])
                ) : (
                  <>
                    {t(TranslationKey.Next)}
                    <img src="/assets/icons/right-arrow.svg" className={cx({ [styles.arrowIcon]: disableSubmit })} />
                  </>
                )}
              </Button>
            </div>
          ))}

        {isSecondStep && (
          <div className={styles.buttonsWrapper}>
            <Button
              tooltipInfoContent={
                isSecondStep ? t(TranslationKey['Back to Step 1']) : t(TranslationKey['Cancel request creation'])
              }
              variant="text"
              className={styles.button}
              onClick={onClickBackBtn}
            >
              {isSecondStep ? t(TranslationKey.Back) : t(TranslationKey.Cancel)}
            </Button>

            <Button
              success
              tooltipInfoContent={
                isSecondStep ? t(TranslationKey['Creates a completed request']) : t(TranslationKey['Go to Step 2'])
              }
              disabled={disableSubmit}
              className={styles.button}
              onClick={() => onClickCreate({ withPublish: false })}
            >
              {isSecondStep ? (
                t(TranslationKey['Create a request'])
              ) : (
                <>
                  {t(TranslationKey.Next)}
                  <img src="/assets/icons/right-arrow.svg" className={cx({ [styles.arrowIcon]: disableSubmit })} />
                </>
              )}
            </Button>

            {isSecondStep && (
              <Button
                success
                disabled={disableSubmit}
                className={styles.button}
                onClick={() => onClickCreate({ withPublish: true })}
              >
                {t(TranslationKey['Create and publish a request'])}
              </Button>
            )}
          </div>
        )}
      </div>

      <div className={styles.steps}>
        <div className={styles.stepPagination}>
          <div className={styles.stepPaginationStartBar}></div>
          <div className={styles.stepPaginationBar}>
            <div className={styles.step} style={{ width: isFirstStep ? '50%' : '100%' }}></div>
          </div>
          <div
            className={styles.stepPaginationEndBar}
            style={{ backgroundColor: isSecondStep ? '#00B746' : '#c4c4c4' }}
          ></div>
        </div>
        <p className={styles.stepTitle}>
          {isFirstStep ? `${t(TranslationKey.Step)} 1` : `${t(TranslationKey.Step)} 2`}
        </p>
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
          specTitle={currentSpec?.title}
          onClickRequest={onClickExistingRequest}
          onClickContinue={() => onCreateSubmit(formFields, images, withPublish, announcement)}
          onClickCancel={() => setShowCheckRequestByTypeExists(!showCheckRequestByTypeExists)}
        />
      </Modal>

      {showGalleryModal ? (
        <GalleryRequestModal
          data={productMedia}
          isOpenModal={showGalleryModal}
          mediaFiles={images}
          onChangeMediaFiles={setImages}
          onOpenModal={onTriggerGalleryModal}
        />
      ) : null}
    </div>
  )
})
