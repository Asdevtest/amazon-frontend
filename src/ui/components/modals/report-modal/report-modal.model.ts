import dayjs from 'dayjs'
import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { v4 as uuid } from 'uuid'

import { ClientModel } from '@models/client-model'

import { Launches } from '@typings/enums/launches'
import { loadingStatus } from '@typings/enums/loading-status'
import { IListingLaunch, IListingReport } from '@typings/models/clients/listing-report'
import { IProduct } from '@typings/models/products/product'
import { IRequest } from '@typings/models/requests/request'
import { IGridColumn } from '@typings/shared/grid-column'
import { ILaunch } from '@typings/shared/launch'

import { reportModalColumns } from './report-modal.columns'
import { launchOptions } from './report-modal.config'
import {
  ChangeCommentCellValueType,
  ChangeDateCellValueType,
  ChangeNumberCellValueType,
  ILaunchOption,
  IReportModalModelProps,
  IRequestWithLaunch,
  ReportModalColumnsProps,
} from './report-modal.type'

export class ReportModalModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  product?: IProduct
  reportId?: string = undefined
  newProductPrice = 0
  description = ''
  listingLaunches: IListingLaunch[] = []
  selectLaunchValue: Launches | null = null
  requests: IRequestWithLaunch[] = []
  columnsProps: ReportModalColumnsProps = {
    onChangeNumberCellValue: (id: string, field: keyof IListingLaunch) => this.onChangeNumberCellValue(id, field),
    onChangeCommentCellValue: (id: string, field: keyof IListingLaunch) => this.onChangeCommentCellValue(id, field),
    onChangeDateCellValue: (id: string, field: keyof IListingLaunch) => this.onChangeDateCellValue(id, field),
    onAddRequest: (launch: ILaunch, request?: IRequest) => this.onAddRequest(launch, request),
    onRemoveLaunch: (id: string) => this.onRemoveLaunch(id),
    product: undefined,
  }
  columnsModel: IGridColumn[] = []

  get launches() {
    return this.listingLaunches
  }
  get launchOptions(): ILaunchOption[] {
    return launchOptions.filter(({ value }) => !this.listingLaunches.some(({ type }) => type === value))
  }
  get disabledSaveButton() {
    return (
      this.description.trim().length === 0 ||
      this.listingLaunches.some(
        launch =>
          launch.value === 0 ||
          launch.comment.trim().length === 0 ||
          launch.dateFrom === null ||
          launch.dateTo === null,
      )
    )
  }

  constructor({ product, reportId }: IReportModalModelProps) {
    this.reportId = reportId
    this.product = product
    this.columnsProps.product = product
    this.columnsModel = reportModalColumns(this.columnsProps)

    this.getListingReportById()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  getListingReportById = async () => {
    try {
      if (this.reportId) {
        this.setRequestStatus(loadingStatus.IS_LOADING)

        const reponse = (await ClientModel.getListingReportById(this.reportId)) as unknown as IListingReport

        runInAction(() => {
          this.product = reponse.product
          this.description = reponse.description
          this.newProductPrice = reponse.newProductPrice
          this.listingLaunches = reponse.listingLaunches
        })

        this.setRequestStatus(loadingStatus.SUCCESS)
      }
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  createListingReport = async () => {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const removedIdToListingLaunches = this.listingLaunches.map(({ _id, expired, ...restProps }) => restProps)
      const generatedListingReport = {
        productId: this.product?._id,
        newProductPrice: this.newProductPrice,
        description: this.description,
        listingLaunches: removedIdToListingLaunches,
      }

      await ClientModel.createListingReport(generatedListingReport)

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  updateListingReport = async () => {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const removedIdToListingLaunches = this.listingLaunches.map(
        ({ expired, updatedAt, createdAt, request, ...restProps }) => restProps,
      )
      const generatedListingReport = {
        newProductPrice: this.newProductPrice,
        description: this.description,
        listingLaunches: removedIdToListingLaunches,
      }

      await ClientModel.updateListingReport(this.reportId, generatedListingReport)

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
        _id: uuid(), // needed to render elements in the table - only when adding a launch
        type: value,
        value: 0,
        dateFrom: null,
        dateTo: null,
        comment: '',
        requestId: null,
        result: '',
        expired: false, // needed to control the disabled state of the field result - only when adding a launch
      }
      this.listingLaunches = [...this.listingLaunches, generatedListingLaunch]
      this.selectLaunchValue = null
    }
  }

  findLaunchIndex = (id: string) => {
    return this.listingLaunches.findIndex(el => el._id === id)
  }

  onChangeNumberCellValue: ChangeNumberCellValueType = (id, field) => event => {
    const foundLaunchIndex = this.findLaunchIndex(id)

    if (foundLaunchIndex !== -1 && field === 'value') {
      const updatedLaunches = [...this.listingLaunches]

      runInAction(() => {
        updatedLaunches[foundLaunchIndex][field] = Number(event)
        this.listingLaunches = updatedLaunches
      })
    }
  }

  onChangeCommentCellValue: ChangeCommentCellValueType = (id, field) => event => {
    const foundLaunchIndex = this.findLaunchIndex(id)

    if (foundLaunchIndex !== -1 && (field === 'comment' || field === 'result')) {
      const updatedLaunches = [...this.listingLaunches]

      runInAction(() => {
        updatedLaunches[foundLaunchIndex][field] = event.target.value
        this.listingLaunches = updatedLaunches
      })
    }
  }

  onChangeDateCellValue: ChangeDateCellValueType = (id, field) => dates => {
    const foundLaunchIndex = this.findLaunchIndex(id)

    if (foundLaunchIndex !== -1 && (field === 'dateFrom' || field === 'dateTo')) {
      const transformedDatesToISOString = [
        dates?.[0] ? dayjs(dates?.[0]).toISOString() : null,
        dates?.[1] ? dayjs(dates?.[1]).toISOString() : null,
      ]
      const updatedLaunches = [...this.listingLaunches]

      runInAction(() => {
        updatedLaunches[foundLaunchIndex].dateFrom = transformedDatesToISOString[0]
        updatedLaunches[foundLaunchIndex].dateTo = transformedDatesToISOString[1]
        this.listingLaunches = updatedLaunches
      })
    }
  }

  onAddRequest = (selectedlaunch: ILaunch, request?: IRequest) => {
    if (request) {
      const existingRequestIndex = this.requests.findIndex(el => el.launch.type === selectedlaunch.type)

      const generatedRequest = {
        ...request,
        launch: selectedlaunch,
      }

      if (existingRequestIndex !== -1) {
        this.requests.splice(existingRequestIndex, 1, generatedRequest)
      } else {
        this.requests.push(generatedRequest)
      }

      const existingLaunchIndex = this.launches.findIndex(el => el.type === selectedlaunch.type)

      if (existingLaunchIndex !== -1) {
        const generatedLaunch = {
          ...this.launches[existingLaunchIndex],
          requestId: request._id,
        }

        this.launches.splice(existingLaunchIndex, 1, generatedLaunch)
      }
    }
  }

  onRemoveRequest = (id: string) => {
    this.requests = this.requests.filter(el => el._id !== id)
  }

  onRemoveLaunch = (id: string) => {
    this.listingLaunches = this.listingLaunches.filter(el => el._id !== id)
  }

  setRequestStatus(requestStatus: loadingStatus) {
    this.requestStatus = requestStatus
  }
}
