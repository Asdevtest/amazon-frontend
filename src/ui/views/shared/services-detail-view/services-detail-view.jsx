/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MyServicesInfo } from '@components/my-services/my-services-info'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ServiceDetailsViewModel } from './services-detail-view.model'
import { styles } from './services-detail-view.style'

export const ServiceDetailsViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new ServiceDetailsViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <MyServicesInfo
          announcementData={viewModel.announcementData}
          onClickEditBtn={viewModel.onClickEditBtn}
          onClickBackBtn={viewModel.onClickBackBtn}
          onClickCloseAnnouncementBtn={viewModel.onClickCloseAnnouncementBtn}
        />

        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
            disableVirtualization
            pagination
            useResizeContainer
            localeText={getLocalizationByLanguageTag()}
            classes={{
              row: classNames.row,
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,

              iconSeparator: classNames.iconSeparator,
              columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
              columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
            }}
            rowCount={viewModel.rowCount}
            page={viewModel.curPage}
            pageSize={viewModel.rowsPerPage}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            rowHeight={143}
            components={{
              Toolbar: DataGridCustomToolbar,
              ColumnMenuIcon: FilterAltOutlinedIcon,
              ColumnMenu: DataGridCustomColumnMenuComponent,
            }}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onPageChange={viewModel.onChangeCurPage}
            onSortModelChange={viewModel.onChangeSortingModel}
            onPageSizeChange={viewModel.onChangeRowsPerPage}
            onFilterModelChange={viewModel.onChangeFilterModel}
            // onStateChange={viewModel.setFirstRowId}
            // onRowDoubleClick={e => onClickOrder(e.row.originalData._id)}
          />
        </div>
      </MainContent>

      <ConfirmationModal
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        isWarning={viewModel.confirmModalSettings.isWarning}
        title={viewModel.confirmModalSettings.confirmTitle}
        message={viewModel.confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
    </React.Fragment>
  )
}

export const ServiceDetailsView = withStyles(observer(ServiceDetailsViewRaw), styles)
