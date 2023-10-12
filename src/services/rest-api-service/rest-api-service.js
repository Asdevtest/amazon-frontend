import superagent from 'superagent'

import { BACKEND_API_URL } from '@constants/keys/env'

import { SettingsModel } from '@models/settings-model'

import {
  ApiClient,
  BoxesApi,
  ChatsApi,
  GeneralApi,
  IdeaApi,
  IntegrationsApi,
  OrderApi,
  PermissionsApi,
  RequestProposalsApi,
  RequestsApi,
  ShopApi,
  ShopSellApi,
} from './codegen/src'
import AdministratorApi from './codegen/src/api/AdministratorApi'
import AnnouncementsApi from './codegen/src/api/AnnouncementsApi'
import BatchesApi from './codegen/src/api/BatchesApi'
import BuyerApi from './codegen/src/api/BuyerApi'
import ClientApi from './codegen/src/api/ClientApi'
import DashboardApi from './codegen/src/api/DashboardApi'
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
    this.apiClient.plugins = [this.handleAuthenticationError]

    console.log('this.apiClient.plugins', this.apiClient.plugins)

    this.administratorApi = new AdministratorApi(this.apiClient)
    this.announcementsApi = new AnnouncementsApi(this.apiClient)
    this.buyerApi = new BuyerApi(this.apiClient)
    this.clientApi = new ClientApi(this.apiClient)
    this.product = new Product(this.apiClient)
    this.researcherApi = new ResearcherApi(this.apiClient)
    this.storkeepersApi = new StorekeepersApi(this.apiClient)
    this.freelancerApi = new FreelancerApi(this.apiClient)
    this.supervisorApi = new SupervisorApi(this.apiClient)
    this.supplierApi = new SupplierApi(this.apiClient)
    this.userApi = new UserApi(this.apiClient)
    this.boxesApi = new BoxesApi(this.apiClient)
    this.batchesApi = new BatchesApi(this.apiClient)
    this.otherApi = new OtherApi(this.apiClient)
    this.permissionsApi = new PermissionsApi(this.apiClient)
    this.integrationsApi = new IntegrationsApi(this.apiClient)
    this.dashboardApi = new DashboardApi(this.apiClient)
    this.SearchRequestApi = new RequestsApi(this.apiClient)
    this.RequestProposalsApi = new RequestProposalsApi(this.apiClient)
    this.shopApi = new ShopApi(this.apiClient)
    this.shopSellApi = new ShopSellApi(this.apiClient)
    this.ideaApi = new IdeaApi(this.apiClient)
    this.chatsApi = new ChatsApi(this.apiClient)
    this.orderApi = new OrderApi(this.apiClient)
    this.generalApi = new GeneralApi(this.apiClient)
  }

  handleAuthenticationError = require('superagent-intercept')(async (error, response) => {
    if (
      (response.status === 403 && response.statusText.includes('Forbidden')) ||
      (response.status === 401 &&
        (response.statusText.includes('Forbidden') || response.statusText.includes('Unauthorized')))
    ) {
      try {
        const userModel = SettingsModel.loadValue('UserModel')
        const { refreshToken } = userModel
        await this.userApi.apiV1UsersGetAccessTokenPost({ body: { refreshToken } }).then(tokenResponse => {
          this.setAccessToken(tokenResponse?.accessToken)
          SettingsModel.saveValue('UserModel', { ...userModel, accessToken: tokenResponse?.accessToken })
          this.retryRequestHandler(response?.req, tokenResponse?.accessToken)
        })
      } catch (error) {
        console.log('Error while getting access token:', error)
      }
    }
  })

  async retryRequestHandler(request, token) {
    const { method, url, header, body } = request

    const validHeader = {
      ...header,
      Authorization: `${apiKeyPrefix} ${token}`,
    }

    await superagent(method, url).set(validHeader).send(body)
  }

  setAccessToken = accessToken => {
    this.apiClient.authentications = {
      AccessTokenBearer: { ...this.apiClient.authentications.AccessTokenBearer, apiKeyPrefix, apiKey: accessToken },
    }
  }

  removeAccessToken = () => {
    delete this.apiClient.authentications.AccessTokenBearer.apiKeyPrefix
    delete this.apiClient.authentications.AccessTokenBearer.apiKey
  }
}

export const restApiService = new RestApiService()
