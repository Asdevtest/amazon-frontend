import Radio from '@mui/material/Radio'

import React, {useState} from 'react'

import {Checkbox, Divider, Typography, Select, ListItemText, MenuItem} from '@material-ui/core'
import clsx from 'clsx'

import {UserRole, UserRoleCodeMap} from '@constants/user-roles'

// import {texts} from '@constants/texts'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {DatePicker} from '@components/date-picker'
import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {formatDateForShowWithoutParseISO} from '@utils/date-time'

// import {getLocalizedTexts} from '@utils/get-localized-texts'
import {useClassNames} from './create-or-edit-request-content.style'

// const textConsts = getLocalizedTexts(texts, 'ru').CreateOrEditRequestContent

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
    if (['maxAmountOfProposals'].includes(fieldName)) {
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
    if (isDeadlineError) {
      setDeadlineError(!deadlineError)
    } else {
      if (curStep === stepVariant.STEP_ONE) {
        history.goBack()
      } else {
        setCurStep(stepVariant.STEP_ONE)
      }
    }
  }

  const disableSubmit =
    (formFields.request.title === '' ||
      formFields.request.maxAmountOfProposals === '' ||
      formFields.request.price === '' ||
      formFields.request.timeoutAt === '' ||
      formFields.details.conditions === '') &&
    (curStep === stepVariant.STEP_TWO || requestToEdit)

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.mainLeftWrapper}>
        <Typography className={classNames.mainTitle}>
          {curStep === stepVariant.STEP_TWO ? 'Заявка готова' : 'Мы найдем надежного исполнителя для Вас'}
        </Typography>

        <Typography className={classNames.mainSubTitle}>
          {curStep === stepVariant.STEP_TWO
            ? 'Осталось лишь сверить данные'
            : 'Узнавая Ваши потребности мы подберем лучшего исполнителя Вашей задачи.'}
        </Typography>
      </div>

      <div className={classNames.mainRightWrapper}>
        <Typography variant="h5" className={classNames.title}>
          {curStep === stepVariant.STEP_TWO ? 'Краткая информация' : 'Создание заявки'}
        </Typography>

        {curStep === stepVariant.STEP_ONE && (
          <div className={classNames.mainSubRightWrapper}>
            <div className={classNames.middleWrapper}>
              <Field
                multiline
                inputProps={{maxLength: 250}}
                label={'Название*'}
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
                label={'Опишите свою задачу*'}
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
                  {'Имеющиеся файлы'}
                </Button>
              </div>
            </div>

            <div className={classNames.rightWrapper}>
              <Field
                inputProps={{maxLength: 8}}
                label={'Введите цену предложения $*'}
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
                inputProps={{maxLength: 10}}
                label={'Введите количество предложений*'}
                value={formFields.request.maxAmountOfProposals}
                onChange={onChangeField('request')('maxAmountOfProposals')}
              />

              <Field
                label={'Когда Вы хотите получить результат?*'}
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
                label={'Смогут видеть роли:'}
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
                <Typography className={classNames.checkboxLabel}>{'Нужна проверка супервайзером'}</Typography>
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
                label={'Название заявки*'}
                inputComponent={
                  <Typography className={classNames.twoStepFieldResult}>{formFields.request.title}</Typography>
                }
              />

              <Field
                multiline
                className={classNames.descriptionField}
                minRows={4}
                rowsMax={4}
                label={'Ваша заявка'}
                inputComponent={
                  <Typography className={classNames.twoStepFieldResult}>{formFields.details.conditions}</Typography>
                }
              />
            </div>

            <Divider orientation={'horizontal'} />

            <div className={classNames.rightTwoStepWrapper}>
              <Typography variant="h5" className={classNames.title}>
                {'Цена и время'}
              </Typography>

              <div className={classNames.rightTwoStepSubFieldWrapper}>
                <Field
                  label={'Цена $'}
                  inputComponent={
                    <Typography className={classNames.twoStepFieldResult}>{formFields.request.price}</Typography>
                  }
                />

                <Field
                  containerClasses={classNames.twoStepDeadlineField}
                  label={'Срок выполнения'}
                  inputComponent={
                    <Typography className={classNames.twoStepFieldResult}>
                      {formFields.request.timeoutAt && formatDateForShowWithoutParseISO(formFields.request.timeoutAt)}
                    </Typography>
                  }
                />
              </div>

              <Field
                label={'Количество предложений'}
                inputComponent={
                  <Typography className={classNames.twoStepFieldResult}>
                    {formFields.request.maxAmountOfProposals}
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
                    {'Разрешить многократное исполнение одному исполнителю'}
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
                  {'Отмена'}
                </Button>

                <SuccessButton
                  disabled={disableSubmit}
                  className={classNames.successBtn}
                  onClick={() => onEditSubmit(formFields, images)}
                >
                  {'Редактировать'}
                </SuccessButton>
              </div>
            </div>
          </div>
        ) : (
          <div className={classNames.footerWrapper}>
            <div className={classNames.stepsWrapper}>
              <Typography>{curStep === stepVariant.STEP_TWO ? 'Шаг 2' : 'Шаг 1'}</Typography>

              <Radio color="success" size="small" checked={curStep === stepVariant.STEP_ONE} />
              <Radio color="success" size="small" checked={curStep === stepVariant.STEP_TWO} />
            </div>

            <div className={classNames.footerRightWrapper}>
              {curStep === stepVariant.STEP_ONE && (
                <div className={classNames.checkboxWrapper}>
                  <Typography className={classNames.checkboxLabel}>
                    {'Разрешить многократное исполнение одному исполнителю'}
                  </Typography>
                  <Checkbox color="primary" /* checked={formFields.fba} onChange={onChangeFormField('fba')} */ />
                </div>
              )}

              <div className={classNames.buttonsWrapper}>
                <Button
                  variant={curStep === stepVariant.STEP_TWO ? 'outlined' : 'text'}
                  className={classNames.backBtn}
                  onClick={onClickBackBtn}
                >
                  {curStep === stepVariant.STEP_TWO ? 'Назад к редактированию' : 'Отмена'}
                </Button>

                <SuccessButton disabled={disableSubmit} className={classNames.successBtn} onClick={onSuccessSubmit}>
                  {curStep === stepVariant.STEP_TWO ? (
                    'Создать заявку'
                  ) : (
                    <div className={classNames.successBtnTextWrapper}>
                      <Typography>{'Далее'}</Typography>
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
