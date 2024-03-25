import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReplyFeedbackForm } from '@components/forms/reply-feedback-form'
import { GalleryModal } from '@components/modals/gallery-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './admin-feedback-view.style'

import { AdminFeedbackViewModel } from './admin-feedback-view.model'

export const AdminFeedbackView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new AdminFeedbackViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
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
          rowCount={viewModel.rowCount}
          getRowHeight={() => 'auto'}
          rows={viewModel.currentData}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
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
          columns={viewModel.columnsModel}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModel}
          onPaginationModelChange={viewModel.onPaginationModelChange}
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

        {viewModel.showGalleryModal ? (
          <GalleryModal
            files={viewModel.galleryFiles}
            openModal={viewModel.showGalleryModal}
            onOpenModal={() => viewModel.onTriggerOpenModal('showGalleryModal')}
          />
        ) : null}
      </div>
    </>
  )
})
