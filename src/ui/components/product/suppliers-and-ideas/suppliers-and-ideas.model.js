import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {ClientModel} from '@models/client-model'
import {IdeaModel} from '@models/ideas-model'
import {UserModel} from '@models/user-model'

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

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  get userRole() {
    return UserModel.userInfo?.role
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
      const result = await IdeaModel.getIdeas()

      this.ideasData = result
    } catch (error) {
      console.log(error)
    }
  }

  async createIdea(data) {
    try {
      await IdeaModel.createIdea(data)

      this.successModalTitle = t(TranslationKey['Idea created'])

      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      console.log(error)
    }
  }

  async editIdea(data) {
    try {
      await IdeaModel.editIdea(data)

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
        {...formFields, media: this.readyFiles.length ? this.readyFiles : formFields.media},
        ['_id'],
      )

      if (this.inEdit) {
        await this.editIdea(formFields._id, submitData)
      } else {
        await this.createIdea(submitData)
      }

      this.inCreate = false
      this.inEdit = false

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
        width: this.dataToCreateProduct.width,
        height: this.dataToCreateProduct.height,
        length: this.dataToCreateProduct.length,
        asin: '',
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
}
