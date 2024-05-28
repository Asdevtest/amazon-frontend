import { makeAutoObservable } from 'mobx'
import { ChangeEvent } from 'react'
import { v4 as uuid } from 'uuid'

import { ClientModel } from '@models/client-model'

import { Launches } from '@typings/enums/launches'
import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { reportModalColumns } from './report-modal.columns'
import { launchOptions } from './report-modal.config'
import { ChangeCellCommentValueType, ChangeCellValueType, ILaunchOption, IListingLaunch } from './report-modal.type'

export class ReportModalModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  productId?: string = undefined
  editMode = false
  newProductPrice = 0
  description = ''
  listingLaunches: IListingLaunch[] = []
  selectLaunchValue: Launches | null = null

  rowHandlers = {
    onChangeCellValue: (id: string, field: keyof IListingLaunch) => this.onChangeCellValue(id, field),
    onChangeCellCommentValue: (id: string, field: keyof IListingLaunch) => this.onChangeCellCommentValue(id, field),
  }
  columnsModel = reportModalColumns(this.rowHandlers)

  get launches() {
    return this.listingLaunches
  }
  get launchOptions(): ILaunchOption[] {
    return launchOptions.filter(({ value }) => !this.listingLaunches.some(({ type }) => type === value))
  }

  constructor(product: IProduct) {
    this.productId = product?._id
    this.getListingReportById()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  getListingReportById = async () => {
    try {
      await ClientModel.getListingReportById(this.productId)
    } catch (error) {
      console.error(error)
    }
  }

  createListingReport = async () => {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const generatedListingReport = {
        productId: this.productId,
        newProductPrice: this.newProductPrice,
        description: this.description,
        listingLaunches: this.listingLaunches,
      }

      await ClientModel.createListingReport(generatedListingReport)

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
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
        _id: uuid(),
        type: value,
        value: 0,
        dateFrom: '',
        dateTo: '',
        comment: '',
        requestId: null,
        // result: '',
      }
      this.listingLaunches = [...this.listingLaunches, generatedListingLaunch]
      this.selectLaunchValue = null
    }
  }

  onChangeCellValue: ChangeCellValueType = (id, field) => event => {
    const foundLaunchIndex = this.listingLaunches.findIndex(el => el._id === id)

    if (foundLaunchIndex !== -1 && field === 'value') {
      const updatedLaunches = [...this.listingLaunches]
      updatedLaunches[foundLaunchIndex][field] = Number(event)
      this.listingLaunches = updatedLaunches
    }
  }

  onChangeCellCommentValue: ChangeCellCommentValueType = (id, field) => event => {
    const foundLaunchIndex = this.listingLaunches.findIndex(el => el._id === id)

    if (foundLaunchIndex !== -1 && (field === 'comment' || field === 'result')) {
      const updatedLaunches = [...this.listingLaunches]
      updatedLaunches[foundLaunchIndex][field] = event.target.value
      this.listingLaunches = updatedLaunches
    }
  }

  setRequestStatus(requestStatus: loadingStatus) {
    this.requestStatus = requestStatus
  }
}
