import {Box} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'

import React, {useEffect, useRef, useState} from 'react'

import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {AddOrEditDestinationForm} from '@components/forms/add-or-edit-destination-form'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AdminSettingsModel} from './admin-settings-content.model'
import {useClassNames} from './admin-settings-content.style'
import {TabFreelanceContent} from './admin-tabs-content/tab-freelance-content'
import {TabMainContent} from './admin-tabs-content/tab-main-content'
import {TabSearchSupplierContent} from './admin-tabs-content/tab-search-supplier-content'

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
  DESTINATIONS: 'DESTINATIONS',
}

export const AdminSettingsContent = observer(() => {
  const {classes: classNames} = useClassNames()

  const asModel = useRef(new AdminSettingsModel({history}))

  useEffect(() => {
    asModel.current.loadData()
  }, [])

  const {
    adminSettings,
    serverProxy,
    infoModalText,
    showInfoModal,
    createAdminSettings,
    onTriggerOpenModal,
    sortModel,
    filterModel,
    curPage,
    rowsPerPage,
    getCurrentData,
    densityModel,
    columnsModel,
    requestStatus,
    onClickAddBtn,
    onChangeSortingModel,
    onChangeRowsPerPage,
    onChangeFilterModel,
    onChangeCurPage,
    createProxy,
    setDataGridState,
    showAddOrEditDestinationModal,
    destinationToEdit,
    onSubmitCreateDestination,
    onSubmitEditDestination,
    confirmModalSettings,
    showConfirmModal,
    onClickCancelBtn,
    onCloseInfoModal,
  } = asModel.current

  const [formFields, setFormFields] = useState({})
  const [activeTab, setActiveTab] = useState(tabsValues.MAIN)
  const [proxyArr, setProxyArr] = useState(serverProxy)

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
    const newFormFields = {...formFields}

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

  return (
    SettingsModel.languageTag && (
      <div className={classNames.mainWrapper}>
        <div className={classNames.tabsWrapper}>
          <Button
            className={activeTab === tabsValues.MAIN ? classNames.tabItemActiveButton : classNames.tabItemButton}
            onClick={() => setActiveTab(tabsValues.MAIN)}
          >
            {t(TranslationKey.Main)}
          </Button>
          <Button
            className={activeTab === tabsValues.FREELANCE ? classNames.tabItemActiveButton : classNames.tabItemButton}
            onClick={() => setActiveTab(tabsValues.FREELANCE)}
          >
            {t(TranslationKey.Freelance)}
          </Button>
          <Button
            className={
              activeTab === tabsValues.SEARCH_SUPPLIER ? classNames.tabItemActiveButton : classNames.tabItemButton
            }
            onClick={() => setActiveTab(tabsValues.SEARCH_SUPPLIER)}
          >
            {t(TranslationKey['Supplier search'])}
          </Button>
          <Button
            className={
              activeTab === tabsValues.DESTINATIONS ? classNames.tabItemActiveButton : classNames.tabItemButton
            }
            onClick={() => setActiveTab(tabsValues.DESTINATIONS)}
          >
            {t(TranslationKey.Destinations)}
          </Button>
        </div>

        <div className={classNames.tabsItemWrapper}>
          <Box className={activeTab === tabsValues.DESTINATIONS ? classNames.hideBlock : classNames.tabItemWrapper}>
            <div
              className={
                activeTab === tabsValues.MAIN ? classNames.tabItemActiveContent : classNames.tabItemNoActiveContent
              }
            >
              <TabMainContent
                disabled={activeTab !== tabsValues.MAIN}
                formFields={formFields}
                disabledSubmit={disabledSubmitFirstBlock || activeTab !== tabsValues.MAIN}
                disabledAddButton={activeTab !== tabsValues.MAIN}
                disabledSubmitProxy={disabledSubmitProxy}
                proxyArr={proxyArr}
                setProxyArr={setProxyArr}
                onChangeField={onChangeField}
                onSubmit={onCreateSubmit}
                onSubmitProxy={onSubmitProxy}
              />
            </div>
          </Box>

          <Box className={activeTab === tabsValues.DESTINATIONS ? classNames.hideBlock : classNames.tabItemWrapper}>
            <div
              className={
                activeTab === tabsValues.FREELANCE ? classNames.tabItemActiveContent : classNames.tabItemNoActiveContent
              }
            >
              <TabFreelanceContent
                disabled={activeTab !== tabsValues.FREELANCE}
                formFields={formFields}
                disabledSubmit={disabledSubmitSecondBlock || activeTab !== tabsValues.FREELANCE}
                onChangeField={onChangeField}
                onSubmit={onCreateSubmit}
              />
            </div>
          </Box>

          <Box className={activeTab === tabsValues.DESTINATIONS ? classNames.hideBlock : classNames.tabItemWrapper}>
            <div
              className={
                activeTab === tabsValues.SEARCH_SUPPLIER
                  ? classNames.tabItemActiveContent
                  : classNames.tabItemNoActiveContent
              }
            >
              <TabSearchSupplierContent
                disabled={activeTab !== tabsValues.SEARCH_SUPPLIER}
                formFields={formFields}
                disabledSubmit={disabledSubmitThirdBlock || activeTab !== tabsValues.SEARCH_SUPPLIER}
                onChangeField={onChangeField}
                onSubmit={onCreateSubmit}
              />
            </div>
          </Box>
          <Box
            className={
              activeTab !== tabsValues.DESTINATIONS
                ? classNames.tabHideDestinationWrapper
                : classNames.tabActiveDestinationWrapper
            }
          >
            <div
              className={
                activeTab === tabsValues.DESTINATIONS
                  ? classNames.tabItemActiveContent
                  : classNames.tabItemNoActiveContent
              }
            >
              <div className={classNames.placeAddBtnWrapper}>
                <Button success onClick={() => onClickAddBtn()}>
                  {t(TranslationKey['Add a destination'])}
                </Button>
              </div>
              <div className={classNames.datagridWrapper}>
                <DataGrid
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
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  rowHeight={120}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={setDataGridState}
                  onFilterModelChange={model => onChangeFilterModel(model)}
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
          </Box>
        </div>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onCloseInfoModal()}
          title={infoModalText}
          btnText={t(TranslationKey.Close)}
          onClickBtn={() => {
            onCloseInfoModal()
          }}
        />
      </div>
    )
  )
})
