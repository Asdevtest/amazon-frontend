import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { BoxViewForm } from '@components/forms/box-view-form'
import { MainContent } from '@components/layout/main-content'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { AdminWarehouseBoxesViewModel } from './admin-warehouse-boxes-view.model'
import { styles } from './admin-warehouse-boxes-view.style'

export const AdminWarehouseBoxesViewRaw = props => {
  const [viewModel] = useState(() => new AdminWarehouseBoxesViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.topHeaderBtnsWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>
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
          rowsPerPageOptions={[15, 25, 50, 100]}
          rows={viewModel.currentData}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          rowHeight={130}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
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
          onSortModelChange={viewModel.onChangeSortingModel}
          onPageSizeChange={viewModel.onChangeRowsPerPage}
          onPageChange={viewModel.onChangeCurPage}
          onStateChange={viewModel.setDataGridState}
          onFilterModelChange={model => viewModel.onChangeFilterModel(model)}
          onRowDoubleClick={e => viewModel.setCurrentOpenedBox(e.row.originalData)}
        />
      </MainContent>

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxViewForm
          box={viewModel.curBox}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
        />
      </Modal>
    </React.Fragment>
  )
}

export const AdminWarehouseBoxesView = withStyles(observer(AdminWarehouseBoxesViewRaw), styles)
