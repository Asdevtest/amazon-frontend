import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxViewForm } from '@components/forms/box-view-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './client-ready-boxes-view.style'

import { ClientReadyBoxesViewModel } from './client-ready-boxes-view.model'

export const ClientReadyBoxesViewRaw = props => {
  const [viewModel] = useState(() => new ClientReadyBoxesViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params => params.row.isDraft && classNames.isDraftRow

  return (
    <React.Fragment>
      <div>
        <div className={classNames.boxesFiltersWrapper}>
          {viewModel.storekeepersData.slice().map(storekeeper => (
            <Button
              key={storekeeper._id}
              disabled={viewModel.currentStorekeeper?._id === storekeeper._id}
              className={cx(classNames.button, {
                [classNames.selectedBoxesBtn]: viewModel.currentStorekeeper?._id === storekeeper._id,
              })}
              variant="text"
              color="primary"
              onClick={() => viewModel.onClickStorekeeperBtn(storekeeper)}
            >
              {storekeeper.name}
            </Button>
          ))}

          <Button
            disabled={!viewModel.currentStorekeeper?._id}
            className={cx(classNames.button, { [classNames.selectedBoxesBtn]: !viewModel.currentStorekeeper?._id })}
            variant="text"
            color="primary"
            onClick={viewModel.onClickStorekeeperBtn}
          >
            {t(TranslationKey.All)}
          </Button>
        </div>

        <div className={classNames.boxesFiltersWrapper}>
          {viewModel.clientDestinations
            .slice()
            .sort((a, b) => a.name?.localeCompare(b.name))
            .map(destination =>
              destination.boxesCount !== 0 ? (
                <Button
                  key={destination._id}
                  disabled={viewModel.curDestination?._id === destination._id}
                  className={cx(classNames.button, {
                    [classNames.selectedBoxesBtn]: viewModel.curDestination?._id === destination._id,
                  })}
                  variant="text"
                  onClick={() => viewModel.onClickDestinationBtn(destination)}
                >
                  {destination.name}
                </Button>
              ) : null,
            )}

          <Button
            disabled={!viewModel.curDestination?._id}
            tooltipInfoContent={t(TranslationKey['Filter for sorting boxes by prep centers'])}
            className={cx(classNames.button, { [classNames.selectedBoxesBtn]: !viewModel.curDestination?._id })}
            variant="text"
            onClick={viewModel.onClickDestinationBtn}
          >
            {t(TranslationKey.All)}
          </Button>
        </div>

        {/* <WithSearchSelect
                selectedItemName={
                  (!curDestination?._id && t(TranslationKey['All destinations'])) ||
                  (curDestination && curDestination.name)
                }
                data={viewModel.clientDestinations.filter(traiding-shop => curDestination?.id !== traiding-shop._id)}
                searchFields={['name']}
                favourites={viewModel.destinationsFavourites}
                firstItems={
                  <>
                    {!!curDestination?._id && (
                      <Button className={classNames.button} variant="text" onClick={viewModel.onClickDestinationBtn}>
                        {t(TranslationKey['All destinations'])}
                      </Button>
                    )}
                  </>
                }
                onClickSelect={destination => onClickDestinationBtn(destination)}
                onClickSetDestinationFavourite={setDestinationsFavouritesItem}
              /> */}

        <div className={classNames.btnsWrapper}>
          <Button
            disabled={!viewModel.selectedBoxes.length}
            tooltipInfoContent={t(
              TranslationKey['Removes the box for further addition to the batch, returns to My Warehouse'],
            )}
            color="primary"
            className={classNames.returnButton}
            variant="contained"
            onClick={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          >
            {t(TranslationKey['Return to stock'])}
          </Button>

          <SearchInput
            inputClasses={classNames.searchInput}
            value={viewModel.nameSearchValue}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            onChange={viewModel.onChangeNameSearchValue}
          />

          <div />
        </div>
        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            localeText={getLocalizationByLanguageTag()}
            getRowClassName={getRowClassName}
            rowSelectionModel={viewModel.selectedBoxes}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
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
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onRowDoubleClick={e => viewModel.setCurrentOpenedBox(e.row.originalData)}
          />
        </div>
      </div>

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxViewForm
          userInfo={viewModel.userInfo}
          box={viewModel.curBox}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
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

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningInfoModal')
        }}
      />

      <ConfirmationModal
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
    </React.Fragment>
  )
}

export const ClientReadyBoxesView = withStyles(observer(ClientReadyBoxesViewRaw), styles)
