import { BACKEND_API_URL } from '@constants/keys/env'

import { axiosInstance } from '../axios-instance'

import { Configuration } from './codegen'
import { AdministratorApi } from './codegen/api/administrator-api'
import { AnnouncementsApi } from './codegen/api/announcements-api'
import { BatchesApi } from './codegen/api/batches-api'
import { BoxesApi } from './codegen/api/boxes-api'
import { BuyerApi } from './codegen/api/buyer-api'
import { ChatsApi } from './codegen/api/chats-api'
import { ClientApi } from './codegen/api/client-api'
import { DashboardApi } from './codegen/api/dashboard-api'
import { GeneralApi } from './codegen/api/general-api'
import { IdeaApi } from './codegen/api/idea-api'
import { IntegrationsApi } from './codegen/api/integrations-api'
import { OrderApi } from './codegen/api/order-api'
import { OtherApi } from './codegen/api/other-api'
import { PermissionsApi } from './codegen/api/permissions-api'
import { ProductApi } from './codegen/api/product-api'
import { RequestProposalsApi } from './codegen/api/request-proposals-api'
import { RequestsApi } from './codegen/api/requests-api'
import { ResearcherApi } from './codegen/api/researcher-api'
import { ShopApi } from './codegen/api/shop-api'
import { ShopSellApi } from './codegen/api/shop-sell-api'
import { StorekeepersApi } from './codegen/api/storekeepers-api'
import { SupervisorApi } from './codegen/api/supervisor-api'
import { SupplierApi } from './codegen/api/supplier-api'
import { UserApi } from './codegen/api/user-api'

const apiKeyPrefix = 'Bearer'

class RestApiService {
  openapiConfig = new Configuration()

  constructor() {
    this.openapiConfig.basePath = BACKEND_API_URL

    this.administratorApi = new AdministratorApi(this.openapiConfig, undefined, axiosInstance)
    this.announcementsApi = new AnnouncementsApi(this.openapiConfig, undefined, axiosInstance)
    this.buyerApi = new BuyerApi(this.openapiConfig, undefined, axiosInstance)
    this.clientApi = new ClientApi(this.openapiConfig, undefined, axiosInstance)
    this.product = new ProductApi(this.openapiConfig, undefined, axiosInstance)
    this.researcherApi = new ResearcherApi(this.openapiConfig, undefined, axiosInstance)
    this.storkeepersApi = new StorekeepersApi(this.openapiConfig, undefined, axiosInstance)
    // this.freelancerApi = new StorekeepersApi(this.openapiConfig)
    this.supervisorApi = new SupervisorApi(this.openapiConfig, undefined, axiosInstance)
    this.supplierApi = new SupplierApi(this.openapiConfig, undefined, axiosInstance)
    this.userApi = new UserApi(this.openapiConfig, undefined, axiosInstance)
    this.boxesApi = new BoxesApi(this.openapiConfig, undefined, axiosInstance)
    this.batchesApi = new BatchesApi(this.openapiConfig, undefined, axiosInstance)
    this.otherApi = new OtherApi(this.openapiConfig, undefined, axiosInstance)
    this.permissionsApi = new PermissionsApi(this.openapiConfig, undefined, axiosInstance)
    this.integrationsApi = new IntegrationsApi(this.openapiConfig, undefined, axiosInstance)
    this.dashboardApi = new DashboardApi(this.openapiConfig, undefined, axiosInstance)
    this.SearchRequestApi = new RequestsApi(this.openapiConfig, undefined, axiosInstance)
    this.RequestProposalsApi = new RequestProposalsApi(this.openapiConfig, undefined, axiosInstance)
    this.shopApi = new ShopApi(this.openapiConfig, undefined, axiosInstance)
    this.shopSellApi = new ShopSellApi(this.openapiConfig, undefined, axiosInstance)
    this.ideaApi = new IdeaApi(this.openapiConfig, undefined, axiosInstance)
    this.chatsApi = new ChatsApi(this.openapiConfig, undefined, axiosInstance)
    this.orderApi = new OrderApi(this.openapiConfig, undefined, axiosInstance)
    this.generalApi = new GeneralApi(this.openapiConfig, undefined, axiosInstance)
  }

  setAccessToken = accessToken => {
    this.openapiConfig.baseOptions = {
      headers: { Authorization: `${apiKeyPrefix} ${accessToken}` },
    }
    this.openapiConfig.accessToken = `${accessToken}`
  }

  removeAccessToken = () => {
    this.openapiConfig.baseOptions = {
      headers: { Authorization: '' },
    }
    this.openapiConfig.accessToken = ''
  }
}

export const restApiService = new RestApiService()
