import React, {useEffect, useRef, useState} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {t} from '@utils/translations'

import {AdminSettingsModel} from './admin-settings-form.model'
import {useClassNames} from './admin-settings-form.style'

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
    SettingsModel.languageTag && (
      <div className={classNames.mainWrapper}>
        <Field
          label={t(TranslationKey['Yuan to USD exchange rate']) + ', ¥'}
          className={classNames.textField}
          value={formFields.yuanToDollarRate}
          onChange={onChangeField('yuanToDollarRate')}
        />
        <Field
          label={t(TranslationKey['Price to find a supplier']) + ', $'}
          className={classNames.textField}
          value={formFields.costOfFindingSupplier}
          onChange={onChangeField('costOfFindingSupplier')}
        />

        <Field
          label={
            t(TranslationKey['Price for the Supervisor to check the search for a supplier from the Client']) + ', $'
          }
          className={classNames.textField}
          value={formFields.costOfCheckingProduct}
          onChange={onChangeField('costOfCheckingProduct')}
        />

        <Field
          label={t(TranslationKey['Minimum price per proposal to the order']) + ', $'}
          className={classNames.textField}
          value={formFields.requestMinAmountPriceOfProposal}
          onChange={onChangeField('requestMinAmountPriceOfProposal')}
        />
        <Field
          label={t(TranslationKey['Percentage of each proposal']) + ', %'}
          className={classNames.textField}
          value={formFields.requestPlatformMarginInPercent}
          onChange={onChangeField('requestPlatformMarginInPercent')}
        />
        <Field
          label={t(TranslationKey['Percentage of each proposal for the supervisor']) + ', %'}
          className={classNames.textField}
          value={formFields.requestSupervisorFeeInPercent}
          onChange={onChangeField('requestSupervisorFeeInPercent')}
        />
        <Field
          label={t(TranslationKey['Time after which the offer will automatically be accepted, h'])}
          className={classNames.textField}
          value={formFields.requestTimeLimitInHourForCancelingProposalsByClient}
          onChange={onChangeField('requestTimeLimitInHourForCancelingProposalsByClient')}
        />
        <Field
          label={t(TranslationKey['Time after which the supervisor will automatically be removed from the check, h'])}
          className={classNames.textField}
          value={formFields.requestTimeLimitInHourForCheckingProposalBySuper}
          onChange={onChangeField('requestTimeLimitInHourForCheckingProposalBySuper')}
        />

        <Field
          label={t(TranslationKey['Time to find a supplier, h'])}
          className={classNames.textField}
          value={formFields.deadlineForFindingSupplier}
          onChange={onChangeField('deadlineForFindingSupplier')}
        />

        <Field
          label={t(TranslationKey['Divider for calculating volume weight'])}
          className={classNames.textField}
          value={formFields.volumeWeightCoefficient}
          onChange={onChangeField('volumeWeightCoefficient')}
        />

        <div className={classNames.placeAddBtnWrapper}>
          <Button
            disabled={JSON.stringify(adminSettings.dynamicSettings) === JSON.stringify(formFields)}
            onClick={() => onCreateSubmit(/* dataKeys*/)}
          >
            {t(TranslationKey.Save)}
          </Button>
        </div>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={infoModalText}
          btnText={t(TranslationKey.Close)}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />
      </div>
    )
  )
})
