import { IUploadFile } from '@typings/shared/upload-file'

export const createUploadFile = (file: File): IUploadFile => ({
  data_url: URL.createObjectURL(file),
  file: new File([file], file?.name?.replace(/ /g, ''), {
    type: file?.type,
    lastModified: file?.lastModified,
  }),
})
