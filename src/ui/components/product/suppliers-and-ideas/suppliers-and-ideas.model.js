import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {IdeaModel} from '@models/ideas-model'
import {UserModel} from '@models/user-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

// const ideaMock = {
//   images: ['https://kak2c.ru/storage/app/uploads/public/60a/512/db8/60a512db87dd8883967020.jpg'],
//   title: 'Тестовая идея №1',
//   links: [
//     'https://amazonapi.fvds.ru/uploads/82e688c1-3546-4133-977a-623d0a49b6c6.6lWa9pt.jpg',
//     'https://amazonapi.fvds.ru/uploads/82e688c1-3546-4133-977a-623d0a49b6c6.6lWa9pt.jpg',
//   ],
//   comment: 'Комментарий к идее.',
//   name: 'Название нашего товара',
//   criterions: 'Список ажных критериев в свободной форме',
//   count: 42,
//   price: 10,
//   dimensions: '4x4x4',
//   suppliers: [
//     {
//       _id: 'd00bedcf-1fb4-4c82-a108-5d29c6c1bb55',
//       name: 'Ryzen 9 ADM',
//       link: 'https://www.amazon.com/AMD-Ryzen-5950X-32-Thread-Processor/dp/B0815Y8J9N/ref=rvi_sccl_19/133-2317579-7367240?pd_rd_w=xODX1&pf_rd_p=f5690a4d-f2bb-45d9-9d1b-736fee412437&pf_rd_r=48HD57BAQ9CG26RAYYQ8&pd_rd_r=969a33b2-82a7-4856-a63c-2675cb403c40&pd_rd_wg=cnsZw&pd_rd_i=B0815Y8J9N&psc=1',
//       price: 468.52,
//       amount: 44,
//       minlot: 22,
//       lotcost: 20644.16,
//       images: [
//         'https://amazonapi.fvds.ru/uploads/2db4bc16-9994-4bad-8230-42ac912bd86e.Поставщикотбайера.jpg',
//         'https://amazonapi.fvds.ru/uploads/c9d4d146-957c-4f4e-8540-46bfbb602bf8.Поставщикотбайера.jpg',
//       ],
//       comment: 'Комментарий про баера, без размеров',
//       yuanRate: 0,
//       priceInYuan: 3200,
//       batchDeliveryCostInDollar: 29.28,
//       batchDeliveryCostInYuan: 200,
//       batchTotalCostInDollar: 20644.16,
//       batchTotalCostInYuan: 141000,
//       boxProperties: {
//         amountInBox: 10,
//         boxLengthCm: 33,
//         boxWidthCm: 44,
//         boxHeightCm: 22,
//         boxWeighGrossKg: 3,
//       },
//     },
//   ],
//   _id: 'uniqId001',
// }

export class SuppliersAndIdeasModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  curIdea = undefined

  inCreate = false
  inEdit = false
  ideasData = []
  ideaIdToRemove = undefined

  progressValue = 0

  showConfirmModal = false

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  showSuccessModal = false
  showProgress = false
  tmpListingImages = []
  imagesToLoad = []

  get userRole() {
    return UserModel.userInfo?.role
  }

  constructor({history, productId}) {
    this.history = history

    this.productId = productId
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onSaveSubmit() {
    try {
      await onSubmitPostImages.call(this, {images: this.tmpListingImages, type: 'imagesToLoad'})

      // await this.onSaveProductData()

      this.tmpListingImages = new Array()

      this.loadData()

      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      this.error = error
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getIdeas()

      // setTimeout(() => (this.ideasData = [ideaMock]), 500)

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
    } catch (error) {
      console.log(error)
    }
  }

  async editIdea(data) {
    try {
      await IdeaModel.editIdea(data)
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

  async onClickSaveBtn(formFields) {
    try {
      if (this.inEdit) {
        // this.ideasData = this.ideasData.map(el => (el._id === formFields._id ? formFields : el))

        const editData = getObjectFilteredByKeyArrayBlackList(formFields, ['_id'])

        await this.editIdea(formFields._id, editData)
      } else {
        // this.ideasData = [...this.ideasData, {...formFields, _id: `${Date.now()}`}]

        const createData = getObjectFilteredByKeyArrayBlackList(formFields, ['_id'])

        await this.createIdea(createData)
      }

      this.inCreate = false
      this.inEdit = false

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  onSubmitRemoveIdea() {
    this.ideasData = this.ideasData.filter(el => el._id !== this.ideaIdToRemove)
    this.onTriggerOpenModal('showConfirmModal')
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
