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
      airDeliveryPrice: adminSettings?.dynamicSettings?.airDeliveryPrice || '',
      costOfFindingSupplier: adminSettings?.dynamicSettings?.costOfFindingSupplier || '',
      deadlineForFindingSupplier: adminSettings?.dynamicSettings?.deadlineForFindingSupplier || '',
      requestMinAmountPriceOfProposal: adminSettings?.dynamicSettings?.requestMinAmountPriceOfProposal || '',
      requestPlatformMarginInPercent: adminSettings?.dynamicSettings?.requestPlatformMarginInPercent || '',
      requestSupervisorFeeInPercent: adminSettings?.dynamicSettings?.requestSupervisorFeeInPercent || '',
      requestTimeLimitInHourForCancelingProposalsByClient:
        adminSettings?.dynamicSettings?.requestTimeLimitInHourForCancelingProposalsByClient || '',
      requestTimeLimitInHourForCheckingProposalBySuper:
        adminSettings?.dynamicSettings?.requestTimeLimitInHourForCheckingProposalBySuper || '',

      seaDeliveryPrice: adminSettings?.dynamicSettings?.seaDeliveryPrice || '',
      yuanToDollarRate: adminSettings?.dynamicSettings?.yuanToDollarRate || '',
      costOfCheckingProduct: adminSettings?.dynamicSettings?.costOfCheckingProduct || '',
    }

    setFormFields(sourceFormFields)
  }, [adminSettings])

  const dataKeys = [
    'yuanToDollarRate',
    'airDeliveryPrice',
    'seaDeliveryPrice',
    'costOfFindingSupplier',
    'costOfCheckingProduct',
    'requestMinAmountPriceOfProposal',
    'requestPlatformMarginInPercent',
    'requestSupervisorFeeInPercent',
    'requestTimeLimitInHourForCancelingProposalsByClient',
    'requestTimeLimitInHourForCheckingProposalBySuper',
    'deadlineForFindingSupplier',
  ]

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
        label={textConsts.airDeliveryPrice}
        className={classNames.textField}
        value={formFields.airDeliveryPrice}
        onChange={onChangeField('airDeliveryPrice')}
      />
      <Field
        label={textConsts.seaDeliveryPrice}
        className={classNames.textField}
        value={formFields.seaDeliveryPrice}
        onChange={onChangeField('seaDeliveryPrice')}
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

      <div className={classNames.placeAddBtnWrapper}>
        <Button
          disabled={JSON.stringify(adminSettings.dynamicSettings) === JSON.stringify(formFields)}
          onClick={() => onCreateSubmit(dataKeys)}
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
