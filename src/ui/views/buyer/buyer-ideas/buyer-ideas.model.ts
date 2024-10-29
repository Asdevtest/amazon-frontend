/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ideaStatusByKey, ideaStatusGroupsNames } from '@constants/statuses/idea-status'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { IdeaModel } from '@models/ideas-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { IIdea } from '@typings/models/ideas/idea'
import { IProduct } from '@typings/models/products/product'
import { IPaymentMethod } from '@typings/shared/payment-method'
import { IUploadFile } from '@typings/shared/upload-file'

import { buyerIdeasColumns } from './buyer-ideas.columns'
import { fieldsForSearch } from './buyer-ideas.constants'
import { observerConfig } from './observer.config'

export class BuyerIdeasViewModel extends DataGridFilterTableModel {
  showIdeaModal: boolean = false
  showAddOrEditSupplierModal: boolean = false

  productId: string = ''
  currentIdeaId: string = ''
  currentProduct: IProduct | null = null

  paymentMethods: IPaymentMethod[] = []

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    const rowHandlers = {
      onClickAddSupplierButton: (id: string) => this.onClickAddSupplierButton(id),
      onClickSupplierFound: (id: string) => this.setIdeaSupplierFound(id),
      onClickSupplierNotFound: (id: string) => this.setIdeaSupplierNotFound(id),
    }

    const columnsModel = buyerIdeasColumns(rowHandlers)

    const filtersFields = getFilterFields(columnsModel, [
      'parentProductAsin',
      'parentProductSkuByClient',
      'parentProductAmazonTitle',
    ])

    const defaultGetCurrentDataOptions = () => ({
      withOrder: false,
      withRequests: false,
    })

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: ideaStatusGroupsNames.SEARCH_SUPPLIERS,
      },
    })

    super({
      getMainDataMethod: IdeaModel.getIdeaList,
      columnsModel,
      filtersFields,
      mainMethodURL: 'ideas/pag/my?',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.BUYER_IDEAS,
      defaultGetCurrentDataOptions,
      defaultFilterParams,
      defaultSortModel: [{ field: 'status', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    this.getTableSettingsPreset()
  }

  async getDataForIdeaModal(idea: IIdea) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const isChildProcuct =
        idea.childProduct && (idea.status === ideaStatusByKey.ADDING_ASIN || idea.status === ideaStatusByKey.VERIFIED)

      const currentProductId = isChildProcuct ? idea.childProduct._id : idea.parentProduct._id

      runInAction(() => {
        this.productId = currentProductId
        this.currentIdeaId = idea._id
        this.currentProduct = idea?.parentProduct
      })

      this.onTriggerOpenModal('showIdeaModal')

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onClickAddSupplierButton(id: string) {
    runInAction(() => {
      this.currentIdeaId = id
    })

    await this.getSuppliersPaymentMethods()

    this.onTriggerOpenModal('showAddOrEditSupplierModal')
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response as IPaymentMethod[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveSupplierBtn({
    supplier,
    itemId,
    editPhotosOfSupplier,
    editPhotosOfUnit,
  }: {
    supplier: any
    itemId: string
    editPhotosOfSupplier: IUploadFile[]
    editPhotosOfUnit: IUploadFile[]
  }) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map((item: IPaymentMethod) =>
          getObjectFilteredByKeyArrayWhiteList(item, ['_id']),
        ),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        heightUnit: supplier?.heightUnit || null,
        widthUnit: supplier?.widthUnit || null,
        lengthUnit: supplier?.lengthUnit || null,
        weighUnit: supplier?.weighUnit || null,
      }

      if (editPhotosOfSupplier?.length) {
        // @ts-ignore
        const images = await onSubmitPostImages.call(this, { images: editPhotosOfSupplier, type: 'readyImages' })

        supplier = {
          ...supplier,
          images,
        }
      }

      if (editPhotosOfUnit?.length) {
        // @ts-ignore
        const imageUnit = await onSubmitPostImages.call(this, { images: editPhotosOfUnit, type: 'readyImages' })
        supplier = {
          ...supplier,
          imageUnit,
        }
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(
          supplier,
          patchSuppliers,
          undefined,
          undefined,
          true,
        )

        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)

        if (supplier._id === this.currentProduct?.currentSupplierId) {
          runInAction(() => {
            // @ts-ignore
            this.currentProduct.currentSupplier = supplier
            updateProductAutoCalculatedFields.call(this)
          })
        }
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)

        await IdeaModel.addSuppliersToIdea(itemId || this.currentIdeaId, {
          suppliersIds: [createSupplierResult.guid],
        })
      }

      runInAction(() => {
        this.currentIdeaId = ''
      })

      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async setIdeaSupplierFound(id: string) {
    try {
      await IdeaModel.changeStatusToSupplierFound(id)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async setIdeaSupplierNotFound(id: string) {
    try {
      await IdeaModel.changeStatusToSupplierNotFound(id)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
