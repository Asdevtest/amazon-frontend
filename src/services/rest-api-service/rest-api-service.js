import { BACKEND_API_URL } from '@constants/keys/env'

import { getAxiosInstance } from '@services/axios-instance'

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

class RestApiService {
  openapiConfig = new Configuration()

  constructor() {
    this.openapiConfig.basePath = BACKEND_API_URL

    this.axiosInstance = getAxiosInstance()
    this.administratorApi = new AdministratorApi(this.openapiConfig, undefined, this.axiosInstance)
    this.announcementsApi = new AnnouncementsApi(this.openapiConfig, undefined, this.axiosInstance)
    this.buyerApi = new BuyerApi(this.openapiConfig, undefined, this.axiosInstance)
    this.clientApi = new ClientApi(this.openapiConfig, undefined, this.axiosInstance)
    this.product = new ProductApi(this.openapiConfig, undefined, this.axiosInstance)
    this.researcherApi = new ResearcherApi(this.openapiConfig, undefined, this.axiosInstance)
    this.storkeepersApi = new StorekeepersApi(this.openapiConfig, undefined, this.axiosInstance)
    this.supervisorApi = new SupervisorApi(this.openapiConfig, undefined, this.axiosInstance)
    this.supplierApi = new SupplierApi(this.openapiConfig, undefined, this.axiosInstance)
    this.userApi = new UserApi(this.openapiConfig, undefined, this.axiosInstance)
    this.boxesApi = new BoxesApi(this.openapiConfig, undefined, this.axiosInstance)
    this.batchesApi = new BatchesApi(this.openapiConfig, undefined, this.axiosInstance)
    this.otherApi = new OtherApi(this.openapiConfig, undefined, this.axiosInstance)
    this.permissionsApi = new PermissionsApi(this.openapiConfig, undefined, this.axiosInstance)
    this.integrationsApi = new IntegrationsApi(this.openapiConfig, undefined, this.axiosInstance)
    this.dashboardApi = new DashboardApi(this.openapiConfig, undefined, this.axiosInstance)
    this.SearchRequestApi = new RequestsApi(this.openapiConfig, undefined, this.axiosInstance)
    this.RequestProposalsApi = new RequestProposalsApi(this.openapiConfig, undefined, this.axiosInstance)
    this.shopApi = new ShopApi(this.openapiConfig, undefined, this.axiosInstance)
    this.shopSellApi = new ShopSellApi(this.openapiConfig, undefined, this.axiosInstance)
    this.ideaApi = new IdeaApi(this.openapiConfig, undefined, this.axiosInstance)
    this.chatsApi = new ChatsApi(this.openapiConfig, undefined, this.axiosInstance)
    this.orderApi = new OrderApi(this.openapiConfig, undefined, this.axiosInstance)
    this.generalApi = new GeneralApi(this.openapiConfig, undefined, this.axiosInstance)
  }
}

export const restApiService = new RestApiService()
