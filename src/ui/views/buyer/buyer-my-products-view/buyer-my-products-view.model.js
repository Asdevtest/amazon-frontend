import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { BuyerModel } from '@models/buyer-model'
import { GeneralModel } from '@models/general-model'
import { ResearcherModel } from '@models/researcher-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { buyerProductsViewColumns } from '@components/table/table-columns/buyer/buyer-products-columns'

import { buyerProductsDataConverter } from '@utils/data-grid-data-converters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

const filtersFields = [
  'shopId',
  'asin',
  'skuByClient',
  'amazonTitle',
  'strategyStatus',
  'amountInOrders',
  'inTransfer',
  'stockUSA',
  'boxAmounts',
  'sumStock',
  'amazon',
  'createdAt',
  'updatedAt',
  'profit',
  'fbafee',
  'status',
  'reservedSum',
  'sentToFbaSum',
  'fbaFbmStockSum',
  'ideasOnCheck',
  'stockCost',
  'purchaseQuantity',
  'ideasClosed',
  'ideasVerified',
  'ideasFinished',
  'tags',
  'redFlags',
  'bsr',
  'fbaamount',
]

export class BuyerMyProductsViewModel {
  history = undefined
  requestStatus = undefined

  baseNoConvertedProducts = []
  productsMy = []

  nameSearchValue = ''

  rowHandlers = {
    onClickFeesCalculate: item => this.onClickFeesCalculate(item),
    onClickShowProduct: row => this.onClickTableRow(row),
  }

  rowCount = 0
  sortModel = []
  startFilterModel = undefined
  filterModel = { items: [] }
  densityModel = 'compact'

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getProductsMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,
    ...filtersFields.reduce(
      (ac, cur) =>
        (ac = {
          ...ac,
          [cur]: {
            filterData: [],
            currentFilterData: [],
          },
        }),
      {},
    ),
  }

  columnsModel = buyerProductsViewColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  productCardModal = false

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get currentData() {
    return this.productsMy
  }

  constructor({ history }) {
    this.history = history

    if (history?.location?.state?.dataGridFilter) {
      this.startFilterModel = history.location.state.dataGridFilter
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onClickFeesCalculate(productId) {
    try {
      const result = await ResearcherModel.parseParseSellerCentral(productId)

      BuyerModel.updateProduct(productId, { fbafee: result.amazonFee })
    } catch (error) {
      console.error(error)
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.getProductsMy()

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.getProductsMy()

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.getProductsMy()

    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.BUYER_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.BUYER_PRODUCTS]

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(
        this.startFilterModel
          ? {
              ...this.startFilterModel,
              items: this.startFilterModel.items.map(el => ({ ...el, value: el.value.map(e => t(e)) })),
            }
          : state.filterModel,
      )
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.getProductsMy()
    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getProductsMy()
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getProductsMy()
    } catch (error) {
      console.error(error)
    }
  }

  async getProductsMy() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await BuyerModel.getProductsMyPag({
        filters: this.getFilter(),

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.rowCount = result.count
        this.baseNoConvertedProducts = result.rows
        this.productsMy = buyerProductsDataConverter(result.rows)
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
      runInAction(() => {
        this.baseNoConvertedProducts = []
        this.productsMy = []
      })
    }
  }

  onClickTableRow(row) {
    const win = window.open(
      `${window.location.origin}/buyer/my-products/product?product-id=${row.originalData._id}`,
      '_blank',
    )

    win.focus()
  }

  onHoverColumnField(field) {
    this.onHover = field
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      filterRequestStatus: requestStatus,
    }
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'products'),
        column,
        `buyers/products/pag/my?filters=${this.getFilter(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }
      this.setFilterRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatus.FAILED)

      console.error(error)
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      [field]: {
        ...this.columnMenuSettings[field],
        currentFilterData: value,
      },
    }
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,

      ...filtersFields.reduce(
        (ac, cur) =>
          (ac = {
            ...ac,
            [cur]: {
              filterData: [],
              currentFilterData: [],
            },
          }),
        {},
      ),
    }

    this.getProductsMy()
    this.getDataGridState()
  }

  getFilter(exclusion) {
    const asinFilter = exclusion !== 'asin' && this.columnMenuSettings.asin.currentFilterData.join(',')
    const skuByClientFilter =
      exclusion !== 'skuByClient' &&
      this.columnMenuSettings.skuByClient.currentFilterData /* .map(el => `"${el}"`) */
        .join(',')
    const amazonTitleFilter =
      exclusion !== 'amazonTitle' &&
      this.columnMenuSettings.amazonTitle.currentFilterData.map(el => `"${el}"`).join(',')

    const createdAtFilter = exclusion !== 'createdAt' && this.columnMenuSettings.createdAt.currentFilterData.join(',')
    const updatedAtFilter = exclusion !== 'updatedAt' && this.columnMenuSettings.updatedAt.currentFilterData.join(',')

    const strategyStatusFilter =
      exclusion !== 'strategyStatus' && this.columnMenuSettings.strategyStatus.currentFilterData.join(',')
    const amountInOrdersFilter =
      exclusion !== 'amountInOrders' && this.columnMenuSettings.amountInOrders.currentFilterData.join(',')
    const stockUSAFilter = exclusion !== 'stockUSA' && this.columnMenuSettings.stockUSA.currentFilterData.join(',')
    const inTransferFilter =
      exclusion !== 'inTransfer' && this.columnMenuSettings.inTransfer.currentFilterData.join(',')
    const boxAmountsFilter =
      exclusion !== 'boxAmounts' && this.columnMenuSettings.boxAmounts.currentFilterData.map(el => el._id).join(',')
    const sumStockFilter = exclusion !== 'sumStock' && this.columnMenuSettings.sumStock.currentFilterData.join(',')
    const amazonFilter = exclusion !== 'amazon' && this.columnMenuSettings.amazon.currentFilterData.join(',')
    const profitFilter = exclusion !== 'profit' && this.columnMenuSettings.profit.currentFilterData.join(',')
    const fbafeeFilter = exclusion !== 'fbafee' && this.columnMenuSettings.fbafee.currentFilterData.join(',')
    const statusFilter = exclusion !== 'status' && this.columnMenuSettings.status.currentFilterData.join(',')
    const ideaCountFilter =
      exclusion !== 'ideasOnCheck' && this.columnMenuSettings.ideasOnCheck.currentFilterData.join(',')

    const fbaFbmStockSumFilter =
      exclusion !== 'fbaFbmStockSum' && this.columnMenuSettings.fbaFbmStockSum.currentFilterData.join(',')
    const reservedSumFilter =
      exclusion !== 'reservedSum' && this.columnMenuSettings.reservedSum.currentFilterData.join(',')
    const sentToFbaSumFilter =
      exclusion !== 'sentToFbaSum' && this.columnMenuSettings.sentToFbaSum.currentFilterData.join(',')

    const stockCostFilter = exclusion !== 'stockCost' && this.columnMenuSettings.stockCost.currentFilterData.join(',')

    const purchaseQuantityFilter =
      exclusion !== 'purchaseQuantity' && this.columnMenuSettings.purchaseQuantity.currentFilterData.join(',')

    const ideasClosedFilter =
      exclusion !== 'ideasClosed' && this.columnMenuSettings.ideasClosed.currentFilterData.join(',')
    const ideasVerifiedFilter =
      exclusion !== 'ideasVerified' && this.columnMenuSettings.ideasVerified.currentFilterData.join(',')

    const tagsFilter =
      exclusion !== 'tags' && this.columnMenuSettings.tags.currentFilterData.map(el => el._id).join(',')

    const redFlagsFilter =
      exclusion !== 'redFlags' && this.columnMenuSettings.redFlags.currentFilterData.map(el => el._id).join(',')

    const bsrFilter = exclusion !== 'bsr' && this.columnMenuSettings.bsr.currentFilterData.join(',')

    const fbaAmountFilter = exclusion !== 'fbaamount' && this.columnMenuSettings.fbaamount.currentFilterData.join(',')

    const ideasFinishedFilter =
      exclusion !== 'ideasFinished' && this.columnMenuSettings.ideasFinished.currentFilterData.join(',')

    const filter = objectToUrlQs({
      archive: { $eq: this.isArchive },
      or: [
        { asin: { $contains: this.nameSearchValue } },
        { amazonTitle: { $contains: this.nameSearchValue } },
        { skuByClient: { $contains: this.nameSearchValue } },
      ],

      ...(asinFilter && {
        asin: { $eq: asinFilter },
      }),
      ...(skuByClientFilter && {
        skuByClient: { $eq: skuByClientFilter },
      }),
      ...(amazonTitleFilter && {
        amazonTitle: { $eq: amazonTitleFilter },
      }),

      ...(createdAtFilter && {
        createdAt: { $eq: createdAtFilter },
      }),
      ...(updatedAtFilter && {
        updatedAt: { $eq: updatedAtFilter },
      }),

      ...(strategyStatusFilter && {
        strategyStatus: { $eq: strategyStatusFilter },
      }),

      ...(amountInOrdersFilter && {
        amountInOrders: { $eq: amountInOrdersFilter },
      }),

      ...(stockUSAFilter && {
        stockUSA: { $eq: stockUSAFilter },
      }),
      ...(inTransferFilter && {
        inTransfer: { $eq: inTransferFilter },
      }),
      ...(boxAmountsFilter && {
        boxAmounts: { $eq: boxAmountsFilter },
      }),

      ...(sumStockFilter && {
        sumStock: { $eq: sumStockFilter },
      }),

      ...(amazonFilter && {
        amazon: { $eq: amazonFilter },
      }),
      ...(profitFilter && {
        profit: { $eq: profitFilter },
      }),
      ...(fbafeeFilter && {
        fbafee: { $eq: fbafeeFilter },
      }),

      ...(statusFilter && {
        status: { $eq: statusFilter },
      }),

      ...(fbaFbmStockSumFilter && {
        fbaFbmStockSum: { $eq: fbaFbmStockSumFilter },
      }),
      ...(reservedSumFilter && {
        reservedSum: { $eq: reservedSumFilter },
      }),
      ...(sentToFbaSumFilter && {
        sentToFbaSum: { $eq: sentToFbaSumFilter },
      }),

      ...(ideaCountFilter && {
        ideasOnCheck: { $eq: ideaCountFilter },
      }),

      ...(stockCostFilter && {
        stockCost: { $eq: stockCostFilter },
      }),

      ...(purchaseQuantityFilter && {
        purchaseQuantity: { $eq: purchaseQuantityFilter },
      }),

      ...(ideasClosedFilter && {
        ideasClosed: { $eq: ideasClosedFilter },
      }),

      ...(ideasVerifiedFilter && {
        ideasVerified: { $eq: ideasVerifiedFilter },
      }),

      ...(ideasFinishedFilter && {
        ideasFinished: { $eq: ideasFinishedFilter },
      }),

      ...(tagsFilter && {
        tags: { $any: tagsFilter },
      }),

      ...(redFlagsFilter && {
        redFlags: { $any: redFlagsFilter },
      }),

      ...(bsrFilter && {
        bsr: { $eq: bsrFilter },
      }),

      ...(fbaAmountFilter && {
        fbaamount: { $eq: fbaAmountFilter },
      }),
    })

    return filter
  }

  onClickProductModal(row) {
    if (row) {
      this.history.push(`/buyer/my-products?product-id=${row.originalData._id}`)
    } else {
      this.history.push(`/buyer/my-products`)
    }

    this.onTriggerOpenModal('productCardModal')
  }

  onClickShowProduct(id) {
    const win = window.open(`/buyer/my-products/product?product-id=${id}`, '_blank')

    win.focus()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
