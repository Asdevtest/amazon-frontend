import React, {useState} from 'react'

import {Checkbox, Divider, Typography, Select, ListItemText, MenuItem} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'
import {UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {DatePicker} from '@components/date-picker'
import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
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

  const disableSubmit =
    (formFields.request.title === '' ||
      formFields.request.maxAmountOfProposals === '' ||
      formFields.request.timeLimitInMinutes === '' ||
      formFields.request.price === '' ||
      formFields.request.timeoutAt === '' ||
      formFields.details.conditions === '') &&
    (curStep === stepVariant.STEP_TWO || requestToEdit)

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.mainLeftWrapper}>
        <Typography className={classNames.mainTitle}>
          {curStep === stepVariant.STEP_TWO
            ? t(TranslationKey['The request is ready'])
            : t(TranslationKey['We will find a reliable performer for you'])}
        </Typography>

        <Typography className={classNames.mainSubTitle}>
          {curStep === stepVariant.STEP_TWO
            ? t(TranslationKey["All that's left is to check the data"])
            : t(TranslationKey['By getting to know your needs, we will select the best performer for your task.'])}
        </Typography>
      </div>

      <div className={classNames.mainRightWrapper}>
        <Typography variant="h5" className={classNames.title}>
          {curStep === stepVariant.STEP_TWO
            ? t(TranslationKey['Brief information'])
            : t(TranslationKey['Creating a request'])}
        </Typography>

        {curStep === stepVariant.STEP_ONE && (
          <div className={classNames.mainSubRightWrapper}>
            <div className={classNames.middleWrapper}>
              <Field
                multiline
                inputProps={{maxLength: 250}}
                label={t(TranslationKey.Title) + '*'}
                className={classNames.nameField}
                minRows={2}
                rowsMax={2}
                value={formFields.request.title}
                onChange={onChangeField('request')('title')}
              />

              <Field
                multiline
                className={classNames.descriptionField}
                minRows={4}
                rowsMax={4}
                label={t(TranslationKey['Describe your request']) + ''}
                value={formFields.details.conditions}
                onChange={onChangeField('details')('conditions')}
              />

              <div className={classNames.imageFileInputWrapper}>
                <UploadFilesInput images={images} setImages={setImages} maxNumber={50} />

                <Button
                  disableElevation
                  disabled={!formFields.details.linksToMediaFiles.length}
                  color="primary"
                  className={classNames.imagesButton}
                  variant="contained"
                  onClick={() => setShowPhotosModal(!showPhotosModal)}
                >
                  {t(TranslationKey['Available files'])}
                </Button>
              </div>
            </div>

            <div className={classNames.rightWrapper}>
              <Field
                inputProps={{maxLength: 8}}
                label={t(TranslationKey['Enter the offer price'])}
                value={formFields.request.price}
                onChange={onChangeField('request')('price')}
              />

              {/* <Field
                oneLine
                label={'Ограничить количество предложений?'}
                inputComponent={
                  <Checkbox color="primary" checked={formFields.fba} onChange={onChangeFormField('fba')} />
                }
              /> */}

              <Field
                inputProps={{maxLength: 8}}
                label={t(TranslationKey['Enter the number of proposals']) + '*'}
                value={formFields.request.maxAmountOfProposals}
                onChange={onChangeField('request')('maxAmountOfProposals')}
              />

              <Field
                inputProps={{maxLength: 8}}
                label={t(TranslationKey['Time to complete, min*'])}
                value={formFields.request.timeLimitInMinutes}
                onChange={onChangeField('request')('timeLimitInMinutes')}
              />

              <Field
                label={t(TranslationKey['When do you want results?'])}
                inputComponent={
                  <div className={clsx({[classNames.deadlineError]: deadlineError})}>
                    <DatePicker value={formFields.request.timeoutAt} onChange={onChangeField('request')('timeoutAt')} />
                    {deadlineError && (
                      <p className={classNames.deadlineErrorText}>
                        {'The deadline date cannot be later than the current date'}
                      </p>
                    )}
                  </div>
                }
              />

              <Field
                label={t(TranslationKey['Can see the roles']) + ':'}
                inputComponent={
                  <Select
                    multiple
                    value={formFields.request.roles}
                    renderValue={selected => selected.map(el => UserRoleCodeMap[el]).join(', ')}
                    onChange={onChangeField('request')('roles')}
                  >
                    {Object.keys(UserRoleCodeMap)
                      .filter(el => [UserRole.CLIENT, UserRole.FREELANCER].includes(UserRoleCodeMap[el]))
                      .map((role, index) => (
                        <MenuItem key={index} value={Number(role)}>
                          <Checkbox color="primary" checked={formFields.request.roles.includes(Number(role))} />
                          <ListItemText primary={UserRoleCodeMap[role]} />
                        </MenuItem>
                      ))}
                  </Select>
                }
              />

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
          </div>
        )}

        {curStep === stepVariant.STEP_TWO && (
          <div className={classNames.mainSubRightTwoStepWrapper}>
            <div className={classNames.middleWrapper}>
              <Field
                label={t(TranslationKey['Request title'])}
                inputComponent={
                  <Typography className={classNames.twoStepFieldResult}>{formFields.request.title}</Typography>
                }
              />

              <Field
                multiline
                className={classNames.descriptionField}
                minRows={4}
                rowsMax={4}
                label={t(TranslationKey['Your request'])}
                inputComponent={
                  <Typography className={classNames.twoStepFieldResult}>{formFields.details.conditions}</Typography>
                }
              />
            </div>

            <Divider orientation={'horizontal'} />

            <div className={classNames.rightTwoStepWrapper}>
              <Typography variant="h5" className={classNames.title}>
                {t(TranslationKey['Price and time'])}
              </Typography>

              <div className={classNames.rightTwoStepSubFieldWrapper}>
                <Field
                  label={t(TranslationKey.Price) + ' $'}
                  inputComponent={
                    <Typography className={classNames.twoStepFieldResult}>{formFields.request.price}</Typography>
                  }
                />

                <Field
                  containerClasses={classNames.twoStepDeadlineField}
                  label={t(TranslationKey['Deadline for the request'])}
                  inputComponent={
                    <Typography className={classNames.twoStepFieldResult}>
                      {formFields.request.timeoutAt && formatDateForShowWithoutParseISO(formFields.request.timeoutAt)}
                    </Typography>
                  }
                />
              </div>

              <Field
                label={t(TranslationKey['Number of proposals'])}
                inputComponent={
                  <Typography className={classNames.twoStepFieldResult}>
                    {formFields.request.maxAmountOfProposals}
                  </Typography>
                }
              />

              <Field
                label={'Время на выполнение предложения (мин)'}
                inputComponent={
                  <Typography className={classNames.twoStepFieldResult}>
                    {formFields.request.timeLimitInMinutes}
                  </Typography>
                }
              />
            </div>
          </div>
        )}

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
              <Typography>
                {curStep === stepVariant.STEP_TWO ? `${t(TranslationKey.Step)} 2` : `${t(TranslationKey.Step)} 1`}
              </Typography>
            </div>

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
                      <img src="/assets/icons/right-arrow.svg" className={classNames.successBtnArrow} />
                    </div>
                  )}
                </SuccessButton>
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
        images={formFields.details.linksToMediaFiles || []}
      />
    </div>
  )
}
