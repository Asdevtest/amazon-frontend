import { UploadFile } from 'antd'
import { RcFile } from 'antd/es/upload/interface'
import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'

import { avatarValidTypes } from '@constants/media/image-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { convertToBase64 } from '@utils/convert-to-base64'
import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

export class CustomUploadAvatarModel {
  previewOpen = false
  previewImage: string = ''
  loading = false
  fileList: UploadFile[] = []

  constructor(initialUrl?: string) {
    if (initialUrl) {
      this.fileList = [
        {
          uid: uuid(),
          name: 'avatar.png',
          status: 'done',
          url: initialUrl,
        },
      ]
    }
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setPreviewOpen(open: boolean) {
    this.previewOpen = open
  }

  setLoading(loading: boolean) {
    this.loading = loading
  }

  setFileList(newFileList: UploadFile[]) {
    this.fileList = newFileList
  }

  async onPreviewImage(file: UploadFile) {
    if (!file.url && file.originFileObj) {
      const base64 = await convertToBase64(file.originFileObj)
      this.previewImage = base64
    } else {
      this.previewImage = file.url || file.preview || ''
    }
    this.setPreviewOpen(true)
  }

  onSaveImage(newFileList: File[]) {
    const file = newFileList[0]
    const isFileTypeOk = avatarValidTypes.includes(file.type)

    if (!isFileTypeOk) {
      toast.warning(t(TranslationKey['Inappropriate format!']))
      return
    }

    this.setFileList([
      { uid: uuid(), name: file.name, status: 'done', url: URL.createObjectURL(file), originFileObj: file as RcFile },
    ])
    this.setLoading(true)
    return false // prevent upload default actions
  }

  async onUploadImage(onSubmit?: (imageData: UploadFileType) => void) {
    if (this.fileList.length === 0 || !this.loading) return

    const file = this.fileList[0]

    const actualFile = file.originFileObj as File

    const base64String = await convertToBase64(actualFile)

    onSubmit?.(base64String)
    this.setLoading(false)
  }
}
