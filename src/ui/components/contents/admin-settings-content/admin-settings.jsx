import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useEffect, useState } from 'react'

import { Tabs, Tab } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'
import { fieldsWithoutCharsAfterDote, startValueFields, tabIndexes, tabLabels } from './admin-settings.constants'

import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { TabPanel } from '@components/shared/tab-panel'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { SettingsModel } from '@models/settings-model'

import {
  TabFreelance,
  TabMain,
  TabOrders,
  TabSearchSupplier,
  TabDestinations,
  TabRedFlags,
  TabPaymentMethods,
  TabTags,
} from './admin-tabs'
import { AdminSettingsModel } from './admin-settings.model'

import { useClassNames } from './admin-settings.style'

export const AdminSettings = observer(() => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminSettingsModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const [tabIndex, setTabIndex] = useState(tabIndexes.main)
  const [isFormFieldsChanged, setIsFormFieldsChanged] = useState(false)
  const [formFields, setFormFields] = useState(startValueFields)

  useEffect(() => {
    if (viewModel.adminSettings?.dynamicSettings) {
      setFormFields(toJS(viewModel.adminSettings?.dynamicSettings))
    }
  }, [viewModel.adminSettings])

  const handleChangeTab = (_, selectedTab) => {
    setTabIndex(selectedTab)
  }

  const onCreateSubmit = () => {
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

      <TabPanel value={tabIndex} index={tabIndexes.main}>
        <div className={classNames.contentWrapper}>
          <TabMain
            formFields={formFields}
            isFormFieldsChanged={isFormFieldsChanged}
            onSubmit={onCreateSubmit}
            onChangeField={onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={tabIndexes.freelance}>
        <div className={classNames.contentWrapper}>
          <TabFreelance
            formFields={formFields}
            isFormFieldsChanged={isFormFieldsChanged}
            onSubmit={onCreateSubmit}
            onChangeField={onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={tabIndexes.supplierSearch}>
        <div className={classNames.contentWrapper}>
          <TabSearchSupplier
            formFields={formFields}
            isFormFieldsChanged={isFormFieldsChanged}
            onSubmit={onCreateSubmit}
            onChangeField={onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={tabIndexes.orders}>
        <div className={classNames.contentWrapper}>
          <TabOrders
            formFields={formFields}
            isFormFieldsChanged={isFormFieldsChanged}
            onChangeField={onChangeField}
            onSubmit={onCreateSubmit}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={tabIndexes.destinations}>
        <TabDestinations />
      </TabPanel>
      <TabPanel value={tabIndex} index={tabIndexes.redFlags}>
        <div className={classNames.contentWrapper}>
          <TabRedFlags />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={tabIndexes.paymentMethods}>
        <div className={classNames.contentWrapper}>
          <TabPaymentMethods />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={tabIndexes.tags}>
        <TabTags />
      </TabPanel>

      <WarningInfoModal
        title={viewModel.infoModalText}
        btnText={t(TranslationKey.Close)}
        openModal={viewModel.showInfoModal}
        setOpenModal={viewModel.onClickToggleInfoModal}
        onClickBtn={viewModel.onClickToggleInfoModal}
      />
    </>
  )
})
