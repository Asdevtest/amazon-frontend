import { Tabs, Tab } from '@mui/material'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import isEqual from 'lodash.isequal'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinProxyCheckerForm } from '@components/forms/asin-proxy-checker-form'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Modal } from '@components/shared/modal'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { SettingsModel } from '@models/settings-model'
import { AdminSettingsModel } from './admin-settings-content.model'

import {
  TabFreelanceContent,
  TabMainContent,
  TabOrdersContent,
  TabSearchSupplierContent,
  TabPanel,
  TabDestinationsContent,
  TabPaymentMethodsContent,
} from './admin-tabs-content'

import { useClassNames } from './admin-settings-content.style'

const fieldsWithoutCharactersAfterDote = [
  'requestPlatformMarginInPercent',
  'requestSupervisorFeeInPercent',
  'deadlineForFindingSupplier',
  'requestTimeLimitInHourForCancelingProposalsByClient',
  'requestTimeLimitInHourForCheckingProposalBySuper',
]

const tabLabels = [
  TranslationKey.Main,
  TranslationKey.Freelance,
  TranslationKey['Supplier search'],
  TranslationKey.Orders,
  TranslationKey.Destinations,
  TranslationKey['Payment methods'],
]

export const AdminSettingsContent = observer(() => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminSettingsModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const [tabIndex, setTabIndex] = useState(0)
  const [isFormFieldsChanged, setIsFormFieldsChanged] = useState(false)

  const [fieldMethod, setFieldMethod] = useState('')
  const [formFields, setFormFields] = useState({})

  const [proxyArr, setProxyArr] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])

  useEffect(() => {
    setProxyArr(viewModel.serverProxy)
    setPaymentMethods(viewModel.paymentMethods)
  }, [viewModel.serverProxy, viewModel.paymentMethods])

  const adminDynamicSettings = viewModel.adminSettings?.dynamicSettings

  useEffect(() => {
    const sourceFormFields = {
      yuanToDollarRate: adminDynamicSettings?.yuanToDollarRate || 0,
      costOfFindingSupplier: adminDynamicSettings?.costOfFindingSupplier || 0,
      costOfCheckingProduct: adminDynamicSettings?.costOfCheckingProduct || 0,
      deadlineForFindingSupplier: adminDynamicSettings?.deadlineForFindingSupplier || 0,
      requestMinAmountPriceOfProposal: adminDynamicSettings?.requestMinAmountPriceOfProposal || 0,
      requestPlatformMarginInPercent: adminDynamicSettings?.requestPlatformMarginInPercent || 0,
      requestSupervisorFeeInPercent: adminDynamicSettings?.requestSupervisorFeeInPercent || 0,
      requestTimeLimitInHourForCancelingProposalsByClient:
        adminDynamicSettings?.requestTimeLimitInHourForCancelingProposalsByClient || 0,
      requestTimeLimitInHourForCheckingProposalBySuper:
        adminDynamicSettings?.requestTimeLimitInHourForCheckingProposalBySuper || 0,
      volumeWeightCoefficient: adminDynamicSettings?.volumeWeightCoefficient || 0,
      timeToDeadlinePendingOrder: adminDynamicSettings?.timeToDeadlinePendingOrder || 0,
      tech_pause: adminDynamicSettings?.tech_pause || 0,
    }

    setFormFields(sourceFormFields)
  }, [adminDynamicSettings])

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

    viewModel?.createAdminSettings(formFields)

    setIsFormFieldsChanged(false)
  }

  const onSubmitProxy = () => {
    viewModel?.createProxy(proxyArr)
  }

  const handleSubmitPaymentMethod = () => {
    viewModel?.createPaymentMethod(fieldMethod)

    setFieldMethod('')
  }

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }

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

    setIsFormFieldsChanged(true)
  }

  const handleChangeFieldMethod = event => {
    setFieldMethod(event.target.value)
  }

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue)
  }

  const disabledSubmitFirstBlock =
    !isFormFieldsChanged ||
    Number(formFields.yuanToDollarRate) === 0 ||
    Number(formFields.volumeWeightCoefficient) === 0
  const disabledSubmitProxy = isEqual(viewModel?.serverProxy, proxyArr)

  const disabledSubmitSecondBlock =
    !isFormFieldsChanged ||
    Number(formFields.requestPlatformMarginInPercent) === 0 ||
    Number(formFields.requestSupervisorFeeInPercent) === 0 ||
    Number(formFields.requestTimeLimitInHourForCancelingProposalsByClient) === 0 ||
    Number(formFields.requestTimeLimitInHourForCheckingProposalBySuper) === 0

  const disabledSubmitThirdBlock =
    !isFormFieldsChanged ||
    Number(formFields.costOfFindingSupplier) === 0 ||
    Number(formFields.deadlineForFindingSupplier) === 0 ||
    Number(formFields.costOfCheckingProduct) === 0

  return (
    <>
      {SettingsModel.languageTag && (
        <Tabs
          value={tabIndex}
          variant="scrollable"
          classes={{
            root: classNames.rootTabs,
            indicator: classNames.indicator,
            flexContainer: classNames.flexContainerTabs,
          }}
          onChange={handleChangeTab}
        >
          {tabLabels.map(label => (
            <Tab key={label} label={t(label)} classes={{ root: classNames.rootTab }} />
          ))}
        </Tabs>
      )}

      <TabPanel value={tabIndex} index={0}>
        <div className={classNames.contentWrapper}>
          <TabMainContent
            disabledSubmit={disabledSubmitFirstBlock}
            disabledSubmitProxy={disabledSubmitProxy}
            formFields={formFields}
            proxyArr={proxyArr}
            setProxyArr={setProxyArr}
            onChangeField={onChangeField}
            onSubmit={onCreateSubmit}
            onSubmitProxy={onSubmitProxy}
            onClickAddProxyBtn={() => viewModel?.onTriggerOpenModal('showAsinCheckerModal')}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <div className={classNames.contentWrapper}>
          <TabFreelanceContent
            formFields={formFields}
            disabledSubmit={disabledSubmitSecondBlock}
            onSubmit={onCreateSubmit}
            onChangeField={onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <div className={classNames.contentWrapper}>
          <TabSearchSupplierContent
            formFields={formFields}
            disabledSubmit={disabledSubmitThirdBlock}
            onChangeField={onChangeField}
            onSubmit={onCreateSubmit}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <div className={classNames.contentWrapper}>
          <TabOrdersContent
            formFields={formFields}
            disabledSubmit={disabledSubmitThirdBlock}
            onChangeField={onChangeField}
            onSubmit={onCreateSubmit}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        <TabDestinationsContent />
      </TabPanel>
      <TabPanel value={tabIndex} index={5}>
        <div className={classNames.contentWrapper}>
          <TabPaymentMethodsContent
            fieldMethod={fieldMethod}
            paymentMethods={paymentMethods}
            setPaymentMethods={setPaymentMethods}
            handleChangeFieldMethod={handleChangeFieldMethod}
            onSubmitPaymentMethod={handleSubmitPaymentMethod}
          />
        </div>
      </TabPanel>

      <WarningInfoModal
        openModal={viewModel?.showInfoModal}
        setOpenModal={() => viewModel?.onCloseInfoModal()}
        title={viewModel?.infoModalText}
        btnText={t(TranslationKey.Close)}
        onClickBtn={() => {
          viewModel?.onCloseInfoModal()
        }}
      />
      <Modal
        openModal={viewModel?.showAsinCheckerModal}
        setOpenModal={() => viewModel?.onTriggerOpenModal('showAsinCheckerModal')}
      >
        <AsinProxyCheckerForm
          user={viewModel?.user}
          onSubmit={setProxyArr}
          onClose={() => viewModel?.onTriggerOpenModal('showAsinCheckerModal')}
        />
      </Modal>
    </>
  )
})
