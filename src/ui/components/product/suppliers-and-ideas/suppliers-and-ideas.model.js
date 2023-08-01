/* eslint-disable no-unused-vars */
import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { freelanceRequestType, freelanceRequestTypeByCode } from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { IdeaCreate, IdeaPatch, creatSupplier, patchSuppliers, createProductByClient } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { IdeaModel } from '@models/ideas-model'
import { ProductModel } from '@models/product-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'
import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status.ts'

export class SuppliersAndIdeasModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  currentIdeaId = undefined

  curIdea = undefined
  currentProduct = undefined
  currentProposal = undefined
  requestTypeTask = undefined
  requestsForProduct = []

  inCreate = false
  inEdit = false
  ideasData = []
  ideaIdToRemove = undefined

  selectedSupplier = undefined

  dataToCreateProduct = undefined

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  successModalTitle = ''

  forceUpdateCallBack = undefined

  readyFiles = []
  progressValue = 0
  showProgress = false
  paymentMethods = []

  showConfirmModal = false
  showSuccessModal = false
  showAddOrEditSupplierModal = false
  supplierModalReadOnly = false

  showRequestDesignerResultModal = false
  showRequestStandartResultModal = false
  showRequestBloggerResultModal = false
  showBindingModal = false

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  get curUser() {
    return UserModel.userInfo
  }

  constructor({ history, productId, product, isModalView, currentIdeaId, isCreate }) {
    this.history = history
    this.productId = productId
    this.currentProduct = product
    this.isModalView = isModalView
    this.currentIdeaId = currentIdeaId

    if (isCreate) {
      this.onCreateIdea()
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      if (this.isModalView && this.currentIdeaId) {
        await this.getIdea(this.currentIdeaId)
      } else {
        await this.getIdeas()
      }

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onClickOpenNewTab(id) {
    const win = window.open(`${window.location.origin}/client/inventory/product?product-id=${id}`, '_blank')

    win.focus()
  }

  async getIdeas() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await IdeaModel.getIdeas(this.productId)

      runInAction(() => {
        this.ideasData = result.sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getIdea(ideaId) {
    try {
      const result = await IdeaModel.getIdeaById(ideaId)

      runInAction(() => {
        this.curIdea = result
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  async createIdea(data, isForceUpdate) {
    try {
      const res = await IdeaModel.createIdea({ ...data, price: data.price || 0, quantity: data.quantity || 0 })

      if (!isForceUpdate) {
        this.successModalTitle = t(TranslationKey['Idea created'])

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
        this.successModalTitle = t(TranslationKey['Idea edited'])

        this.onTriggerOpenModal('showSuccessModal')
      }
    } catch (error) {
      console.log(error)
    }
  }

  onCreateIdea() {
    this.curIdea = undefined
    this.inCreate = true
  }

  onSetCurIdea(idea) {
    this.getIdea(idea?._id)
    this.inEdit = false
    this.selectedSupplier = undefined
  }

  onEditIdea(idea) {
    this.curIdea = idea
    this.inEdit = true
    this.selectedSupplier = undefined
  }

  onClickCancelBtn() {
    this.inCreate = false
    this.inEdit = false
    // this.curIdea = undefined
    this.selectedSupplier = undefined
  }

  async onClickSaveBtn(formFields, files, isForceUpdate) {
    try {
      this.readyFiles = []

      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'readyFiles' })
      }

      const submitData = {
        ...formFields,
        media: this.readyFiles.length ? [...formFields.media, ...this.readyFiles] : formFields.media,
        price: formFields.price || 0,
        quantity: Math.floor(formFields.quantity) || 0,
      }

      if (this.inEdit) {
        await this.editIdea(formFields._id, getObjectFilteredByKeyArrayWhiteList(submitData, IdeaPatch), isForceUpdate)
      } else {
        const createdIdeaId = await this.createIdea(
          getObjectFilteredByKeyArrayWhiteList(
            { ...submitData, productId: this.productId, parentProductId: this.productId },
            IdeaCreate,
          ),
          isForceUpdate,
        )

        const createdIdea = await IdeaModel.getIdeaById(createdIdeaId)

        this.curIdea = createdIdea
      }

      if (isForceUpdate) {
        this.inCreate = false
        this.inEdit = true
      } else {
        this.inCreate = false
        this.inEdit = false
        this.curIdea = undefined
      }

      this.loadData()
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
          asin: data?.parentProduct?.asin || '',
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
      await this.onClickAcceptButton(data)

      this.successModalTitle = t(TranslationKey['Product added'])
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

  async onClickResultButton(requestTypeTask, proposalId) {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustom(proposalId)

      runInAction(() => {
        this.currentProposal = result
      })

      if (freelanceRequestTypeByCode[requestTypeTask] === freelanceRequestType.DESIGNER) {
        this.onTriggerOpenModal('showRequestDesignerResultModal')
      } else if (freelanceRequestTypeByCode[requestTypeTask] === freelanceRequestType.BLOGGER) {
        this.onTriggerOpenModal('showRequestBloggerResultModal')
      } else {
        this.onTriggerOpenModal('showRequestStandartResultModal')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  async onClickCreateRequestButton() {
    this.history.push(`/${UserRoleCodeMapForRoutes[this.curUser.role]}/freelance/my-requests/create-request`, {
      parentProduct: { _id: this.currentProduct?._id, asin: this.currentProduct?.asin },
    })
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

    this.onTriggerOpenModal('showBindingModal')
  }

  async onClickLinkRequestButton() {
    try {
      const result = await RequestModel.getRequestsByProductLight(this.productId)
      this.requestsForProduct = addIdDataConverter(result)
      this.onTriggerOpenModal('showBindingModal')
    } catch (error) {
      console.log('error', error)
    }
  }

  async onClickAcceptButton(ideaData, chesenStatus) {
    const { _id, status, variant } = ideaData

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
        this.loadData()
        break

      case ideaStatusByKey[ideaStatus.SUPPLIER_FOUND]:
        if (variant) {
          await IdeaModel.changeStatusToProductCreating(_id)
        } else {
          await IdeaModel.changeStatusToAddingAsin(_id)
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

  async onSubmitRejectOrRemoveIdea(ideaId, close) {
    try {
      if (close) {
        await IdeaModel.removeIdea(ideaId)
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
      confirmMessage: t(TranslationKey['Are you sure you want to close this idea?']),
      onClickConfirm: () => this.onSubmitRejectOrRemoveIdea(ideaId, true),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRejectButton(ideaId) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmMessage: t(TranslationKey['Are you sure you want to reject this idea?']),
      onClickConfirm: () => this.onSubmitRejectOrRemoveIdea(ideaId),
    }
    this.onTriggerOpenModal('showConfirmModal')
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
    this.paymentMethods = await SupplierModel.getSuppliersPaymentMethods()
  }

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        this.selectedSupplier = undefined
      } else {
        const result = await UserModel.getPlatformSettings()

        this.yuanToDollarRate = result.yuanToDollarRate
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      }

      this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
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

  async onClickSupplierButtons(actionType, callBack) {
    if (callBack) {
      this.forceUpdateCallBack = callBack
    }
    this.getSuppliersPaymentMethods()

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
      this.setRequestStatus(loadingStatuses.isLoading)

      this.readyImages = []

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

      if (this.forceUpdateCallBack) {
        await this.forceUpdateCallBack()
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
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)

        await IdeaModel.addSuppliersToIdea(this.curIdea._id, { suppliersIds: [createSupplierResult.guid] })
      }

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onRemoveSupplier() {
    try {
      await IdeaModel.removeSupplierFromIdea(this.curIdea._id, { suppliersId: this.selectedSupplier._id })

      await SupplierModel.removeSupplier(this.selectedSupplier._id)

      this.onTriggerOpenModal('showConfirmModal')

      if (this.forceUpdateCallBack) {
        await this.forceUpdateCallBack()
      }

      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }
}
