import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {RequestStatus} from '@constants/request-status'
import {RequestSubType, RequestType} from '@constants/request-type'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {myRequestsViewColumns} from '@components/table-columns/overall/my-requests-columns'

import {myRequestsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

const allowStatuses = [RequestStatus.DRAFT, RequestStatus.PUBLISHED, RequestStatus.IN_PROCESS]

const filtersFields = ['status']

export class MyRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  showRequestForm = false
  showConfirmModal = false

  showAcceptMessage = undefined
  acceptMessage = undefined

  selectedIndex = null
  selectedRequests = []
  researchIdToRemove = undefined

  nameSearchValue = ''
  onHover = null

  currentData = []

  searchRequests = []
  openModal = null
  requestFormSettings = {
    request: {},
    isEdit: false,
    onSubmit: data => this.onSubmitCreateCustomSearchRequest(data),
  }

  get userInfo() {
    return UserModel.userInfo || {}
  }

  get languageTag() {
    return SettingsModel.languageTag || {}
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  sortModel = []

  isRequestsAtWork = true

  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = myRequestsViewColumns(this.languageTag, this.columnMenuSettings, this.onHover)

  columnMenuSettings = {
    // onClickFilterBtn: field => this.onClickFilterBtn(field),
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

  constructor({history, location}) {
    runInAction(() => {
      this.history = history

      if (location?.state) {
        this.acceptMessage = location?.state?.acceptMessage
        this.showAcceptMessage = location?.state?.showAcceptMessage

        const state = {...history?.location?.state}
        delete state?.acceptMessage
        delete state?.showAcceptMessage
        history.replace({...history?.location, state})
      }
    })

    makeAutoObservable(this, undefined, {autoBind: true})

    runInAction(() => {
      if (this.showAcceptMessage) {
        setTimeout(() => {
          this.acceptMessage = ''
          this.showAcceptMessage = false
        }, 3000)
      }
    })

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.isRequestsAtWork,
      () => {
        this.currentData = this.getCustomRequests()
      },
    )

    reaction(
      () => this.searchRequests,
      () => {
        this.currentData = this.getCurrentData()
      },
    )

    reaction(
      () => this.nameSearchValue,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = myRequestsViewColumns(this.languageTag, this.columnMenuSettings, this.onHover).map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  onClickChangeCatigory(value) {
    runInAction(() => {
      console.log('value', value)
      this.isRequestsAtWork = value
    })
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.OVERALL_CUSTOM_SEARCH_REQUESTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.OVERALL_CUSTOM_SEARCH_REQUESTS]

    runInAction(() => {
      if (state) {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.curPage = state.pagination.page
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = myRequestsViewColumns(this.languageTag).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
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

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.searchRequests)
        .filter(
          el =>
            el?.title?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
            el?.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
        )
        .filter(el =>
          this.columnMenuSettings.status.currentFilterData.length
            ? this.columnMenuSettings.status.currentFilterData.includes(el.status)
            : el,
        )
    } else {
      return toJS(this.searchRequests).filter(el =>
        this.columnMenuSettings.status.currentFilterData.length
          ? this.columnMenuSettings.status.currentFilterData.includes(el.status)
          : el,
      )
    }
  }

  onHoverColumnField(field) {
    this.onHover = field
    this.getDataGridState()
  }

  onLeaveColumnField() {
    this.onHover = null
    this.getDataGridState()
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

    this.getCustomRequests()
    this.getDataGridState()
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

  onClickAddBtn() {
    this.history.push(`/client/freelance/my-requests/create-request`)
  }

  onClickEditBtn(row) {
    runInAction(() => {
      this.requestFormSettings = {
        request: row,
        isEdit: true,
        onSubmit: (data, requestId) => this.onSubmitEditCustomSearchRequest(data, requestId),
      }
    })
    this.onTriggerOpenModal('showRequestForm')
  }

  async onSubmitEditCustomSearchRequest(data, requestId) {
    try {
      await this.editCustomSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequests()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitCreateCustomSearchRequest(data) {
    try {
      await this.createCustomSearchRequest(data)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequests()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async editCustomSearchRequest(data, requestId) {
    try {
      await RequestModel.updateCustomRequest(requestId, data)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  async createCustomSearchRequest(data) {
    try {
      await RequestModel.createCustomSearchRequest(data)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickRemoveBtn(row) {
    runInAction(() => {
      this.researchIdToRemove = row.request._id
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeCustomSearchRequest() {
    try {
      await RequestModel.removeCustomRequests(this.researchIdToRemove)

      this.onTriggerOpenModal('showConfirmModal')

      this.getCustomRequests()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async getCustomRequests() {
    try {
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.MY)

      const filteredResult = result.filter(request => {
        if (this.isRequestsAtWork) {
          return allowStatuses.some(status => request.status === status)
        } else {
          return allowStatuses.every(status => request.status !== status)
        }
      })

      runInAction(() => {
        this.searchRequests = myRequestsDataConverter(filteredResult).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onSelectRequest(index) {
    const newSelectedRequests = [...this.selectedRequests]
    const findRequestIndex = this.selectedRequests.indexOf(index)
    if (findRequestIndex !== -1) {
      newSelectedRequests.splice(findRequestIndex, 1)
    } else {
      newSelectedRequests.push(index)
    }
    runInAction(() => {
      this.selectedRequests = newSelectedRequests
    })
  }

  onClickTableRow(item) {
    // this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/custom-request`, {
    //   request: toJS(item),
    // })

    const win = window.open(
      `${window.location.origin}/${
        UserRoleCodeMapForRoutes[this.userInfo.role]
      }/freelance/my-requests/custom-request?request-id=${item._id}`,
      '_blank',
    )

    win.focus()
  }

  onTriggerDrawer() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
