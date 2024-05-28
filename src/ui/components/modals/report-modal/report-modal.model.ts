import { makeObservable } from 'mobx'
import { ChangeEvent } from 'react'

import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'

import { Launches } from '@typings/enums/launches'

import { reportModalColumns } from './report-modal.columns'
import { launchOptions, reportModalConfig } from './report-modal.config'
import { ILaunchOption, IListingLaunch } from './report-modal.type'

export class ReportModalModel extends DataGridTableModel {
  editMode = false
  newProductPrice = 0
  description = ''
  launchOptions: ILaunchOption[] = launchOptions || []
  listingLaunches: IListingLaunch[] = []
  selectLaunchValue: Launches | null = null

  get launches() {
    return this.listingLaunches
  }

  constructor(productId: string) {
    const columnsModel = reportModalColumns()
    const defaultGetCurrentDataOptions = () => ({
      guid: productId,
    })

    super({
      getMainDataMethod: ClientModel.getListingReportById,
      columnsModel,
      defaultGetCurrentDataOptions,
    })

    this.getCurrentData()

    makeObservable(this, reportModalConfig)
  }

  onChangeNewProductPrice = (value: string | number | null) => {
    this.newProductPrice = Number(value)
  }

  onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.description = event.target.value
  }

  onSelectLaunch = (value: Launches) => {
    if (value) {
      const generatedListingLaunch = {
        _id: new Date().toISOString(),
        type: value,
        value: 0,
        dateFrom: '',
        dateTo: '',
        comment: '',
        requestId: '',
      }
      this.listingLaunches = [...this.listingLaunches, generatedListingLaunch]
      this.selectLaunchValue = null
    }
  }

  onChangeCellValue = (rowindex: number, field: keyof IListingLaunch) => (event: ChangeEvent<HTMLInputElement>) => {
    if (field === 'value') {
      this.listingLaunches[rowindex][field] = Number(event.target.value)
    } else if (field === 'type') {
      return
    } else {
      this.listingLaunches[rowindex][field] = event.target.value
    }
  }
}
