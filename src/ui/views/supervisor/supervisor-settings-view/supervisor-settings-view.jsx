import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinProxyCheckerForm } from '@components/forms/asin-proxy-checker-form'
import { EditAsinCheckerModal } from '@components/modals/edit-asin-checker-modal'
import { FailedAsinsModal } from '@components/modals/failed-asins-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './supervisor-settings-view.style'

import { switcherSettings } from './supervisor-settings-view.config'
import { SupervisorSettingsViewModel } from './supervisor-settings-view.model'

export const SupervisorSettingsView = observer(() => {
  const [viewModel] = useState(() => new SupervisorSettingsViewModel())

  const { classes: styles } = useStyles()

  return (
    <>
      <CustomSwitcher
        switchMode="medium"
        condition={viewModel.tabIndex}
        switcherSettings={switcherSettings}
        changeConditionHandler={viewModel.setTabIndex}
      />

      <div className={styles.flexContainer}>
        <SearchInput
          inputClasses={viewModel.styles.searchInput}
          value={viewModel.nameSearchValue}
          placeholder={t(TranslationKey['Search by ASIN, Reason'])}
          onChange={viewModel.onChangeNameSearchValue}
        />

        <div className={styles.flexContainer}>
          <Button
            styleType={ButtonStyle.DANGER}
            disabled={!viewModel.selectedRowIds?.length}
            className={styles.button}
            onClick={viewModel.onClickRemoveSelectedBtn}
          >
            {t(TranslationKey['Delete selected ASINs'])}
          </Button>
          <Button
            styleType={ButtonStyle.SUCCESS}
            className={styles.button}
            onClick={() => viewModel.onTriggerOpenModal('showAsinCheckerModal')}
          >
            {'ASIN checker'}
          </Button>
        </div>
      </div>
      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          pinnedColumns={viewModel.pinnedColumns}
          paginationModel={viewModel.paginationModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }) => _id}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            columnMenu: viewModel.columnMenuSettings,
            toolbar: {
              resetFiltersBtnSettings: {
                onClickResetFilters: viewModel.onClickResetFilters,
                isSomeFilterOn: viewModel.isSomeFilterOn,
              },
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
              sortSettings: {
                sortModel: viewModel.sortModel,
                columnsModel: viewModel.columnsModel,
                onSortModelChange: viewModel.onChangeSortingModel,
              },
            },
          }}
          rowCount={viewModel.rowCount}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onPinnedColumnsChange={viewModel.handlePinColumn}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        />
      </div>

      {/* <TabPanel value={tabIndex} index={tabsValues.DROPSHIPPING}>
        <div className={styles.flexContainer}>
          <SearchInput
            inputClasses={styles.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={styles.flexContainer}>
            <Button
              styleType={ButtonStyle.DANGER}
              disabled={!selectedRowIds?.length}
              className={styles.button}
              onClick={onClickRemoveSelectedBtn}
            >
              {t(TranslationKey['Delete selected ASINs'])}
            </Button>
            <Button
              styleType={ButtonStyle.SUCCESS}
              className={styles.button}
              onClick={() => onTriggerOpenModal('showAsinCheckerModal')}
            >
              {'ASIN checker'}
            </Button>
          </div>
        </div>
        <div className={styles.dataGridWrapper}>
          <CustomDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            sortModel={sortModel}
            filterModel={filterModel}
            columnVisibilityModel={gpModel.current.columnVisibilityModel}
            paginationModel={gpModel.current.paginationModel}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
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
            loading={requestStatus === loadingStatus.IS_LOADING}
            onSortModelChange={onChangeSortingModel}
            onPaginationModelChange={gpModel.current.onPaginationModelChange}
            onFilterModelChange={onChangeFilterModel}
            onRowSelectionModelChange={onSelectionModel}
          />
        </div>
      </TabPanel> */}

      {/* <TabPanel value={tabIndex} index={tabsValues.PRIVATE_LABEL}>
        <div className={styles.flexContainer}>
          <SearchInput
            inputClasses={styles.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={styles.flexContainer}>
            <Button
              styleType={ButtonStyle.DANGER}
              disabled={!selectedRowIds?.length}
              className={styles.button}
              onClick={onClickRemoveSelectedBtn}
            >
              {t(TranslationKey['Delete selected ASINs'])}
            </Button>
            <Button
              styleType={ButtonStyle.SUCCESS}
              className={styles.button}
              onClick={() => onTriggerOpenModal('showAsinCheckerModal')}
            >
              ASIN checker
            </Button>
          </div>
        </div>
        <div className={styles.dataGridWrapper}>
          <CustomDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            sortModel={sortModel}
            filterModel={filterModel}
            columnVisibilityModel={gpModel.current.columnVisibilityModel}
            paginationModel={gpModel.current.paginationModel}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
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
            loading={requestStatus === loadingStatus.IS_LOADING}
            onSortModelChange={onChangeSortingModel}
            onPaginationModelChange={gpModel.current.onPaginationModelChange}
            onFilterModelChange={onChangeFilterModel}
            onRowSelectionModelChange={onSelectionModel}
          />
        </div>
      </TabPanel> */}

      {/* <TabPanel value={tabIndex} index={tabsValues.WHOLE_SALE_USA}>
        <div className={styles.flexContainer}>
          <SearchInput
            inputClasses={styles.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={styles.flexContainer}>
            <Button
              styleType={ButtonStyle.DANGER}
              disabled={!selectedRowIds?.length}
              className={styles.button}
              onClick={onClickRemoveSelectedBtn}
            >
              {t(TranslationKey['Delete selected ASINs'])}
            </Button>
            <Button
              styleType={ButtonStyle.SUCCESS}
              className={styles.button}
              onClick={() => onTriggerOpenModal('showAsinCheckerModal')}
            >
              ASIN checker
            </Button>
          </div>
        </div>

        <div className={styles.dataGridWrapper}>
          <CustomDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            sortModel={sortModel}
            filterModel={filterModel}
            columnVisibilityModel={gpModel.current.columnVisibilityModel}
            paginationModel={gpModel.current.paginationModel}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
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
            columns={columnsModel}
            loading={requestStatus === loadingStatus.IS_LOADING}
            onSortModelChange={onChangeSortingModel}
            onPaginationModelChange={gpModel.current.onPaginationModelChange}
            onFilterModelChange={onChangeFilterModel}
            onRowSelectionModelChange={onSelectionModel}
          />
        </div>
      </TabPanel> */}

      <Modal
        openModal={viewModel.showAsinCheckerModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmCloseAsinCheckerModal')}
      >
        <AsinProxyCheckerForm
          user={viewModel.userInfo}
          strategy={viewModel.tabIndex}
          onSubmit={viewModel.onSubmitAsins}
          onClose={() => viewModel.onTriggerOpenModal('showConfirmCloseAsinCheckerModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showEditAsinCheckerModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditAsinCheckerModal')}
      >
        <EditAsinCheckerModal
          strategy={viewModel.tabIndex}
          asinsToEdit={viewModel.asinsToEdit}
          onSubmit={viewModel.onEditAsins}
          onClose={() => viewModel.onTriggerOpenModal('showEditAsinCheckerModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showFailedAsinsModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showFailedAsinsModal')}
      >
        <FailedAsinsModal
          failedData={viewModel.failedData}
          onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showFailedAsinsModal')}
        />
      </Modal>
    </>
  )
})
