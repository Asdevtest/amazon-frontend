/* eslint-disable no-unused-vars */
import CircleIcon from '@mui/icons-material/Circle'

import React, {useEffect, useState} from 'react'

import {Checkbox, Typography, Link, List, ListItem, ListItemText, Paper} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {DateMonthYearPicker, DatePickerDate, DatePickerTime} from '@components/date-picker/date-picker'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {t} from '@utils/translations'

import {useClassNames} from './create-or-edit-trading-shop-content.style'
import {FirstStep} from './first-step'

const stepVariant = {
  STEP_ONE: 'STEP_ONE',
  STEP_TWO: 'STEP_TWO',
  STEP_THREE: 'STEP_THREE',
}

export const CreateOrEditTradingShopContent = ({
  requestToEdit,
  history,
  onCreateSubmit,
  onEditSubmit,
  showProgress,
  progressValue,
}) => {
  const classNames = useClassNames()

  // const today = new Date()

  // const mm = String(today.getMonth() + 1).padStart(2, '0')

  // console.log('mm', mm)

  const [grossIncomeDate, setGrossIncomeDate] = useState(null)

  const [grossIncomeValue, setGrossIncomeValue] = useState('')

  // console.log('grossIncomeLine', grossIncomeLine)

  const [images, setImages] = useState([])

  const [curStep, setCurStep] = useState(stepVariant.STEP_ONE)

  const sourceFormFields = {
    title: requestToEdit?.title || '',
    shopDetails: '',
    price: requestToEdit?.price || '',
    businessStartDate: requestToEdit?.businessStartDate || null,
    shopLink: '',

    assets: [
      'Аккаунты/страницы в социальных сетях (18 акка унт ов/страниц для Facebook, Twitter, Instagram, Pinterest, TikTok, Youtube, LinkedIn, PUBLC и Mewe)',
      'Пять фирменных электронных книг',
    ],

    grossIncome: [],
    pureIncome: [],
    uniqueCustomers: [],
    webpageVisits: [],
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  useEffect(() => {
    setFormFields(() => ({...formFields, grossIncome: formFields.grossIncome}))
  }, [SettingsModel.languageTag])

  console.log('formFields.businessStartDate', formFields.businessStartDate)

  const [deadlineError, setDeadlineError] = useState(false)
  // const [assetLine, setAssetLine] = useState('')

  // const removeAsset = index => {
  //   const newFormFields = {...formFields}

  //   newFormFields.assets = formFields.assets.filter((asset, i) => i !== index)

  //   setFormFields(newFormFields)
  // }

  // const addAsset = e => {
  //   const newFormFields = {...formFields}

  //   newFormFields.assets = [assetLine, ...formFields.assets]

  //   setFormFields(newFormFields)

  //   setAssetLine('')
  // }

  const removeIndicator = index => {
    const newFormFields = {...formFields}

    newFormFields.grossIncome = formFields.grossIncome.filter((asset, i) => i !== index)

    setFormFields(newFormFields)
  }

  const addIndicator = e => {
    const newFormFields = {...formFields}

    newFormFields.grossIncome = [{month: grossIncomeDate, value: grossIncomeValue}, ...formFields.grossIncome].sort(
      sortObjectsArrayByFiledDate('month'),
    )

    setFormFields(newFormFields)

    setGrossIncomeDate(null)
    setGrossIncomeValue('')
  }

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}
    if (['maxAmountOfProposals', 'timeLimitInMinutes'].includes(fieldName)) {
      newFormFields[fieldName] = parseInt(event.target.value) || ''
    } else if (
      ['price'].includes(fieldName) &&
      !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)
    ) {
      return
    } else if (['businessStartDate'].includes(fieldName)) {
      newFormFields[fieldName] = event
      setDeadlineError(false)
    } else if (['needCheckBySupervisor', 'restrictMoreThanOneProposalFromOneAssignee'].includes(fieldName)) {
      newFormFields[fieldName] = event.target.checked
    } else if (['title'].includes(fieldName)) {
      newFormFields[fieldName] = event.target.value.replace(/\n/g, '')
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  const isDeadlineError = formFields.businessStartDate > new Date()

  const onSuccessSubmit = () => {
    // if (isDeadlineError) {
    //   setDeadlineError(!deadlineError)
    // } else {
    if (curStep === stepVariant.STEP_ONE) {
      setCurStep(stepVariant.STEP_TWO)
    } else if (curStep === stepVariant.STEP_TWO) {
      setCurStep(stepVariant.STEP_THREE)
    } else {
      onCreateSubmit(formFields, images)
    }
    // }
  }

  const onClickBackBtn = () => {
    if (curStep === stepVariant.STEP_ONE) {
      history.goBack()
    } else if (curStep === stepVariant.STEP_TWO) {
      setCurStep(stepVariant.STEP_ONE)
    } else {
      if (isDeadlineError) {
        setDeadlineError(!deadlineError)
      } else {
        setCurStep(stepVariant.STEP_TWO)
      }
    }
  }

  // const disableSubmit =
  //   formFields.request.title === '' ||
  //   formFields.request.title.length > 80 ||
  //   formFields.request.maxAmountOfProposals === '' ||
  //   formFields.request.timeLimitInMinutes === '' ||
  //   formFields.request.price === '' ||
  //   formFields.request.timeoutAt === '' ||
  //   formFields.details.conditions === '' ||
  //   formFields.details.conditions.length > 1000 ||
  //   formFields?.request?.timeoutAt?.toString() === 'Invalid Date'

  const renderBackNextBtns = () => (
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
            {curStep === stepVariant.STEP_ONE ? t(TranslationKey.Cancel) : t(TranslationKey.Back)}
          </Button>

          <Button
            success
            tooltipInfoContent={
              curStep === stepVariant.STEP_TWO
                ? t(TranslationKey['Creates a completed request'])
                : t(TranslationKey['Go to Step 2'])
            }
            // disabled={disableSubmit}
            className={classNames.successBtn}
            onClick={onSuccessSubmit}
          >
            {curStep === stepVariant.STEP_THREE ? (
              t(TranslationKey.Save)
            ) : (
              <div className={classNames.successBtnTextWrapper}>
                <Typography>{t(TranslationKey.Next)}</Typography>
                <img
                  src="/assets/icons/right-arrow.svg"
                  className={clsx(classNames.successBtnArrow, {
                    // [classNames.disablesBtnArrow]: disableSubmit,
                  })}
                />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.headerWrapper}>
        <Typography className={classNames.mainTitle}>
          {t(TranslationKey['We will find a reliable buyer of your store'])}
        </Typography>

        <Typography className={classNames.mainSubTitle}>
          {t(TranslationKey['Fill in basic information about your store'])}
        </Typography>
      </div>

      <div className={classNames.mainContentWrapper}>
        {curStep === stepVariant.STEP_ONE && (
          <FirstStep
            formFields={formFields}
            renderBackNextBtns={renderBackNextBtns}
            images={images}
            setImages={setImages}
            deadlineError={deadlineError}
            setFormFields={setFormFields}
            onChangeField={onChangeField}
          />
        )}

        {curStep === stepVariant.STEP_TWO && (
          <>
            <Field
              inputProps={{maxLength: 100}}
              labelClasses={classNames.spanLabelSmall}
              label={`${t(TranslationKey['Gross income'])}, $`}
              inputComponent={
                <Paper className={classNames.indicatorPaper}>
                  <div className={classNames.selectedRoleWrapper}>
                    <DateMonthYearPicker value={grossIncomeDate} onChange={setGrossIncomeDate} />

                    <Input
                      value={grossIncomeValue}
                      className={classNames.indicatorInput}
                      onChange={e => setGrossIncomeValue(e.target.value)}
                    />

                    <div
                      className={clsx(classNames.actionDelButton, {
                        [classNames.disabledActionButton]: grossIncomeDate === null || !grossIncomeValue,
                      })}
                      onClick={grossIncomeDate !== null && grossIncomeValue && addIndicator}
                    >
                      {'+'}
                    </div>
                  </div>

                  {formFields.grossIncome.map((indicator, index) => (
                    <div key={index} className={classNames.selectedRoleWrapper}>
                      <DateMonthYearPicker readOnly value={indicator.month} />

                      <Input disabled value={indicator.value} className={classNames.indicatorInput} />

                      <div className={classNames.actionDelButton} onClick={() => removeIndicator(index)}>
                        {'-'}
                      </div>
                    </div>
                  ))}
                </Paper>
              }
            />
            {renderBackNextBtns()}
          </>
        )}

        {curStep === stepVariant.STEP_THREE && renderBackNextBtns()}
      </div>

      <div className={classNames.steps}>
        <div className={classNames.stepPagination}>
          <div className={classNames.stepPaginationStartBar}></div>

          <div className={classNames.stepPaginationBar}>
            <div className={classNames.step} style={{width: curStep === stepVariant.STEP_ONE ? '0%' : '100%'}}></div>
          </div>

          <div
            className={classNames.stepPaginationMiddleBar}
            style={{
              backgroundColor: curStep !== stepVariant.STEP_ONE ? '#00B746' : '#c4c4c4',
            }}
          ></div>

          <div className={classNames.stepPaginationBar}>
            <div
              className={classNames.step}
              style={{width: curStep === stepVariant.STEP_ONE || curStep === stepVariant.STEP_TWO ? '0%' : '100%'}}
            ></div>
          </div>

          <div
            className={classNames.stepPaginationEndBar}
            style={{backgroundColor: curStep === stepVariant.STEP_THREE ? '#00B746' : '#c4c4c4'}}
          ></div>
        </div>
        <Typography className={classNames.stepTitle}>
          {curStep === stepVariant.STEP_ONE
            ? `${t(TranslationKey.Step)} 1`
            : curStep === stepVariant.STEP_TWO
            ? `${t(TranslationKey.Step)} 2`
            : `${t(TranslationKey.Step)} 3`}
        </Typography>
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}
    </div>
  )
}
