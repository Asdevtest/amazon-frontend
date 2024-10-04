import { observer } from 'mobx-react'
import { FC, useCallback, useMemo } from 'react'

import { DataGridPremiumProps, GridCellParams, GridRowClassNameParams, GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Checkbox } from '@components/shared/checkbox'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'
import { TariffModal } from '@typings/enums/tariff-modal'
import { IBox } from '@typings/models/boxes/box'

import { INewDataOfVariation } from '@hooks/use-tariff-variation'

import { useStyles } from './supplier-approximate-calculations.style'

import { ConfirmationModal } from '../confirmation-modal'

import { ProductCard, TariffDetails } from './components'
import { getTitleModal } from './helpers/get-modal-title'
import { SupplierApproximateCalculationsModel } from './supplier-approximate-calculations.model'

interface SupplierApproximateCalculationsModalProps {
  openModal: boolean
  setOpenModal: (value: boolean) => void
  tariffModalType?: TariffModal
  currentSupplierId?: string
  productId?: string
  ideaId?: string
  onClickSubmit?: (body: INewDataOfVariation) => void
  boxId?: string
  box?: IBox
  isTariffsSelect?: boolean
  isHideCalculation?: boolean
  isGetAllStorekeepers?: boolean
  isSkipWeightCheck?: boolean
}

export const SupplierApproximateCalculationsModal: FC<SupplierApproximateCalculationsModalProps> = observer(props => {
  const {
    openModal,
    setOpenModal,
    currentSupplierId,
    productId,
    ideaId,
    boxId,
    isTariffsSelect,
    box,
    onClickSubmit,
    isHideCalculation,
    isGetAllStorekeepers,
    tariffModalType,
    isSkipWeightCheck,
  } = props

  const { classes: styles } = useStyles()

  const viewModel = useMemo(
    () =>
      new SupplierApproximateCalculationsModel({
        supplierId: currentSupplierId,
        productId,
        boxId,
        onClickSubmit,
        box,
        isHideCalculation,
        isGetAllStorekeepers,
        ideaId,
        isSkipWeightCheck,
      }),
    [],
  )

  const getRowClassName = (params: GridRowClassNameParams) =>
    viewModel.currentLogicsTariffId === params?.id ? styles.activeRow : ''
  const getCellClassName = (params: GridCellParams) => (params?.field === 'deliveryTimeInDay' ? styles.borderCell : '')

  const isDisableButton =
    !viewModel?.currentVariationId ||
    (viewModel.currentDestinationId !== viewModel.initialDestinationId &&
      !!viewModel.initialDestinationId &&
      viewModel.isStrictVariationSelect)

  const getDetailPanelHeight = useCallback(() => {
    return 'auto'
  }, [])

  const getDetailPanelContent = useCallback<NonNullable<DataGridPremiumProps['getDetailPanelContent']>>(
    params => (
      <TariffDetails
        tariff={params.row}
        isTariffsSelect={isTariffsSelect}
        isHideCalculation={isHideCalculation}
        currentVariationId={viewModel.currentVariationId}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        initialDestinationId={viewModel.initialDestinationId}
        isStrictVariationSelect={viewModel.isStrictVariationSelect}
        onClickChangeVariation={viewModel.handleSetVariation}
      />
    ),
    [
      isHideCalculation,
      viewModel.currentVariationId,
      viewModel.initialDestinationId,
      viewModel.isStrictVariationSelect,
      viewModel.columnVisibilityModel,
    ],
  )

  return (
    <Modal isSecondBackground openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.root}>
        <div className={styles.headerWrapper}>
          <p className={styles.title}>{getTitleModal(tariffModalType)}</p>

          <CustomInputSearch
            allowClear
            placeholder="Search by Tariff, Destination"
            value={viewModel.currentSearchValue}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>

        <CustomRadioButton
          size="large"
          options={viewModel?.storekeepers}
          value={viewModel?.currentStorekeeperId}
          onChange={e => viewModel?.setCurrentStorekeeper(e.target.value)}
        />

        {viewModel?.boxItems?.length ? (
          <div className={styles.productsWrapper}>
            {viewModel?.boxItems?.map(({ product, order }) => (
              <ProductCard
                key={product._id}
                isActive={viewModel?.productId === product?._id && viewModel?.orderId === order?._id}
                product={product}
                orderId={order?.xid}
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

        <CustomDataGrid
          disableRowSelectionOnClick
          getDetailPanelHeight={getDetailPanelHeight}
          getDetailPanelContent={getDetailPanelContent}
          rowCount={viewModel?.rowCount}
          sortModel={viewModel?.sortModel}
          filterModel={viewModel?.filterModel}
          columnVisibilityModel={viewModel?.columnVisibilityModel}
          paginationModel={viewModel?.paginationModel}
          rows={viewModel?.currentData}
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

        {isTariffsSelect ? (
          <div className={styles.buttonsWrapper}>
            <Button disabled={isDisableButton} onClick={viewModel?.handleCheckVariation}>
              {t(TranslationKey.Choose)}
            </Button>

            <Button
              styleType={ButtonStyle.DANGER}
              variant={ButtonVariant.OUTLINED}
              onClick={viewModel?.handleResetVariationTariff}
            >
              {t(TranslationKey.Reset)}
            </Button>
          </div>
        ) : null}

        {viewModel.showConfirmModal ? (
          <ConfirmationModal
            // @ts-ignore
            openModal={viewModel.showConfirmModal}
            title={viewModel.confirmModalSettings.title}
            message={viewModel.confirmModalSettings.message}
            successBtnText={t(TranslationKey.Confirm)}
            cancelBtnText={t(TranslationKey.Close)}
            setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal', false)}
            onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
            onClickCancelBtn={viewModel.confirmModalSettings.onCancel}
          />
        ) : null}
      </div>
    </Modal>
  )
})
