import { Tabs } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'

import { t } from '@utils/translations'

import { AdminSettingsModel } from './admin-settings.model'
import { TabLabels } from './admin-settings.type'
import {
  Shutdown,
  TabCategories,
  TabCountries,
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
  const viewModel = useMemo(() => new AdminSettingsModel(), [])

  const generateTabs = () => [
    {
      key: TabLabels.MAIN,
      label: t(TranslationKey.Main),
      children: (
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
      ),
    },
    {
      key: TabLabels.FREELANCE,
      label: t(TranslationKey.Freelance),
      children: (
        <TabFreelance
          formFields={viewModel.formFields}
          isFormFieldsChanged={viewModel.isFormFieldsChanged}
          onSubmit={viewModel.onCreateAdminSettings}
          onChangeField={viewModel.onChangeField}
        />
      ),
    },
    {
      key: TabLabels.SUPPLIER_SEARCH,
      label: t(TranslationKey['Supplier search']),
      children: (
        <TabSearchSupplier
          formFields={viewModel.formFields}
          isFormFieldsChanged={viewModel.isFormFieldsChanged}
          onSubmit={viewModel.onCreateAdminSettings}
          onChangeField={viewModel.onChangeField}
        />
      ),
    },
    {
      key: TabLabels.ORDERS,
      label: t(TranslationKey.Orders),
      children: (
        <TabOrders
          formFields={viewModel.formFields}
          isFormFieldsChanged={viewModel.isFormFieldsChanged}
          onSubmit={viewModel.onCreateAdminSettings}
          onChangeField={viewModel.onChangeField}
        />
      ),
    },
    {
      key: TabLabels.DESTINATIONS,
      label: t(TranslationKey.Destinations),
      children: <TabDestinations />,
    },
    {
      key: TabLabels.RED_FLAGS,
      label: t(TranslationKey['Red flags']),
      children: <TabRedFlags />,
    },
    {
      key: TabLabels.PAYMENT_METHODS,
      label: t(TranslationKey['Payment methods']),
      children: <TabPaymentMethods />,
    },
    {
      key: TabLabels.COUNTRIES,
      label: t(TranslationKey.Countries),
      children: <TabCountries />,
    },
    {
      key: TabLabels.CATEGORIES,
      label: t(TranslationKey.Categories),
      children: <TabCategories />,
    },
    {
      key: TabLabels.TAGS,
      label: t(TranslationKey.Tags),
      children: <TabTags />,
    },
    {
      key: TabLabels.LAUNCHES_REPORTS,
      label: t(TranslationKey['Launches reports']),
      children: <LaunchesReports timeBeforeLaunchDeadline={viewModel.formFields.timeBeforeLaunchDeadline} />,
    },
    {
      key: TabLabels.SHUTDOWN,
      label: t(TranslationKey.Shutdown),
      children: <Shutdown techPause={viewModel.techPause} />,
    },
  ]

  return (
    <div className="viewWrapper">
      <Tabs defaultActiveKey={viewModel.tab} items={generateTabs()} onChange={viewModel.onChangeTab} />

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
    </div>
  )
})
