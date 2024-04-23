import { makeObservable, reaction, runInAction } from 'mobx'

import { GridColDef } from '@mui/x-data-grid-premium'

import { BoxesModel } from '@models/boxes-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { StorekeeperModel } from '@models/storekeeper-model'

import { SortSettingsMode } from '@components/data-grid/data-grid-custom-components/sort-settings/sort-settings.type'
import { ISwitcherSettings } from '@components/shared/custom-switcher/custom-switcher'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { loadingStatus } from '@typings/enums/loading-status'
import { IBox } from '@typings/models/boxes/box'
import { IBoxItem } from '@typings/models/boxes/box-item'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'

import { INewDataOfVariation } from '@hooks/use-tariff-variation'

import { observerConfig } from './observer-config'
import { SupplierApproximateCalculationsColumns } from './supplier-approximate-calculations-columns'
import { additionalFilterFields } from './supplier-approximate-calculations.constants'

export class SupplierApproximateCalculationsModel extends DataGridFilterTableModel {
  _storekeepers: ISwitcherSettings[] = []
  get storekeepers() {
    return this._storekeepers
  }
  set storekeepers(storekeepers: ISwitcherSettings[]) {
    this._storekeepers = storekeepers
  }

  currentStorekeeperId: string = ''

  productId: string = ''
  boxItems: IBoxItem[] = []
  supplierId: string = ''

  isStrictVariationSelect: boolean = true

  boxId: string = ''
  boxData: IBox | undefined = undefined

  currentVariationId: string | undefined = undefined
  currentDestinationId: string | undefined = undefined
  currentLogicsTariffId: string | undefined = undefined

  handleSave: ((body: INewDataOfVariation) => void) | undefined

  constructor({
    supplierId,
    productId,
    boxId,
    isTariffsSelect,
    onClickSubmit,
    box,
    isHideCalculation,
  }: {
    box?: IBox
    supplierId?: string
    productId?: string
    boxId?: string
    isTariffsSelect?: boolean
    isHideCalculation?: boolean
    onClickSubmit?: (body: INewDataOfVariation) => void
  }) {
    const columnHandlers = {
      isTariffsSelect: !!isTariffsSelect,
      isHideCalculation: !!isHideCalculation,
      getCurrentVariationId: () => this.currentVariationId,
      getCurrentDestinationId: () => this.currentDestinationId,
      getStrictVariationSelect: () => this.isStrictVariationSelect,
      onClickChangeVariation: (variationId: string, destinationId: string, logicsTariffId: string) =>
        this.handleSetVariation(variationId, destinationId, logicsTariffId),
    }

    const columns = SupplierApproximateCalculationsColumns(columnHandlers) as GridColDef[]

    const defaultGetDataMethodOptions = () => ({
      // FIXME: remove guid
      guid: this.productId || '',
      ...(this.productId ? { productId: this.productId } : {}),
      ...(this.supplierId ? { supplierId: this.supplierId } : {}),
      ...(this.currentLogicsTariffId ? { activeTariffLogisticsId: this.currentLogicsTariffId } : {}),
    })

    super(
      StorekeeperModel.getStorekeepersTariffsWithCalculations,
      columns,
      getFilterFields(columns, additionalFilterFields),
      `storekeepers/tariffs_with_calculations?${productId ? 'productId=' + productId + '&' : ''}`,
      ['name', 'destinationName'],
      undefined,
      defaultGetDataMethodOptions,
    )

    if (onClickSubmit) {
      this.handleSave = onClickSubmit
    }
    this.sortModel = [{ field: isHideCalculation ? 'pricePerKgUsd' : 'roi', sort: SortSettingsMode.DESC }]

    if (supplierId) {
      this.supplierId = supplierId
    }

    if (box) {
      this.boxData = box
      this.setActualData(box)
      this.setCurrentStorekeeper(this.storekeepers?.[0]?.value as string)
    } else if (boxId) {
      this.boxId = boxId
      this.getBoxData()
    } else if (productId) {
      this.productId = productId
      this.getStorekeepersData()
    } else {
      this.getStorekeepersData()
    }

    makeObservable(this, observerConfig)

    reaction(
      () => this.currentVariationId,
      () => (this.columnsModel = columns),
    )
  }

  async getStorekeepersData() {
    try {
      const result = await StorekeeperModel.getStorekeepers(undefined, undefined, true)

      runInAction(() => {
        this.storekeepers = (result as IStorekeeper[])
          .sort((a, b) => a?.name?.localeCompare(b?.name))
          .map(storekeeper => ({
            label: () => storekeeper.name || '',
            value: storekeeper._id,
          }))

        this.setCurrentStorekeeper(this.storekeepers?.[0]?.value as string)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async setCurrentStorekeeper(storekeeperId: string) {
    this.currentStorekeeperId = storekeeperId
    this.onChangeFullFieldMenuItem([storekeeperId], 'storekeeper')
    this.getMainTableData()
  }

  onClickResetFilters() {
    this.setColumnMenuSettings(this.filtersFields, this.additionalPropertiesColumnMenuSettings)
    this.onChangeFullFieldMenuItem([this.storekeepers[0]?.value], 'storekeeper')
    this.getMainTableData()
  }

  async getBoxData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const box = (await BoxesModel.getBoxById(this.boxId)) as unknown as IBox

      runInAction(() => {
        this.boxData = box
      })

      this.setActualData(box)

      this.setCurrentStorekeeper(this.storekeepers?.[0]?.value as string)

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async handleChangeActiveProduct(productId: string, orderSupplierId: string) {
    this.productId = productId
    this.supplierId = orderSupplierId
    this.setMainMethodURL(productId)
    this.getMainTableData()
  }

  handleChangeStrictVariation(isStrictVariationSelect: boolean) {
    this.isStrictVariationSelect = isStrictVariationSelect
  }

  handleSetVariation(variationId: string, destinationId: string, logicsTariffId: string) {
    this.currentVariationId = variationId
    this.currentDestinationId = destinationId
    this.currentLogicsTariffId = logicsTariffId
  }

  handleSaveVariationTariff() {
    const data = {
      isSameDestination:
        this.currentDestinationId === (this.boxData?.variationTariff?.destinationId || this.boxData?.destination?._id),
      variationTariffId: this.currentVariationId,
      destinationId: this.currentDestinationId,
      logicsTariffId: this.currentLogicsTariffId,
      storekeeperId: this.currentStorekeeperId,
    }

    this.handleSave?.(data as INewDataOfVariation)
  }

  handleResetVariationTariff() {
    const data = {
      isSameDestination: true,
      variationTariffId: null,
      logicsTariffId: null,
      destinationId: this.boxData?.destination?._id,
      storekeeperId: this.currentStorekeeperId,
    }

    this.handleSave?.(data as unknown as INewDataOfVariation)
  }

  setActualData(box: IBox) {
    this.currentVariationId = box?.variationTariff?._id
    this.currentDestinationId = box?.destination?._id
    this.currentLogicsTariffId = box?.variationTariff?.storekeeperTariffLogisticsId || box?.logicsTariff?._id

    this.storekeepers = [{ label: () => box?.storekeeper?.name || '', value: box?.storekeeper?._id }]
    this.boxItems = box?.items
    this.productId = box?.items?.[0]?.product?._id
    this.supplierId = box?.items?.[0]?.order?.orderSupplierId || box?.items?.[0]?.order?.orderSupplier?._id
    this.setMainMethodURL(box?.items?.[0]?.product?._id)
  }

  setMainMethodURL(productId: string) {
    this.mainMethodURL = `storekeepers/tariffs_with_calculations?productId=${productId}&`
  }
}
