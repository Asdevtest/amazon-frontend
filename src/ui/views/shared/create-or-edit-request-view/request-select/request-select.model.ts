import { BaseOptionType } from 'antd/es/select'
import { makeObservable } from 'mobx'

import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { RequestModel } from '@models/request-model'

import { IRequest } from '@typings/models/requests/request'

import {
  IChangeData,
  getRequestTemplateOptions,
  options,
  requestSelectConfig,
  searchFields,
} from './request-select.config'

export class RequestSelectModel extends InfiniteScrollModel<IRequest> {
  requestTemplate?: IRequest
  onChangeData?: IChangeData

  get requestTemplateOptions() {
    return getRequestTemplateOptions(this.data)
  }

  constructor(onChangeData: IChangeData) {
    super({ method: RequestModel.getRequests, options, searchFields })
    this.onChangeData = onChangeData
    makeObservable(this, requestSelectConfig)
  }

  onSelectProduct = (value: string, option: BaseOptionType) => {
    if (value) {
      this.requestTemplate = option as IRequest
      this.onChangeData?.(this.requestTemplate)
    }
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.getData()
    }
  }
}
