import { BaseOptionType } from 'antd/es/select'
import dayjs from 'dayjs'
import { makeObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { t } from '@utils/translations'

import { Launches } from '@typings/enums/launches'
import { loadingStatus } from '@typings/enums/loading-status'
import { IListingLaunch, IListingReport } from '@typings/models/clients/listing-report'
import { IProduct } from '@typings/models/products/product'
import { IRequest } from '@typings/models/requests/request'
import { IGridColumn } from '@typings/shared/grid-column'
import { ILaunch } from '@typings/shared/launch'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { reportModalColumns } from './report-modal.columns'
import { excludedLaunches, launchOptions, reportModalConfig } from './report-modal.config'
import {
  ChangeCommentCellValueType,
  ChangeDateCellValueType,
  ChangeNumberCellValueType,
  ILaunchOption,
  IReportModalModelProps,
  IRequestWithLaunch,
  ReportModalColumnsProps,
} from './report-modal.type'

export class ReportModalModel extends UseProductsPermissions {
  requestTableStatus: loadingStatus = loadingStatus.SUCCESS
  product?: IProduct
  reportId?: string
  newProductPrice = 0
  description = ''
  listingLaunches: IListingLaunch[] = []
  launchOptions: ILaunchOption[] = launchOptions
  selectLaunchValue: Launches | null = null
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
  get disabledSaveButton() {
    return (
      this.requestTableStatus === loadingStatus.IS_LOADING ||
      !this.product?._id ||
      this.description.trim().length === 0 ||
      this.listingLaunches.some(
        launch =>
          (!excludedLaunches.includes(launch.type) && launch.value === 0) ||
          launch.dateFrom === null ||
          launch.dateTo === null,
      )
    )
  }
  get requests() {
    return this.listingLaunches
      ?.filter(({ request }) => request)
      .map(listingLaunch => ({
        ...listingLaunch.request,
        launch: listingLaunch,
      })) as IRequestWithLaunch[]
  }

  constructor({ reportId, defaultProduct }: IReportModalModelProps) {
    super(ClientModel.getProductPermissionsData)

    this.reportId = reportId
    this.updateProductAndColumns(defaultProduct)
    this.getListingReportById()

    /* if (defaultProduct) {
      this.onGetListingReportByProductId(defaultProduct._id)
    } */

    /* reaction(
      () => this.listingLaunches,
      () =>
        (this.launchOptions = launchOptions.filter(
          ({ value }) => !this.listingLaunches.some(({ type }) => type === value),
        )),
    ) */

    makeObservable(this, reportModalConfig)
  }

  getListingReportById = async () => {
    try {
      if (this.reportId) {
        this.setRequestTableStatus(loadingStatus.IS_LOADING)

        const response = (await ClientModel.getListingReportById(this.reportId)) as unknown as IListingReport

        runInAction(() => {
          this.updateProductAndColumns(response.product)
          this.description = response.description
          this.newProductPrice = response.newProductPrice
          this.listingLaunches = response.listingLaunches
        })

        this.setRequestTableStatus(loadingStatus.SUCCESS)
      }
    } catch (error) {
      console.error(error)
      this.setRequestTableStatus(loadingStatus.FAILED)
    }
  }

  createListingReport = async () => {
    try {
      this.setRequestTableStatus(loadingStatus.IS_LOADING)

      const removedIdToListingLaunches = this.listingLaunches.map(({ request, _id, ...restProps }) => restProps)
      const generatedListingReport = {
        productId: this.product?._id,
        newProductPrice: this.newProductPrice,
        description: this.description,
        listingLaunches: removedIdToListingLaunches,
      }

      await ClientModel.createListingReport(generatedListingReport)

      this.setRequestTableStatus(loadingStatus.SUCCESS)
      toast.success(t(TranslationKey['Data added successfully']))
    } catch (error) {
      console.error(error)
      this.setRequestTableStatus(loadingStatus.FAILED)
      toast.error(t(TranslationKey['Data not added']))
    }
  }

  updateListingReport = async () => {
    try {
      this.setRequestTableStatus(loadingStatus.IS_LOADING)

      const removedIdToListingLaunches = this.listingLaunches.map(
        ({ expired, updatedAt, createdAt, request, _id, ...restProps }) => restProps,
      )
      const generatedListingReport = {
        newProductPrice: this.newProductPrice,
        description: this.description,
        listingLaunches: removedIdToListingLaunches,
      }

      await ClientModel.updateListingReport(this.reportId, generatedListingReport)

      this.setRequestTableStatus(loadingStatus.SUCCESS)
      toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
      this.setRequestTableStatus(loadingStatus.FAILED)
      toast.error(t(TranslationKey['Data not saved']))
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
        type: value,
        value: 0,
        dateFrom: null,
        dateTo: null,
        comment: '',
        requestId: null,
        result: '',
        _id: uuid(),
      }
      this.listingLaunches = [...this.listingLaunches, generatedListingLaunch]
      this.selectLaunchValue = null
    }
  }

  onSelectProduct = (value: string, option: BaseOptionType) => {
    if (value) {
      this.updateProductAndColumns(option as IProduct)
      // this.onGetListingReportByProductId(value) // value is productId
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
      const existingLaunchIndex = this.listingLaunches.findIndex(el => el._id === selectedlaunch._id)
      const generatedRequest = {
        ...request,
        launch: selectedlaunch,
      }

      if (existingLaunchIndex !== -1) {
        const generatedLaunch = {
          ...this.listingLaunches[existingLaunchIndex],
          requestId: request._id,
          request: generatedRequest,
        }

        this.listingLaunches.splice(existingLaunchIndex, 1, generatedLaunch)
      }
    }
  }

  onRemoveRequest = (id?: string) => {
    if (id) {
      const existingLaunchIndex = this.listingLaunches.findIndex(el => el._id === id)

      if (existingLaunchIndex !== -1) {
        const generatedLaunch = {
          ...this.listingLaunches[existingLaunchIndex],
          requestId: null,
          request: null,
        }

        this.listingLaunches.splice(existingLaunchIndex, 1, generatedLaunch)
      }
    }
  }

  onRemoveLaunch = (id: string) => {
    this.listingLaunches = this.listingLaunches.filter(el => el._id !== id)
  }

  setRequestTableStatus(requestTableStatus: loadingStatus) {
    this.requestTableStatus = requestTableStatus
  }

  updateProductAndColumns = (product?: IProduct) => {
    if (product) {
      this.product = product
      this.columnsProps.product = product
    }

    this.columnsModel = reportModalColumns(this.columnsProps)
  }

  onGetProducts = () => {
    this.permissionsData = []
    this.isCanLoadMore = true
    this.setOptions({ offset: 0, filters: '' })
    this.getPermissionsData()
  }

  /* onGetListingReportByProductId = async (id: string) => {
    try {
      const response = await ClientModel.getListingReportByProductId({ guid: id })
      const activeLaunches = response?.rows?.flatMap(({ listingLaunches }) => listingLaunches) as ILaunch[]

      runInAction(
        () =>
          (this.launchOptions = launchOptions.filter(
            ({ value }) => !activeLaunches.some(({ type }) => type === value),
          )),
      )
    } catch (error) {
      console.error(error)
    }
  } */
}
