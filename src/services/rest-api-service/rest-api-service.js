import { BACKEND_API_URL } from '@constants/keys/env'

import { SettingsModel } from '@models/settings-model'

import { Configuration } from './codegen'
import {
  AdministratorApi,
  AnnouncementsApi,
  BatchesApi,
  BoxesApi,
  BuyerApi,
  ChatsApi,
  ClientApi,
  DashboardApi,
  FreelancerApi,
  GeneralApi,
  IdeaApi,
  IntegrationsApi,
  OrderApi,
  OtherApi,
  PermissionsApi,
  ProductApi,
  RequestProposalsApi,
  RequestsApi,
  ResearcherApi,
  ShopApi,
  ShopSellApi,
  StorekeepersApi,
  SupervisorApi,
  SupplierApi,
  UserApi,
} from './codegen/api'

const apiKeyPrefix = 'Bearer'

class RestApiService {
  openapiConfig = new Configuration()

  constructor() {
    this.openapiConfig.basePath = BACKEND_API_URL

    this.apiClient = new ClientApi()
    this.apiClient.basePath = BACKEND_API_URL
    this.apiClient.defaultHeaders = {
      'Access-Control-Allow-Origin': 'null',
    }

    this.administratorApi = new AdministratorApi(this.openapiConfig)
    this.announcementsApi = new AnnouncementsApi(this.openapiConfig)
    this.buyerApi = new BuyerApi(this.openapiConfig)
    this.clientApi = new ClientApi(this.openapiConfig)
    this.product = new ProductApi(this.openapiConfig)
    this.researcherApi = new ResearcherApi(this.openapiConfig)
    this.storkeepersApi = new StorekeepersApi(this.openapiConfig)
    this.freelancerApi = new StorekeepersApi(this.openapiConfig)
    // this.freelancerApi = new FreelancerApi(this.apiClient)
    this.supervisorApi = new SupervisorApi(this.openapiConfig)
    this.supplierApi = new SupplierApi(this.openapiConfig)
    this.userApi = new UserApi(this.openapiConfig)
    this.boxesApi = new BoxesApi(this.openapiConfig)
    this.batchesApi = new BatchesApi(this.openapiConfig)
    this.otherApi = new OtherApi(this.openapiConfig)
    this.permissionsApi = new PermissionsApi(this.openapiConfig)
    this.integrationsApi = new IntegrationsApi(this.openapiConfig)
    this.dashboardApi = new DashboardApi(this.openapiConfig)
    this.SearchRequestApi = new RequestsApi(this.openapiConfig)
    this.RequestProposalsApi = new RequestProposalsApi(this.openapiConfig)
    this.shopApi = new ShopApi(this.openapiConfig)
    this.shopSellApi = new ShopSellApi(this.openapiConfig)
    this.ideaApi = new IdeaApi(this.openapiConfig)
    this.chatsApi = new ChatsApi(this.openapiConfig)
    this.orderApi = new OrderApi(this.openapiConfig)
    this.generalApi = new GeneralApi(this.openapiConfig)
  }

  setAccessToken = accessToken => {
    this.openapiConfig.baseOptions = {
      headers: { Authorization: `${apiKeyPrefix} ${accessToken}` },
    }
    this.openapiConfig.accessToken = `${apiKeyPrefix} ${accessToken}`
  }

  removeAccessToken = () => {
    this.openapiConfig.baseOptions = {
      headers: { Authorization: '' },
    }
    this.openapiConfig.accessToken = ''
  }
}

export const restApiService = new RestApiService()
