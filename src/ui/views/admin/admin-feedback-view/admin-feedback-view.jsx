import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { ReplyFeedbackForm } from '@components/forms/reply-feedback-form'
import { MainContent } from '@components/layout/main-content'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { AdminFeedbackViewModel } from './admin-feedback-view.model'
import { styles } from './admin-feedback-view.style'

export const AdminFeedbackViewRaw = props => {
  const [viewModel] = useState(() => new AdminFeedbackViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.headerWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by name, email'])}
            value={viewModel.nameSearchValue}
            onChange={viewModel.onChangeNameSearchValue}
          />
        </div>

        <MemoDataGrid
          disableVirtualization
          pagination
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          classes={{
            row: classNames.row,
            footerContainer: classNames.footerContainer,
            footerCell: classNames.footerCell,
            toolbarContainer: classNames.toolbarContainer,
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rowHeight={100}
          pageSizeOptions={[15, 25, 50, 100]}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          slots={{
            toolbar: DataGridCustomToolbar,
            columnMenuIcon: FilterAltOutlinedIcon,
          }}
          slotProps={{
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          getRowHeight={() => 'auto'}
          rows={viewModel.getCurrentData()}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onChangePaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />

        <Modal
          openModal={viewModel.showReplyFeedbackModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showReplyFeedbackModal')}
        >
          <ReplyFeedbackForm
            feedback={viewModel.selectedFeedback}
            onCloseModal={() => viewModel.onTriggerOpenModal('showReplyFeedbackModal')}
            onSubmit={viewModel.onClickWriteBtn}
          />
        </Modal>
      </MainContent>
    </React.Fragment>
  )
}

export const AdminFeedbackView = withStyles(observer(AdminFeedbackViewRaw), styles)
