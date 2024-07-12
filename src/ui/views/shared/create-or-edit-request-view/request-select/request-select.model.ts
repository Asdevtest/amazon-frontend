import { BaseOptionType } from 'antd/es/select'
import { makeObservable } from 'mobx'

import { RequestModel } from '@models/request-model'

import { IRequest } from '@typings/models/requests/request'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { ISetData, options, requestSelectConfig, searchFields } from './request-select.config'

export class RequestSelectModel extends UseProductsPermissions {
  requestTemplate?: IRequest
  setData?: ISetData

  get requestTemplateOptions() {
    return this.permissionsData
  }

  constructor(setData: ISetData) {
    super(RequestModel.getRequests, options, searchFields)
    this.setData = setData
    makeObservable(this, requestSelectConfig)
  }

  onSelectProduct = (value: string, option: BaseOptionType) => {
    if (value) {
      this.requestTemplate = option as IRequest
      this.setData?.(this.requestTemplate)
    }
  }

  onGetProducts = () => {
    this.permissionsData = []
    this.isCanLoadMore = true
    this.setOptions({ offset: 0, filters: '' })
    this.getPermissionsData()
  }
}
