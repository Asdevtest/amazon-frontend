import React, {useEffect, useRef, useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {AdminSettingsModel} from './admin-settings-form.model'
import {useClassNames} from './admin-settings-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').userSettingsForm

export const AdminSettingsForm = observer(() => {
  const classNames = useClassNames()

  const asModel = useRef(new AdminSettingsModel({history}))

  useEffect(() => {
    asModel.current.loadData()
  }, [])

  const {adminSettings, createAdminSettings} = asModel.current

  const [formFields, setFormFields] = useState({})

  useEffect(() => {
    const sourceFormFields = {
      yuanToDollarRate: adminSettings?.yuanToDollarRate || '',
      airDeliveryPrice: adminSettings?.airDeliveryPrice || '',
      seaDeliveryPrice: adminSettings?.seaDeliveryPrice || '',
      costOfFindingSupplier: adminSettings?.costOfFindingSupplier || '',
      requestMinAmountPriceOfProposal: adminSettings?.requestMinAmountPriceOfProposal || '',
      requestPlatformMarginInPercent: adminSettings?.requestPlatformMarginInPercent || '',
      requestSupervisorFeeInPercent: adminSettings?.requestSupervisorFeeInPercent || '',
      requestTimeLimitInHourForCancelingProposalsByClient:
        adminSettings?.requestTimeLimitInHourForCancelingProposalsByClient || '',
      requestTimeLimitInHourForCheckingProposalBySuper:
        adminSettings?.requestTimeLimitInHourForCheckingProposalBySuper || '',
    }

    setFormFields(sourceFormFields)
  }, [adminSettings])

  const dataKeys = [
    'yuanToDollarRate',
    'airDeliveryPrice',
    'seaDeliveryPrice',
    'costOfFindingSupplier',
    'requestMinAmountPriceOfProposal',
    'requestPlatformMarginInPercent',
    'requestSupervisorFeeInPercent',
    'requestTimeLimitInHourForCancelingProposalsByClient',
    'requestTimeLimitInHourForCheckingProposalBySuper',
  ]

  const onCreateSubmit = keys => {
    if (!adminSettings) {
      createAdminSettings(formFields)
    } else {
      keys.map(key => {
        if (formFields[key] !== adminSettings[key]) {
          createAdminSettings({[key]: parseInt(formFields[key])})
        }
      })
    }
  }

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}
    newFormFields[fieldName] = event.target.value.replace(/[^0-9]/g, '')
    setFormFields(newFormFields)
  }

  return (
    <div className={classNames.mainWrapper}>
      <Typography variant="h5" className={classNames.mainTitle}>
        {textConsts.mainTitle}
      </Typography>

      <Field
        label={'Курс юаня к доллару'}
        className={classNames.textField}
        value={formFields.yuanToDollarRate}
        onChange={onChangeField('yuanToDollarRate')}
      />
      <Field
        label={'Цена за авиа доставку'}
        className={classNames.textField}
        value={formFields.airDeliveryPrice}
        onChange={onChangeField('airDeliveryPrice')}
      />
      <Field
        label={'Цена за доставку морем'}
        className={classNames.textField}
        value={formFields.seaDeliveryPrice}
        onChange={onChangeField('seaDeliveryPrice')}
      />
      <Field
        label={'Цена за поиск поставщика'}
        className={classNames.textField}
        value={formFields.costOfFindingSupplier}
        onChange={onChangeField('costOfFindingSupplier')}
      />
      <Field
        label={'Минимальная цена за предложение к заявке'}
        className={classNames.textField}
        value={formFields.requestMinAmountPriceOfProposal}
        onChange={onChangeField('requestMinAmountPriceOfProposal')}
      />
      <Field
        label={'Процент с каждого предложения'}
        className={classNames.textField}
        value={formFields.requestPlatformMarginInPercent}
        onChange={onChangeField('requestPlatformMarginInPercent')}
      />
      <Field
        label={'Процент с каждого предложения для супервайзера'}
        className={classNames.textField}
        value={formFields.requestSupervisorFeeInPercent}
        onChange={onChangeField('requestSupervisorFeeInPercent')}
      />
      <Field
        label={'Время, после которого, автоматически будет принято предложение'}
        className={classNames.textField}
        value={formFields.requestTimeLimitInHourForCancelingProposalsByClient}
        onChange={onChangeField('requestTimeLimitInHourForCancelingProposalsByClient')}
      />
      <Field
        label={'Время, после которого, автоматически будет снят супервизор с проверки'}
        className={classNames.textField}
        value={formFields.requestTimeLimitInHourForCheckingProposalBySuper}
        onChange={onChangeField('requestTimeLimitInHourForCheckingProposalBySuper')}
      />

      <div className={classNames.placeAddBtnWrapper}>
        <Button
          disabled={JSON.stringify(adminSettings) === JSON.stringify(formFields)}
          onClick={() => onCreateSubmit(dataKeys)}
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
})
