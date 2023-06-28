import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useEffect, useState } from 'react'

import { Tabs, Tab } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'
import { fieldsWithoutCharsAfterDote, startValueFields, tabLabels } from './constants'

import { WarningInfoModal } from '@components/modals/warning-info-modal'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { SettingsModel } from '@models/settings-model'

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
import { AdminSettingsModel } from './admin-settings-content.model'

import { useClassNames } from './admin-settings-content.style'

export const AdminSettingsContent = observer(() => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminSettingsModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const [tabIndex, setTabIndex] = useState(0)
  const [isFormFieldsChanged, setIsFormFieldsChanged] = useState(false)
  const [formFields, setFormFields] = useState(startValueFields)

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
            isFormFieldsChanged={isFormFieldsChanged}
            onSubmit={onCreateSubmit}
            onChangeField={onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <div className={classNames.contentWrapper}>
          <TabSearchSupplier
            formFields={formFields}
            isFormFieldsChanged={isFormFieldsChanged}
            onChangeField={onChangeField}
            onSubmit={onCreateSubmit}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <div className={classNames.contentWrapper}>
          <TabOrders
            formFields={formFields}
            isFormFieldsChanged={isFormFieldsChanged}
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
          <TabPaymentMethods />
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
