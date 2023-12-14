import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ReplyFeedbackForm } from '@components/forms/reply-feedback-form'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './admin-feedback-view.style'

import { AdminFeedbackViewModel } from './admin-feedback-view.model'

export const AdminFeedbackView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new AdminFeedbackViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div className={styles.headerWrapper}>
        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by name, email'])}
          value={viewModel.nameSearchValue}
          onChange={viewModel.onChangeNameSearchValue}
        />
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          useResizeContainer
          sortingMode="client"
          paginationMode="client"
          localeText={getLocalizationByLanguageTag()}
          rowCount={viewModel.rowCount}
          getRowHeight={() => 'auto'}
          rows={viewModel.getCurrentData()}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModel,
              },
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModel}
          onPaginationModelChange={viewModel.onChangePaginationModel}
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
      </div>
    </React.Fragment>
  )
})
