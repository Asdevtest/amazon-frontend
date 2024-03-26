import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { MainRequestResultModal } from '@components/modals/main-request-result-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './freelance-tab-view.style'

import { FreelanceModel } from './freelance-tab-view.model'

export const Freelance = observer(({ productId, modal }) => {
  const { classes: styles, cx } = useStyles()

  const [viewModel] = useState(() => new FreelanceModel(productId))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={styles.header}>
        <FreelanceTypeTaskSelect
          selectedSpec={viewModel.selectedSpec}
          specs={viewModel.specs}
          onClickSpec={viewModel.onClickSpec}
        />

        <SearchInput
          placeholder={t(TranslationKey['Search by Title, ID'])}
          inputClasses={styles.searchInput}
          value={viewModel.nameSearchValue}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>

      <div className={cx(styles.tableWrapper, { [styles.modalWrapper]: modal })}>
        <CustomDataGrid
          localeText={getLocalizationByLanguageTag()}
          rowCount={viewModel.rowCount}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            columnMenu: viewModel.columnMenuSettings,
            toolbar: {
              resetFiltersBtnSettings: {
                onClickResetFilters: viewModel.onClickResetFilters,
                isSomeFilterOn: viewModel.isSomeFilterOn,
              },
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onSortModelChange={viewModel.onChangeSortingModel}
          onPaginationModelChange={viewModel.onPaginationModelChange}
        />
      </div>

      <Modal
        openModal={viewModel.showRequestDesignerResultClientModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
      >
        <RequestDesignerResultClientForm
          onlyRead
          userInfo={viewModel.userInfo}
          request={{ request: viewModel.curRequest }}
          proposal={viewModel.curProposal}
          curResultMedia={viewModel.curProposal?.proposal.media}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
        />
      </Modal>

      {viewModel.showMainRequestResultModal ? (
        <MainRequestResultModal
          readOnly
          customProposal={viewModel.curProposal}
          userInfo={viewModel.userInfo}
          openModal={viewModel.showMainRequestResultModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showMainRequestResultModal')}
        />
      ) : null}

      {viewModel.showRequestResultModal ? (
        <RequestResultModal
          // @ts-ignore
          request={viewModel.curRequest}
          proposal={viewModel.curProposal}
          openModal={viewModel.showRequestResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestResultModal')}
        />
      ) : null}
    </>
  )
})
