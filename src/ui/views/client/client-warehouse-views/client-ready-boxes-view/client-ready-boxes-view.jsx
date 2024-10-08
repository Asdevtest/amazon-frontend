import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { BoxForm } from '@components/forms/box-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { styles } from './client-ready-boxes-view.style'

import { ClientReadyBoxesViewModel } from './client-ready-boxes-view.model'

export const ClientReadyBoxesViewRaw = props => {
  const [viewModel] = useState(() => new ClientReadyBoxesViewModel())
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params => params.row.isDraft && styles.isDraftRow

  return (
    <>
      <div>
        <div className={styles.boxesFiltersWrapper}>
          {viewModel.storekeepersData.slice().map(storekeeper => (
            <Button
              key={storekeeper._id}
              disabled={viewModel.currentStorekeeper?._id === storekeeper._id}
              className={cx(styles.button, {
                [styles.selectedBoxesBtn]: viewModel.currentStorekeeper?._id === storekeeper._id,
              })}
              variant={ButtonVariant.OUTLINED}
              onClick={() => viewModel.onClickStorekeeperBtn(storekeeper)}
            >
              {storekeeper.name}
            </Button>
          ))}

          <Button
            disabled={!viewModel.currentStorekeeper?._id}
            className={cx(styles.button, { [styles.selectedBoxesBtn]: !viewModel.currentStorekeeper?._id })}
            variant={ButtonVariant.OUTLINED}
            onClick={viewModel.onClickStorekeeperBtn}
          >
            {t(TranslationKey.All)}
          </Button>
        </div>

        <div className={styles.boxesFiltersWrapper}>
          {viewModel.clientDestinations
            .slice()
            .sort((a, b) => a.name?.localeCompare(b.name))
            .map(destination =>
              destination.boxesCount !== 0 ? (
                <Button
                  key={destination._id}
                  disabled={viewModel.curDestination?._id === destination._id}
                  className={cx(styles.button, {
                    [styles.selectedBoxesBtn]: viewModel.curDestination?._id === destination._id,
                  })}
                  variant={ButtonVariant.OUTLINED}
                  onClick={() => viewModel.onClickDestinationBtn(destination)}
                >
                  {destination.name}
                </Button>
              ) : null,
            )}

          <Button
            disabled={!viewModel.curDestination?._id}
            tooltipInfoContent={t(TranslationKey['Filter for sorting boxes by prep centers'])}
            className={cx(styles.button, { [styles.selectedBoxesBtn]: !viewModel.curDestination?._id })}
            variant={ButtonVariant.OUTLINED}
            onClick={viewModel.onClickDestinationBtn}
          >
            {t(TranslationKey.All)}
          </Button>
        </div>

        <div className={styles.btnsWrapper}>
          <Button
            disabled={!viewModel.selectedBoxes.length}
            tooltipInfoContent={t(
              TranslationKey['Removes the box for further addition to the batch, returns to My Warehouse'],
            )}
            className={styles.returnButton}
            onClick={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          >
            {t(TranslationKey['Return to stock'])}
          </Button>

          <SearchInput
            inputClasses={styles.searchInput}
            value={viewModel.nameSearchValue}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            onChange={viewModel.onChangeNameSearchValue}
          />

          <div />
        </div>
        <div className={styles.datagridWrapper}>
          <CustomDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            getRowClassName={getRowClassName}
            rowSelectionModel={viewModel.selectedBoxes}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.currentData || []}
            getRowHeight={() => 'auto'}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
              },
            }}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onPaginationModelChange}
            onRowDoubleClick={e => viewModel.setCurrentOpenedBox(e.row.originalData)}
          />
        </div>
      </div>

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxForm
          userInfo={viewModel.userInfo}
          box={viewModel.curBox}
          onToggleModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
          onSubmitChangeFields={viewModel.onSubmitChangeBoxFields}
          onClickHsCode={viewModel.onClickHsCode}
        />
      </Modal>

      <Modal
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          hsCodeData={viewModel.hsCodeData}
          onClickSaveHsCode={viewModel.onClickSaveHsCode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Are you sure you want to return the boxes to the warehouse?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.returnBoxesToStock}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </>
  )
}

export const ClientReadyBoxesView = withStyles(observer(ClientReadyBoxesViewRaw), styles)
