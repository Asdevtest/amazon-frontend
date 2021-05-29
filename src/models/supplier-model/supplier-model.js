import {getLoggerServiceModel} from '@services/logger-service'
import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {Supplier} from './suppliers-model.contracts'

class SupplierModelStatic {
  logger = undefined

  constructor() {
    this.logger = getLoggerServiceModel(this)
  }

  getSuppliers = async () => {
    try {
      const response = await restApiService.supplierApi.apiV1SuppliersGet()
      this.logger.logResponse('getSuppliers', response)
      return ApiClient.convertToType(response, Supplier)
    } catch (error) {
      this.logger.logCoughtError('getSuppliers', error)
      throw error
    }
  }

  createSupplier = async data => {
    try {
      const response = await restApiService.supplierApi.apiV1SuppliersPost({InlineObject19: data})
      this.logger.logResponse('createSupplier', response)
    } catch (error) {
      this.logger.logCoughtError('createSupplier', error)
      throw error
    }
  }

  getSupplier = async id => {
    try {
      const response = await restApiService.supplierApi.apiV1SuppliersGuidGet(id)
      this.logger.logResponse('getSupplier', response)
      return ApiClient.convertToType(response, Supplier)
    } catch (error) {
      this.logger.logCoughtError('getSupplier', error)
      throw error
    }
  }

  updateSupplier = async (id, data) => {
    try {
      const response = await restApiService.supplierApi.apiV1SuppliersGuidPatch(id, {InlineObject20: data})
      this.logger.logResponse('updateSupplier', response)
    } catch (error) {
      this.logger.logCoughtError('updateSupplier', error)
      throw error
    }
  }

  removeSupplier = async id => {
    try {
      const response = await restApiService.supplierApi.apiV1SuppliersGuidDelete(id)
      this.logger.logResponse('removeSupplier', response)
    } catch (error) {
      this.logger.logCoughtError('removeSupplier', error)
      throw error
    }
  }
}

export const SupplierModel = new SupplierModelStatic()
