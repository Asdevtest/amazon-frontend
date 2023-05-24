import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestSubType, RequestType } from '@constants/requests/request-type'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { RequestProposalModel } from '@models/request-proposal'
import { RequestModel } from '@models/request-model'
import { UserModel } from '@models/user-model'

import { productMyRequestsViewColumns } from '@components/table/table-columns/overall/product-my-requests-columns'

import { myRequestsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

export class FreelanceModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  showRequestForm = false
  showConfirmModal = false

  nameSearchValue = ''

  curRequest = null
  curProposal = null

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  showRequestDesignerResultClientModal = false

  showAcceptMessage = undefined
  acceptMessage = undefined

  selectedIndex = null
  selectedRequests = []
  researchIdToRemove = undefined

  searchRequests = []
  openModal = null

  get userInfo() {
    return UserModel.userInfo
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
  columnsModel = productMyRequestsViewColumns(this.handlers)
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

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
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
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.MY, {
        productId: this.productId,
        typeTask:
          Number(this.selectedTaskType) === Number(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT])
            ? this.userInfo?.allowedSpec?.map(spec => Number(spec)).join(', ')
            : this.selectedTaskType,
      })

      runInAction(() => {
        this.searchRequests = myRequestsDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
        this.searchRequests = []
      })
    }
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
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(item._id)

      const proposal = result.find(el => el.proposal.status)

      if (!proposal) {
        return
      }

      runInAction(() => {
        this.curRequest = item
        this.curProposal = proposal
      })

      this.onTriggerOpenModal('showRequestDesignerResultClientModal')
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
}
