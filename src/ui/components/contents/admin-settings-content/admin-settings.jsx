import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { Tab, Tabs } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { useStyles } from './admin-settings.style'

import { tabIndexes, tabLabels } from './admin-settings.constants'
import { AdminSettingsModel } from './admin-settings.model'
import {
  TabDestinations,
  TabFreelance,
  TabMain,
  TabOrders,
  TabPaymentMethods,
  TabRedFlags,
  TabSearchSupplier,
  TabTags,
} from './admin-tabs'

export const AdminSettings = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new AdminSettingsModel())

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    SettingsModel.languageTag && (
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
              showInfoModal={viewModel.showInfoModal}
              infoModalText={viewModel.infoModalText}
              formFields={viewModel.formFields}
              isFormFieldsChanged={viewModel.isFormFieldsChanged}
              isEqualServerProxy={viewModel.isEqualServerProxy}
              onClickToggleProxyModal={viewModel.onClickToggleProxyModal}
              onClickToggleInfoModal={viewModel.onClickToggleInfoModal}
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

        <WarningInfoModal
          title={viewModel.infoModalText}
          btnText={t(TranslationKey.Close)}
          openModal={viewModel.showInfoModal}
          setOpenModal={viewModel.onClickToggleInfoModal}
          onClickBtn={viewModel.onClickToggleInfoModal}
        />

        <ConfirmationModal
          openModal={viewModel.showConfirmModal}
          setOpenModal={viewModel.onClickToggleConfirmModal}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickSuccess}
          onClickCancelBtn={viewModel.confirmModalSettings.onClickFailed}
        />
      </>
    )
  )
})
