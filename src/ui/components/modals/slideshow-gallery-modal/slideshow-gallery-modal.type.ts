import { IMediaRequest, UploadFileType } from '@typings/shared/upload-file'

export interface SlideshowGalleryModalProps {
  files: IMediaRequest[] | UploadFileType[]
  isOpenModal: boolean
  onOpenModal: () => void
  currentFileIndex?: number
  isEditable?: boolean
  withoutMakeMainImage?: boolean
  onCurrentFileIndex?: (index: number) => void
  onChangeImagesForLoad?: (files: IMediaRequest[] | UploadFileType[]) => void
}
