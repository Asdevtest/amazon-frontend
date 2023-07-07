import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ProductStatus, ProductStatusByKey, ProductStatusGroups } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { SettingsModel } from '@models/settings-model'
import { SupervisorModel } from '@models/supervisor-model'

import { supervisorProductsViewColumns } from '@components/table/table-columns/supervisor/supervisor-products-columns'

import { supervisorProductsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'
import { UserModel } from '@models/user-model'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { GeneralModel } from '@models/general-model'

const filtersFields = [
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

  currentData = []

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

  columnsModel = supervisorProductsViewColumns()

  orderedYesNoFilterData = {
    yes: true,
    no: true,
    handleFilters: (yes, no) => this.onHandleOrderedFilter(yes, no),
  }

  onHandleOrderedFilter = (yes, no) => {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        orderedYesNoFilterData: {
          ...this.columnMenuSettings.orderedYesNoFilterData,
          yes,
          no,
        },
      }
      this.getProductsMy()
    })
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
    runInAction(() => {
      this.history = history

      if (location?.state?.dataGridFilter) {
        this.startFilterModel = location.state.dataGridFilter
      }
    })

    // else {
    //       this.startFilterModel = resetDataGridFilter
    //     }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.productsMy,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  get userInfo() {
    return UserModel.userInfo
  }

  onHoverColumnField(field) {
    this.onHover = field
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
    this.getProductsMy()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
    this.getProductsMy()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.SUPERVISOR_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SUPERVISOR_PRODUCTS]

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

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })

    this.getProductsMy()
  }

  onClickStatusFilterButton(status) {
    this.currentStatusGroup = status
    this.getProductsMy()
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

    this.setDataGridState()
    this.getProductsMy()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.rowSelectionModel = model
    })
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(
        this.productsMy.filter(
          el =>
            el.originalData.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
            el.originalData.skusByClient?.some(sku => sku.toLowerCase().includes(this.nameSearchValue.toLowerCase())) ||
            el.originalData.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
        ),
      )
    } else {
      return toJS(this.productsMy)
    }
  }

  async loadData() {
    try {
      this.getDataGridState()
      await this.getProductsMy()
    } catch (error) {
      console.log(error)
    }
  }

  async getProductsMy2() {
    try {
      const result = await SupervisorModel.getProductsMy()

      runInAction(() => {
        this.baseProducts = supervisorProductsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )

        this.productsMy = this.baseProducts
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async getProductsMy() {
    this.setRequestStatus(loadingStatuses.isLoading)
    try {
      const ordered =
        this.columnMenuSettings.orderedYesNoFilterData.yes && this.columnMenuSettings.orderedYesNoFilterData.no
          ? null
          : this.columnMenuSettings.orderedYesNoFilterData.yes

      const result = await SupervisorModel.getProductsMyPag({
        filters: this.getFilter() + `${ordered !== null ? `;ordered[$eq]=${ordered}` : ''}`,

        statusGroup: this.currentStatusGroup,
        // status:
        //   this.currentFilterStatus === ProductStatusByKey[ProductStatus.DEFAULT] ? null : this.currentFilterStatus,
        limit: this.paginationModel.pageSize,

        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.productsMy = supervisorProductsDataConverter(result.rows)
        this.rowCount = result.count
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  onClickTableRow(row) {
    const win = window.open(
      `${window.location.origin}/supervisor/products/product?product-id=${row.originalData._id}`,
      '_blank',
    )

    win.focus()
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
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

    const amazonFilter = exclusion !== 'amazon' && this.columnMenuSettings.amazon.currentFilterData.join(',')

    const createdByFilter =
      exclusion !== 'createdBy' && this.columnMenuSettings.createdBy.currentFilterData.map(el => el._id).join(',')

    const buyerFilter =
      exclusion !== 'buyer' && this.columnMenuSettings.buyer.currentFilterData.map(el => el._id).join(',')

    const bsrFilter = exclusion !== 'bsr' && this.columnMenuSettings.bsr.currentFilterData.join(',')

    const fbafeeFilter = exclusion !== 'fbafee' && this.columnMenuSettings.fbafee.currentFilterData.join(',')

    const filter = objectToUrlQs({
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
    })

    return filter
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

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.isLoading)
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

      this.setFilterRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.failed)

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  setFilterRequestStatus(requestStatus) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        filterRequestStatus: requestStatus,
      }
    })
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
}
