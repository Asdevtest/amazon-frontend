import { Form, FormInstance } from 'antd'
import { makeObservable } from 'mobx'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { DefaultModel } from '@models/default-model'

import { FieldType } from '@views/shared/parsing-view/parsing-profile-view/parsing-profile-form/product-data-form.type'

import { UploadFileType } from '@typings/shared/upload-file'

import { observerConfig } from './observer.config'

export class AddSupplierModalModel extends DefaultModel {
  form: FormInstance | null = null

  constructor({ form }: { form?: FormInstance }) {
    super({ getMainDataMethod: () => console.log('call :>> ') })

    makeObservable(this, observerConfig)
  }

  handleUploadFiles = (images: UploadFileType[]) => {
    this.form?.setFieldValue('files', images)
  }
}
