import { makeObservable, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import {
  inProgressRequestProposalsStatuses,
  showResultRequestProposalsStatuses,
} from '@constants/requests/request-proposal-status'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { UserModel } from '@models/user-model'

import { productMyRequestsViewColumns } from '@components/table/table-columns/overall/product-my-requests-columns'

import { RequestSubType } from '@typings/enums/request/request-type'
import { Specs } from '@typings/enums/specs'
import { IProposal } from '@typings/models/proposals/proposal'
import { IRequest } from '@typings/models/requests/request'
import { IFullUser } from '@typings/shared/full-user'
import { ISpec } from '@typings/shared/spec'

import { fieldsForSearch, filtersFields } from './freelance-tab-view.constants'
import { observerConfig } from './observer.config.ts'

export class FreelanceModel extends DataGridFilterTableModel {
  curRequest?: IRequest
  curProposal?: IProposal

  specOption = Specs.DEFAULT

  showRequestDesignerResultClientModal = false
  showMainRequestResultModal = false
  showRequestResultModal = false

  specs: ISpec[] = []

  get userInfo() {
    return UserModel?.userInfo as unknown as IFullUser
  }

  constructor(productId: string, filterStatus: string) {
    const handlers = {
      onClickOpenRequest: (item: string) => this.onClickOpenRequest(item),
      onClickOpenResult: (item: IRequest) => this.onClickOpenResult(item),
    }
    const columnsModel = productMyRequestsViewColumns(handlers)

    const defaultGetCurrentDataOptions = () => ({
      kind: RequestSubType.MY,
      productId,
    })

    const additionalPropertiesGetFilters = () => {
      const isDefaultSpecType = this.specOption === Specs.DEFAULT

      return {
        ...(!isDefaultSpecType ? { specType: { $eq: this.specOption } } : {}),
      }
    }

    super({
      getMainDataMethod: RequestModel.getRequests,
      columnsModel,
      filtersFields,
      mainMethodURL: `requests?kind=${RequestSubType.MY}&productId=${productId}&`,
      fieldsForSearch,
      defaultGetCurrentDataOptions,
      additionalPropertiesGetFilters,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, observerConfig)

    if (filterStatus === 'inProgress') {
      this.onChangeFullFieldMenuItem(inProgressRequestProposalsStatuses, 'status')
    }

    this.getCurrentData()
    this.getSpecs()
  }

  onChangeSpec(value: Specs) {
    this.specOption = value
    this.onChangeFullFieldMenuItem([], 'spec')

    this.getCurrentData()
  }

  onClickOpenRequest(itemId: string) {
    const win = window.open(
      `${window.location.origin}/${
        UserRoleCodeMapForRoutes[this.userInfo.role]
      }/freelance/my-requests/custom-request?request-id=${itemId}`,
      '_blank',
    )

    win?.focus()
  }

  async onClickOpenResult(item: IRequest) {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(item._id)

      const proposal = result
        ?.filter((p: any) => showResultRequestProposalsStatuses.includes(p?.proposal?.status))
        ?.sort((a, b) => {
          const dateB = new Date(b?.proposal?.updatedAt ?? 0)
          const dateA = new Date(a?.proposal?.updatedAt ?? 0)
          return dateB.getTime() - dateA.getTime()
        })?.[0]

      if (!proposal) {
        return
      }

      runInAction(() => {
        this.curRequest = item
        this.curProposal = proposal as IProposal
      })

      switch (item.spec?.title) {
        case freelanceRequestType.DESIGNER:
          this.onTriggerOpenModal('showRequestDesignerResultClientModal')
          break

        case freelanceRequestType.BLOGGER:
          this.onTriggerOpenModal('showRequestResultModal')
          break

        default:
          this.onTriggerOpenModal('showMainRequestResultModal')
          break
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response as ISpec[]
      })
    } catch (error) {
      console.error(error)
    }
  }
}
