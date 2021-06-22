import {BACKEND_API_URL} from '@constants/env'

import {ApiClient, BoxesApi} from './codegen/src'
import AdministratorApi from './codegen/src/api/AdministratorApi'
import BuyerApi from './codegen/src/api/BuyerApi'
import ClientApi from './codegen/src/api/ClientApi'
import ProductForTestOnlyApi from './codegen/src/api/ProductForTestOnlyApi'
import ReseacherApi from './codegen/src/api/ReseacherApi'
import StorekeepersApi from './codegen/src/api/StorekeepersApi'
import SupervisorApi from './codegen/src/api/SupervisorApi'
import SupplierApi from './codegen/src/api/SupplierApi'
import UserApi from './codegen/src/api/UserApi'

const apiKeyPrefix = 'Bearer'

class RestApiService {
  apiClient = undefined

  constructor() {
    this.apiClient = new ApiClient()
    this.apiClient.basePath = BACKEND_API_URL
    this.apiClient.defaultHeaders = {
      'Access-Control-Allow-Origin': 'null',
    }
    this.administratorApi = new AdministratorApi(this.apiClient)
    this.buyerApi = new BuyerApi(this.apiClient)
    this.clientApi = new ClientApi(this.apiClient)
    this.productForTestOnlyApi = new ProductForTestOnlyApi(this.apiClient)
    this.researcherApi = new ReseacherApi(this.apiClient)
    this.strokeepersApi = new StorekeepersApi(this.apiClient)
    this.supervisorApi = new SupervisorApi(this.apiClient)
    this.supplierApi = new SupplierApi(this.apiClient)
    this.userApi = new UserApi(this.apiClient)
    this.boxesApi = new BoxesApi(this.apiClient)
  }

  setAccessToken = accessToken => {
    this.apiClient.authentications = {
      AccessTokenBearer: {...this.apiClient.authentications.AccessTokenBearer, apiKeyPrefix, apiKey: accessToken},
    }
  }

  removeAccessToken = () => {
    delete this.apiClient.authentications.AccessTokenBearer.apiKeyPrefix
    delete this.apiClient.authentications.AccessTokenBearer.apiKey
  }
}

export const restApiService = new RestApiService()
