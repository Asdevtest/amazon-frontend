import { observer } from 'mobx-react'
import { Fragment, useEffect, useRef, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinProxyCheckerForm } from '@components/forms/asin-proxy-checker-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditAsinCheckerModal } from '@components/modals/edit-asin-checker-modal'
import { FailedAsinsModal } from '@components/modals/failed-asins-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './supervisor-settings-content.style'

import { SupervisorSettingsContentModel } from './supervisor-settings-content.model'

const tabsValues = {
  ONLINE_ARBITRAGE_CHINA: 'ONLINE_ARBITRAGE_CHINA',
  DROPSHIPPING: 'DROPSHIPPING',
  PRIVATE_LABEL: 'PRIVATE_LABEL',
  WHOLE_SALE_USA: 'WHOLE_SALE_USA',
}

export const SupervisorSettingsContent = observer(() => {
  const [tabIndex, setTabIndex] = useState(tabsValues.ONLINE_ARBITRAGE_CHINA)
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

  const { classes: styles } = useStyles()

  return (
    <Fragment>
      <CustomSwitcher
        switchMode={'medium'}
        condition={tabIndex}
        switcherSettings={[
          { label: () => 'ONLINE ARBITRAGE CHINA', value: tabsValues.ONLINE_ARBITRAGE_CHINA },
          { label: () => 'DROPSHIPPING', value: tabsValues.DROPSHIPPING },
          { label: () => 'PRIVATE LABEL', value: tabsValues.PRIVATE_LABEL },
          { label: () => 'WHOLE SALE USA', value: tabsValues.WHOLE_SALE_USA },
        ]}
        changeConditionHandler={setTabIndex}
      />

      <TabPanel value={tabIndex} index={tabsValues.ONLINE_ARBITRAGE_CHINA}>
        <div className={styles.buttonWrapper}>
          <SearchInput
            inputClasses={styles.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={styles.buttonsWrapper}>
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
            sortingMode="client"
            paginationMode="client"
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
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.DROPSHIPPING}>
        <div className={styles.buttonWrapper}>
          <SearchInput
            inputClasses={styles.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={styles.buttonsWrapper}>
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
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.PRIVATE_LABEL}>
        <div className={styles.buttonWrapper}>
          <SearchInput
            inputClasses={styles.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={styles.buttonsWrapper}>
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
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.WHOLE_SALE_USA}>
        <div className={styles.buttonWrapper}>
          <SearchInput
            inputClasses={styles.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            onChange={onChangeNameSearchValue}
          />
          <div className={styles.buttonsWrapper}>
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

      {showConfirmCloseAsinCheckerModal ? (
        <ConfirmationModal
          // @ts-ignore
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
      ) : null}

      {showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={confirmModalSettings?.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => confirmModalSettings.onClickSuccess(tabIndex)}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      <Modal openModal={showFailedAsinsModal} setOpenModal={() => onTriggerOpenModal('showFailedAsinsModal')}>
        <FailedAsinsModal
          failedData={failedData}
          onClickSuccessBtn={() => onTriggerOpenModal('showFailedAsinsModal')}
        />
      </Modal>
    </Fragment>
  )
})
