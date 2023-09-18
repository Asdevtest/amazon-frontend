import { cx } from '@emotion/css'
import { History } from 'history'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import { IdeaCardsModal } from '@components/modals/idea-cards-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useClassNames } from './general-notifications-view.styles'

import { GeneralNotificationsViewModel } from './general-notifications-view.model'

export const GeneralNotificationsView = observer(({ history }: { history: History }) => {
  const { classes: classNames } = useClassNames()
  const [viewModel] = useState(
    () =>
      new GeneralNotificationsViewModel({
        history,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    viewModel.languageTag && (
      <div className={classNames.root}>
        <div className={classNames.buttonsWrapper}>
          <Button
            className={cx(classNames.button, classNames.archiveButton)}
            variant="outlined"
            onClick={() => viewModel.toggleVariationHandler('isArchive')}
          >
            {viewModel.isArchive ? t(TranslationKey['To the actual']) : t(TranslationKey['Open archive'])}
          </Button>

          {!viewModel.isArchive && (
            <Button
              disabled={!viewModel.selectedRowIds.length}
              className={classNames.button}
              color="primary"
              onClick={() => viewModel.onClickReadButton()}
            >
              {t(TranslationKey.Read)}
            </Button>
          )}
        </div>

        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            checkboxSelection
            pagination
            useResizeContainer
            localeText={getLocalizationByLanguageTag()}
            rowSelectionModel={viewModel.selectedRowIds}
            sortingMode="server"
            paginationMode="server"
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            columns={viewModel.columnsModel}
            getRowHeight={() => 'auto'}
            density="compact"
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
              columnMenu: DataGridCustomColumnMenuComponent,
            }}
            slotProps={{
              // columnMenu: viewModel.columnMenuSettings,
              toolbar: {
                // resetFiltersBtnSettings: {
                //   onClickResetFilters: viewModel.onClickResetFilters,
                //   isSomeFilterOn: viewModel.isSomeFilterOn,
                // },
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
              },
            }}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            // onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
            onRowSelectionModelChange={viewModel.onSelectionModel}
          />
        </div>

        {viewModel.showIdeaModal && (
          <IdeaCardsModal
            openModal={viewModel.showIdeaModal}
            setOpenModal={() => viewModel.toggleVariationHandler('showIdeaModal')}
            updateData={() => {
              viewModel.getUserNotifications()
              UserModel.getUserInfo()
            }}
            product={viewModel.currentProduct}
            productId={viewModel.currentProduct?._id}
            currentIdeaId={viewModel.currentIdeaId}
          />
        )}
      </div>
    )
  )
})
