import {getLoggerServiceModel} from '@services/logger-service'
import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {ProductForTestOnlyProduct} from './product-for-test-only-model.contracts'

class ProductForTestOnlyStatic {
  logger = undefined

  constructor() {
    this.logger = getLoggerServiceModel(this)
  }

  createProduct = async data => {
    try {
      const response = await restApiService.productForTestOnlyApi.apiV1ProductsPost(data)
      this.logger.logResponse('createProduct', response)
    } catch (error) {
      this.logger.logCoughtError('createProduct', error)
      throw error
    }
  }

  getProduct = async id => {
    try {
      const response = await restApiService.productForTestOnlyApi.apiV1ProductsIdGet(id)
      this.logger.logResponse('getProduct', response)
      return ApiClient.convertToType(response, ProductForTestOnlyProduct)
    } catch (error) {
      this.logger.logCoughtError('getProduct', error)
      throw error
    }
  }

  updateProduct = async (id, data) => {
    try {
      const response = await restApiService.productForTestOnlyApi.apiV1ProductsIdPatch(id, {InlineObject13: data})
      this.logger.logResponse('updateProduct', response)
    } catch (error) {
      this.logger.logCoughtError('updateProduct', error)
      throw error
    }
  }

  removeProduct = async id => {
    try {
      const response = await restApiService.productForTestOnlyApi.apiV1ProductsIdDelete(id)
      this.logger.logResponse('removeProduct', response)
    } catch (error) {
      this.logger.logCoughtError('removeProduct', error)
      throw error
    }
  }
}

export const ProductForTestOnly = new ProductForTestOnlyStatic()
