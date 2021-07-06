import {transformAndValidate} from 'class-transformer-validator'

import {restApiService} from '@services/rest-api-service/rest-api-service'

import {SupervisorUpdateProductContract} from './supervisor-model.contracts'

class SupervisorModelStatic {
  getProductsVacant = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsVacGet()
    return response
  }

  getProductsMy = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsMyGet()
    return response
  }

  updateProduct = async (id, data) => {
    await transformAndValidate(SupervisorUpdateProductContract, data)

    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsGuidPatch(id, data)
    if (response && response.error) {
      throw new Error(response.message)
    }
    return response
  }

  getBalance = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsPaymentsMyBalanceGet()
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsPaymentsMyGet()
    return response
  }

  getPaymentsCreatedByMe = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsPaymentsCreatedByThisSuperGet()
    return response
  }

  pickupProduct = async id => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsPickupGuidPost(id)
    return response
  }
}

export const SupervisorModel = new SupervisorModelStatic()
