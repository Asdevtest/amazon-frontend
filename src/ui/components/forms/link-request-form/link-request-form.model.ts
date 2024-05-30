import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { RequestModel } from '@models/request-model'
import { UserModel } from '@models/user-model'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'
import { IRequest } from '@typings/models/requests/request'
import { IFullUser } from '@typings/shared/full-user'

import { linkRequestColumns } from './link-request-form.columns'

export class LinkRequestModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  product?: IProduct
  requests: IRequest[] = []

  rowCount = 0
  selectedRowsIds: string[] = []
  columns = linkRequestColumns()

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }
  get selectedRequest() {
    return this.requests.find(({ _id }) => _id === this.selectedRowsIds[0])
  }

  constructor(product?: IProduct) {
    this.product = product

    this.getRequestsByProductLight()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getRequestsByProductLight() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const responce = await RequestModel.getRequestsByProductLight({
        guid: this.product?._id,
      })

      runInAction(() => {
        this.requests = responce as unknown as IRequest[]
        this.rowCount = responce.length
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
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

      for (const requestId of this.selectedRowsIds) {
        await RequestModel.bindIdeaToRequest(requestId, data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  onSelectionModel(selectedRowsIds: string[]) {
    this.selectedRowsIds = selectedRowsIds
  }

  setRequestStatus(requestStatus: loadingStatus) {
    this.requestStatus = requestStatus
  }
}
