import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { PatchNoteForm } from '@components/forms/patch-note-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './patch-noutes-view.style'

import { PatchNoutesViewModel } from './patch-noutes-view.model'
import { ModalNames } from './patch-noutes-view.type'

export const PatchNoutesView = observer(() => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new PatchNoutesViewModel(), [])

  const patchNodesModalTitle = viewModel.editPatchNote
    ? t(TranslationKey['Edit a patch note'])
    : t(TranslationKey['Add a patch note'])

  return (
    <div className="viewWrapper">
      <div>
        <CustomButton type="primary" size="large" onClick={viewModel.onOpenPatchNoteForm}>
          {t(TranslationKey['Add a patch note'])}
        </CustomButton>
      </div>
      <CustomDataGrid
        disableColumnMenu
        disableRowSelectionOnClick
        rowCount={viewModel.rowCount}
        rows={viewModel.currentData}
        columnHeaderHeight={40}
        getRowHeight={() => 'auto'}
        columns={viewModel.columnsModel}
        paginationModel={viewModel.paginationModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
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

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.CONFIRM)}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Are you sure you want to delete the patch note?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.onRemovePatchNote}
          onClickCancelBtn={() => viewModel.onToggleModal(ModalNames.CONFIRM)}
        />
      ) : null}
    </div>
  )
})
