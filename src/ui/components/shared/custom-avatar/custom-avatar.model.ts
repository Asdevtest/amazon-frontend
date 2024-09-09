import { UploadFile } from 'antd'
import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { avatarValidTypes } from '@constants/media/image-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { convertToBase64 } from '@utils/convert-to-base64'
import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

export class CustomAvatarModel {
  previewOpen = false
  previewImage: string | undefined = undefined
  loading = false
  fileList: UploadFile[] = []

  constructor(initialUrl?: string) {
    if (initialUrl) {
      this.fileList = [
        {
          uid: '-1',
          name: 'avatar.png',
          status: 'done',
          url: initialUrl,
        },
      ]
    }
    makeAutoObservable(this)
  }

  setPreviewOpen = (open: boolean) => {
    this.previewOpen = open
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }

  setFileList = (newFileList: UploadFile[]) => {
    this.fileList = newFileList
  }

  handlePreview = async (file: UploadFile) => {
    const imageSrc = file.url || file.preview
    if (!imageSrc) {
      const reader = new FileReader()
      reader.readAsDataURL(file.originFileObj as File)
      reader.onload = () => {
        this.previewImage = reader.result as string
        this.setPreviewOpen(true)
      }
    } else {
      this.previewImage = imageSrc
      this.setPreviewOpen(true)
    }
  }

  handleRemove = () => {
    this.fileList = []
    this.previewImage = undefined
    this.loading = false
  }

  handleChange = async (newFileList: UploadFile[], onSubmit?: (imageData: UploadFileType) => void) => {
    const lastFile = newFileList.slice(-1)[0]
    if (!lastFile) return

    if (lastFile.status === 'error') {
      this.setLoading(false)
      return
    }

    if (lastFile.originFileObj) {
      const file = lastFile.originFileObj as File
      const isFileTypeOk = avatarValidTypes.includes(file.type)

      if (!isFileTypeOk) {
        toast.warning(t(TranslationKey['Inappropriate format!']))
        return
      }

      this.setFileList(newFileList.slice(-1))
      this.setLoading(true)

      const base64String = await convertToBase64(file)
      onSubmit?.(base64String)

      this.setLoading(false)
    }
  }
}
