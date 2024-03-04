import { IRequestMedia } from '@typings/models/requests/request-media'
import { UploadFileType } from '@typings/shared/upload-file'

export interface SlideshowGalleryModalProps {
  files: IRequestMedia[] | UploadFileType[]
  isOpenModal: boolean
  onOpenModal: () => void
  isEditable?: boolean
  currentFileIndex?: number
  withoutMakeMainImage?: boolean
  onCurrentFileIndex?: (index: number) => void
  onChangeImagesForLoad?: (files: IRequestMedia[] | UploadFileType[]) => void
}
