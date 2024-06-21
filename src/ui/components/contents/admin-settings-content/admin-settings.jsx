import { observer } from 'mobx-react'
import { useState } from 'react'

import { Tab, Tabs } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { useStyles } from './admin-settings.style'

import { tabIndexes, tabLabels } from './admin-settings.constants'
import { AdminSettingsModel } from './admin-settings.model'
import {
  Shutdown,
  TabDestinations,
  TabFreelance,
  TabMain,
  TabOrders,
  TabPaymentMethods,
  TabRedFlags,
  TabSearchSupplier,
  TabTags,
} from './admin-tabs'
import { LaunchesReports } from './admin-tabs/launches-reports/launches-reports'

export const AdminSettings = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new AdminSettingsModel())

  return (
    <>
      <Tabs
        value={viewModel.tabIndex}
        variant="scrollable"
        classes={{
          root: styles.rootTabs,
          indicator: styles.indicator,
          flexContainer: styles.flexContainerTabs,
        }}
        onChange={viewModel.onChangeTab}
      >
        {tabLabels.map(label => (
          <Tab key={label} label={t(label)} classes={{ root: styles.rootTab }} />
        ))}
      </Tabs>

      <TabPanel value={viewModel.tabIndex} index={tabIndexes.main}>
        <div className={styles.contentWrapper}>
          <TabMain
            user={viewModel.user}
            serverProxy={viewModel.serverProxy}
            showAsinCheckerModal={viewModel.showAsinCheckerModal}
            formFields={viewModel.formFields}
            isFormFieldsChanged={viewModel.isFormFieldsChanged}
            isEqualServerProxy={viewModel.isEqualServerProxy}
            onClickToggleProxyModal={viewModel.onClickToggleProxyModal}
            onSubmit={viewModel.onSubmitMain}
            onChangeField={viewModel.onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.freelance}>
        <div className={styles.contentWrapper}>
          <TabFreelance
            formFields={viewModel.formFields}
            isFormFieldsChanged={viewModel.isFormFieldsChanged}
            onSubmit={viewModel.onCreateAdminSettings}
            onChangeField={viewModel.onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.supplierSearch}>
        <div className={styles.contentWrapper}>
          <TabSearchSupplier
            formFields={viewModel.formFields}
            isFormFieldsChanged={viewModel.isFormFieldsChanged}
            onSubmit={viewModel.onCreateAdminSettings}
            onChangeField={viewModel.onChangeField}
          />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.orders}>
        <div className={styles.contentWrapper}>
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
        <div className={styles.contentWrapper}>
          <TabRedFlags />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.paymentMethods}>
        <div className={styles.contentWrapper}>
          <TabPaymentMethods />
        </div>
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.tags}>
        <TabTags />
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.launchesReports}>
        <LaunchesReports timeBeforeLaunchDeadline={viewModel.formFields.timeBeforeLaunchDeadline} />
      </TabPanel>
      <TabPanel value={viewModel.tabIndex} index={tabIndexes.shutdown}>
        <Shutdown techPause={viewModel.techPause} />
      </TabPanel>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={viewModel.showConfirmModal}
          setOpenModal={viewModel.onClickToggleConfirmModal}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickSuccess}
          onClickCancelBtn={viewModel.confirmModalSettings.onClickFailed}
        />
      ) : null}
    </>
  )
})
