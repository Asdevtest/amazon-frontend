import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { GridCellParams, GridRowClassNameParams, GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Checkbox } from '@components/shared/checkbox'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'
import { IBox } from '@typings/models/boxes/box'
import { TariffModalType } from '@typings/shared/tariff-modal'

import { INewDataOfVariation } from '@hooks/use-tariff-variation'

import { useStyles } from './supplier-approximate-calculations.style'

import { getTitleModal } from './helpers/get-modal-title'
import { ProductCard } from './product-card'
import { SupplierApproximateCalculationsModel } from './supplier-approximate-calculations.model'

interface SupplierApproximateCalculationsModalProps {
  openModal: boolean
  tariffModalType?: TariffModalType
  currentSupplierId?: string
  productId?: string
  setOpenModal: (value: boolean) => void
  onClickSubmit?: (body: INewDataOfVariation) => void
  boxId?: string
  box?: IBox
  isTariffsSelect?: boolean
  isHideCalculation?: boolean
  isGetAllStorekeepers?: boolean
}

export const SupplierApproximateCalculationsModal: FC<SupplierApproximateCalculationsModalProps> = observer(props => {
  const {
    openModal,
    setOpenModal,
    currentSupplierId,
    productId,
    boxId,
    isTariffsSelect,
    box,
    onClickSubmit,
    isHideCalculation,
    isGetAllStorekeepers,
    tariffModalType,
  } = props

  const { classes: styles } = useStyles()

  const [viewModel] = useState(
    () =>
      new SupplierApproximateCalculationsModel({
        supplierId: currentSupplierId,
        productId,
        boxId,
        isTariffsSelect,
        onClickSubmit,
        box,
        isHideCalculation,
        isGetAllStorekeepers,
      }),
  )

  const getRowClassName = (params: GridRowClassNameParams) =>
    viewModel.currentLogicsTariffId === params?.id ? styles.activeRow : ''

  const getCellClassName = (params: GridCellParams) => (params?.field === 'deliveryTimeInDay' ? styles.borderCell : '')

  const isDisableButton =
    !viewModel?.currentVariationId ||
    (viewModel.currentDestinationId !== viewModel.initialDestinationId &&
      !!viewModel.initialDestinationId &&
      viewModel.isStrictVariationSelect)

  return (
    <Modal isSecondBackground openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.root}>
        <div className={styles.headerWrapper}>
          <p className={styles.title}>{getTitleModal(tariffModalType)}</p>

          <SearchInput
            placeholder={`${t(TranslationKey['Search by'])}: ${t(TranslationKey.Tariff)}, ${t(
              TranslationKey.Destination,
            )}`}
            startText={viewModel.currentSearchValue}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>

        <CustomSwitcher
          switchMode="medium"
          condition={viewModel?.currentStorekeeperId}
          switcherSettings={viewModel?.storekeepers}
          changeConditionHandler={viewModel?.setCurrentStorekeeper}
        />

        {viewModel?.boxItems?.length ? (
          <div className={styles.productsWrapper}>
            {viewModel?.boxItems?.map(({ product, order }) => (
              <ProductCard
                key={product._id}
                isActive={viewModel?.productId === product?._id && viewModel?.orderId === order?._id}
                product={product}
                orderId={order?.id}
                onClickChangeActive={() =>
                  viewModel?.handleChangeActiveProduct(
                    product?._id,
                    order?.orderSupplier?._id || order?.orderSupplierId,
                    order?._id,
                  )
                }
              />
            ))}
          </div>
        ) : null}

        <div className={styles.tableWrapper}>
          <CustomDataGrid
            disableRowSelectionOnClick
            rowCount={viewModel?.rowCount}
            sortModel={viewModel?.sortModel}
            filterModel={viewModel?.filterModel}
            columnVisibilityModel={viewModel?.columnVisibilityModel}
            paginationModel={viewModel?.paginationModel}
            rows={viewModel?.tableData}
            getRowHeight={() => 'auto'}
            getRowId={({ _id }: GridRowModel) => _id}
            getRowClassName={getRowClassName}
            getCellClassName={getCellClassName}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              columnMenu: viewModel?.columnMenuSettings,

              toolbar: {
                resetFiltersBtnSettings: {
                  onClickResetFilters: viewModel?.onClickResetFilters,
                  isSomeFilterOn: viewModel?.isSomeFilterOn,
                },

                columsBtnSettings: {
                  columnsModel: viewModel?.columnsModel,

                  columnVisibilityModel: viewModel?.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel?.onColumnVisibilityModelChange,
                },

                sortSettings: {
                  sortModel: viewModel.sortModel,
                  columnsModel: viewModel.columnsModel,
                  onSortModelChange: viewModel.onChangeSortingModel,
                },

                children: (
                  <>
                    {isTariffsSelect ? (
                      <Checkbox
                        checked={!viewModel.isStrictVariationSelect}
                        onChange={e => viewModel.handleChangeStrictVariation(!e.target.checked)}
                      >
                        {t(TranslationKey['Remove destination restriction'])}
                      </Checkbox>
                    ) : null}
                  </>
                ),
              },
            }}
            rowSelectionModel={viewModel?.selectedRows}
            density={viewModel?.densityModel}
            columns={viewModel?.columnsModel}
            loading={viewModel?.requestStatus === loadingStatus.IS_LOADING}
            onRowSelectionModelChange={viewModel?.onSelectionModel}
            onSortModelChange={viewModel?.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel?.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel?.onPaginationModelChange}
            onFilterModelChange={viewModel?.onChangeFilterModel}
          />
        </div>

        {isTariffsSelect ? (
          <div className={styles.buttonsWrapper}>
            <Button disabled={isDisableButton} onClick={viewModel?.handleSaveVariationTariff}>
              {t(TranslationKey.Choose)}
            </Button>

            <Button
              styleType={ButtonStyle.DANGER}
              variant={ButtonVariant.OUTLINED}
              onClick={viewModel?.handleResetVariationTariff}
            >
              {t(TranslationKey.reset)}
            </Button>
          </div>
        ) : null}
      </div>
    </Modal>
  )
})
