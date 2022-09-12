import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {ClientModel} from '@models/client-model'
import {IdeaModel} from '@models/ideas-model'
import {UserModel} from '@models/user-model'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class SuppliersAndIdeasModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  curIdea = undefined

  inCreate = false
  inEdit = false
  ideasData = []
  ideaIdToRemove = undefined

  dataToCreateProduct = undefined

  successModalTitle = ''

  readyFiles = []
  progressValue = 0
  showProgress = false

  showConfirmModal = false
  showSuccessModal = false
  showAddOrEditSupplierModal = false

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  get curUser() {
    return UserModel.userInfo
  }

  constructor({history, productId}) {
    this.history = history

    this.productId = productId
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getIdeas()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getIdeas() {
    try {
      const result = await IdeaModel.getIdeas(this.productId)

      runInAction(() => {
        this.ideasData = [...result.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))]
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createIdea(data) {
    try {
      await IdeaModel.createIdea({...data, price: data.price || 0, quantity: data.quantity || 0})

      this.successModalTitle = t(TranslationKey['Idea created'])

      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      console.log(error)
    }
  }

  async editIdea(id, data) {
    try {
      await IdeaModel.editIdea(id, data)

      this.successModalTitle = t(TranslationKey['Idea edited'])

      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      console.log(error)
    }
  }

  async removeIdea(id) {
    try {
      await IdeaModel.removeIdea(id)
    } catch (error) {
      console.log(error)
    }
  }

  onCreateIdea() {
    this.curIdea = undefined

    this.inCreate = true
  }

  onSetCurIdea(idea) {
    this.curIdea = idea
    this.inEdit = false
  }

  onEditIdea(idea) {
    this.curIdea = idea
    this.inEdit = true
  }

  onClickCancelBtn() {
    this.inCreate = false
    this.inEdit = false
    this.curIdea = undefined
  }

  async onClickSaveBtn(formFields, files) {
    try {
      this.readyFiles = []

      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'readyFiles'})
      }

      const submitData = getObjectFilteredByKeyArrayBlackList(
        {
          ...formFields,
          media: this.readyFiles.length ? [...formFields.media, ...this.readyFiles] : formFields.media,
          price: formFields.price || 0,
          quantity: Math.floor(formFields.quantity) || 0,
        },
        ['_id', 'suppliers'],
      )

      if (this.inEdit) {
        await this.editIdea(formFields._id, submitData)
      } else {
        await this.createIdea({...submitData, productId: this.productId})
      }

      this.inCreate = false
      this.inEdit = false
      this.curIdea = undefined

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
        amazon: this.dataToCreateProduct.price,
        width: this.dataToCreateProduct.width || 0,
        height: this.dataToCreateProduct.height || 0,
        length: this.dataToCreateProduct.length || 0,
        asin: '',

        lamazon: this.dataToCreateProduct.productLinks[0],
        amazonDetail: this.dataToCreateProduct.criteria,
        clientComment: this.dataToCreateProduct.comments,
      }

      await ClientModel.createProduct(createData)

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

  async onSubmitRemoveIdea() {
    try {
      await this.removeIdea(this.ideaIdToRemove)

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  onClickRemoveIdea(ideaId) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmMessage: t(TranslationKey['Are you sure you want to remove the idea?']),
      onClickConfirm: () => this.onSubmitRemoveIdea(),
    }

    this.ideaIdToRemove = ideaId

    this.onTriggerOpenModal('showConfirmModal')
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async onClickSupplierButtons(actionType) {
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
            message: t(TranslationKey['Are you sure you want to remove the supplier?']),
            onClickOkBtn: () => this.onRemoveSupplier(),
          }
        })
        this.onTriggerOpenModal('showConfirmModal')
        break
    }
  }
  // async onRemoveSupplier() {
  //   try {
  //     await ProductModel.removeSuppliersFromProduct(this.product._id, [this.selectedSupplier._id])
  //     await SupplierModel.removeSupplier(this.selectedSupplier._id)
  //     this.setActionStatus(loadingStatuses.success)

  //     runInAction(() => {
  //       this.product.suppliers
  //       this.selectedSupplier = undefined
  //       if (this.product.currentSupplierId && this.product.currentSupplierId === this.selectedSupplier?._id) {
  //         this.product.currentSupplierId = undefined
  //       }
  //     })
  //     this.onSaveForceProductData()
  //   } catch (error) {
  //     console.log(error)
  //     if (error.body && error.body.message) {
  //       this.error = error.body.message
  //     }
  //   }
  // }
}
