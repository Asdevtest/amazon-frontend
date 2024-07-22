import { BaseOptionType } from 'antd/es/select'
import { makeObservable } from 'mobx'

import { RequestModel } from '@models/request-model'

import { IRequest } from '@typings/models/requests/request'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { IChangeData, options, requestSelectConfig, searchFields } from './request-select.config'

export class RequestSelectModel extends UseProductsPermissions {
  requestTemplate?: IRequest
  onChangeData?: IChangeData

  get requestTemplateOptions() {
    return this.permissionsData
  }

  constructor(onChangeData: IChangeData) {
    super(RequestModel.getRequests, options, searchFields)
    this.onChangeData = onChangeData
    makeObservable(this, requestSelectConfig)
  }

  onSelectProduct = (value: string, option: BaseOptionType) => {
    if (value) {
      this.requestTemplate = option as IRequest
      this.onChangeData?.(this.requestTemplate)
    }
  }

  onGetProducts = () => {
    this.permissionsData = []
    this.isCanLoadMore = true
    this.setOptions({ offset: 0, filters: '' })
    this.getPermissionsData()
  }
}
