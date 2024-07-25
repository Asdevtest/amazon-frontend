import { makeObservable } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { RequestModel } from '@models/request-model'

import { IProduct } from '@typings/models/products/product'

import { linkRequestColumns } from './link-request-form.columns'
import { linkRequestFormConfig } from './link-request-form.config'

export class LinkRequestModel extends DataGridTableModel {
  product?: IProduct

  get selectedRequest() {
    return this.currentData.find(({ _id }) => _id === this.selectedRows[0])
  }

  constructor(product?: IProduct) {
    const defaultGetCurrentDataOptions = () => ({
      guid: product?._id,
    })
    const columnsModel = linkRequestColumns()

    super({
      getMainDataMethod: RequestModel.getRequestsByProductLight,
      columnsModel,
      defaultGetCurrentDataOptions,
    })

    this.product = product
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
      const data = {}

      for (const requestId of this.selectedRows) {
        await RequestModel.bindIdeaToRequest(requestId, data)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
