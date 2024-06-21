import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { GridPaginationModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ProductModel } from '@models/product-model'
import { UserModel } from '@models/user-model'

import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'

import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { isBuyer, isClient } from '@typings/guards/roles'
import { IBox } from '@typings/models/boxes/box'
import { IFullUser } from '@typings/shared/full-user'
import { IHSCode } from '@typings/shared/hs-code'
import { UploadFileType } from '@typings/shared/upload-file'

import { ModalNames } from './boxes-to-order.type'

interface IOrderBoxSupplemented extends IBox {
  asin: string
  amazonTitle: string
  boxProductPreview: UploadFileType
  skuByClient: string
}

export class BoxesToOrderModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }

  order: IOrderWithAdditionalFields | undefined = undefined
  boxes: IOrderBoxSupplemented[] = []
  currentBox: IBox | undefined = undefined
  hsCodeData: IHSCode | undefined = undefined
  uploadedFiles: UploadFileType[] = []
  showBoxModal = false
  showEditHSCodeModal = false

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

  async getCurrentBox(id: string) {
    try {
      const box = await BoxesModel.getBoxById(id)

      runInAction(() => {
        this.currentBox = box as unknown as IBox
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onTriggerBoxModal(id: string) {
    try {
      await this.getCurrentBox(id)

      this.onToggleModal(ModalNames.BOX)
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitChangeBoxFields(box: IBox) {
    try {
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: box.trackNumberFile, type: 'uploadedFiles' })

      await BoxesModel.editAdditionalInfo(box._id, {
        ...(isClient(this.userInfo?.role) && {
          clientComment: box.clientComment,
          referenceId: box.referenceId,
          fbaNumber: box.fbaNumber,
          prepId: box.prepId,
          storage: box.storage,
        }),
        ...(isBuyer(this.userInfo?.role) && {
          trackNumberText: box.trackNumberText,
          trackNumberFile: this.uploadedFiles,
        }),
      })

      toast.success(t(TranslationKey['Data saved successfully']))

      this.getBoxesOfOrder()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickHsCode(id: string) {
    try {
      const response = await ProductModel.getProductsHsCodeByGuid(id) // type : {[key: string]:object}

      runInAction(() => {
        this.hsCodeData = response as unknown as IHSCode // fix a bug with response typing
      })

      this.onToggleModal(ModalNames.EDIT_HS_CODE)
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveHsCode(hsCodeData: IHSCode) {
    try {
      await ProductModel.editProductsHsCods([
        {
          productId: hsCodeData?._id,
          chinaTitle: hsCodeData?.chinaTitle || null,
          hsCode: hsCodeData?.hsCode || null,
          material: hsCodeData?.material || null,
          productUsage: hsCodeData?.productUsage || null,
        },
      ])

      this.onToggleModal(ModalNames.EDIT_HS_CODE)

      this.getBoxesOfOrder()
    } catch (error) {
      console.error(error)
    }
  }

  onToggleModal(modalName: ModalNames) {
    this[modalName] = !this[modalName]
  }
}
