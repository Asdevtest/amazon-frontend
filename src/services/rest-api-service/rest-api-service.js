import {BACKEND_API_URL} from '@constants/env'

import {ApiClient, BoxesApi, IntegrationsApi, PermissionsApi, RequestProposalsApi, RequestsApi} from './codegen/src'
import AdministratorApi from './codegen/src/api/AdministratorApi'
import BatchesApi from './codegen/src/api/BatchesApi'
import BuyerApi from './codegen/src/api/BuyerApi'
import ClientApi from './codegen/src/api/ClientApi'
import FreelancerApi from './codegen/src/api/FreelancerApi'
import OtherApi from './codegen/src/api/OtherApi'
import Product from './codegen/src/api/ProductApi'
import ResearcherApi from './codegen/src/api/ResearcherApi'
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
    this.product = new Product(this.apiClient)
    this.researcherApi = new ResearcherApi(this.apiClient)
    this.strokeepersApi = new StorekeepersApi(this.apiClient)
    this.freelancerApi = new FreelancerApi(this.apiClient)
    this.supervisorApi = new SupervisorApi(this.apiClient)
    this.supplierApi = new SupplierApi(this.apiClient)
    this.userApi = new UserApi(this.apiClient)
    this.boxesApi = new BoxesApi(this.apiClient)
    this.batchesApi = new BatchesApi(this.apiClient)
    this.otherApi = new OtherApi(this.apiClient)
    this.permissionsApi = new PermissionsApi(this.apiClient)
    this.integrationsApi = new IntegrationsApi(this.apiClient)

    this.SearchRequestApi = new RequestsApi(this.apiClient)
    this.SearchRequestProposalApi = new RequestProposalsApi(this.apiClient)
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
