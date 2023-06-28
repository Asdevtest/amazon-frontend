import { Tabs, Tab } from '@mui/material'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'
import { fieldsWithoutCharsAfterDote, startValueFields, tabLabels } from './constants'

import { WarningInfoModal } from '@components/modals/warning-info-modal'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { SettingsModel } from '@models/settings-model'
import { AdminSettingsModel } from './admin-settings-content.model'

import {
  TabFreelance,
  TabMain,
  TabOrders,
  TabSearchSupplier,
  TabPanel,
  TabDestinations,
  TabPaymentMethods,
  TabTags,
} from './admin-tabs'

import { useClassNames } from './admin-settings-content.style'
import { toJS } from 'mobx'

export const AdminSettingsContent = observer(() => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminSettingsModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const [tabIndex, setTabIndex] = useState(0)
  const [isFormFieldsChanged, setIsFormFieldsChanged] = useState(false)

  const [fieldMethod, setFieldMethod] = useState('')
  const [formFields, setFormFields] = useState(startValueFields)

  const [paymentMethods, setPaymentMethods] = useState([])

  useEffect(() => {
    setPaymentMethods(viewModel.paymentMethods)
  }, [viewModel.paymentMethods])

  useEffect(() => {
    if (viewModel.adminSettings?.dynamicSettings) {
      setFormFields(toJS(viewModel.adminSettings?.dynamicSettings))
    }
  }, [viewModel.adminSettings])

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue)
  }

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

    viewModel.createAdminSettings(formFields)

    setIsFormFieldsChanged(false)
  }

  const handleSubmitPaymentMethod = () => {
    viewModel.createPaymentMethod(fieldMethod)

    setFieldMethod('')
  }

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }

    if (
      !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(
        event.target.value,
        fieldsWithoutCharsAfterDote.includes(fieldName) ? 0 : 2,
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
          <TabMain
            formFields={formFields}
            isFormFieldsChanged={isFormFieldsChanged}
            onChangeField={onChangeField}
            onSubmit={onCreateSubmit}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <div className={classNames.contentWrapper}>
          <TabFreelance
            formFields={formFields}
            disabledSubmit={disabledSubmitSecondBlock}
            onSubmit={onCreateSubmit}
            onChangeField={onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <div className={classNames.contentWrapper}>
          <TabSearchSupplier
            formFields={formFields}
            disabledSubmit={disabledSubmitThirdBlock}
            onChangeField={onChangeField}
            onSubmit={onCreateSubmit}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <div className={classNames.contentWrapper}>
          <TabOrders
            formFields={formFields}
            disabledSubmit={disabledSubmitThirdBlock}
            onChangeField={onChangeField}
            onSubmit={onCreateSubmit}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        <TabDestinations />
      </TabPanel>
      <TabPanel value={tabIndex} index={5}>
        <div className={classNames.contentWrapper}>
          <TabPaymentMethods
            imageUrl={viewModel.imageUrl}
            imageName={viewModel.imageName}
            fieldMethod={fieldMethod}
            paymentMethods={paymentMethods}
            setPaymentMethods={setPaymentMethods}
            onChangeFieldMethod={handleChangeFieldMethod}
            onImageUpload={viewModel.onImageUpload}
            onRemoveImage={viewModel.onRemoveImage}
            onSubmitPaymentMethod={handleSubmitPaymentMethod}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={6}>
        <TabTags />
      </TabPanel>

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={() => viewModel.onCloseInfoModal()}
        title={viewModel.infoModalText}
        btnText={t(TranslationKey.Close)}
        onClickBtn={() => viewModel.onCloseInfoModal()}
      />
    </>
  )
})
