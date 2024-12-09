import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { RequestSubType } from '@typings/enums/request/request-type'
import { IRequest } from '@typings/models/requests/request'

export const requestSelectConfig = {
  requestTemplate: observable,
  onChangeData: observable,

  requestTemplateOptions: computed,

  onSelectProduct: action.bound,
}

export const getRequestTemplateOptions = (requests: IRequest[]) =>
  requests?.map(request => ({
    ...request,
    value: request?._id,
    label: `${t(TranslationKey['Request ID'])}: ${request?.xid || t(TranslationKey.Missing)}`,
  }))

export type IChangeData = (data: IRequest) => void

export const options = { kind: RequestSubType.MY }
export const searchFields = ['asin', 'title', 'xid']
