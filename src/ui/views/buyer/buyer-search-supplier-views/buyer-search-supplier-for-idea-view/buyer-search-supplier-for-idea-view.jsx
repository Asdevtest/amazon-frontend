import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { styles } from './buyer-search-supplier-for-idea-view.style'

import { BuyerSearchSupplierForIdeaModel } from './buyer-search-supplier-for-idea-view.model'

export const BuyerSearchSupplierForIdeaViewRaw = props => {
  const [viewModel] = useState(() => new BuyerSearchSupplierForIdeaModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div>
        <div className={styles.btnsWrapper}>
          <Button disabled={viewModel.selectedRowIds.length === 0} onClick={viewModel.onPickupSomeItems}>
            {t(TranslationKey['Take on the work of the selected'])}
          </Button>
        </div>
        <div className={styles.datagridWrapper}>
          <CustomDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
              },
            }}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.getCurrentData()}
            rowHeight={100}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onPaginationModelChange}
          />
        </div>
      </div>

      {viewModel.showInfoModal ? (
        <WarningInfoModal
          // @ts-ignore
          openModal={viewModel.showInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
          title={t(TranslationKey['Taken to Work'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => viewModel.onTriggerOpenModal('showInfoModal')}
        />
      ) : null}
    </>
  )
}

export const BuyerSearchSupplierForIdeaView = withStyles(observer(BuyerSearchSupplierForIdeaViewRaw), styles)
