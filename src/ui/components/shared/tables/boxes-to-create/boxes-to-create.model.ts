import { makeAutoObservable, runInAction } from 'mobx'

import { GridPaginationModel } from '@mui/x-data-grid'

import { BoxesModel } from '@models/boxes-model'
import { UserModel } from '@models/user-model'

import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'

import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

import { loadingStatus } from '@typings/enums/loading-status'
import { IBox } from '@typings/models/boxes/box'
import { IFullUser } from '@typings/shared/full-user'
import { UploadFileType } from '@typings/shared/upload-file'

interface IOrderBoxSupplemented extends IBox {
  asin: string
  amazonTitle: string
  boxProductPreview: UploadFileType
  skuByClient: string
}

export class BoxesToCreateModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }

  order: IOrderWithAdditionalFields | undefined = undefined
  boxes: IOrderBoxSupplemented[] = []
  currentBox: string = ''
  showBoxModal = false

  get userInfo(): IFullUser | undefined {
    return UserModel.userInfo
  }

  constructor(order: IOrderWithAdditionalFields) {
    this.order = order

    this.getBoxesOfOrder()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setRequestStatus(requestStatus: loadingStatus) {
    this.requestStatus = requestStatus
  }

  onPaginationModelChange(model: GridPaginationModel) {
    this.paginationModel = model
  }

  async getBoxesOfOrder() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const response = await BoxesModel.getBoxesOfOrder(this.order?._id)

      const transformedBoxes = response
        ?.map(box => ({
          ...box,
          asin: this.order?.product?.asin || '',
          boxProductPreview: this.order?.product?.images?.[0] || '',
          amazonTitle: this.order?.product?.amazonTitle || '',
          skuByClient: this.order?.product?.skuByClient || '',
        }))
        ?.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))

      runInAction(() => {
        this.boxes = transformedBoxes as unknown as IOrderBoxSupplemented[]
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }
}
