import { makeAutoObservable, runInAction } from 'mobx'

import { SupplierModel } from '@models/supplier-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { downloadFile } from '@utils/upload-files'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

export class ImportTemplateModalModel {
  files: UploadFileType[] = []

  isLoading = false

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setFiles(images: UploadFileType[]) {
    runInAction(() => {
      this.files = images
    })
  }

  async getTemplate() {
    try {
      this.setIsLoading(true)

      const response = await restApiService.supplierApi.apiV1SuppliersImportCardsPost(
        { supplierId: undefined, out: true },
        { responseType: 'blob' },
      )

      const blob = new Blob([response.data], { type: response.headers['content-type'] || 'application/octet-stream' })

      downloadFile(blob, 'import_products_template.xlsx')
    } catch (error) {
      console.error(error)
    } finally {
      this.setIsLoading(false)
    }
  }

  async uploadFiles(supplierId: string) {
    try {
      this.setIsLoading(true)

      const formData = new FormData()
      const currentFile = this.files?.[0]

      if (isString(currentFile)) {
        return
      }

      const fileWithoutSpaces = new File([currentFile.file], currentFile.file?.name.replace(/ /g, ''), {
        type: currentFile.file?.type || '',
        lastModified: currentFile.file?.lastModified,
      })

      formData.append('filename', fileWithoutSpaces)

      const response = await SupplierModel.importSupplierCards(
        {
          supplierId,
          out: undefined,
        },
        { data: formData },
      )

      return response
    } catch (error) {
      console.error(error)
    } finally {
      this.setIsLoading(false)
    }
  }

  setIsLoading(isLoading: boolean) {
    runInAction(() => {
      this.isLoading = isLoading
    })
  }
}
