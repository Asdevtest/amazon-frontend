import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { BuyerModel } from '@models/buyer-model'
import { ResearcherModel } from '@models/researcher-model'
import { SettingsModel } from '@models/settings-model'

import { buyerProductsViewColumns } from '@components/table/table-columns/buyer/buyer-products-columns'

import { buyerProductsDataConverter } from '@utils/data-grid-data-converters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { GeneralModel } from '@models/general-model'

const filtersFields = [
  'shopIds',
  'asin',
  'skusByClient',
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

  currentData = []

  nameSearchValue = ''

  rowHandlers = {
    onClickFeesCalculate: item => this.onClickFeesCalculate(item),
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

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history
    })

    if (location?.state?.dataGridFilter) {
      runInAction(() => {
        this.startFilterModel = location.state.dataGridFilter
      })
    }
    // else {
    //       this.startFilterModel = resetDataGridFilter
    //     }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.productsMy,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  async onClickFeesCalculate(productId) {
    try {
      const result = await ResearcherModel.parseParseSellerCentral(productId)

      BuyerModel.updateProduct(productId, { fbafee: result.amazonFee })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.getProductsMy()

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.getProductsMy()

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
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

    runInAction(() => {
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
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
    this.getProductsMy()
    this.setDataGridState()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.rowSelectionModel = model
    })
  }

  getCurrentData() {
    return toJS(this.productsMy)
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })

    this.getProductsMy()
  }

  async loadData() {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatuses.isLoading
      })

      this.getDataGridState()
      await this.getProductsMy()
      runInAction(() => {
        this.requestStatus = loadingStatuses.success
      })
    } catch (error) {
      runInAction(() => {
        this.requestStatus = loadingStatuses.failed
      })
      console.log(error)
    }
  }

  async getProductsMy() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.error = undefined
      })

      const result = await BuyerModel.getProductsMyPag({
        filters: this.getFilter(), // this.nameSearchValue ? filter : null,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'sumStock',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.rowCount = result.count

        this.baseNoConvertedProducts = result.rows

        this.productsMy = buyerProductsDataConverter(result.rows)
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.baseNoConvertedProducts = []
        this.productsMy = []
      })
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
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
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        filterRequestStatus: requestStatus,
      }
    })
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.isLoading)
      //
      // const shops = this.currentShops.map(item => item._id).join(',') // Похоже будет лишним
      // const curShops = this.columnMenuSettings.shopIds.currentFilterData?.map(shop => shop._id).join(',')
      // const shopFilter = shops
      //   ? shops
      //   : this.columnMenuSettings.shopIds.currentFilterData && column !== 'shopIds'
      //     ? curShops
      //     : null

      // const purchaseQuantityAboveZeroFilter = this.columnMenuSettings.isNeedPurchaseFilterData.isNeedPurchaseFilter

      // console.log('shopFilter', shopFilter)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'products'),
        column,

        // `clients/products/my_with_pag?filters=${this.getFilter(column)}${
        //   shopFilter ? ';&' + 'shopIds=' + shopFilter : ''
        // }${
        //   purchaseQuantityAboveZeroFilter ? ';&' + 'purchaseQuantityAboveZero=' + purchaseQuantityAboveZeroFilter : ''
        // }`,

        `buyers/products/pag/my?filters=${this.getFilter(column)}`,
      )

      console.log('data', data)

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }
      this.setFilterRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.failed)

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        [field]: {
          ...this.columnMenuSettings[field],
          currentFilterData: value,
        },
      }
    })
  }

  onClickResetFilters() {
    runInAction(() => {
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
    })

    this.getProductsMy()
    this.getDataGridState()
  }

  getFilter(exclusion) {
    const asinFilter = exclusion !== 'asin' && this.columnMenuSettings.asin.currentFilterData.join(',')
    const skusByClientFilter =
      exclusion !== 'skusByClient' &&
      this.columnMenuSettings.skusByClient.currentFilterData /* .map(el => `"${el}"`) */
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

    const filter = objectToUrlQs({
      archive: { $eq: this.isArchive },
      or: [
        { asin: { $contains: this.nameSearchValue } },
        { amazonTitle: { $contains: this.nameSearchValue } },
        { skusByClient: { $contains: this.nameSearchValue } },
      ],

      ...(asinFilter && {
        asin: { $eq: asinFilter },
      }),
      ...(skusByClientFilter && {
        skusByClient: { $eq: skusByClientFilter },
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

      ...(tagsFilter && {
        tags: { $eq: tagsFilter },
      }),

      ...(redFlagsFilter && {
        redFlags: { $eq: redFlagsFilter },
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
}
