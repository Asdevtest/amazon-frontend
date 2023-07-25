/* eslint-disable no-unused-vars */
import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { IdeaPatch, creatSupplier, patchIdea, patchSuppliers } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { IdeaModel } from '@models/ideas-model'
import { ProductModel } from '@models/product-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class SuppliersAndIdeasModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  curIdea = undefined
  currentProduct = undefined

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

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  get curUser() {
    return UserModel.userInfo
  }

  constructor({ history, productId, product }) {
    this.history = history
    this.productId = productId
    this.currentProduct = product

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getIdeas()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getIdeas() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await IdeaModel.getIdeas(this.productId)

      runInAction(() => {
        this.ideasData = [...result.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))]
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

  async rejectIdea(id) {
    try {
      await IdeaModel.rejectIdea(id)
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
    this.curIdea = undefined
    this.selectedSupplier = undefined
  }

  async onClickSaveBtn(formFields, files, isForceUpdate) {
    try {
      this.readyFiles = []

      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'readyFiles' })
      }

      const submitData = getObjectFilteredByKeyArrayWhiteList(
        {
          ...formFields,
          media: this.readyFiles.length ? [...formFields.media, ...this.readyFiles] : formFields.media,
          price: formFields.price || 0,
          quantity: Math.floor(formFields.quantity) || 0,
        },
        IdeaPatch,
      )

      if (this.inEdit) {
        await this.editIdea(formFields._id, submitData, isForceUpdate)
      } else {
        const createdIdeaId = await this.createIdea({ ...submitData, productId: this.productId }, isForceUpdate)

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

  async onSubmitCreateProduct() {
    try {
      const createData = {
        images: this.dataToCreateProduct.media,
        amazonTitle: this.dataToCreateProduct.productName,
        amazon: this.dataToCreateProduct.price || 0,
        width: this.dataToCreateProduct.width || 0,
        height: this.dataToCreateProduct.height || 0,
        length: this.dataToCreateProduct.length || 0,
        asin: '',

        lamazon: this.dataToCreateProduct.productLinks[0],
        amazonDetail: this.dataToCreateProduct.criteria,
        clientComment: this.dataToCreateProduct.comments,

        ...(this.currentProduct.buyer?._id && { buyerId: this.currentProduct.buyer?._id }),
      }

      const result = await ClientModel.createProduct(createData)

      const suppliersIds = this.dataToCreateProduct.suppliers?.map(el => el._id)

      if (suppliersIds.length) {
        await ProductModel.addSuppliersToProduct(result.guid, suppliersIds)
      }

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
      onClickConfirm: () => this.onSubmitCreateProduct(),
    }

    this.dataToCreateProduct = data

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitRemoveIdea(ideaId) {
    try {
      await this.rejectIdea(ideaId)

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickCheckButton(ideaId) {
    try {
      await IdeaModel.checkIdea(ideaId)
      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  onClickRemoveIdea(ideaId) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmMessage: t(TranslationKey['Are you sure you want to reject this idea?']),
      onClickConfirm: () => this.onSubmitRemoveIdea(ideaId),
    }

    this.onTriggerOpenModal('showConfirmModal')
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
