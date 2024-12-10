import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Reviews } from '@components/forms/reviews-form'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'
import { SupplierCard } from '@components/shared/supplier'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ISupplierCard, ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { useStyles } from './supplier-modal.style'

import { AddSupplierCardModal } from '../add-supplier-card-modal'
import { AddSupplierModal } from '../add-supplier-modal'
import { BindSupplierCardToProductModal } from '../bind-supplier-card-to-product-modal'
import { ImportTemplateModal } from '../import-template-modal'

import { SupplierModalModel } from './supplier-modal.model'
import { View } from './supplier-modal.types'

interface ISupplierModalProps {
  supplierId: string
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}

export const SupplierModal: FC<ISupplierModalProps> = observer(props => {
  const { openModal, supplierId, setOpenModal } = props

  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new SupplierModalModel(supplierId), [])

  const { supplierCardsModel } = viewModel

  const isCardsTab = viewModel.currentTab === View.CARDS

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.root}>
        <SupplierCard
          hideTotalCountFeedback
          showViewMore={false}
          supplier={supplierCardsModel?.meta?.supplier as unknown as ISupplierExchange}
        />

        <div className={styles.tabsHeader}>
          <CustomRadioButton
            buttonStyle="solid"
            value={viewModel.currentTab}
            options={[
              { label: t(TranslationKey[View.CARDS]), value: View.CARDS },
              { label: t(TranslationKey[View.REVIEWS]), value: View.REVIEWS },
            ]}
            onChange={viewModel.onChangeTab}
          />

          {isCardsTab ? (
            <CustomInputSearch
              enterButton
              allowClear
              placeholder="ID, Title"
              onSearch={supplierCardsModel.onSearchSubmit}
            />
          ) : null}

          {isCardsTab ? (
            <div className={styles.buttons}>
              <CustomButton onClick={viewModel.onOpenImportTemplateModal}>
                {t(TranslationKey['Import products'])}
              </CustomButton>

              <CustomButton onClick={supplierCardsModel.onClickAddSupplierProduct}>
                {t(TranslationKey['Add a new card'])}
              </CustomButton>
            </div>
          ) : null}
        </div>

        {isCardsTab ? (
          <CustomDataGrid
            disableRowSelectionOnClick
            pinnedColumns={supplierCardsModel.pinnedColumns}
            rowCount={supplierCardsModel.rowCount}
            sortModel={supplierCardsModel.sortModel}
            filterModel={supplierCardsModel.filterModel}
            columnVisibilityModel={supplierCardsModel.columnVisibilityModel}
            paginationModel={supplierCardsModel.paginationModel}
            rows={supplierCardsModel.currentData}
            getRowHeight={() => 'auto'}
            getRowId={(row: ISupplierCard) => row._id}
            rowSelectionModel={supplierCardsModel.selectedRows}
            density={supplierCardsModel.densityModel}
            columns={supplierCardsModel.columnsModel}
            loading={supplierCardsModel.requestStatus === loadingStatus.IS_LOADING}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              columnMenu: supplierCardsModel.columnMenuSettings,
              toolbar: {
                resetFiltersBtnSettings: {
                  onClickResetFilters: supplierCardsModel.onClickResetFilters,
                  isSomeFilterOn: supplierCardsModel.isSomeFilterOn,
                },
                columsBtnSettings: {
                  columnsModel: supplierCardsModel.columnsModel,
                  columnVisibilityModel: supplierCardsModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: supplierCardsModel.onColumnVisibilityModelChange,
                },
                sortSettings: {
                  sortModel: supplierCardsModel.sortModel,
                  columnsModel: supplierCardsModel.columnsModel,
                  onSortModelChange: supplierCardsModel.onChangeSortingModel,
                },
              },
            }}
            onSortModelChange={supplierCardsModel.onChangeSortingModel}
            onColumnVisibilityModelChange={supplierCardsModel.onColumnVisibilityModelChange}
            onPaginationModelChange={supplierCardsModel.onPaginationModelChange}
            onFilterModelChange={supplierCardsModel.onChangeFilterModel}
            onPinnedColumnsChange={supplierCardsModel.handlePinColumn}
          />
        ) : (
          <Reviews wrapperClassName={styles.reviews} reviews={viewModel.feedbacks} />
        )}
      </div>

      {viewModel.showImportTemplateModal ? (
        <ImportTemplateModal
          supplierId={supplierId as string}
          updateHandler={() => supplierCardsModel.getCurrentData()}
          openModal={viewModel.showImportTemplateModal}
          setOpenModal={viewModel.onCloseImportTemplateModal}
        />
      ) : null}

      {supplierCardsModel.showAddSupplierModal ? (
        <AddSupplierModal
          supplierId={supplierCardsModel.supplierIdToEdit}
          openModal={supplierCardsModel.showAddSupplierModal}
          setOpenModal={supplierCardsModel.onCloseAddSupplierModal}
          updateHandler={() => supplierCardsModel.getCurrentData()}
        />
      ) : null}

      {supplierCardsModel.showAddSupplierProductModal ? (
        <AddSupplierCardModal
          supplierId={supplierId}
          supplierCardId={supplierCardsModel.supplierCardIdToEdit}
          handleUpdate={() => supplierCardsModel.getCurrentData()}
          openModal={supplierCardsModel.showAddSupplierProductModal}
          setOpenModal={supplierCardsModel.onCloseAddSupplierProductModal}
        />
      ) : null}

      {supplierCardsModel.showBindSupplierCardToProductModal ? (
        <BindSupplierCardToProductModal
          supplierId={supplierId}
          supplierCardId={supplierCardsModel.supplierCardIdToEdit}
          openModal={supplierCardsModel.showBindSupplierCardToProductModal}
          setOpenModal={supplierCardsModel.onCloseBindProductModal}
        />
      ) : null}
    </Modal>
  )
})
