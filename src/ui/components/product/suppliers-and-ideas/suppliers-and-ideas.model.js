import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'
import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status.ts'
import { TranslationKey } from '@constants/translations/translation-key'
import {
  IdeaCreate,
  IdeaPatch,
  creatSupplier,
  createOrderRequestWhiteList,
  createProductByClient,
  patchSuppliers,
} from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { IdeaModel } from '@models/ideas-model'
import { ProductModel } from '@models/product-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { StorekeeperModel } from '@models/storekeeper-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { checkIsBuyer, checkIsClient, checkIsSupervisor, checkIsValidProposalStatusToShowResoult } from '@utils/checks'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { isBuyer, isClient } from '@typings/guards/roles'

export class SuppliersAndIdeasModel {
  requestStatus = undefined
  currentIdeaId = undefined
  curIdea = undefined
  ideaForReject = undefined
  currentProduct = undefined
  productToOrder = undefined
  currentProposal = undefined
  currentRequest = undefined
  requestTypeTask = undefined
  productId = undefined
  updateData = undefined
  inCreate = false
  isCreateModal = false
  inEdit = false
  ideasData = []
  ideaIdToRemove = undefined
  supplierData = undefined
  dataToCreateProduct = undefined
  readyFiles = []
  progressValue = 0
  showProgress = false
  isCreate = false
  showConfirmModal = false
  showRequestDesignerResultModal = false
  showMainRequestResultModal = false
  showRequestBloggerResultModal = false
  showLinkRequestModal = false
  showOrderModal = false
  showSetBarcodeModal = false
  showSelectionSupplierModal = false
  showCommentsModal = false
  showSelectShopsModal = false
  selectedProduct = undefined
  storekeepers = []
  destinations = []
  ordersDataStateToSubmit = undefined
  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  get userInfo() {
    return UserModel.userInfo
  }
  get currentData() {
    return this.ideasData?.toSorted(sortObjectsArrayByFiledDateWithParseISO('updatedAt')) // ideas sort by desc
  }
  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ productId, product, isModalView, currentIdeaId, isCreate, closeModalHandler, updateData }) {
    this.productId = productId
    this.currentProduct = product
    this.isModalView = isModalView
    this.currentIdeaId = currentIdeaId
    this.closeModalHandler = closeModalHandler
    this.isCreateModal = isCreate
    this.updateData = updateData

    if (isCreate) {
      this.onCreateIdea()
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      if (this.isModalView && this.currentIdeaId) {
        await this.getIdea(this.currentIdeaId)
      } else {
        if (this.productId) {
          await this.getIdeas()
        }
      }

      this.getStorekeepers()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickOpenNewTab(productId, ideaId) {
    const userRole = UserRoleCodeMap[this.userInfo?.role]
    window
      .open(
        `${
          isClient(this.userInfo?.role)
            ? '/client/inventory'
            : isBuyer(this.userInfo?.role)
            ? '/buyer/my-products'
            : userRole
        }/product?product-id=${productId}&show-tab=ideas&ideaId=${ideaId}`,
        '_blank',
      )
      .focus()
  }

  async getIdeas() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await IdeaModel.getIdeas(this.productId)

      runInAction(() => {
        this.ideasData = result
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async getIdea(ideaId) {
    try {
      const response = await IdeaModel.getIdeaById(ideaId)

      runInAction(() => {
        this.curIdea = response
        this.productId = response.parentProduct?._id
      })
    } catch (error) {
      console.error(error)
    }
  }

  async createIdea(data, isForceUpdate) {
    try {
      const res = await IdeaModel.createIdea({ ...data, price: data.price || 0, quantity: data.quantity || 0 })

      if (!isForceUpdate) {
        toast.success(t(TranslationKey['Idea created']))
      }

      return res.guid
    } catch (error) {
      console.error(error)
    }
  }

  async editIdea(id, data, isForceUpdate) {
    try {
      await IdeaModel.editIdea(id, data)

      if (!isForceUpdate) {
        if (this.isModalView) {
          this.closeModalHandler()
        }

        toast.success(t(TranslationKey['Idea edited']))

        this.updateData?.()
      }
    } catch (error) {
      console.error(error)
    }
  }

  onCreateIdea() {
    if (!!this.currentProduct && !this.currentProduct?.buyer?._id && !this.currentProduct?.buyerId) {
      this.confirmModalSettings = {
        isWarning: true,
        confirmMessage: t(TranslationKey['The card does not fit, send to supplier search']),
        onClickConfirm: () => {
          this.onTriggerOpenModal('showSelectionSupplierModal')
          this.onTriggerOpenModal('showConfirmModal')
        },
      }
      this.onTriggerOpenModal('showConfirmModal')
    } else {
      this.curIdea = undefined
      this.inCreate = true
    }
  }

  onSetCurIdea(idea) {
    this.getIdea(idea?._id)
    this.inEdit = false
  }

  onEditIdea(idea) {
    this.getIdea(idea?._id)
    this.inEdit = true
  }

  onClickCancelBtn() {
    this.inCreate = false
    this.inEdit = false

    if (this.isModalView) {
      this.closeModalHandler()
    }
  }

  async onClickSaveBtn(formFields, files, isForceUpdate) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'readyFiles' })
      }

      const submitData = {
        ...formFields,
        title: formFields.productName || '',
        media: this.readyFiles,
        price: formFields.price || 0,
        quantity: Math.floor(formFields.quantity) || 0,
      }

      if (this.inEdit || formFields?._id) {
        await this.editIdea(formFields._id, getObjectFilteredByKeyArrayWhiteList(submitData, IdeaPatch), isForceUpdate)
        const response = await IdeaModel.getIdeaById(formFields?._id)

        runInAction(() => {
          this.curIdea = response
        })
      } else {
        const createdIdeaId = await this.createIdea(
          getObjectFilteredByKeyArrayWhiteList({ ...submitData, parentProductId: this.productId }, IdeaCreate),
          isForceUpdate,
        )
        await this.getIdea(createdIdeaId)

        if (!this.currentProduct) {
          this.onTriggerOpenModal('showSelectShopsModal')
        } else {
          this.closeModalHandler()
        }
      }

      runInAction(() => {
        this.inCreate = false
        this.inEdit = false
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.readyFiles = []
    }
  }

  async onSaveProductData(id) {
    try {
      await ClientModel.updateProduct(this.curIdea.parentProduct._id, { shopId: id })
    } catch (error) {
      console.error(error)
    } finally {
      this.closeModalHandler()
      this.updateData?.()
    }
  }

  async onSubmitCreateProduct(data) {
    try {
      const createData = getObjectFilteredByKeyArrayWhiteList(
        {
          images: data.media,
          amazonTitle: data.productName,
          amazon: data.price || 0,
          width: data.width || 0,
          height: data.height || 0,
          length: data.length || 0,
          asin: '',
          parentProductId: data?.parentProduct?._id,
          amazonDetail: data.criteria,
          lamazon: data.productLinks[0],
          clientComment: data.comments,
          suppliersIds: data.suppliers?.map(el => el._id),
          ...(this.currentProduct.buyer?._id && { buyerId: this.currentProduct.buyer?._id }),
        },
        createProductByClient,
      )

      const result = await ClientModel.createProduct(createData)

      await this.editIdea(data._id, { childProductId: result.guid })

      if (createData.suppliersIds?.length) {
        await ClientModel.updateProduct(result.guid, {
          currentSupplierId: createData.suppliersIds[0],
        })
      }

      this.loadData()

      toast.success(t(TranslationKey['Product added']))

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickCreateProduct(data) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: t(TranslationKey['Are you sure you want to create a product?']),
      onClickConfirm: () => this.onSubmitCreateProduct(data),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onClickResultButton(request) {
    try {
      const proposals = await RequestProposalModel.getRequestProposalsCustomByRequestId(request._id)

      runInAction(() => {
        this.currentProposal = proposals.find(proposal =>
          checkIsValidProposalStatusToShowResoult(proposal.proposal.status),
        )
        this.currentRequest = request
      })

      if (request?.spec?.title === freelanceRequestType.DESIGNER) {
        this.onTriggerOpenModal('showRequestDesignerResultModal')
      } else if (request?.spec?.title === freelanceRequestType.BLOGGER) {
        this.onTriggerOpenModal('showRequestBloggerResultModal')
      } else {
        this.onTriggerOpenModal('showMainRequestResultModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async onClickCreateRequestButton(ideaData) {
    const isCreateByChildProduct = ideaData?.status >= ideaStatusByKey[ideaStatus.ADDING_ASIN] && ideaData?.childProduct

    const win = window.open(
      `/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/create-request?parentProduct=${
        isCreateByChildProduct ? ideaData?.childProduct?._id : this.currentProduct?._id
      }&asin=${isCreateByChildProduct ? ideaData?.childProduct?.asin : this.currentProduct?.asin}`,
      '_blank',
    )

    win.focus()
  }

  async unbindRequest(requestId) {
    try {
      await RequestModel.bindIdeaToRequest(requestId, { onCheckedIdeaId: null, onFinishedIdeaId: null })
      this.getIdea(this.curIdea._id)
    } catch (error) {
      console.error('error', error)
    }
  }

  onClickUnbindButton(requestId) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmMessage: t(TranslationKey['Are you sure you want to unbind the request from the idea?']),
      onClickConfirm: () => {
        this.unbindRequest(requestId)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async changeIdeaStatus(ideaData, chesenStatus) {
    const { _id, status, variation } = ideaData

    switch (status) {
      case ideaStatusByKey[ideaStatus.NEW]:
        await IdeaModel.checkIdea(_id)
        this.loadData()
        break

      case ideaStatusByKey[ideaStatus.ON_CHECK]:
        await IdeaModel.changeStatusToSupplierSearchIdea(_id)
        this.loadData()
        break

      case ideaStatusByKey[ideaStatus.SUPPLIER_SEARCH]:
        if (chesenStatus === ideaStatusByKey[ideaStatus.SUPPLIER_FOUND]) {
          await IdeaModel.changeStatusToSupplierFound(_id)
        } else {
          await IdeaModel.changeStatusToSupplierNotFound(_id)
        }

        runInAction(() => {
          this.curIdea = undefined
        })
        this.loadData()
        break

      case ideaStatusByKey[ideaStatus.SUPPLIER_FOUND]:
        if (variation) {
          await IdeaModel.changeStatusToProductCreating(_id)
        } else {
          await IdeaModel.changeStatusToAddingAsin(_id)
          if (this.productId) {
            ProductModel.addSuppliersToProduct(
              this.productId,
              ideaData?.suppliers?.map(supplier => supplier._id),
            )
          }
        }
        this.loadData()
        break

      case ideaStatusByKey[ideaStatus.CARD_CREATING]:
        await IdeaModel.changeStatusToAddingAsin(_id)
        this.loadData()
        break

      case ideaStatusByKey[ideaStatus.ADDING_ASIN]:
        await IdeaModel.changeStatusToFinished(_id)
        this.loadData()
        break
    }
  }

  onClickAcceptButton(ideaData, chesenStatus) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onClickConfirm: async () => {
        await this.changeIdeaStatus(ideaData, chesenStatus)
        this.updateData?.()
        this.onTriggerOpenModal('showConfirmModal')
        toast.success(t(TranslationKey['Idea status changed successfully']))
      },
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  onUpdateCurrentIdea() {
    if (this.currentIdeaId) {
      this.getIdea(this.currentIdeaId)
      this.updateData?.()
    }
  }

  async onSubmitRejectOrRemoveIdea(ideaId, close) {
    try {
      if (close) {
        await IdeaModel.setStatusToClosed(ideaId)
      } else {
        await IdeaModel.rejectIdea(ideaId)
      }
      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickCloseIdea(ideaId) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmMessage:
        t(TranslationKey['Are you sure you want to close this idea?']) +
        '\n' +
        t(TranslationKey['Once confirmed, the idea will be closed without reopening']),
      onClickConfirm: () => this.onSubmitRejectOrRemoveIdea(ideaId, true),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRejectButton(ideaId) {
    this.ideaForReject = ideaId
    this.onTriggerOpenModal('showCommentsModal')
  }

  async setRejectStatusHandler(reasonReject) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      IdeaModel.setStatusToReject(this.ideaForReject, { reasonReject })

      this.loadData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onClickReoperButton(ideaId) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmMessage: `${t(TranslationKey['Are you sure you want to restore the idea'])}`,
      onClickConfirm: () => {
        this.reopenIdeaHandler(ideaId)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  async reopenIdeaHandler(ideaId) {
    await IdeaModel.reopenIdea(ideaId)
    this.loadData()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepers = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveSupplierBtn(supplierCardId, ideaId) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      if (ideaId) {
        await IdeaModel.addSuppliersToIdea(ideaId, {
          supplierCardIds: [supplierCardId],
        })
      }

      await this.getIdea(ideaId)
      this.getIdeas()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onRemoveSupplier(supplierId, itemId) {
    try {
      await IdeaModel.removeSupplierFromIdea(itemId, { suppliersId: supplierId })

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickToOrder(idea) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const destinations = await ClientModel.getDestinations()

      const result = await ProductModel.getProductById(idea.childProduct?._id || this.productId)

      runInAction(() => {
        this.productToOrder = result
        this.destinations = destinations
      })

      this.onTriggerOpenModal('showOrderModal')
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, { barCode: this.uploadedFiles[0] })

    this.loadData()

    this.onTriggerOpenModal('showSetBarcodeModal')
    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  setSelectedProduct(item) {
    this.selectedProduct = item
  }

  onConfirmSubmitOrderProductModal({ ordersDataState, totalOrdersCost }) {
    this.ordersDataStateToSubmit = ordersDataState

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onClickConfirm: () => this.onSubmitOrderProductModal(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      runInAction(() => {
        this.error = undefined
      })
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const orderObject = this.ordersDataStateToSubmit[i]

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        await this.createOrder(orderObject)
      }

      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async createOrder(orderObject) {
    try {
      const requestData = getObjectFilteredByKeyArrayWhiteList(orderObject, createOrderRequestWhiteList)

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }
    } catch (error) {
      console.error(error)

      runInAction(() => {
        this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
      })
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  onClickRequestId(id) {
    const win = window.open(
      `/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/custom-request?request-id=${id}`,
      '_blank',
    )

    win.focus()
  }

  onClickOpenProduct(id) {
    const userRole = UserRoleCodeMap[this.userInfo?.role]
    const userRolePath = UserRoleCodeMapForRoutes[this.userInfo?.role]

    if (checkIsClient(userRole)) {
      window.open(`/${userRolePath}/inventory/product?product-id=${id}`)?.focus()
    } else if (checkIsBuyer(userRole)) {
      window.open(`/${userRolePath}/my-products/product?product-id=${id}`)?.focus()
    } else if (checkIsSupervisor(userRole)) {
      window.open(`/${userRolePath}/products/product?product-id=${id}`)?.focus()
    }
  }

  async onSubmitCalculateSeekSupplier(clientComment) {
    try {
      const result = await ClientModel.calculatePriceToSeekSupplier(this.productId)

      const priceForSeekSupplier = result.priceForClient

      runInAction(() => {
        this.confirmMessage = this.confirmModalSettings = {
          isWarning: false,
          confirmTitle: t(TranslationKey.Attention),
          confirmMessage: `${t(TranslationKey['The cost of the supplier search service will be'])} $${toFixed(
            result.priceForClient,
            2,
          )}.\n ${t(TranslationKey['Apply?'])}`,
          onClickConfirm: () => this.onSubmitSeekSupplier(clientComment, priceForSeekSupplier),
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitSeekSupplier(clientComment, priceForSeekSupplier) {
    try {
      await ClientModel.sendProductToSeekSupplier(this.productId, {
        clientComment,
        priceForClient: priceForSeekSupplier,
      })

      this.loadData()
    } catch (error) {
      console.error(error)
    } finally {
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionSupplierModal')
    }
  }
}
