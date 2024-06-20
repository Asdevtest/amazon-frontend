import { HttpMethods } from '@typings/enums/http'

import { ITechPause } from './tech-pause'

export interface IAdminSettings {
  dynamicSettings: {
    costOfCheckingProduct: number
    costOfFindingSupplier: number
    deadlineForFindingSupplier: number
    orderAmountLimit: number
    requestMinAmountPriceOfProposal: number
    requestPlatformMarginInPercent: number
    requestSupervisorFeeInPercent: number
    requestTimeLimitInHourForCancelingProposalsByClient: number
    requestTimeLimitInHourForCheckingProposalBySuper: number
    techPause: ITechPause
    tech_pause: number
    timeBeforeLaunchDeadline: number
    timeToDeadlinePendingOrder: number
    volumeWeightCoefficient: number
    yuanToDollarRate: number
  }
  staticSettings: {
    errorMessages: string[]
    paymentComments: string[]
    whiteList: IWhiteList[]
    zipCodeGroups: {
      central: number[]
      east: number[]
      west: number[]
    }
  }
}

interface IWhiteList {
  httpMethod: HttpMethods
  url: string
}
