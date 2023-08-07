import { observer } from 'mobx-react'
import React, { useEffect, useRef } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Tabs } from '@mui/material'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AsinProxyCheckerForm } from '@components/forms/asin-proxy-checker-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditAsinCheckerModal } from '@components/modals/edit-asin-checker-modal'
import { FailedAsinsModal } from '@components/modals/failed-asins-modal'
import { Button } from '@components/shared/buttons/button'
import { ITab } from '@components/shared/i-tab'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { TabPanel } from '@components/shared/tab-panel'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { SupervisorSettingsContentModel } from './supervisor-settings-content.model'
import { useClassNames } from './supervisor-settings-content.style'

const tabsValues = {
  ONLINE_ARBITRAGE_CHINA: 'ONLINE_ARBITRAGE_CHINA',
  DROPSHIPPING: 'DROPSHIPPING',
  PRIVATE_LABEL: 'PRIVATE_LABEL',
  WHOLE_SALE_USA: 'WHOLE_SALE_USA',
}

export const SupervisorSettingsContent = observer(() => {
  const [tabIndex, setTabIndex] = React.useState(tabsValues.ONLINE_ARBITRAGE_CHINA)
  const gpModel = useRef(new SupervisorSettingsContentModel({ history, tabIndex }))

  const {
    user,
    showAsinCheckerModal,
    showEditAsinCheckerModal,
    showConfirmModal,
    showFailedAsinsModal,
    asinsToEdit,
    failedData,
    filterModel,
    sortModel,
    densityModel,
    columnsModel,
    requestStatus,
    confirmModalSettings,
    nameSearchValue,
    selectedRowIds,
    showConfirmCloseAsinCheckerModal,
    getCurrentData,
    onTriggerOpenModal,
    onChangeFilterModel,
    onChangeSortingModel,
    onSubmitAsins,
    onEditAsins,
    onChangeNameSearchValue,
    onSelectionModel,
    onClickRemoveSelectedBtn,
  } = gpModel.current

  useEffect(() => {
    gpModel.current.loadData(tabIndex)
  }, [tabIndex])

  const { classes: classNames } = useClassNames()

  return (
    <React.Fragment>
      <Tabs
        variant={'fullWidth'}
        classes={{
          root: classNames.row,
          indicator: classNames.indicator,
        }}
        value={tabIndex}
        onChange={(e, value) => {
          setTabIndex(value)
        }}
      >
        <ITab value={tabsValues.ONLINE_ARBITRAGE_CHINA} label={'ONLINE ARBITRAGE CHINA'} />

        <ITab label={'DROPSHIPPING'} value={tabsValues.DROPSHIPPING} />

        <ITab label={'PRIVATE LABEL'} value={tabsValues.PRIVATE_LABEL} />

        <ITab label={'WHOLE SALE USA'} value={tabsValues.WHOLE_SALE_USA} />
      </Tabs>

      <TabPanel value={tabIndex} index={tabsValues.ONLINE_ARBITRAGE_CHINA}>
        <div className={classNames.buttonWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={classNames.buttonsWrapper}>
            <Button
              danger
              disabled={!selectedRowIds?.length}
              className={classNames.button}
              onClick={onClickRemoveSelectedBtn}
            >
              {t(TranslationKey['Delete selected ASINs'])}
            </Button>
            <Button success className={classNames.button} onClick={() => onTriggerOpenModal('showAsinCheckerModal')}>
              {'ASIN checker'}
            </Button>
          </div>
        </div>
        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
            disableVirtualization
            pagination
            checkboxSelection
            useResizeContainer
            classes={{
              row: classNames.row,
              // root: classNames.rootDataGrid,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            localeText={getLocalizationByLanguageTag()}
            sortModel={sortModel}
            filterModel={filterModel}
            columnVisibilityModel={gpModel.current.columnVisibilityModel}
            paginationModel={gpModel.current.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
            }}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel,
                  columnVisibilityModel: gpModel.current.columnVisibilityModel,
                  onColumnVisibilityModelChange: gpModel.current.onColumnVisibilityModelChange,
                },
              },
            }}
            density={densityModel}
            columns={columnsModel}
            loading={requestStatus === loadingStatuses.isLoading}
            onSortModelChange={onChangeSortingModel}
            onPaginationModelChange={gpModel.current.onChangePaginationModelChange}
            onFilterModelChange={onChangeFilterModel}
            onRowSelectionModelChange={onSelectionModel}
          />
        </div>
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.DROPSHIPPING}>
        <div className={classNames.buttonWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={classNames.buttonsWrapper}>
            <Button
              danger
              disabled={!selectedRowIds?.length}
              className={classNames.button}
              onClick={onClickRemoveSelectedBtn}
            >
              {t(TranslationKey['Delete selected ASINs'])}
            </Button>
            <Button success className={classNames.button} onClick={() => onTriggerOpenModal('showAsinCheckerModal')}>
              {'ASIN checker'}
            </Button>
          </div>
        </div>
        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
            disableVirtualization
            pagination
            useResizeContainer
            checkboxSelection
            classes={{
              row: classNames.row,
              // root: classNames.rootDataGrid,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            localeText={getLocalizationByLanguageTag()}
            sortModel={sortModel}
            filterModel={filterModel}
            columnVisibilityModel={gpModel.current.columnVisibilityModel}
            paginationModel={gpModel.current.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
            }}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel,
                  columnVisibilityModel: gpModel.current.columnVisibilityModel,
                  onColumnVisibilityModelChange: gpModel.current.onColumnVisibilityModelChange,
                },
              },
            }}
            density={densityModel}
            columns={columnsModel}
            loading={requestStatus === loadingStatuses.isLoading}
            onSortModelChange={onChangeSortingModel}
            onPaginationModelChange={gpModel.current.onChangePaginationModelChange}
            onFilterModelChange={onChangeFilterModel}
            onRowSelectionModelChange={onSelectionModel}
          />
        </div>
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.PRIVATE_LABEL}>
        <div className={classNames.buttonWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={classNames.buttonsWrapper}>
            <Button
              danger
              disabled={!selectedRowIds?.length}
              className={classNames.button}
              onClick={onClickRemoveSelectedBtn}
            >
              {t(TranslationKey['Delete selected ASINs'])}
            </Button>
            <Button success className={classNames.button} onClick={() => onTriggerOpenModal('showAsinCheckerModal')}>
              {'ASIN checker'}
            </Button>
          </div>
        </div>
        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
            disableVirtualization
            pagination
            useResizeContainer
            checkboxSelection
            classes={{
              row: classNames.row,
              // root: classNames.rootDataGrid,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            localeText={getLocalizationByLanguageTag()}
            sortModel={sortModel}
            filterModel={filterModel}
            columnVisibilityModel={gpModel.current.columnVisibilityModel}
            paginationModel={gpModel.current.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
            }}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel,
                  columnVisibilityModel: gpModel.current.columnVisibilityModel,
                  onColumnVisibilityModelChange: gpModel.current.onColumnVisibilityModelChange,
                },
              },
            }}
            density={densityModel}
            columns={columnsModel}
            loading={requestStatus === loadingStatuses.isLoading}
            onSortModelChange={onChangeSortingModel}
            onPaginationModelChange={gpModel.current.onChangePaginationModelChange}
            onFilterModelChange={onChangeFilterModel}
            onRowSelectionModelChange={onSelectionModel}
          />
        </div>
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.WHOLE_SALE_USA}>
        <div className={classNames.buttonWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={classNames.buttonsWrapper}>
            <Button
              danger
              disabled={!selectedRowIds?.length}
              className={classNames.button}
              onClick={onClickRemoveSelectedBtn}
            >
              {t(TranslationKey['Delete selected ASINs'])}
            </Button>
            <Button success className={classNames.button} onClick={() => onTriggerOpenModal('showAsinCheckerModal')}>
              {'ASIN checker'}
            </Button>
          </div>
        </div>
        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
            disableVirtualization
            pagination
            useResizeContainer
            checkboxSelection
            classes={{
              row: classNames.row,
              // root: classNames.rootDataGrid,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            localeText={getLocalizationByLanguageTag()}
            sortModel={sortModel}
            filterModel={filterModel}
            columnVisibilityModel={gpModel.current.columnVisibilityModel}
            paginationModel={gpModel.current.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
            }}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel,
                  columnVisibilityModel: gpModel.current.columnVisibilityModel,
                  onColumnVisibilityModelChange: gpModel.current.onColumnVisibilityModelChange,
                },
              },
            }}
            density={densityModel}
            columns={columnsModel}
            loading={requestStatus === loadingStatuses.isLoading}
            onSortModelChange={onChangeSortingModel}
            onPaginationModelChange={gpModel.current.onChangePaginationModelChange}
            onFilterModelChange={onChangeFilterModel}
            onRowSelectionModelChange={onSelectionModel}
          />
        </div>
      </TabPanel>
      <Modal
        openModal={showAsinCheckerModal}
        setOpenModal={() => onTriggerOpenModal('showConfirmCloseAsinCheckerModal')}
      >
        <AsinProxyCheckerForm
          user={user}
          strategy={tabIndex}
          onSubmit={onSubmitAsins}
          onClose={() => onTriggerOpenModal('showConfirmCloseAsinCheckerModal')}
        />
      </Modal>
      <Modal openModal={showEditAsinCheckerModal} setOpenModal={() => onTriggerOpenModal('showEditAsinCheckerModal')}>
        <EditAsinCheckerModal
          strategy={tabIndex}
          asinsToEdit={asinsToEdit}
          onSubmit={onEditAsins}
          onClose={() => onTriggerOpenModal('showEditAsinCheckerModal')}
        />
      </Modal>
      <ConfirmationModal
        openModal={showConfirmCloseAsinCheckerModal}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Window will be closed'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        setOpenModal={() => onTriggerOpenModal('showConfirmCloseAsinCheckerModal')}
        onClickSuccessBtn={() => {
          onTriggerOpenModal('showConfirmCloseAsinCheckerModal')
          onTriggerOpenModal('showAsinCheckerModal')
        }}
        onClickCancelBtn={() => onTriggerOpenModal('showConfirmCloseAsinCheckerModal')}
      />
      <ConfirmationModal
        isWarning={confirmModalSettings.isWarning}
        openModal={showConfirmModal}
        setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => confirmModalSettings.onClickSuccess(tabIndex)}
        onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
      />
      <Modal openModal={showFailedAsinsModal} setOpenModal={() => onTriggerOpenModal('showFailedAsinsModal')}>
        <FailedAsinsModal
          failedData={failedData}
          onClickSuccessBtn={() => onTriggerOpenModal('showFailedAsinsModal')}
        />
      </Modal>
    </React.Fragment>
  )
})
