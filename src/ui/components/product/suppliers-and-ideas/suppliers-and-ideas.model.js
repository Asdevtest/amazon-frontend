import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'
import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status.ts'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { IdeaCreate, IdeaPatch, creatSupplier, createProductByClient, patchSuppliers } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { IdeaModel } from '@models/ideas-model'
import { ProductModel } from '@models/product-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { checkIsBuyer, checkIsClient, checkIsSupervisor, checkIsValidProposalStatusToShowResoult } from '@utils/checks'
import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class SuppliersAndIdeasModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  currentIdeaId = undefined

  curIdea = undefined
  ideaForReject = undefined
  ideaIdToCreateSupplier = undefined
  currentProduct = undefined
  productToOrder = undefined
  currentProposal = undefined
  currentRequest = undefined
  requestTypeTask = undefined
  requestsForProduct = []

  productId = undefined
  updateData = undefined

  inCreate = false
  isCreateModal = false
  inEdit = false
  ideasData = []
  ideaIdToRemove = undefined

  currentData = undefined

  selectedSupplier = undefined
  supplierData = undefined

  dataToCreateProduct = undefined

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  successModalTitle = ''

  forceUpdateCallBack = undefined

  readyFiles = []
  progressValue = 0
  showProgress = false
  paymentMethods = []

  isCreate = false

  showConfirmModal = false
  showSuccessModal = false
  showAddOrEditSupplierModal = false
  supplierModalReadOnly = false

  showRequestDesignerResultModal = false
  showRequestStandartResultModal = false
  showRequestBloggerResultModal = false
  showSupplierApproximateCalculationsModal = false
  showBindingModal = false
  showOrderModal = false
  showSetBarcodeModal = false
  showSelectionSupplierModal = false
  showCommentsModal = false

  storekeepersData = []

  selectedProduct = undefined
  storekeepers = []
  destinations = []
  platformSettings = undefined
  ordersDataStateToSubmit = undefined

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  successModalSettings = {
    modalTitle: '',
    onClickSuccessBtn: () => {},
  }

  get curUser() {
    return UserModel.userInfo
  }

  get languageTag() {
    return SettingsModel.languageTag
  }

  constructor({ history, productId, product, isModalView, currentIdeaId, isCreate, closeModalHandler, updateData }) {
    this.history = history
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

    reaction(
      () => this.ideasData,
      () => (this.currentData = this.getCurrentData()),
    )

    reaction(
      () => this.languageTag,
      () => (this.currentData = this.getCurrentData()),
    )
  }

  getCurrentData() {
    return this.ideasData?.sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
  }

  async loadData() {
    try {
      if (!this.isCreateModal) {
        const response = await UserModel.getPlatformSettings()

        runInAction(() => {
          this.platformSettings = response
        })

        if (this.isModalView && this.currentIdeaId) {
          await this.getIdea(this.currentIdeaId)
          if (this.updateData) {
            this.updateData()
          }
        } else {
          await this.getIdeas()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async onClickOpenNewTab(productId, ideaId) {
    const userRole = UserRoleCodeMap[this.curUser?.role]
    window
      .open(
        `${
          checkIsClient(userRole) ? '/client/inventory' : checkIsBuyer(userRole) ? '/buyer/my-products' : userRole
        }/product?product-id=${productId}&show-tab=ideas&ideaId=${ideaId}`,
        '_blank',
      )
      .focus()
  }

  async getIdeas() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await IdeaModel.getIdeas(this.productId)

      runInAction(() => {
        this.ideasData = result
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async getIdea(ideaId) {
    try {
      const response = await IdeaModel.getIdeaById(ideaId)

      runInAction(() => {
        this.curIdea = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createIdea(data, isForceUpdate) {
    try {
      const res = await IdeaModel.createIdea({ ...data, price: data.price || 0, quantity: data.quantity || 0 })

      if (!isForceUpdate) {
        runInAction(() => {
          this.successModalSettings = {
            modalTitle: t(TranslationKey['Idea created']),
            onClickSuccessBtn: () => {
              if (this.isModalView) {
                this.closeModalHandler()
              } else {
                this.onTriggerOpenModal('showSuccessModal')
              }
              this.updateData()
            },
          }
        })

        this.onTriggerOpenModal('showSuccessModal')
      }

      return res.guid
    } catch (error) {
      console.log(error)
    }
  }

  async editIdea(id, data, isForceUpdate) {
    try {
      await IdeaModel.editIdea(id, data)

      if (!isForceUpdate) {
        runInAction(() => {
          this.successModalSettings = {
            modalTitle: t(TranslationKey['Idea edited']),
            onClickSuccessBtn: () => this.onTriggerOpenModal('showSuccessModal'),
          }
        })

        this.onTriggerOpenModal('showSuccessModal')
      }
    } catch (error) {
      console.log(error)
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
    this.selectedSupplier = undefined
  }

  onEditIdea(idea) {
    this.getIdea(idea?._id)
    this.inEdit = true
    this.selectedSupplier = undefined
  }

  onClickCancelBtn() {
    this.inCreate = false
    this.inEdit = false
    this.selectedSupplier = undefined

    if (this.isModalView) {
      this.closeModalHandler()
    }
  }

  async onClickSaveBtn(formFields, files, isForceUpdate) {
    try {
      runInAction(() => {
        this.readyFiles = []
      })

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

        this.loadData()
      }

      if (isForceUpdate) {
        runInAction(() => {
          this.inCreate = false
          this.inEdit = true
        })
      } else {
        runInAction(() => {
          this.inCreate = false
          this.inEdit = false
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSaveIcon(formFields, isForceUpdate) {
    try {
      const submitDataWhite = getObjectFilteredByKeyArrayWhiteList(
        {
          ...formFields,
        },
        ['status'],
      )

      await this.editIdea(formFields._id, submitDataWhite, isForceUpdate)

      this.loadData()
    } catch (error) {
      console.log(error)
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

      runInAction(() => {
        this.successModalSettings = {
          modalTitle: t(TranslationKey['Product added']),
          onClickSuccessBtn: () => this.onTriggerOpenModal('showSuccessModal'),
        }
      })

      this.onTriggerOpenModal('showSuccessModal')

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
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
        this.onTriggerOpenModal('showRequestStandartResultModal')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async onClickCreateRequestButton(ideaData) {
    const isCreateByChildProduct = ideaData?.status >= ideaStatusByKey[ideaStatus.ADDING_ASIN] && ideaData?.childProduct

    const win = window.open(
      `/${UserRoleCodeMapForRoutes[this.curUser.role]}/freelance/my-requests/create-request?parentProduct=${
        isCreateByChildProduct ? ideaData?.childProduct?._id : this.currentProduct?._id
      }&asin=${isCreateByChildProduct ? ideaData?.childProduct?.asin : this.currentProduct?.asin}`,
      '_blank',
    )

    win.focus()
  }

  async onClickBindButton(requests) {
    const methodBody =
      this.curIdea.status === ideaStatusByKey[ideaStatus.NEW] ||
      this.curIdea.status === ideaStatusByKey[ideaStatus.ON_CHECK]
        ? { onCheckedIdeaId: this.curIdea._id }
        : { onFinishedIdeaId: this.curIdea._id }

    for (const request of requests) {
      try {
        await RequestModel.bindIdeaToRequest(request, methodBody)
      } catch (error) {
        console.error('error', error)
      }
    }

    this.getIdea(this.curIdea._id)
    this.onTriggerOpenModal('showBindingModal')
    this.loadData()
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

  async onClickLinkRequestButton(idea) {
    try {
      const result = await RequestModel.getRequestsByProductLight({
        guid: this.productId,
        status: 'DRAFT, PUBLISHED, IN_PROCESS',
        excludeIdeaId: idea._id,
      })

      runInAction(() => {
        this.requestsForProduct = addIdDataConverter(result)
      })

      this.onTriggerOpenModal('showBindingModal')

      this.loadData()
    } catch (error) {
      console.log(error)
    }
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
      onClickConfirm: () => {
        this.changeIdeaStatus(ideaData, chesenStatus)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }
    this.onTriggerOpenModal('showConfirmModal')
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
      console.log(error)
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
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      IdeaModel.setStatusToReject(this.ideaForReject, { reasonReject })

      this.loadData()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log('error', error)
    }
  }

  async onClickReoperButton(ideaId) {
    await IdeaModel.reopenIdea(ideaId)
    this.loadData()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        runInAction(() => {
          this.selectedSupplier = undefined
          this.supplierData = undefined
        })
      } else {
        await this.getSupplier()
        await this.getPlatformSettings()
      }

      runInAction(() => {
        this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getPlatformSettings() {
    try {
      const result = await UserModel.getPlatformSettings()
      runInAction(() => {
        this.yuanToDollarRate = result.yuanToDollarRate
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getSupplier() {
    try {
      if (this.selectedSupplier?._id) {
        const supplier = await SupplierModel.getSupplier(this.selectedSupplier?._id)

        runInAction(() => {
          this.supplierData = supplier
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepersData = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSupplierApproximateCalculations() {
    try {
      await this.getSupplier()
      await this.getPlatformSettings()
      await this.getStorekeepers()

      this.onTriggerOpenModal('showSupplierApproximateCalculationsModal')
    } catch (error) {
      console.log(error)
    }
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }

  async onClickSupplierButtons(actionType, callBack, ideaIdToCreateSupplier) {
    runInAction(() => {
      this.ideaIdToCreateSupplier = ideaIdToCreateSupplier
    })

    if (callBack) {
      runInAction(() => {
        this.forceUpdateCallBack = callBack
      })
    }

    this.getSuppliersPaymentMethods()
    await this.getStorekeepersData()
    await this.getIdea(ideaIdToCreateSupplier)

    switch (actionType) {
      case 'add':
        runInAction(() => {
          this.selectedSupplier = undefined
          this.supplierModalReadOnly = false
        })

        this.onTriggerAddOrEditSupplierModal()
        break
      case 'view':
        this.supplierModalReadOnly = true

        this.onTriggerAddOrEditSupplierModal()
        break
      case 'edit':
        runInAction(() => {
          this.supplierModalReadOnly = false
        })

        this.onTriggerAddOrEditSupplierModal()
        break

      case 'delete':
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: true,
            confirmMessage: t(TranslationKey['Are you sure you want to remove the supplier?']),
            onClickConfirm: () => this.onRemoveSupplier(),
          }
        })
        this.onTriggerOpenModal('showConfirmModal')
        break
    }
  }

  async onClickSaveSupplierBtn({ supplier, photosOfSupplier }) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      runInAction(() => {
        this.readyImages = []
      })

      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, { images: photosOfSupplier, type: 'readyImages' })
      }

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',

        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: supplier.images.concat(this.readyImages),
      }

      if (this.forceUpdateCallBack && this.inCreate) {
        await this.forceUpdateCallBack()

        runInAction(() => {
          this.inCreate = undefined
        })
      }

      if (supplier?._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(
          supplier,
          patchSuppliers,
          undefined,
          undefined,
          true,
        )
        await SupplierModel.updateSupplier(supplier?._id, supplierUpdateData)
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)

        await IdeaModel.addSuppliersToIdea(this.curIdea?._id || this.ideaIdToCreateSupplier, {
          suppliersIds: [createSupplierResult?.guid],
        })
      }

      if (this.curIdea?._id) {
        this.getIdea(this.curIdea?._id)
      } else {
        this.loadData()
      }

      this.setRequestStatus(loadingStatuses.SUCCESS)
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async onRemoveSupplier() {
    try {
      if (this.forceUpdateCallBack) {
        await this.forceUpdateCallBack()
      }
      await IdeaModel.removeSupplierFromIdea(this.curIdea._id, { suppliersId: this.selectedSupplier._id })

      runInAction(() => {
        this.curIdea = undefined
        this.selectedSupplier = undefined
      })

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async onClickToOrder(idea) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      const [destinations, platformSettings] = await Promise.all([
        ClientModel.getDestinations(),
        UserModel.getPlatformSettings(),
      ])
      this.getStorekeepersData()

      const result = await ProductModel.getProductById(idea.childProduct?._id || this.productId)

      runInAction(() => {
        this.productToOrder = result
        this.destinations = destinations
        this.platformSettings = platformSettings
      })

      this.onTriggerOpenModal('showOrderModal')
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    runInAction(() => {
      this.uploadedFiles = []
    })

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
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      runInAction(() => {
        this.error = undefined
      })
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const orderObject = this.ordersDataStateToSubmit[i]

        runInAction(() => {
          this.uploadedFiles = []
        })

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        await this.createOrder(orderObject)
      }

      if (!this.error) {
        runInAction(() => {
          this.alertShieldSettings = {
            showAlertShield: true,
            alertShieldMessage: t(TranslationKey['The order has been created']),
          }

          setTimeout(() => {
            this.alertShieldSettings = {
              ...this.alertShieldSettings,
              showAlertShield: false,
            }
            setTimeout(() => {
              this.alertShieldSettings = {
                showAlertShield: false,
                alertShieldMessage: '',
              }
            }, 1000)
          }, 3000)
        })
      }
      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async createOrder(orderObject) {
    try {
      const requestData = getObjectFilteredByKeyArrayBlackList(orderObject, [
        'barCode',
        'tmpBarCode',
        'tmpIsPendingOrder',
        '_id',
      ])

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
        this.error = error
      })
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  onClickRequestId(id) {
    const win = window.open(
      `/${UserRoleCodeMapForRoutes[this.curUser.role]}/freelance/my-requests/custom-request?request-id=${id}`,
      '_blank',
    )

    win.focus()
  }

  onClickOpenProduct(id) {
    const userRole = UserRoleCodeMap[this.curUser?.role]
    const userRolePath = UserRoleCodeMapForRoutes[this.curUser?.role]

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
      console.log(error)
    }
  }

  async onSubmitSeekSupplier(clientComment, priceForSeekSupplier) {
    try {
      await ClientModel.sendProductToSeekSupplier(this.productId, {
        clientComment,
        priceForClient: priceForSeekSupplier,
      })

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionSupplierModal')
    } catch (error) {
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionSupplierModal')
      console.log(error)
    }
  }

  async getStorekeepersData() {
    try {
      const response = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepers = response
      })
    } catch (error) {
      console.log(error)
    }
  }
}
