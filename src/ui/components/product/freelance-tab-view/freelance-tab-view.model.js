import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestSubType } from '@constants/requests/request-type'
import { freelanceRequestType, freelanceRequestTypeByCode } from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { GeneralModel } from '@models/general-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { productMyRequestsViewColumns } from '@components/table/table-columns/overall/product-my-requests-columns'

import { myRequestsDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'

import { Specs } from '@typings/enums/specs'

import { filtersFields } from './freelance-tab-view.constants'

export class FreelanceModel {
  nameSearchValue = ''

  curRequest = null
  curProposal = null

  selectedSpec = Specs.DEFAULT

  showRequestDesignerResultClientModal = false
  showRequestStandartResultModal = false
  showRequestResultModal = false

  searchRequests = []
  specs = []

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  get currentData() {
    return this.searchRequests
  }

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: withoutUpdate => {
      this.onLeaveColumnField()

      if (withoutUpdate) {
        this.getCurrentData()
      } else {
        this.getDataGridState()
        this.getCustomRequests()
      }
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  handlers = {
    onClickOpenRequest: item => this.onClickOpenRequest(item),
    onClickOpenResult: item => this.onClickOpenResult(item),
  }

  onHover = null
  rowCount = 0
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
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

  constructor(productId) {
    this.productId = productId

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getCustomRequests()
  }

  loadData() {
    try {
      this.getDataGridState()

      this.getCustomRequests()

      this.getSpecs()
    } catch (error) {
      console.log(error)
    }
  }

  onClickSpec(specType) {
    this.selectedSpec = specType

    // spec - for "_id:string", specType - for "type:number"
    this.onChangeFullFieldMenuItem(specType === Specs.DEFAULT ? [] : [specType], 'specType', true)

    this.getCustomRequests()
  }

  async getCustomRequests() {
    try {
      const result = await RequestModel.getRequests({
        kind: RequestSubType.MY,
        filters: this.getFilter(),
        productId: this.productId,
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.searchRequests = myRequestsDataConverter(result.rows)

        this.rowCount = result.count
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.searchRequests = []
      })
    }
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filtersFields, [
        'title',
        'humanFriendlyId',
      ]),
    )
  }

  async onClickFilterBtn(column) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'requests'),
        column,
        `requests?kind=${RequestSubType.MY}&productId=${this.productId}&filters=${this.getFilter(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)

      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onClickResetFilters() {
    this.selectedSpec = Specs.DEFAULT

    this.columnMenuSettings = { ...dataGridFiltersInitializer(filtersFields) }

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

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  onClickOpenRequest(itemId) {
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
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(item._id)

      const proposal = result.find(el => el.proposal.status)

      if (!proposal) {
        return
      }

      runInAction(() => {
        this.curRequest = item
        this.curProposal = proposal
      })

      switch (freelanceRequestTypeByCode[item.spec?.type]) {
        case freelanceRequestType.DESIGNER:
          this.onTriggerOpenModal('showRequestDesignerResultClientModal')
          break

        case freelanceRequestType.BLOGGER:
          this.onTriggerOpenModal('showRequestResultModal')
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

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getCustomRequests()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getCustomRequests()
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.log(error)
    }
  }
}
