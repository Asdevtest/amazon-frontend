import { restApiService } from '@services/rest-api-service/rest-api-service'

import { ICreateSupplierCard } from '@components/modals/add-supplier-card-modal/add-supplier-card-modal.type'
import { PostSupplier } from '@components/modals/add-supplier-modal/add-supplier-modal.types'

import { ParamsGetPagRequest } from '@typings/models/model/params-get-pag-request'

class SupplierV2ModelStatic {
  createSupplier = async (body: PostSupplier) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersPost({
      body,
    })
    return response.data
  }

  getSuppliers = async (params: ParamsGetPagRequest) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersGet({
      ...params,
      noCache: true,
    })
    return response.data
  }

  getSuppliersLight = async (params: ParamsGetPagRequest) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersLightGet({
      ...params,
      noCache: true,
    })
    return response.data
  }

  editSupplier = async (guid: string, body: PostSupplier) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  getSupplierCards = async (params: ParamsGetPagRequest) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersGuidCardsGet({
      ...params,
      noCache: true,
    })
    return response.data
  }

  getAllSuppliersCards = async (params: ParamsGetPagRequest) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersCardsGet({
      ...params,
      noCache: true,
    })
    return response.data
  }

  getSupplierCardByGuid = async (guid: string) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersCardGuidGet({
      guid,
    })
    return response.data
  }

  createSupplierCard = async (body: ICreateSupplierCard) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersCardPost({
      body,
    })
    return response.data
  }

  editSupplierCard = async (guid: string, body: ICreateSupplierCard) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersCardGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  deleteSupplierCard = async (guid: string) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersCardsGuidDelete({
      guid,
    })
    return response.data
  }

  patchSupplierCardStatus = async (guid: string, body: any) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersCardGuidChangeStatusPatch({
      guid,
      body,
    })
    return response.data
  }

  patchSupplierStatus = async (guid: string, body: any) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersGuidChangeStatusPatch({
      guid,
      body,
    })
    return response.data
  }
}

export const SupplierV2Model = new SupplierV2ModelStatic()
