import CircleIcon from '@mui/icons-material/Circle'

import React, {useEffect, useState} from 'react'

import {Checkbox, Typography, Link, List, ListItem, ListItemText} from '@material-ui/core'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {TranslationKey} from '@constants/translations/translation-key'

// import {UserRole, UserRoleCodeMap} from '@constants/user-roles'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {DatePickerDate, DatePickerTime} from '@components/date-picker/date-picker'
import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsImageLink, checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {formatDateForShowWithoutParseISO} from '@utils/date-time'
import {t} from '@utils/translations'

import {useClassNames} from './create-or-edit-request-content.style'

const stepVariant = {
  STEP_ONE: 'STEP_ONE',
  STEP_TWO: 'STEP_TWO',
}

export const CreateOrEditRequestContent = ({
  requestToEdit,
  history,
  onCreateSubmit,
  onEditSubmit,
  showProgress,
  progressValue,
}) => {
  const classNames = useClassNames()

  const [images, setImages] = useState([])

  const [curStep, setCurStep] = useState(stepVariant.STEP_ONE)

  const [showPhotosModal, setShowPhotosModal] = useState(false)

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
    },
    details: {
      conditions: requestToEdit?.details.conditions || '',
      linksToMediaFiles: requestToEdit?.details.linksToMediaFiles || [],
    },
  }
  const [formFields, setFormFields] = useState(sourceFormFields)
  const [error, setError] = useState(false)

  const [deadlineError, setDeadlineError] = useState(false)

  const onChangeField = section => fieldName => event => {
    const newFormFields = {...formFields}
    if (['maxAmountOfProposals', 'timeLimitInMinutes'].includes(fieldName)) {
      newFormFields[section][fieldName] = parseInt(event.target.value) || ''
    } else if (
      ['price'].includes(fieldName) &&
      !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)
    ) {
      return
    } else if (['timeoutAt'].includes(fieldName)) {
      newFormFields[section][fieldName] = event
      setDeadlineError(false)
    } else if (['needCheckBySupervisor', 'restrictMoreThanOneProposalFromOneAssignee'].includes(fieldName)) {
      newFormFields[section][fieldName] = event.target.checked
    } else {
      newFormFields[section][fieldName] = event.target.value
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

  useEffect(() => {
    if (formFields.details.conditions.length < 150) {
      setError(true)
    } else {
      setError(false)
    }
  }, [formFields.details.conditions.length])

  const disableSubmit =
    formFields.request.title === '' ||
    formFields.request.maxAmountOfProposals === '' ||
    formFields.request.timeLimitInMinutes === '' ||
    formFields.request.price === '' ||
    formFields.request.timeoutAt === '' ||
    formFields.details.conditions === '' ||
    formFields.details.conditions.length < 150

  return (
    <div className={classNames.mainWrapper}>
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

      <div className={classNames.mainContentWrapper}>
        <Typography variant="h5" className={classNames.title}>
          {curStep === stepVariant.STEP_ONE && t(TranslationKey['Creating a request'])}
        </Typography>

        {curStep === stepVariant.STEP_ONE && (
          <div className={classNames.mainSubRightWrapper}>
            <div className={classNames.middleWrapper}>
              <Field
                multiline
                inputProps={{maxLength: 250}}
                label={`${t(TranslationKey.Title)} *`}
                className={classNames.nameField}
                labelClasses={classNames.spanLabelSmall}
                minRows={1}
                rowsMax={2}
                value={formFields.request.title}
                onChange={onChangeField('request')('title')}
              />
              <div className={classNames.descriptionFieldWrapper}>
                <Field
                  multiline
                  inputProps={{maxLength: 1500}}
                  className={classNames.descriptionField}
                  labelClasses={classNames.spanLabelSmall}
                  minRows={4}
                  rowsMax={4}
                  label={`${t(TranslationKey['Describe your request'])} *`}
                  value={formFields.details.conditions}
                  onChange={onChangeField('details')('conditions')}
                />
                {error && (
                  <span className={classNames.error}>{t(TranslationKey['Minimum number of characters 150'])}</span>
                )}
              </div>

              <div className={classNames.imageFileInputWrapper}>
                <UploadFilesInput images={images} setImages={setImages} maxNumber={50} />

                {/* <Button
                  disableElevation
                  disabled={!formFields.details.linksToMediaFiles.length}
                  color="primary"
                  className={classNames.imagesButton}
                  variant="contained"
                  onClick={() => setShowPhotosModal(!showPhotosModal)}
                >
                  {t(TranslationKey['Available images'])}
                </Button>

                {formFields.details.linksToMediaFiles.filter(el => !checkIsImageLink(el)).length ? (
                  <Field
                    multiline
                    label={t(TranslationKey.Files)}
                    containerClasses={classNames.filesContainer}
                    inputComponent={
                      <div className={classNames.filesWrapper}>
                        {formFields.details.linksToMediaFiles
                          .filter(el => !checkIsImageLink(el))
                          .map((file, index) => (
                            <Link key={index} target="_blank" href={file}>
                              <Typography className={classNames.linkText}>{file}</Typography>
                            </Link>
                          ))}
                      </div>
                    }
                  />
                ) : null} */}
              </div>
            </div>

            <div className={classNames.rightWrapper}>
              <div>
                <div className={classNames.dateAndTimeWrapper}>
                  <Field
                    label={`${t(TranslationKey['When do you want results?'])}`}
                    labelClasses={classNames.spanLabelSmall}
                    inputComponent={
                      <div className={clsx({[classNames.deadlineError]: deadlineError})}>
                        <DatePickerDate
                          value={formFields.request.timeoutAt}
                          onChange={onChangeField('request')('timeoutAt')}
                        />
                        {deadlineError && (
                          <p className={classNames.deadlineErrorText}>
                            {'The deadline date cannot be later than the current date'}
                          </p>
                        )}
                      </div>
                    }
                  />
                  <Field
                    label={`${t(TranslationKey['What time do you want the result?'])}`}
                    labelClasses={classNames.spanLabelSmall}
                    inputComponent={
                      <div className={clsx({[classNames.deadlineError]: deadlineError})}>
                        <DatePickerTime
                          value={formFields.request.timeoutAt}
                          onChange={onChangeField('request')('timeoutAt')}
                        />
                        {deadlineError && (
                          <p className={classNames.deadlineErrorText}>
                            {'The deadline date cannot be later than the current date'}
                          </p>
                        )}
                      </div>
                    }
                  />
                </div>

                <div className={classNames.checkboxesWrapper}>
                  <div className={classNames.checkboxWrapper}>
                    <Typography className={classNames.checkboxLabel}>
                      {t(TranslationKey['Limit the number of proposals?'])}
                    </Typography>
                    <Checkbox
                      color="primary"
                      checked={formFields.request.needCheckBySupervisor}
                      onChange={onChangeField('request')('needCheckBySupervisor')}
                    />
                  </div>
                  <div className={classNames.checkboxWrapper}>
                    <Typography className={classNames.checkboxLabel}>
                      {t(TranslationKey['Need a supervisor check'])}
                    </Typography>
                    <Checkbox
                      color="primary"
                      checked={formFields.request.needCheckBySupervisor}
                      onChange={onChangeField('request')('needCheckBySupervisor')}
                    />
                  </div>
                </div>

                <div className={classNames.priceAndAmountWrapper}>
                  <Field
                    inputProps={{maxLength: 8}}
                    label={`${t(TranslationKey['Enter the offer price'])} *`}
                    labelClasses={classNames.spanLabelSmall}
                    value={formFields.request.price}
                    onChange={onChangeField('request')('price')}
                  />

                  <Field
                    inputProps={{maxLength: 8}}
                    label={`${t(TranslationKey['Enter the number of proposals'])} *`}
                    labelClasses={classNames.spanLabelSmall}
                    value={formFields.request.maxAmountOfProposals}
                    onChange={onChangeField('request')('maxAmountOfProposals')}
                  />
                </div>

                <div className={classNames.checkboxWrapper}>
                  <Typography className={classNames.checkboxLabel}>
                    {t(TranslationKey['Allow multiple performances by the same performer'])}
                  </Typography>
                  <Checkbox
                    color="primary"
                    checked={formFields.request.restrictMoreThanOneProposalFromOneAssignee}
                    onChange={onChangeField('request')('restrictMoreThanOneProposalFromOneAssignee')}
                  />
                </div>
              </div>
              {requestToEdit ? (
                <div className={classNames.footerWrapper}>
                  <div className={classNames.footerRightWrapper}>
                    {curStep === stepVariant.STEP_ONE && (
                      <div className={classNames.checkboxWrapper}>
                        <Typography className={classNames.checkboxLabel}>
                          {t(TranslationKey['Allow multiple performances by the same performer'])}
                        </Typography>
                        <Checkbox
                          color="primary"
                          checked={formFields.request.restrictMoreThanOneProposalFromOneAssignee}
                          onChange={onChangeField('request')('restrictMoreThanOneProposalFromOneAssignee')}
                        />
                      </div>
                    )}

                    <div className={classNames.buttonsWrapper}>
                      <Button variant={'text'} className={classNames.backBtn} onClick={onClickBackBtn}>
                        {t(TranslationKey.Cancel)}
                      </Button>

                      <SuccessButton
                        disabled={disableSubmit}
                        className={classNames.successBtn}
                        onClick={() => onEditSubmit(formFields, images)}
                      >
                        {t(TranslationKey.Edit)}
                      </SuccessButton>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={classNames.footerWrapper}>
                  <div className={classNames.stepsWrapper}>
                    <Typography className={classNames.step} color="primary">
                      {curStep === stepVariant.STEP_TWO ? `${t(TranslationKey.Step)} 2` : `${t(TranslationKey.Step)} 1`}
                    </Typography>
                  </div>

                  <div className={classNames.footerRightWrapper}>
                    <div className={classNames.buttonsWrapper}>
                      <Button
                        variant={curStep === stepVariant.STEP_TWO ? 'outlined' : 'text'}
                        className={classNames.backBtn}
                        onClick={onClickBackBtn}
                      >
                        {curStep === stepVariant.STEP_TWO
                          ? t(TranslationKey['Back to editing'])
                          : t(TranslationKey.Cancel)}
                      </Button>

                      <SuccessButton
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
                              className={clsx(classNames.successBtnArrow, {
                                [classNames.disablesBtnArrow]: disableSubmit,
                              })}
                            />
                          </div>
                        )}
                      </SuccessButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {curStep === stepVariant.STEP_TWO && (
          <div className={classNames.mainTwoStepWrapper}>
            <div className={classNames.mainSubRightTwoStepWrapper}>
              <div className={classNames.adviceWrapper}>
                <Typography className={classNames.adviceTitle}>{t(TranslationKey['Choosing a performer:'])}</Typography>

                <List>
                  <ListItem className={classNames.adviceListItem}>
                    <CircleIcon color="primary" style={{width: '8px'}} />

                    <ListItemText className={classNames.adviceListItemText}>
                      {t(TranslationKey['Read the reviews about the performer'])}
                    </ListItemText>
                  </ListItem>
                  <ListItem className={classNames.adviceListItem}>
                    <CircleIcon color="primary" style={{width: '8px'}} />

                    <ListItemText className={classNames.adviceListItemText}>
                      {t(
                        TranslationKey['Do not confirm the result of the work until you are sure that it is complete'],
                      )}
                    </ListItemText>
                  </ListItem>
                  <ListItem className={classNames.adviceListItem}>
                    <CircleIcon color="primary" style={{width: '8px'}} />

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
              <div className={classNames.middleStepTwoWrapper}>
                <Field
                  label={t(TranslationKey['Request title'])}
                  labelClasses={classNames.spanLabel}
                  inputComponent={
                    <Typography className={classNames.twoStepFieldResult}>{formFields.request.title}</Typography>
                  }
                />
                <div className={classNames.imagesWrapper}>
                  <Typography className={classNames.imagesTitle}>{t(TranslationKey.Files)}</Typography>
                  <Carousel autoPlay={false} className={classNames.carouselWrapper}>
                    {images
                      .filter(el => checkIsImageLink(el.file.name))
                      .map((photo, index) => (
                        <img key={index} src={photo.data_url} height="108px" />
                      ))}
                  </Carousel>
                </div>

                <Field
                  multiline
                  containerClasses={classNames.descriptionStepTwoField}
                  labelClasses={classNames.spanLabel}
                  minRows={4}
                  rowsMax={4}
                  label={t(TranslationKey['Description of your request'])}
                  inputComponent={
                    <Typography className={classNames.twoStepDescriptionFieldResult}>
                      {formFields.details.conditions}
                    </Typography>
                  }
                />
              </div>

              <div className={classNames.rightTwoStepWrapper}>
                <div className={classNames.rightTwoStepSubFieldWrapper}>
                  <Field
                    label={t(TranslationKey['Number of proposals'])}
                    labelClasses={classNames.spanLabel}
                    inputComponent={
                      <Typography className={classNames.twoStepFieldResult}>
                        {formFields.request.maxAmountOfProposals}
                      </Typography>
                    }
                  />

                  <Field
                    containerClasses={classNames.twoStepDeadlineField}
                    label={t(TranslationKey['Deadline for the request'])}
                    labelClasses={classNames.spanLabel}
                    inputComponent={
                      <Typography className={classNames.twoStepFieldResult}>
                        {formFields.request.timeoutAt && formatDateForShowWithoutParseISO(formFields.request.timeoutAt)}
                      </Typography>
                    }
                  />
                </div>

                <div className={classNames.rightTwoStepSubFieldWrapper}>
                  <Field
                    label={t(TranslationKey['Supervisor check'])}
                    labelClasses={classNames.spanLabel}
                    inputComponent={
                      <Typography className={classNames.twoStepFieldResult}>
                        {formFields.request.needCheckBySupervisor ? t(TranslationKey.Yes) : t(TranslationKey.No)}
                      </Typography>
                    }
                  />

                  <Field
                    label={t(TranslationKey.Price) + ' $'}
                    labelClasses={classNames.spanLabel}
                    inputComponent={
                      <Typography className={classNames.twoStepFieldResult}>{formFields.request.price}</Typography>
                    }
                  />
                </div>
                <Typography>
                  {formFields.request.restrictMoreThanOneProposalFromOneAssignee &&
                    t(TranslationKey['Multiple performances by the same performer are allowed'])}
                </Typography>
              </div>
            </div>
            <div className={classNames.footerWrapper}>
              <div className={classNames.stepsWrapper}>
                <Typography className={classNames.step} color="primary">
                  {curStep === stepVariant.STEP_TWO ? `${t(TranslationKey.Step)} 2` : `${t(TranslationKey.Step)} 1`}
                </Typography>
              </div>

              <div className={classNames.footerRightWrapper}>
                <div className={classNames.buttonsWrapper}>
                  <Button
                    variant={curStep === stepVariant.STEP_TWO ? 'outlined' : 'text'}
                    className={classNames.backBtn}
                    onClick={onClickBackBtn}
                  >
                    {curStep === stepVariant.STEP_TWO ? t(TranslationKey['Back to editing']) : t(TranslationKey.Cancel)}
                  </Button>

                  <SuccessButton disabled={disableSubmit} className={classNames.successBtn} onClick={onSuccessSubmit}>
                    {curStep === stepVariant.STEP_TWO ? (
                      t(TranslationKey['Create a request'])
                    ) : (
                      <div className={classNames.successBtnTextWrapper}>
                        <Typography>{t(TranslationKey.Next)}</Typography>
                        <img
                          src="/assets/icons/right-arrow.svg"
                          className={clsx(classNames.successBtnArrow, {
                            [classNames.disablesBtnArrow]: disableSubmit,
                          })}
                        />
                      </div>
                    )}
                  </SuccessButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}

      <BigImagesModal
        isAmazone
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={formFields.details.linksToMediaFiles.filter(el => checkIsImageLink(el)) || []}
      />
    </div>
  )
}
