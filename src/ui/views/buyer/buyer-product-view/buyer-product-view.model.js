import { action, makeAutoObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { BuyerModel } from '@models/buyer-model'
import { ProductModel } from '@models/product-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import { isUndefined } from '@utils/checks'
import { getNewObjectWithDefaultValue, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'
import { isValidationErrors, plainValidationErrorAndApplyFuncForEachError } from '@utils/validation'

import { loadingStatus } from '@typings/enums/loading-status'

import {
  confirmMessageByProductStatus,
  fieldsOfProductAllowedToForceUpdate,
  fieldsOfProductAllowedToUpdate,
  formFieldsDefault,
  warningModalTitleVariants,
} from './buyer-product-view.constants'

export class BuyerProductViewModel {
  history = undefined
  requestStatus = undefined
  productId = undefined
  product = undefined
  productBase = undefined
  curUpdateProductData = undefined
  showTab = undefined
  showEditHSCodeModal = false
  showConfirmModal = false
  setOpenModal = undefined
  productVariations = undefined
  imagesForLoad = []
  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickOkBtn: () => this.onSaveProductData(),
  }
  readyImages = []
  progressValue = 0
  showProgress = false
  formFields = { ...formFieldsDefault }
  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }
  get currentData() {
    return this.product
  }

  constructor({ history, setOpenModal }) {
    this.history = history

    const url = new URL(window.location.href)
    this.productId = url.searchParams.get('product-id')
    this.showTab = url.searchParams.get('show-tab')

    if (setOpenModal) {
      this.setOpenModal = setOpenModal
    }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.productId,
      () => this.loadData(),
    )
  }

  async loadData() {
    try {
      await this.getProductById()
      await this.getProductsVariations()
    } catch (error) {
      console.error(error)
    }
  }

  async getProductsVariations() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await ProductModel.getProductsVariationsByGuid(this.product?.parentProductId || this.product?._id)

      runInAction(() => {
        this.productVariations = result
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async getProductById() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = this.product ? { ...result, status: this.product.status } : result

        this.productBase = result

        this.imagesForLoad = result.images

        updateProductAutoCalculatedFields.call(this)
      })

      if (
        result.status === ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH] ||
        result.status === ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH]
      ) {
        await BuyerModel.pickupProduct(this.productId)

        this.getProductById()
      }
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  onChangeProductFields = fieldsName =>
    action(e => {
      this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, [fieldsName]: '' }

      this.product = { ...this.product, [fieldsName]: e.target.value }

      updateProductAutoCalculatedFields.call(this)
    })

  onClickSetProductStatusBtn(statusKey) {
    this.product = { ...this.product, status: ProductStatusByKey[statusKey] }
  }

  async onRemoveSupplier(supplierId) {
    try {
      await ProductModel.removeSuppliersFromProduct(this.product._id, [supplierId])

      runInAction(() => {
        if (this.product.currentSupplierId && this.product.currentSupplierId === supplierId) {
          this.product.currentSupplierId = null
        }
      })

      await SupplierModel.removeSupplier(supplierId)

      await this.onSaveForceProductData()
    } catch (error) {
      console.error(error)
    }
  }

  async handleProductActionButtons(actionType, withoutStatus, isModal, updateDataHandler) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus(updateDataHandler)

        break
      case 'cancel':
        this.history.push('/buyer/my-products')

        break

      case 'closeModal':
        this.setOpenModal()
        break
    }
  }

  async openConfirmModalWithTextByStatus(updateDataHandler) {
    try {
      runInAction(() => {
        this.curUpdateProductData = getObjectFilteredByKeyArrayWhiteList(
          this.product,
          fieldsOfProductAllowedToUpdate,
          false,
          (key, value) => {
            if (key === 'buyersComment' && isUndefined(value)) {
              return ''
            } else {
              return value
            }
          },
        )
      })

      if (
        this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER] ||
        this.curUpdateProductData.status ===
          ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER] ||
        ((this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER] ||
          this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER] ||
          this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE] ||
          this.curUpdateProductData.status ===
            ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE]) &&
          this.curUpdateProductData.currentSupplierId)
      ) {
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: false,
            message: confirmMessageByProductStatus()[this.curUpdateProductData.status],
            onClickOkBtn: () => {
              this.onSaveProductData(updateDataHandler)

              toast.success(`${t(TranslationKey['Status changed'])}!`)
            },
          }
        })

        this.onTriggerOpenModal('showConfirmModal')
      } else {
        toast.warning(
          this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] ||
            this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH] ||
            this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT] ||
            this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH]
            ? warningModalTitleVariants().CHOOSE_STATUS
            : warningModalTitleVariants().NO_SUPPLIER,
        )
      }
    } catch (error) {
      console.error(error)

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({ errorProperty, constraint }) => {
          runInAction(() => {
            this.formFieldsValidationErrors[errorProperty] = constraint
          })
        })
      } else {
        console.error(error)
      }
    }
  }

  onClickHsCode() {
    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  async onSaveProductData(updateDataHandler) {
    try {
      await BuyerModel.updateProduct(this.product._id, this.curUpdateProductData)
      await this.loadData()

      updateDataHandler && (await updateDataHandler())
    } catch (error) {
      console.error(error)
    }
  }

  async onSaveForceProductData() {
    try {
      await BuyerModel.updateProduct(
        this.productId,
        getObjectFilteredByKeyArrayWhiteList(
          this.product,
          fieldsOfProductAllowedToForceUpdate,
          false,
          (key, value) => {
            if (key === 'buyersComment' && isUndefined(value)) {
              return ''
            } else {
              return value
            }
          },
          true,
        ),
      )

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveSupplierBtn(supplierCardId) {
    try {
      if (supplierCardId) {
        await ProductModel.addSuppliersToProduct(this.productId, [supplierCardId])
      }

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async navigateToProduct(id) {
    const win = window.open(`/buyer/my-products/product?product-id=${id}`, '_blank')
    win.focus()
  }
}
