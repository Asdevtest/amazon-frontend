import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { PatchNoteForm } from '@components/forms/patch-note-form'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './moderator-updated-view.style'

import { ModeratorUpdatedViewModel } from './moderator-updated-view.model'
import { ModalNames } from './moderator-updated-view.type'

export const ModeratorUpdatedView = observer(() => {
  const [viewModel] = useState(() => new ModeratorUpdatedViewModel())

  const { classes: styles } = useStyles()

  return (
    <>
      <div className={styles.header}>
        <Button onClick={() => viewModel.onToggleModal(ModalNames.PATCH)}>
          {t(TranslationKey['Add a patch note'])}
        </Button>
      </div>

      <div className={styles.table}>
        <CustomDataGrid
          disableColumnMenu
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          rows={viewModel.patchNotes}
          columnHeaderHeight={40}
          getRowHeight={() => 'auto'}
          getRowId={(row: GridRowModel) => row._id}
          columns={viewModel.columnsModel}
          paginationModel={viewModel.paginationModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          slotProps={{
            toolbar: {
              children: (
                <div className={styles.toolbar}>
                  <p className={styles.tableTitle}>{t(TranslationKey['Patch notes'])}</p>
                </div>
              ),
            },
          }}
          onPaginationModelChange={viewModel.onPaginationModelChange}
        />
      </div>

      <Modal openModal={viewModel.showPatchNoteModal} setOpenModal={() => viewModel.onToggleModal(ModalNames.PATCH)}>
        <PatchNoteForm onToggleModal={() => viewModel.onToggleModal(ModalNames.PATCH)} />
      </Modal>
    </>
  )
})
