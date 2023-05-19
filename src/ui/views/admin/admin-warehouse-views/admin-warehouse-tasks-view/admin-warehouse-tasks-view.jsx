import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'

import { AdminWarehouseTasksViewModel } from './admin-warehouse-tasks-view.model'
import { styles } from './admin-warehouse-tasks-view.style'

export const AdminWarehouseTasksViewRaw = props => {
  const [viewModel] = useState(() => new AdminWarehouseTasksViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <MemoDataGrid
          pagination
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          classes={{
            row: classNames.row,
            root: classNames.root,
            footerContainer: classNames.footerContainer,
            footerCell: classNames.footerCell,
            toolbarContainer: classNames.toolbarContainer,
          }}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          page={viewModel.curPage}
          pageSize={viewModel.rowsPerPage}
          pageSizeOptions={[15, 25, 50, 100]}
          rows={viewModel.getCurrentData()}
          getRowHeight={() => 'auto'}
          components={{
            Toolbar: DataGridCustomToolbar,
            ColumnMenuIcon: FilterAltOutlinedIcon,
          }}
          componentsProps={{
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                changeColumnsModel: viewModel.changeColumnsModel,
              },
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          onRowSelectionModelChange={newSelection => {
            viewModel.onSelectionModel(newSelection[0])
          }}
          onSortModelChange={viewModel.onChangeSortingModel}
          onPageSizeChange={viewModel.onChangeRowsPerPage}
          onPageChange={viewModel.onChangeCurPage}
          onStateChange={viewModel.setDataGridState}
          onFilterModelChange={model => viewModel.onChangeFilterModel(model)}
        />
      </MainContent>
      <Modal
        openModal={viewModel.showTaskInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showTaskInfoModal')}
      >
        <EditTaskModal
          readOnly
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          task={viewModel.curOpenedTask}
          onClickOpenCloseModal={() => viewModel.onTriggerOpenModal('showTaskInfoModal')}
        />
      </Modal>
    </React.Fragment>
  )
}

export const AdminWarehouseTasksView = withStyles(observer(AdminWarehouseTasksViewRaw), styles)
