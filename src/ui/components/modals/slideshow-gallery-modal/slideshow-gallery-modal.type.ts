import { IMediaRequest, UploadFileType } from '@typings/upload-file'

export interface SlideshowGalleryModalProps {
  files: IMediaRequest[] | UploadFileType[]
  currentFileIndex: number
  isOpenModal: boolean
  onCurrentFileIndex: (index: number) => void
  onOpenModal: () => void
  isEditable?: boolean
  withoutMakeMainImage?: boolean
  onChangeImagesForLoad?: (files: IMediaRequest[] | UploadFileType[]) => void
}
