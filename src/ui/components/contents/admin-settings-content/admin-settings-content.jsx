import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Tabs, Tab } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { AsinProxyCheckerForm } from '@components/forms/asin-proxy-checker-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { AdminSettingsModel } from './admin-settings-content.model'
import { useClassNames } from './admin-settings-content.style'
import { TabFreelanceContent } from './admin-tabs-content/tab-freelance-content'
import { TabMainContent } from './admin-tabs-content/tab-main-content'
import { TabOrdersContent } from './admin-tabs-content/tab-orders-content'
import { TabSearchSupplierContent } from './admin-tabs-content/tab-search-supplier-content'
import { TabPanel } from './admin-tabs-content/tab-panel'

const fieldsWithoutCharactersAfterDote = [
  'requestPlatformMarginInPercent',
  'requestSupervisorFeeInPercent',
  'deadlineForFindingSupplier',
  'requestTimeLimitInHourForCancelingProposalsByClient',
  'requestTimeLimitInHourForCheckingProposalBySuper',
]

const tabsValues = {
  MAIN: 'MAIN',
  FREELANCE: 'FREELANCE',
  SEARCH_SUPPLIER: 'SEARCH_SUPPLIER',
  ORDERS: 'ORDERS',
  DESTINATIONS: 'DESTINATIONS',
}

export const AdminSettingsContent = observer(() => {
  const { classes: classNames } = useClassNames()

  const asModel = useRef(new AdminSettingsModel({ history }))

  useEffect(() => {
    asModel.current.loadData()
  }, [])

  const {
    user,
    adminSettings,
    serverProxy,
    infoModalText,
    showInfoModal,
    sortModel,
    filterModel,
    densityModel,
    columnsModel,
    requestStatus,
    showAsinCheckerModal,
    showAddOrEditDestinationModal,
    destinationToEdit,
    confirmModalSettings,
    showConfirmModal,
    onSubmitCreateDestination,
    onSubmitEditDestination,
    createAdminSettings,
    onTriggerOpenModal,
    getCurrentData,
    onClickAddBtn,
    onChangeSortingModel,
    onChangeFilterModel,
    createProxy,
    onClickCancelBtn,
    onCloseInfoModal,
  } = asModel.current

  const [formFields, setFormFields] = useState({})
  const [proxyArr, setProxyArr] = useState(serverProxy)
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    setProxyArr(serverProxy)
  }, [serverProxy])

  useEffect(() => {
    const sourceFormFields = {
      yuanToDollarRate: adminSettings?.dynamicSettings?.yuanToDollarRate || 0,
      costOfFindingSupplier: adminSettings?.dynamicSettings?.costOfFindingSupplier || 0,
      costOfCheckingProduct: adminSettings?.dynamicSettings?.costOfCheckingProduct || 0,
      deadlineForFindingSupplier: adminSettings?.dynamicSettings?.deadlineForFindingSupplier || 0,
      requestMinAmountPriceOfProposal: adminSettings?.dynamicSettings?.requestMinAmountPriceOfProposal || 0,
      requestPlatformMarginInPercent: adminSettings?.dynamicSettings?.requestPlatformMarginInPercent || 0,
      requestSupervisorFeeInPercent: adminSettings?.dynamicSettings?.requestSupervisorFeeInPercent || 0,
      requestTimeLimitInHourForCancelingProposalsByClient:
        adminSettings?.dynamicSettings?.requestTimeLimitInHourForCancelingProposalsByClient || 0,
      requestTimeLimitInHourForCheckingProposalBySuper:
        adminSettings?.dynamicSettings?.requestTimeLimitInHourForCheckingProposalBySuper || 0,

      volumeWeightCoefficient: adminSettings?.dynamicSettings?.volumeWeightCoefficient || 0,

      timeToDeadlinePendingOrder: adminSettings?.dynamicSettings?.timeToDeadlinePendingOrder || 0,

      tech_pause: adminSettings?.dynamicSettings?.tech_pause || 0,
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

  const onSubmitProxy = () => {
    createProxy(proxyArr)
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
  }

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue)
  }

  const disabledSubmitFirstBlock =
    JSON.stringify(adminSettings.dynamicSettings) === JSON.stringify(formFields) ||
    Number(formFields.yuanToDollarRate) === 0 ||
    Number(formFields.volumeWeightCoefficient) === 0

  const disabledSubmitSecondBlock =
    JSON.stringify(adminSettings.dynamicSettings) === JSON.stringify(formFields) ||
    Number(formFields.requestPlatformMarginInPercent) === 0 ||
    Number(formFields.requestSupervisorFeeInPercent) === 0 ||
    Number(formFields.requestTimeLimitInHourForCancelingProposalsByClient) === 0 ||
    Number(formFields.requestTimeLimitInHourForCheckingProposalBySuper) === 0

  const disabledSubmitThirdBlock =
    JSON.stringify(adminSettings.dynamicSettings) === JSON.stringify(formFields) ||
    Number(formFields.costOfFindingSupplier) === 0 ||
    Number(formFields.deadlineForFindingSupplier) === 0 ||
    Number(formFields.costOfCheckingProduct) === 0

  const disabledSubmitProxy = JSON.stringify(serverProxy) === JSON.stringify(proxyArr)

  const tabLabels = [
    TranslationKey.Main,
    TranslationKey.Freelance,
    TranslationKey['Supplier search'],
    TranslationKey.Orders,
    TranslationKey.Destinations,
  ]

  return (
    <>
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
          <Tab key={label} label={t(label)} classes={{ root: classNames.rootTab, labelIcon: classNames.lol }} />
        ))}
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <div className={classNames.contentWrapper}>
          <TabMainContent
            disabledSubmit={disabledSubmitFirstBlock}
            disabledAddButton={false}
            disabledSubmitProxy={disabledSubmitProxy}
            formFields={formFields}
            proxyArr={proxyArr}
            setProxyArr={setProxyArr}
            onChangeField={onChangeField}
            onSubmit={onCreateSubmit}
            onSubmitProxy={onSubmitProxy}
            onClickAddProxyBtn={() => onTriggerOpenModal('showAsinCheckerModal')}
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
          <TabSearchSupplierContent formFields={formFields} onChangeField={onChangeField} onSubmit={onCreateSubmit} />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <div className={classNames.contentWrapper}>
          <TabOrdersContent formFields={formFields} onChangeField={onChangeField} onSubmit={onCreateSubmit} />
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        <div className={classNames.contentWrapper}>
          <div className={classNames.placeAddBtnWrapper}>
            <Button success onClick={() => onClickAddBtn()}>
              {t(TranslationKey['Add a destination'])}
            </Button>
          </div>
          <div className={classNames.datagridWrapper}>
            <MemoDataGrid
              pagination
              useResizeContainer
              classes={{
                root: classNames.root,
                footerContainer: classNames.footerContainer,
                footerCell: classNames.footerCell,
                toolbarContainer: classNames.toolbarContainer,
              }}
              localeText={getLocalizationByLanguageTag()}
              sortModel={sortModel}
              filterModel={filterModel}
              columnVisibilityModel={asModel.current.columnVisibilityModel}
              paginationModel={asModel.current.paginationModel}
              pageSizeOptions={[15, 25, 50, 100]}
              rows={getCurrentData()}
              rowHeight={120}
              slots={{
                toolbar: DataGridCustomToolbar,
                columnMenuIcon: FilterAltOutlinedIcon,
              }}
              slotProps={{
                toolbar: {
                  columsBtnSettings: {
                    columnsModel,
                    columnVisibilityModel: asModel.current.columnVisibilityModel,
                    onColumnVisibilityModelChange: asModel.current.onColumnVisibilityModelChange,
                  },
                },
              }}
              density={densityModel}
              columns={columnsModel}
              loading={requestStatus === loadingStatuses.isLoading}
              onSortModelChange={onChangeSortingModel}
              onPaginationModelChange={asModel.current.onChangePaginationModelChange}
              onFilterModelChange={onChangeFilterModel}
            />
          </div>

          <Modal
            openModal={showAddOrEditDestinationModal}
            setOpenModal={() => onTriggerOpenModal('showAddOrEditDestinationModal')}
          >
            <AddOrEditDestinationForm
              destinationToEdit={destinationToEdit}
              onCloseModal={() => onClickCancelBtn()}
              onCreateSubmit={onSubmitCreateDestination}
              onEditSubmit={onSubmitEditDestination}
            />
          </Modal>

          <ConfirmationModal
            isWarning={confirmModalSettings.isWarning}
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={t(TranslationKey.Attention)}
            message={confirmModalSettings.message}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.No)}
            onClickSuccessBtn={confirmModalSettings.onClickSuccess}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />
        </div>
      </TabPanel>

      <WarningInfoModal
        openModal={showInfoModal}
        setOpenModal={() => onCloseInfoModal()}
        title={infoModalText}
        btnText={t(TranslationKey.Close)}
        onClickBtn={() => {
          onCloseInfoModal()
        }}
      />
      <Modal openModal={showAsinCheckerModal} setOpenModal={() => onTriggerOpenModal('showAsinCheckerModal')}>
        <AsinProxyCheckerForm
          user={user}
          onSubmit={setProxyArr}
          onClose={() => onTriggerOpenModal('showAsinCheckerModal')}
        />
      </Modal>
    </>
  )
})
