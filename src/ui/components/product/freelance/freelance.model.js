import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestSubType } from '@constants/requests/request-type'
import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
} from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { GeneralModel } from '@models/general-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { productMyRequestsViewColumns } from '@components/table/table-columns/overall/product-my-requests-columns'

import { myRequestsDataConverter } from '@utils/data-grid-data-converters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'

const filtersFields = [
  'humanFriendlyId',
  'updatedAt',
  'status',
  'title',
  'typeTask',
  'price',
  'timeoutAt',
  'asin',
  'skusByClient',
  'amazonTitle',
  'createdBy',
  'subUsers',
]

export class FreelanceModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  rowCount = 0
  drawerOpen = false
  showRequestForm = false
  showConfirmModal = false

  nameSearchValue = ''

  curRequest = null
  curProposal = null

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  showRequestDesignerResultClientModal = false
  showRequestStandartResultModal = false

  showAcceptMessage = undefined
  acceptMessage = undefined

  selectedIndex = null
  selectedRequests = []
  researchIdToRemove = undefined

  searchRequests = []
  openModal = null

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  onHover = null

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: withoutUpdate => {
      this.onLeaveColumnField()

      if (withoutUpdate) {
        this.getCurrentData()
      } else {
        this.getCustomRequests()
        this.getDataGridState()
      }
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

  handlers = {
    onClickOpenRequest: item => this.onClickOpenRequest(item),
    onClickOpenResult: item => this.onClickOpenResult(item),
  }

  sortModel = []
  filterModel = { items: [] }
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = productMyRequestsViewColumns(
    this.handlers,
    () => this.columnMenuSettings,
    () => this.onHover,
  )
  constructor({ history, productId }) {
    this.history = history

    this.productId = productId
    makeAutoObservable(this, undefined, { autoBind: true })
    runInAction(() => {
      if (this.showAcceptMessage) {
        setTimeout(() => {
          this.acceptMessage = ''
          this.showAcceptMessage = false
        }, 3000)
      }
    })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getCustomRequests()
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.searchRequests).filter(
        el =>
          el.title.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          String(el.humanFriendlyId).toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return toJS(this.searchRequests)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getCustomRequests()
      this.getDataGridState()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onClickTaskType(taskType) {
    runInAction(() => {
      this.selectedTaskType = taskType
    })
    this.getCustomRequests()
  }

  async getCustomRequests() {
    try {
      const result = await RequestModel.getRequests(RequestSubType.MY, {
        filters: this.getFilter(),

        productId: this.productId,

        typeTask:
          Number(this.selectedTaskType) === Number(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT])
            ? undefined
            : this.selectedTaskType,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.searchRequests = myRequestsDataConverter(result.rows)
        // .sort(
        //   sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        // )
        this.rowCount = result.count
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
        this.searchRequests = []
      })
    }
  }

  getFilter(exclusion) {
    const humanFriendlyIdFilter =
      exclusion !== 'humanFriendlyId' && this.columnMenuSettings.humanFriendlyId.currentFilterData.join(',')
    const updatedAtFilter = exclusion !== 'updatedAt' && this.columnMenuSettings.updatedAt.currentFilterData.join(',')
    const statusFilter = exclusion !== 'status' && this.columnMenuSettings.status.currentFilterData.join(',')
    const titleFilter = exclusion !== 'title' && this.columnMenuSettings.title.currentFilterData.join(',')
    const typeTaskFilter = exclusion !== 'typeTask' && this.columnMenuSettings.typeTask.currentFilterData.join(',')
    const asinFilter = exclusion !== 'asin' && this.columnMenuSettings.asin.currentFilterData.join(',')
    const priceFilter = exclusion !== 'price' && this.columnMenuSettings.price.currentFilterData.join(',')
    const timeoutAtFilter = exclusion !== 'timeoutAt' && this.columnMenuSettings.timeoutAt.currentFilterData.join(',')
    const subUsersFilter =
      exclusion !== 'subUsers' && this.columnMenuSettings?.subUsers?.currentFilterData?.map(item => item._id)?.join(',')

    const skusByClientFilter =
      exclusion !== 'skusByClient' &&
      this.columnMenuSettings.skusByClient.currentFilterData /* .map(el => `"${el}"`) */
        .join(',')
    const amazonTitleFilter =
      exclusion !== 'amazonTitle' &&
      this.columnMenuSettings.amazonTitle.currentFilterData.map(el => `"${el}"`).join(',')

    const createdByFilter = exclusion !== 'createdBy' && this.columnMenuSettings.createdBy.currentFilterData.join(',')

    const filter = objectToUrlQs({
      or: [{ title: { $contains: this.nameSearchValue } }, { humanFriendlyId: { $eq: this.nameSearchValue } }].filter(
        el =>
          ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) &&
            !el.id &&
            !el.humanFriendlyId) ||
          !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
      ),

      ...(asinFilter && {
        asin: { $eq: asinFilter },
      }),
      ...(skusByClientFilter && {
        skusByClient: { $eq: skusByClientFilter },
      }),
      ...(amazonTitleFilter && {
        amazonTitle: { $eq: amazonTitleFilter },
      }),

      ...(humanFriendlyIdFilter && {
        humanFriendlyId: { $eq: humanFriendlyIdFilter },
      }),
      ...(updatedAtFilter && {
        updatedAt: { $eq: updatedAtFilter },
      }),
      ...(statusFilter && {
        status: { $eq: statusFilter },
      }),
      ...(titleFilter && {
        title: { $eq: titleFilter },
      }),
      ...(typeTaskFilter && {
        typeTask: { $eq: typeTaskFilter },
      }),
      ...(priceFilter && {
        price: { $eq: priceFilter },
      }),
      ...(timeoutAtFilter && {
        timeoutAt: { $eq: timeoutAtFilter },
      }),
      ...(createdByFilter && {
        createdBy: { $eq: createdByFilter },
      }),
      ...(subUsersFilter && {
        subUsers: { $eq: subUsersFilter },
      }),
    })

    return filter
  }

  async onClickFilterBtn(column) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'requests'),
        column,
        `requests?kind=${RequestSubType.MY}&productId=${this.productId}&filters=${this.getFilter(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
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

    this.getCustomRequests()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.PRODUCT_FREELANCE)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.PRODUCT_FREELANCE]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
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

  onLeaveColumnField() {
    this.onHover = null
  }
  onClickOpenRequest(itemId) {
    // this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/custom-request`, {
    //   request: toJS(item),
    // })

    const win = window.open(
      `${window.location.origin}/${
        UserRoleCodeMapForRoutes[this.userInfo.role]
      }/freelance/my-requests/custom-request?request-id=${itemId}`,
      '_blank',
    )

    win.focus()
  }

  async onClickOpenResult(item) {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(item)

      const proposal = result.find(el => el.proposal.status)

      if (!proposal) {
        return
      }

      runInAction(() => {
        this.curRequest = item
        this.curProposal = proposal
      })

      switch (freelanceRequestTypeByCode[item.typeTask]) {
        case freelanceRequestType.DESIGNER:
          this.onTriggerOpenModal('showRequestDesignerResultClientModal')
          break

        case freelanceRequestType.SEO:
          this.onTriggerOpenModal('showRequestStandartResultModal')
          break

        default:
          this.onTriggerOpenModal('showRequestStandartResultModal')
          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawer() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
    this.requestStatus = loadingStatuses.isLoading
    this.getCustomRequests().then(() => {
      this.requestStatus = loadingStatuses.success
    })
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
      // this.paginationModel = { ...model, page: 0 }
    })

    this.setDataGridState()
    this.getCustomRequests()
  }
}
