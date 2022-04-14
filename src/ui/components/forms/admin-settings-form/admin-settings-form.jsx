import React, {useEffect, useRef, useState} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {AdminSettingsModel} from './admin-settings-form.model'
import {useClassNames} from './admin-settings-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').adminSettingsForm

const fieldsWithoutCharactersAfterDote = [
  'requestPlatformMarginInPercent',
  'requestSupervisorFeeInPercent',
  'deadlineForFindingSupplier',
  'requestTimeLimitInHourForCancelingProposalsByClient',
  'requestTimeLimitInHourForCheckingProposalBySuper',
]

export const AdminSettingsForm = observer(() => {
  const classNames = useClassNames()

  const asModel = useRef(new AdminSettingsModel({history}))

  useEffect(() => {
    asModel.current.loadData()
  }, [])

  const {adminSettings, infoModalText, showInfoModal, createAdminSettings, onTriggerOpenModal} = asModel.current

  const [formFields, setFormFields] = useState({})

  useEffect(() => {
    const sourceFormFields = {
      costOfFindingSupplier: adminSettings?.dynamicSettings?.costOfFindingSupplier || 0,
      deadlineForFindingSupplier: adminSettings?.dynamicSettings?.deadlineForFindingSupplier || 0,
      requestMinAmountPriceOfProposal: adminSettings?.dynamicSettings?.requestMinAmountPriceOfProposal || 0,
      requestPlatformMarginInPercent: adminSettings?.dynamicSettings?.requestPlatformMarginInPercent || 0,
      requestSupervisorFeeInPercent: adminSettings?.dynamicSettings?.requestSupervisorFeeInPercent || 0,
      requestTimeLimitInHourForCancelingProposalsByClient:
        adminSettings?.dynamicSettings?.requestTimeLimitInHourForCancelingProposalsByClient || 0,
      requestTimeLimitInHourForCheckingProposalBySuper:
        adminSettings?.dynamicSettings?.requestTimeLimitInHourForCheckingProposalBySuper || 0,

      yuanToDollarRate: adminSettings?.dynamicSettings?.yuanToDollarRate || 0,
      costOfCheckingProduct: adminSettings?.dynamicSettings?.costOfCheckingProduct || 0,
      volumeWeightCoefficient: adminSettings?.dynamicSettings?.volumeWeightCoefficient || 0,
    }

    setFormFields(sourceFormFields)
  }, [adminSettings])

  // const dataKeys = [
  //   'yuanToDollarRate',
  //   'airDeliveryPrice',
  //   'seaDeliveryPrice',
  //   'costOfFindingSupplier',
  //   'costOfCheckingProduct',
  //   'requestMinAmountPriceOfProposal',
  //   'requestPlatformMarginInPercent',
  //   'requestSupervisorFeeInPercent',
  //   'requestTimeLimitInHourForCancelingProposalsByClient',
  //   'requestTimeLimitInHourForCheckingProposalBySuper',
  //   'deadlineForFindingSupplier',
  //   'volumeWeightCoefficient'
  // ]

  const onCreateSubmit = () => {
    // if (!adminSettings) { // ЕСЛИ НУЖНО ОБНОВЛЯТЬ ОТДЕЛЬНЫЕ КЛЮЧИ
    //   createAdminSettings(formFields)
    // } else {
    //   keys.map(key => {
    //     if (formFields[key] !== adminSettings.dynamicSettings[key]) {
    //       createAdminSettings({[key]: parseInt(formFields[key])})
    //     }
    //   })
    // }

    createAdminSettings(formFields)
  }

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

    if (
      !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(
        event.target.value,
        fieldsWithoutCharactersAfterDote.includes(fieldName) ? 0 : 2,
      )
    ) {
      return
    }
    newFormFields[fieldName] = event.target.value
    setFormFields(newFormFields)
  }

  return (
    <div className={classNames.mainWrapper}>
      <Field
        label={textConsts.yuanToDollarRate}
        className={classNames.textField}
        value={formFields.yuanToDollarRate}
        onChange={onChangeField('yuanToDollarRate')}
      />
      <Field
        label={textConsts.costOfFindingSupplier}
        className={classNames.textField}
        value={formFields.costOfFindingSupplier}
        onChange={onChangeField('costOfFindingSupplier')}
      />

      <Field
        label={textConsts.costOfCheckingProduct}
        className={classNames.textField}
        value={formFields.costOfCheckingProduct}
        onChange={onChangeField('costOfCheckingProduct')}
      />

      <Field
        label={textConsts.requestMinAmountPriceOfProposal}
        className={classNames.textField}
        value={formFields.requestMinAmountPriceOfProposal}
        onChange={onChangeField('requestMinAmountPriceOfProposal')}
      />
      <Field
        label={textConsts.requestPlatformMarginInPercent}
        className={classNames.textField}
        value={formFields.requestPlatformMarginInPercent}
        onChange={onChangeField('requestPlatformMarginInPercent')}
      />
      <Field
        label={textConsts.requestSupervisorFeeInPercent}
        className={classNames.textField}
        value={formFields.requestSupervisorFeeInPercent}
        onChange={onChangeField('requestSupervisorFeeInPercent')}
      />
      <Field
        label={textConsts.requestTimeLimitInHourForCancelingProposalsByClient}
        className={classNames.textField}
        value={formFields.requestTimeLimitInHourForCancelingProposalsByClient}
        onChange={onChangeField('requestTimeLimitInHourForCancelingProposalsByClient')}
      />
      <Field
        label={textConsts.requestTimeLimitInHourForCheckingProposalBySuper}
        className={classNames.textField}
        value={formFields.requestTimeLimitInHourForCheckingProposalBySuper}
        onChange={onChangeField('requestTimeLimitInHourForCheckingProposalBySuper')}
      />

      <Field
        label={textConsts.deadlineForFindingSupplier}
        className={classNames.textField}
        value={formFields.deadlineForFindingSupplier}
        onChange={onChangeField('deadlineForFindingSupplier')}
      />

      <Field
        label={textConsts.volumeWeightCoefficient}
        className={classNames.textField}
        value={formFields.volumeWeightCoefficient}
        onChange={onChangeField('volumeWeightCoefficient')}
      />

      <div className={classNames.placeAddBtnWrapper}>
        <Button
          disabled={JSON.stringify(adminSettings.dynamicSettings) === JSON.stringify(formFields)}
          onClick={() => onCreateSubmit(/* dataKeys*/)}
        >
          {textConsts.saveBtn}
        </Button>
      </div>

      <WarningInfoModal
        openModal={showInfoModal}
        setOpenModal={() => onTriggerOpenModal('showInfoModal')}
        title={infoModalText}
        btnText={textConsts.closeBtn}
        onClickBtn={() => {
          onTriggerOpenModal('showInfoModal')
        }}
      />
    </div>
  )
})
