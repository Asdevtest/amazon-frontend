/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

import React, { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { EstimateCreateTradingShopForm } from '@components/forms/estimate-create-trading-shop-form'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { sortObjectsArrayByFiledDate } from '@utils/date-time'
import { t } from '@utils/translations'

import { useClassNames } from './create-or-edit-trading-shop-content.style'
import { FirstStep } from './first-step'
import { SecondStep } from './second-step'
import { ThirdStep } from './third-step'

const stepVariant = {
  STEP_ONE: 'STEP_ONE',
  STEP_TWO: 'STEP_TWO',
  STEP_THREE: 'STEP_THREE',
}

const fillMonthes = () => {
  const curYear = new Date().getFullYear()
  const curMonth = new Date().getMonth()

  const arr = Array(12)
    .fill({})
    .map((e, index) => {
      // const year = curMonth - index >= 0 ? curYear : curYear - 1
      const year = curYear

      const month = curMonth - index >= 0 ? curMonth - index : 0 + curMonth - index

      return {
        month: new Date(year, month),
        grossIncome: '',
        pureIncome: '',
        uniqueCustomers: '',
        webpageVisits: '',
      }
    })

  return arr
}

export const CreateOrEditTradingShopContent = ({
  requestToEdit,
  history,
  onCreateSubmit,
  onEditSubmit,
  showProgress,
  progressValue,
}) => {
  const { classes: classNames } = useClassNames()

  const [images, setImages] = useState([])

  const [curStep, setCurStep] = useState(stepVariant.STEP_ONE)

  const [makeEstimate, setMakeEstimate] = useState(false)

  const [showEstimateModal, setShowEstimateModal] = useState(false)

  const sourceFormFields = {
    title: requestToEdit?.title || '',
    price: requestToEdit?.price || '',
    businessStartDate: requestToEdit?.businessStartDate || null,
    shopDetails: requestToEdit?.shopDetails || '',

    shopAssets: requestToEdit?.shopAssets || [],

    files: requestToEdit?.files || [],
    shopLink: requestToEdit?.shopLink || '',

    statistics: requestToEdit?.statistics || fillMonthes(),

    opportunities: requestToEdit?.opportunities || [],
    risks: requestToEdit?.risks || [],
    requiredSkills: requestToEdit?.requiredSkills || [],
    sellIncludes: requestToEdit?.sellIncludes || [],
    reasonForSale: requestToEdit?.reasonForSale || [],
    additionalInfo: requestToEdit?.additionalInfo || [],
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  const [deadlineError, setDeadlineError] = useState(false)

  const onChangeStatisticsField = (index, fieldName) => event => {
    const newFormFields = { ...formFields }

    if (['month'].includes(fieldName)) {
      newFormFields.statistics[index].month = event

      newFormFields.statistics = [
        ...formFields.statistics.map((el, i) => (i === index ? { ...el, month: event } : el)),
      ].sort(sortObjectsArrayByFiledDate('month'))
    } else if (
      ['grossIncome', 'pureIncome', 'uniqueCustomers', 'webpageVisits'].includes(fieldName) &&
      !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)
    ) {
      return
    } else {
      newFormFields.statistics[index][fieldName] = event.target.value
    }
    setFormFields(newFormFields)
  }

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }
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
    if (curStep === stepVariant.STEP_ONE) {
      setCurStep(stepVariant.STEP_TWO)
    } else if (curStep === stepVariant.STEP_TWO) {
      setCurStep(stepVariant.STEP_THREE)
    } else {
      setShowEstimateModal(true)
    }
  }

  const onClickBackBtn = () => {
    if (curStep === stepVariant.STEP_ONE) {
      history.goBack()
    } else if (curStep === stepVariant.STEP_TWO) {
      setCurStep(stepVariant.STEP_ONE)
    } else {
      if (isDeadlineError) {
        setDeadlineError(!deadlineError)
        setCurStep(stepVariant.STEP_TWO)
      } else {
        setCurStep(stepVariant.STEP_TWO)
      }
    }
  }

  const disableSubmit =
    !formFields.title ||
    formFields.title.length > 80 ||
    !formFields.shopDetails ||
    !formFields.shopLink ||
    !formFields.price ||
    !formFields.businessStartDate ||
    !formFields.shopAssets.length ||
    (!requestToEdit && !images.length) ||
    (curStep === stepVariant.STEP_TWO &&
      !formFields.statistics.filter(el => el.grossIncome && el.pureIncome && el.uniqueCustomers && el.webpageVisits)
        .length)

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
            disabled={disableSubmit}
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
          <SecondStep
            formFields={formFields}
            setFormFields={setFormFields}
            renderBackNextBtns={renderBackNextBtns}
            onChangeStatisticsField={onChangeStatisticsField}
          />
        )}

        {curStep === stepVariant.STEP_THREE && (
          <ThirdStep
            makeEstimate={makeEstimate}
            formFields={formFields}
            renderBackNextBtns={renderBackNextBtns}
            setMakeEstimate={setMakeEstimate}
            setFormFields={setFormFields}
            onChangeField={onChangeField}
          />
        )}
      </div>

      <div className={classNames.steps}>
        <div className={classNames.stepPagination}>
          <div className={classNames.stepPaginationStartBar}></div>

          <div className={classNames.stepPaginationBar}>
            <div className={classNames.step} style={{ width: curStep === stepVariant.STEP_ONE ? '0%' : '100%' }}></div>
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
              style={{ width: curStep === stepVariant.STEP_ONE || curStep === stepVariant.STEP_TWO ? '0%' : '100%' }}
            ></div>
          </div>

          <div
            className={classNames.stepPaginationEndBar}
            style={{ backgroundColor: curStep === stepVariant.STEP_THREE ? '#00B746' : '#c4c4c4' }}
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

      <Modal openModal={showEstimateModal} setOpenModal={() => setShowEstimateModal(!showEstimateModal)}>
        <EstimateCreateTradingShopForm
          isEdit={requestToEdit}
          files={images}
          makeEstimate={makeEstimate}
          formFields={formFields}
          setOpenModal={() => setShowEstimateModal(!showEstimateModal)}
          onChangeField={onChangeField}
          onCreateSubmit={onCreateSubmit}
          onEditSubmit={onEditSubmit}
        />
      </Modal>

      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}
    </div>
  )
}
