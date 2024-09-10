import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { GridRowModel, GridRowParams } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { BoxModal } from '@components/modals/box-modal'
import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { useStyles } from './boxes-to-order.style'

import { boxesToOrderColumn } from './boxes-to-order.column'
import { BoxesToOrderModel } from './boxes-to-order.model'
import { ModalNames } from './boxes-to-order.type'

interface BoxesToOrderProps {
  formFields: IOrderWithAdditionalFields
  platformSettings: IPlatformSettings
}

export const BoxesToOrder: FC<BoxesToOrderProps> = observer(props => {
  const { formFields, platformSettings } = props

  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new BoxesToOrderModel(formFields), [])

  return (
    <>
      <div className={styles.wrapper}>
        <CustomDataGrid
          disableColumnMenu
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          rows={viewModel.boxes || []}
          columnHeaderHeight={40}
          getRowHeight={() => 'auto'}
          getRowId={(row: GridRowModel) => row._id}
          columns={boxesToOrderColumn(platformSettings)}
          paginationModel={viewModel.paginationModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          sx={{
            '& .MuiDataGrid-columnHeaderTitleContainer': styles.columnHeaderTitleContainer,
            '& .MuiDataGrid-columnHeaderDraggableContainer': styles.columnHeaderTitleContainer,
          }}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
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

      <Modal openModal={viewModel.showBoxModal} setOpenModal={() => viewModel.onToggleModal(ModalNames.BOX)}>
        <BoxModal
          boxId={viewModel.currentBox}
          onUpdateData={viewModel.getBoxesOfOrder}
          onToggleModal={() => viewModel.onToggleModal(ModalNames.BOX)}
        />
      </Modal>
    </>
  )
})
