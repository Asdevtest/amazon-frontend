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

import { useStyles } from './patch-noutes-view.style'

import { PatchNoutesViewModel } from './patch-noutes-view.model'
import { ModalNames } from './patch-noutes-view.type'

export const PatchNoutesView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new PatchNoutesViewModel())

  const patchNodesModalTitle = viewModel.editPatchNote
    ? t(TranslationKey['Edit a patch note'])
    : t(TranslationKey['Add a patch note'])

  return (
    <>
      <div className={styles.header}>
        <Button onClick={viewModel.onOpenPatchNoteForm}>{t(TranslationKey['Add a patch note'])}</Button>
      </div>

      <div className={styles.table}>
        <CustomDataGrid
          disableColumnMenu
          disableRowSelectionOnClick
          rowCount={viewModel.rowCount}
          rows={viewModel.currentData}
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

      <Modal
        missClickModalOn
        openModal={viewModel.showPatchNoteModal}
        setOpenModal={() => viewModel.onToggleModal(ModalNames.PATCH)}
      >
        <PatchNoteForm
          title={patchNodesModalTitle}
          editPatchNote={viewModel.editPatchNote}
          patchNoteVersions={viewModel.patchNoteVersions}
          onToggleModal={() => viewModel.onToggleModal(ModalNames.PATCH)}
          onCreatePatchNotes={viewModel.createPatchNotes}
          onUpdatePatchNote={viewModel.updatePatchNote}
        />
      </Modal>
    </>
  )
})
