import { makeObservable } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { RequestModel } from '@models/request-model'
import { UserModel } from '@models/user-model'

import { IIdea } from '@typings/models/ideas/idea'
import { IProduct } from '@typings/models/products/product'
import { IFullUser } from '@typings/shared/full-user'

import { linkRequestColumns } from './link-request-form.columns'
import { linkRequestFormConfig } from './link-request-form.config'

export class LinkRequestModel extends DataGridTableModel {
  product?: IProduct
  idea?: IIdea

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }
  get selectedRequest() {
    return this.currentData.find(({ _id }) => _id === this.selectedRows[0])
  }

  constructor(product?: IProduct, idea?: IIdea) {
    const isChildProcuct =
      idea?.childProduct && [ideaStatusByKey.ADDING_ASIN, ideaStatusByKey.VERIFIED].includes(idea?.status)
    const currentProductId = isChildProcuct ? idea?.childProduct?._id : idea?.parentProduct?._id

    const defaultGetCurrentDataOptions = () =>
      idea
        ? {
            guid: currentProductId,
            status: 'DRAFT, PUBLISHED, IN_PROCESS',
            excludeIdeaId: idea._id,
          }
        : {
            guid: product?._id,
          }
    const columnsModel = linkRequestColumns()

    super({
      getMainDataMethod: RequestModel.getRequestsByProductLight,
      columnsModel,
      defaultGetCurrentDataOptions,
    })

    this.product = product
    this.idea = idea
    this.getCurrentData()

    makeObservable(this, linkRequestFormConfig)
  }

  async onClickCreateRequest() {
    window
      ?.open(
        `/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/freelance/my-requests/create-request?parentProduct=${
          this.product?._id
        }&asin=${this.product?.asin}`,
        '_blank',
      )
      ?.focus()
  }

  async onBindIdeaToRequest() {
    try {
      const ideaBody =
        this.idea && [ideaStatusByKey[ideaStatus.NEW], ideaStatusByKey[ideaStatus.ON_CHECK]].includes(this.idea?.status)
          ? { onCheckedIdeaId: this.idea?._id }
          : { onFinishedIdeaId: this.idea?._id }
      const mainBody = this.idea ? ideaBody : {}

      for (const requestId of this.selectedRows) {
        await RequestModel.bindIdeaToRequest(requestId, mainBody)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
