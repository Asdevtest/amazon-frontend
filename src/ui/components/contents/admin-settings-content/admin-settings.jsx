import { Tabs, Tab } from '@mui/material'

import { useEffect, useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { tabIndexes, tabLabels } from './admin-settings.constants'
import { AdminSettingsModel } from './admin-settings.model'
import { useClassNames } from './admin-settings.style'
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

export const AdminSettings = observer(() => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminSettingsModel())

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      {SettingsModel.languageTag && (
        <Tabs
          value={viewModel.tabIndex}
          variant="scrollable"
          classes={{
            root: classNames.rootTabs,
            indicator: classNames.indicator,
            flexContainer: classNames.flexContainerTabs,
          }}
          onChange={viewModel.onChangeTab}
        >
          {tabLabels.map(label => (
            <Tab key={label} label={t(label)} classes={{ root: classNames.rootTab }} />
          ))}
        </Tabs>
      )}

      <TabPanel value={viewModel.tabIndex} index={tabIndexes.main}>
        <div className={classNames.contentWrapper}>
          <TabMain
            user={viewModel.user}
            serverProxy={viewModel.serverProxy}
            showAsinCheckerModal={viewModel.showAsinCheckerModal}
            showInfoModal={viewModel.showInfoModal}
            infoModalText={viewModel.infoModalText}
            formFields={viewModel.formFields}
            isFormFieldsChanged={viewModel.isFormFieldsChanged}
            onClickToggleProxyModal={viewModel.onClickToggleProxyModal}
            onClickToggleInfoModal={viewModel.onClickToggleInfoModal}
            onSubmit={viewModel.onSubmitMain}
            onChangeField={viewModel.onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.freelance}>
        <div className={classNames.contentWrapper}>
          <TabFreelance
            formFields={viewModel.formFields}
            isFormFieldsChanged={viewModel.isFormFieldsChanged}
            onSubmit={viewModel.onCreateAdminSettings}
            onChangeField={viewModel.onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.supplierSearch}>
        <div className={classNames.contentWrapper}>
          <TabSearchSupplier
            formFields={viewModel.formFields}
            isFormFieldsChanged={viewModel.isFormFieldsChanged}
            onSubmit={viewModel.onCreateAdminSettings}
            onChangeField={viewModel.onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.orders}>
        <div className={classNames.contentWrapper}>
          <TabOrders
            formFields={viewModel.formFields}
            isFormFieldsChanged={viewModel.isFormFieldsChanged}
            onSubmit={viewModel.onCreateAdminSettings}
            onChangeField={viewModel.onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.destinations}>
        <TabDestinations />
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.redFlags}>
        <div className={classNames.contentWrapper}>
          <TabRedFlags />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.paymentMethods}>
        <div className={classNames.contentWrapper}>
          <TabPaymentMethods />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.tags}>
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
