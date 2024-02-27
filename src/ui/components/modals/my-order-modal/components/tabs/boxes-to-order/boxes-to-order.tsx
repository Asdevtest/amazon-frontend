/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { GridRowModel, GridRowParams } from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxViewForm } from '@components/forms/box-view-form'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { GalleryModal } from '@components/modals/gallery-modal'
import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { IPlatformSettings } from '@typings/shared/patform-settings'

import { useStyles } from './boxes-to-order.style'

import { boxesToOrderColumn } from './boxes-to-order.column'
import { BoxesToOrderModel } from './boxes-to-order.model'
import { ModalNames } from './boxes-to-order.type'

interface BoxesToOrderProps {
  formFields: IOrderWithAdditionalFields
  platformSettings: IPlatformSettings
}

export const BoxesToOrder: FC<BoxesToOrderProps> = observer(({ formFields, platformSettings }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new BoxesToOrderModel(formFields))

  return (
    <>
      <div className={styles.wrapper}>
        <CustomDataGrid
          disableColumnMenu
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          rows={viewModel.boxes}
          columnHeaderHeight={40}
          getRowHeight={() => 'auto'}
          getRowId={(row: GridRowModel) => row._id}
          columns={boxesToOrderColumn(platformSettings, viewModel.onClickFilesCell)}
          paginationModel={viewModel.paginationModel}
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          sx={{
            '& .MuiDataGrid-columnHeaderTitleContainer': styles.columnHeaderTitleContainer,
            '& .MuiDataGrid-columnHeaderDraggableContainer': styles.columnHeaderTitleContainer,
          }}
          slotProps={{
            toolbar: {
              children: (
                <div className={styles.toolbar}>
                  <p className={styles.tableTitle}>{t(TranslationKey['Boxes to order'])}</p>
                </div>
              ),
            },
          }}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowDoubleClick={(params: GridRowParams) => viewModel.onTriggerBoxModal(params?.row?._id)}
        />
      </div>

      {viewModel.showGalleryModal ? (
        <GalleryModal
          files={viewModel.galleryFiles}
          isOpenModal={viewModel.showGalleryModal}
          onOpenModal={() => viewModel.onToggleModal(ModalNames.GALLERY)}
        />
      ) : null}

      {viewModel.showBoxModal ? (
        <Modal openModal={viewModel.showBoxModal} setOpenModal={() => viewModel.onToggleModal(ModalNames.BOX)}>
          <BoxViewForm
            // remove memo from the modal or add types to the modal
            /* @ts-ignore */
            userInfo={viewModel.userInfo}
            box={viewModel.currentBox}
            volumeWeightCoefficient={platformSettings.volumeWeightCoefficient}
            setOpenModal={() => viewModel.onToggleModal(ModalNames.BOX)}
            onSubmitChangeFields={viewModel.onSubmitChangeBoxFields}
            onClickHsCode={viewModel.onClickHsCode}
          />
        </Modal>
      ) : null}

      {viewModel.showWarningInfoModal ? (
        <WarningInfoModal
          isWarning={viewModel.warningInfoModalSettings.isWarning}
          openModal={viewModel.showWarningInfoModal}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.WARNING_INFO)}
          title={viewModel.warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => viewModel.onToggleModal(ModalNames.WARNING_INFO)}
        />
      ) : null}

      {viewModel.showEditHSCodeModal ? (
        <Modal
          openModal={viewModel.showEditHSCodeModal}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.EDIT_HS_CODE)}
        >
          <EditHSCodeModal
            hsCodeData={viewModel.hsCodeData}
            onClickSaveHsCode={viewModel.onClickSaveHsCode}
            onCloseModal={() => viewModel.onToggleModal(ModalNames.EDIT_HS_CODE)}
          />
        </Modal>
      ) : null}
    </>
  )
})
