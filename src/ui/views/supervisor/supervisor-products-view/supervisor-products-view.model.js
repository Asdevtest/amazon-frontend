import { makeAutoObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ProductStatus, ProductStatusByKey, ProductStatusGroups } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { GeneralModel } from '@models/general-model'
import { SettingsModel } from '@models/settings-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

import { supervisorProductsViewColumns } from '@components/table/table-columns/supervisor/supervisor-products-columns'

import { supervisorProductsDataConverter } from '@utils/data-grid-data-converters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'

const filtersFields = [
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
  'tags',
  'redFlags',
  'createdBy',
  'buyer',
  'bsr',
]

export class SupervisorProductsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''

  currentFilterStatus = ProductStatusByKey[ProductStatus.DEFAULT]
  currentStatusGroup = ProductStatusGroups.allProducts

  baseProducts = []
  productsMy = []

  sortModel = []
  startFilterModel = undefined
  filterModel = { items: [] }
  densityModel = 'compact'
  showAsinCheckerModal = false
  paginationModel = { page: 0, pageSize: 15 }

  rowCount = 0
  columnVisibilityModel = {}

  productCardModal = false

  rowHandlers = {
    onClickShowProduct: id => this.onClickTableRow(id),
  }

  columnsModel = supervisorProductsViewColumns(this.rowHandlers)

  orderedYesNoFilterData = {
    yes: true,
    no: true,
    handleFilters: (yes, no) => this.onHandleOrderedFilter(yes, no),
  }

  onHandleOrderedFilter = (yes, no) => {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      orderedYesNoFilterData: {
        ...this.columnMenuSettings.orderedYesNoFilterData,
        yes,
        no,
      },
    }
    this.getProductsMy()
  }

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getProductsMy()
      this.getDataGridState()
    },

    orderedYesNoFilterData: this.orderedYesNoFilterData,

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

  constructor({ history, location }) {
    this.history = history

    if (location?.state?.dataGridFilter) {
      this.startFilterModel = location.state.dataGridFilter
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get currentData() {
    return this.productsMy
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
    this.getProductsMy()
  }

  onChangePaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getProductsMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.getProductsMy()
    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: this.sortModel,
      filterModel: this.filterModel,
      paginationModel: this.paginationModel,
      columnVisibilityModel: this.columnVisibilityModel,
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.SUPERVISOR_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SUPERVISOR_PRODUCTS]

    if (state) {
      this.sortModel = state.sortModel
      this.filterModel = this.startFilterModel
        ? {
            ...this.startFilterModel,
            items: this.startFilterModel.items.map(el => ({ ...el, value: el.value.map(e => t(e)) })),
          }
        : state.filterModel

      this.paginationModel = state.paginationModel
      this.columnVisibilityModel = state.columnVisibilityModel
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getProductsMy()
  }

  onClickStatusFilterButton(status) {
    this.currentStatusGroup = status
    this.getProductsMy()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getProductsMy()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  async loadData() {
    try {
      this.getDataGridState()
      await this.getProductsMy()
    } catch (error) {
      console.log(error)
    }
  }

  async getProductsMy() {
    this.setRequestStatus(loadingStatuses.IS_LOADING)
    try {
      const ordered =
        this.columnMenuSettings.orderedYesNoFilterData.yes && this.columnMenuSettings.orderedYesNoFilterData.no
          ? null
          : this.columnMenuSettings.orderedYesNoFilterData.yes

      const result = await SupervisorModel.getProductsMyPag({
        filters: this.getFilter() + `${ordered !== null ? `;ordered[$eq]=${ordered}` : ''}`,

        statusGroup: this.currentStatusGroup,

        limit: this.paginationModel.pageSize,

        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.productsMy = supervisorProductsDataConverter(result.rows)
        this.rowCount = result.count
      })
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  onClickTableRow(id) {
    const win = window.open(`${window.location.origin}/supervisor/products/product?product-id=${id}`, '_blank')
    win.focus()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
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

    const amazonFilter = exclusion !== 'amazon' && this.columnMenuSettings.amazon.currentFilterData.join(',')

    const createdByFilter =
      exclusion !== 'createdBy' && this.columnMenuSettings.createdBy.currentFilterData.map(el => el._id).join(',')

    const buyerFilter =
      exclusion !== 'buyer' && this.columnMenuSettings.buyer.currentFilterData.map(el => el._id).join(',')

    const bsrFilter = exclusion !== 'bsr' && this.columnMenuSettings.bsr.currentFilterData.join(',')

    const fbafeeFilter = exclusion !== 'fbafee' && this.columnMenuSettings.fbafee.currentFilterData.join(',')

    const statusFilter = exclusion !== 'status' && this.columnMenuSettings.status.currentFilterData.join(',')

    const tagsFilter =
      exclusion !== 'tags' && this.columnMenuSettings.tags.currentFilterData.map(el => el._id).join(',')

    const redFlagsFilter =
      exclusion !== 'redFlags' && this.columnMenuSettings.redFlags.currentFilterData.map(el => el._id).join(',')

    const filter = objectToUrlQs({
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

      ...(amazonFilter && {
        amazon: { $eq: amazonFilter },
      }),

      ...(createdByFilter && {
        createdById: { $eq: createdByFilter },
      }),

      ...(buyerFilter && {
        buyerId: { $eq: buyerFilter },
      }),

      ...(bsrFilter && {
        bsr: { $eq: bsrFilter },
      }),

      ...(fbafeeFilter && {
        fbafee: { $eq: fbafeeFilter },
      }),

      ...(statusFilter && {
        status: { $eq: statusFilter },
      }),

      ...(tagsFilter && {
        tags: { $any: tagsFilter },
      }),

      ...(redFlagsFilter && {
        redFlags: { $any: redFlagsFilter },
      }),
    })

    return filter
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

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.IS_LOADING)
      const ordered =
        this.columnMenuSettings.orderedYesNoFilterData.yes && this.columnMenuSettings.orderedYesNoFilterData.no
          ? null
          : this.columnMenuSettings.orderedYesNoFilterData.yes

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'products'),
        column,

        `supervisors/products/pag/my?filters=${this.getFilter(column)}&statusGroup=${this.currentStatusGroup}` +
          `${ordered !== null ? `;ordered[$eq]=${ordered}` : ''}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setFilterRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.FAILED)

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      filterRequestStatus: requestStatus,
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

  onClickProductModal(row) {
    if (row) {
      this.history.push(`/supervisor/products?product-id=${row.originalData._id}`)
    } else {
      this.history.push(`/supervisor/products`)
    }

    this.onTriggerOpenModal('productCardModal')
  }
}
