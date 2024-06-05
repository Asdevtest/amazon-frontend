import { Button } from 'antd'
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReportModal } from '@components/modals/report-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRangeDatePicker } from '@components/shared/custom-range-date-picker'
import { Modal } from '@components/shared/modal'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './reports-view.style'

import { Info } from './info'
import { ReportsViewModel } from './reports-view.model'

interface ReportsViewProps {
  productId: string
  modal?: boolean
  subView?: boolean
}

export const ReportsView: FC<ReportsViewProps> = observer(props => {
  const { modal, productId, subView = false } = props

  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new ReportsViewModel({ productId, subView }))

  return (
    <>
      <div className={styles.wrapper}>
        {!subView ? <Info product={viewModel.product} activeLaunches={viewModel.activeLaunches} /> : null}

        <div className={styles.flexContainer}>
          <CustomRangeDatePicker onChange={viewModel.onChangeRangeDate} />

          {subView ? (
            <CustomInputSearch
              enterButton
              loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
              wrapperClassName={styles.searchInput}
              placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
              onSearch={viewModel.onSearchSubmit}
            />
          ) : null}

          <Button
            type="primary"
            icon={<CustomPlusIcon />}
            onClick={() => viewModel.onToggleReportModalEditMode(undefined)}
          >
            {t(TranslationKey['New report'])}
          </Button>
        </div>

        <div
          className={cx(styles.tableContainer, {
            [styles.tableContainerModal]: modal,
            [styles.tableContainerSubView]: subView,
          })}
        >
          <CustomDataGrid
            rows={viewModel.currentData}
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            columns={viewModel.columnsModel}
            filterModel={viewModel.filterModel}
            pinnedColumns={viewModel.pinnedColumns}
            paginationModel={viewModel.paginationModel}
            rowSelectionModel={viewModel.selectedRows}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            getRowHeight={() => 'auto'}
            columnHeaderHeight={40}
            getRowId={({ _id }: GridRowModel) => _id}
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
            loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onPaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onPinnedColumnsChange={viewModel.handlePinColumn}
          />
        </div>
      </div>

      <Modal openModal={viewModel.showReportModal} setOpenModal={viewModel.onToggleReportModal}>
        <ReportModal
          product={viewModel.product}
          reportId={viewModel.reportId}
          onClose={viewModel.onToggleReportModal}
          onUpdateTableData={viewModel.onGetCurrentData}
        />
      </Modal>
    </>
  )
})
