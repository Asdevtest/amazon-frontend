import {BACKEND_API_URL} from '@constants/env'

import {ApiClient} from './codegen/src'
import AdministratorApi from './codegen/src/api/AdministratorApi'
import BuyerApi from './codegen/src/api/BuyerApi'
import ClientApi from './codegen/src/api/ClientApi'
import ProductForTestOnlyApi from './codegen/src/api/ProductForTestOnlyApi'
import ReseacherApi from './codegen/src/api/ReseacherApi'
import StorekeepersApi from './codegen/src/api/StorekeepersApi'
import SupervisorApi from './codegen/src/api/SupervisorApi'
import SupplierApi from './codegen/src/api/SupplierApi'
import UserApi from './codegen/src/api/UserApi'

class RestApiService {
  constructor() {
    const apiClient = ApiClient.instance
    apiClient.basePath = BACKEND_API_URL
    apiClient.defaultHeaders = {
      'Access-Control-Allow-Origin': 'null',
    }
    this.administratorApi = new AdministratorApi()
    this.buyerApi = new BuyerApi()
    this.clientApi = new ClientApi()
    this.productForTestOnlyApi = new ProductForTestOnlyApi()
    this.researcherApi = new ReseacherApi()
    this.strokeepersApi = new StorekeepersApi()
    this.supervisorApi = new SupervisorApi()
    this.supplierApi = new SupplierApi()
    this.userApi = new UserApi()
  }
}

export const restApiService = new RestApiService()
