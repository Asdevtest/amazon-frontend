/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { GridColDef } from '@mui/x-data-grid-premium'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'
import { ideaStatusByKey } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'
import { createOrderRequestWhiteList, createProductByClient } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { IdeaModel } from '@models/ideas-model'
import { ProductModel } from '@models/product-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { checkIsValidProposalStatusToShowResoult } from '@utils/checks'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { IdeaStatus } from '@typings/enums/idea/idea-status'
import { loadingStatus } from '@typings/enums/loading-status'
import { IIdea } from '@typings/models/ideas/idea'
import { IProduct } from '@typings/models/products/product'
import { IProposal } from '@typings/models/proposals/proposal'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'
import { ISupplier } from '@typings/models/suppliers/supplier'
import { ISupplierCard } from '@typings/models/suppliers/supplier-exchange'
import { IDestination } from '@typings/shared/destinations'
import { IFullUser } from '@typings/shared/full-user'
import { IUploadFile } from '@typings/shared/upload-file'

import { fieldsForSearch, filtersFields } from './client-ideas-view.constants'
import { observerConfig } from './observer-config'
import { settingsByUrl } from './settings-by-url'

export class ClientIdeasViewModel extends DataGridFilterTableModel {
  progressValue = 0
  showProgress = false
  uploadedFiles = []

  // * Modals

  showBarcodeOrHscodeModal = false
  showSetBarcodeModal = false
  productCardModal = false
  showIdeaModal = false
  showLinkRequestModal = false
  showConfirmModal = false
  showProductLaunch = false
  showRequestDesignerResultModal = false
  showRequestBloggerResultModal = false
  showMainRequestResultModal = false
  showOrderModal = false
  showSelectionSupplierModal = false
  showCommentsModal = false
  showAddSupplierProductModal = false

  // * Data

  readyImages = []
  ideaList = []

  selectedProduct?: IProduct
  currentBarcode: string = ''
  currentHscode = undefined
  storekeepers: IStorekeeper[] = []
  destinations: IDestination[] = []
  ordersDataStateToSubmit = undefined

  // * Modal data

  selectedIdea?: IIdea
  selectedIdeaId: string = ''
  currentProduct?: IProduct
  productsToLaunch: IProduct[] = []
  productId: string = ''
  currentIdeaId: string = ''
  ideaIdFromParam: string | null
  currentProposal?: IProposal
  currentRequest = undefined

  // * Modal states

  isIdeaCreate = false

  get userInfo(): IFullUser {
    // @ts-ignore
    return UserModel.userInfo
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  constructor({ history }: { history: any }) {
    const rowHandlers = {
      onClickToCheck: (id: string) => this.handleStatusToCheck(id),
      onClickReject: (id: string) => this.handleStatusToReject(id),
      onClickCreateRequest: (ideaData: IIdea) => this.onClickCreateRequestButton(ideaData),
      onClickLinkRequest: (idea: IIdea) => this.onClickLinkRequestButton(idea),
      onClickResultButton: (request: any) => this.onClickResultButton(request),
      onClickUnbindButton: (requestId: string) => this.onClickUnbindButton(requestId),
      onClickCreateCard: (ideaData: IIdea) => this.onClickCreateProduct(ideaData),
      onClickClose: (ideaId: string) => this.onClickCloseIdea(ideaId),
      onClickRestore: (id: string) => this.handleRestore(id),
      onClickAcceptOnCheckingStatus: (id: string) => this.handleStatusToSupplierSearch(id),
      onClickAcceptOnSuppliersSearch: (id: string, ideaData: IIdea) => this.handleStatusToProductCreating(id, ideaData),
      onClickAcceptOnCreatingProduct: (id: string) => this.handleStatusToAddingAsin(id),
      onClickAcceptOnAddingAsin: (idea: IIdea) => this.handleStatusToFinished(idea),
      onClickToOrder: (id: string) => this.onClickToOrder(id),
      onClickRequestId: (id: string) => this.onClickRequestId(id),
      onClickAddSupplierButton: (id: string) => this.onClickAddSupplierButton(id),

      barCodeHandlers: {
        onClickBarcode: (item: IProduct) => this.onClickBarcode(item),
        onDoubleClickBarcode: (item: IProduct) => this.onDoubleClickBarcode(item),
        onDeleteBarcode: (item: IProduct) => this.onDeleteBarcode(item),
        showBarcodeOrHscode: (barCode: string) => this.showBarcodeOrHscode(barCode),
      },
    }

    const pageSettings = settingsByUrl[history?.location?.pathname as keyof typeof settingsByUrl]
    const columns = pageSettings.columnsModel(rowHandlers)
    const tableKey = pageSettings.dataGridKey
    const statusGroup = pageSettings.statusGroup

    const defaultGetCurrentDataOptions = () => pageSettings.queries

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: statusGroup,
      },
    })

    super({
      getMainDataMethod: IdeaModel.getIdeaList,
      columnsModel: columns as GridColDef[],
      filtersFields,
      mainMethodURL: 'ideas/pag/my?',
      fieldsForSearch,
      tableKey,
      defaultGetCurrentDataOptions,
      defaultFilterParams,
      defaultSortModel: [{ field: pageSettings.defaultSortingModel, sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    const url = new URL(window.location.href)
    this.ideaIdFromParam = url.searchParams.get('ideaId')
    if (this.ideaIdFromParam) {
      this.getIdea(this.ideaIdFromParam)
    }

    this.history = history

    this.getTableSettingsPreset()
  }

  async getIdea(ideaId: string) {
    try {
      const response = await IdeaModel.getIdeaById(ideaId)
      await this.getDataForIdeaModal(response)
    } catch (error) {
      console.error(error)
    }
  }

  async getDataForIdeaModal(idea: IIdea | any) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const isChildProcuct =
        idea.childProduct && (idea.status === ideaStatusByKey.ADDING_ASIN || idea.status === ideaStatusByKey.VERIFIED)
      const currentProductId = isChildProcuct ? idea.childProduct._id : idea.parentProduct._id

      this.isIdeaCreate = false

      runInAction(() => {
        this.productId = currentProductId
        this.currentIdeaId = idea._id
        this.currentProduct = idea?.parentProduct
      })

      this.onTriggerOpenModal('showIdeaModal')

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onClickVariationRadioButton() {
    try {
      const result = await ClientModel.getProductPermissionsData({ isParent: true, isChild: false })
      this.productsToLaunch = result.rows as unknown as IProduct[]
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepers = result as IStorekeeper[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  // * Idea handlers

  async statusHandler(method: Function, id: string, addSupliersToParentProductData?: any, data?: any) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      await method(id, data)

      if (addSupliersToParentProductData) {
        await ProductModel.addSuppliersToProduct(
          addSupliersToParentProductData?.parentProduct?._id,
          addSupliersToParentProductData?.supplierCards?.map((supplier: ISupplierCard) => supplier._id),
        )
      }

      await this.getCurrentData()

      UserModel.getUsersInfoCounters()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)

      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  handleStatusToCheck(id: string) {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onSubmit: () => {
        this.statusHandler(IdeaModel.setStatusToCheck, id)
        this.onTriggerOpenModal('showConfirmModal')
        toast.success(t(TranslationKey['Idea status changed successfully']))
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleStatusToReject(ideaId: string) {
    this.selectedIdeaId = ideaId
    this.onTriggerOpenModal('showCommentsModal')
  }

  setRejectStatusHandler(reasonReject: string) {
    this.statusHandler(IdeaModel.setStatusToReject, this.selectedIdeaId, undefined, { reasonReject })
  }

  handleStatusToSupplierSearch(id: string) {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onSubmit: () => {
        this.statusHandler(IdeaModel.setStatusToSupplierSearch, id)
        this.onTriggerOpenModal('showConfirmModal')
        toast.success(t(TranslationKey['Idea status changed successfully']))
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleStatusToProductCreating(id: string, ideaData: IIdea) {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onSubmit: () => {
        this.statusHandler(
          ideaData?.variation ? IdeaModel.setStatusToProductCreating : IdeaModel.setStatusToAddingAsin,
          id,
          !ideaData?.variation && !!ideaData?.parentProduct?._id && ideaData,
        )
        this.onTriggerOpenModal('showConfirmModal')
        toast.success(t(TranslationKey['Idea status changed successfully']))
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleStatusToAddingAsin(id: string) {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onSubmit: () => {
        this.statusHandler(IdeaModel.setStatusToAddingAsin, id)
        this.onTriggerOpenModal('showConfirmModal')
        toast.success(t(TranslationKey['Idea status changed successfully']))
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleStatusToFinished(idea: IIdea) {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onSubmit: () => {
        this.statusHandler(IdeaModel.setStatusToFinished, idea?._id)
        this.onTriggerOpenModal('showConfirmModal')
        toast.success(t(TranslationKey['Idea status changed successfully']))
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleRestore(id: string) {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: t(TranslationKey['Are you sure you want to restore the idea']),
      onSubmit: () => {
        this.statusHandler(IdeaModel.restore, id)
        this.onTriggerOpenModal('showConfirmModal')
        toast.success(t(TranslationKey['Idea status changed successfully']))
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitRemoveIdea(ideaId: string) {
    try {
      await IdeaModel.setStatusToClosed(ideaId)
      this.getCurrentData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickRequestId(id: string) {
    window
      ?.open(
        `/${
          UserRoleCodeMapForRoutes[this.userInfo?.role as keyof typeof UserRoleCodeMapForRoutes]
        }/freelance/my-requests/custom-request?request-id=${id}`,
        '_blank',
      )
      ?.focus()
  }

  //  * Barcode handlers

  onClickBarcode(item: IProduct) {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  onDoubleClickBarcode = (item: IProduct) => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onDeleteBarcode(product: IProduct) {
    try {
      await ClientModel.updateProductBarCode(product._id, { barCode: null })

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  showBarcodeOrHscode(barcode: string) {
    this.currentBarcode = barcode

    this.onTriggerOpenModal('showBarcodeOrHscodeModal')
  }

  async onClickSaveBarcode(tmpBarCode: IUploadFile[]) {
    if (tmpBarCode?.length) {
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct?._id, { barCode: this.uploadedFiles[0] })

    this.getCurrentData()

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  setSelectedProduct(item: IProduct) {
    this.selectedProduct = item
  }

  onClickProductModal() {
    this.history.push(`/client/ideas/add-asin?product-id=${this.selectedProduct?._id}`)

    this.onTriggerOpenModal('productCardModal')
  }

  onClickShowProduct(row: IProduct) {
    window?.open(`${window.location.origin}/client/inventory/product?product-id=${row?._id}`, '_blank')?.focus()
  }

  async editIdea(id: string, data: any, isForceUpdate?: boolean) {
    try {
      await IdeaModel.editIdea(id, data)

      if (!isForceUpdate) {
        toast.success(t(TranslationKey['Idea edited']))
      }
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateProduct(ideaData: any) {
    try {
      const createData: any = getObjectFilteredByKeyArrayWhiteList(
        {
          images: ideaData?.linksToMediaFiles,
          amazonTitle: ideaData?.productName,
          asin: '',
          supplierCardIds: ideaData?.supplierCards?.map((el: ISupplier) => el._id),
          parentProductId: ideaData?.parentProduct?._id,
          clientComment: ideaData?.comments,
          lamazon: ideaData?.productLinks?.[0],
          buyerId: ideaData?.parentProduct?.buyerId,
        },
        createProductByClient,
      )

      const result = await ClientModel.createProduct(createData)

      await this.editIdea(ideaData._id, { childProductId: result.guid })

      if (createData?.supplierCardIds?.length) {
        await ClientModel.updateProduct(result.guid, {
          currentSupplierCardId: createData?.supplierCardIds?.[0],
        })
      }

      this.getCurrentData()

      toast.success(t(TranslationKey['Product added']))

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveSupplierBtn(supplierCardId: string) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await IdeaModel.addSuppliersToIdea(this.selectedIdeaId, {
        supplierCardIds: [supplierCardId],
      })

      runInAction(() => {
        this.selectedIdeaId = ''
      })

      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  // * Order handlers

  async onClickToOrder(id: string) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const [storekeepers, destinations] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
      ])

      runInAction(() => {
        this.storekeepers = storekeepers as unknown as IStorekeeper[]
        this.destinations = destinations as unknown as IDestination[]
      })

      const result = await ProductModel.getProductById(id)
      runInAction(() => {
        this.currentProduct = result as unknown as IProduct
      })

      this.onTriggerOpenModal('showOrderModal')
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onClickCreateRequestButton(ideaData: IIdea) {
    const isCreateByChildProduct = ideaData?.status >= IdeaStatus.ADDING_ASIN && ideaData?.childProduct

    const getProductAsin = () => {
      if ([IdeaStatus.NEW, IdeaStatus.ON_CHECK].includes(ideaData?.status)) {
        return ideaData?.parentProduct?.asin || null
      }

      if ([IdeaStatus.ADDING_ASIN, IdeaStatus.VERIFIED].includes(ideaData?.status)) {
        return ideaData?.childProduct?.asin || ideaData?.parentProduct?.asin || null
      }

      return null
    }

    const selectedAsin = getProductAsin()
    const asinPath = selectedAsin ? `&asin=${selectedAsin}` : ''

    window
      ?.open(
        `/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/create-request?parentProduct=${
          isCreateByChildProduct ? ideaData?.childProduct?._id : ideaData?.parentProduct?._id
        }${asinPath}`,
        '_blank',
      )
      ?.focus()
  }

  onClickLinkRequestButton(idea: IIdea) {
    this.selectedIdea = idea
    this.onTriggerOpenModal('showLinkRequestModal')
  }

  onClickCreateProduct(ideaData: IIdea) {
    this.confirmModalSettings = {
      title: '',
      isWarning: false,
      message: t(TranslationKey['Are you sure you want to create a product?']),
      onSubmit: () => {
        this.onSubmitCreateProduct(ideaData)
        toast.success(t(TranslationKey['Data saved successfully']))
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickCloseIdea(ideaId: string) {
    this.confirmModalSettings = {
      title: '',
      isWarning: true,
      message:
        t(TranslationKey['Are you sure you want to close this idea?']) +
        '\n' +
        t(TranslationKey['Once confirmed, the idea will be closed without reopening']),
      onSubmit: () => {
        this.onSubmitRemoveIdea(ideaId)
        toast.success(t(TranslationKey['Idea status changed successfully']))
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onClickProductLaunch() {
    try {
      this.isIdeaCreate = true
      this.productId = ''
      this.currentIdeaId = ''
      this.onTriggerOpenModal('showProductLaunch')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickNextButton(chosenProduct: IProduct) {
    if (chosenProduct) {
      const result = await ProductModel.getProductById(chosenProduct?._id)

      runInAction(() => {
        this.currentProduct = result as unknown as IProduct
        this.productId = chosenProduct?._id
      })
    } else {
      runInAction(() => {
        this.currentProduct = undefined
      })
    }

    if (!!chosenProduct && !chosenProduct?.buyerId && !chosenProduct?.buyer?._id) {
      this.confirmModalSettings = {
        isWarning: true,
        title: '',
        message: t(TranslationKey['The card does not fit, send to supplier search']),
        onSubmit: () => {
          this.onTriggerOpenModal('showSelectionSupplierModal')
          this.onTriggerOpenModal('showConfirmModal')
          this.onTriggerOpenModal('showProductLaunch')
        },
        onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
      }
      this.onTriggerOpenModal('showConfirmModal')
    } else {
      this.onTriggerOpenModal('showProductLaunch')
      this.onTriggerOpenModal('showIdeaModal')
    }
  }

  async onSubmitCalculateSeekSupplier(clientComment: string) {
    try {
      const result = await ClientModel.calculatePriceToSeekSupplier(this.productId)

      runInAction(() => {
        const priceForSeekSupplier = result.priceForClient as number

        this.confirmModalSettings = {
          isWarning: false,
          title: t(TranslationKey.Attention),
          message: `${t(TranslationKey['The cost of the supplier search service will be'])} $${toFixed(
            result.priceForClient,
            2,
          )}.\n ${t(TranslationKey['Apply?'])}`,
          onSubmit: () => this.onSubmitSeekSupplier(clientComment, priceForSeekSupplier),
          onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitSeekSupplier(clientComment: string, priceForSeekSupplier: number) {
    try {
      await ClientModel.sendProductToSeekSupplier(this.productId, {
        clientComment,
        priceForClient: priceForSeekSupplier,
      })

      this.getCurrentData()

      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionSupplierModal')
    } catch (error) {
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionSupplierModal')
      console.error(error)
    }
  }

  async onClickResultButton(request: any) {
    try {
      const proposals = (await RequestProposalModel.getRequestProposalsCustomByRequestId(request._id)) as IProposal[]

      runInAction(() => {
        this.currentProposal = proposals.find(proposal =>
          checkIsValidProposalStatusToShowResoult(proposal.proposal.status),
        )
        this.currentRequest = request
      })

      if (request?.spec?.title === freelanceRequestType.DESIGNER) {
        this.onTriggerOpenModal('showRequestDesignerResultModal')
      } else if (request?.spec?.title === freelanceRequestType.BLOGGER) {
        this.onTriggerOpenModal('showRequestBloggerResultModal')
      } else {
        this.onTriggerOpenModal('showMainRequestResultModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async unbindRequest(requestId: string) {
    try {
      await RequestModel.bindIdeaToRequest(requestId, { onCheckedIdeaId: null, onFinishedIdeaId: null })
      this.getCurrentData()
    } catch (error) {
      console.error('error', error)
    }
  }

  async onClickUnbindButton(requestId: string) {
    this.confirmModalSettings = {
      isWarning: true,
      title: '',
      message: t(TranslationKey['Are you sure you want to unbind the request from the idea?']),
      onSubmit: () => {
        this.unbindRequest(requestId)
        this.onTriggerOpenModal('showConfirmModal')
        toast.success(t(TranslationKey['Data saved successfully']))
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onConfirmSubmitOrderProductModal({
    ordersDataState,
    totalOrdersCost,
  }: {
    ordersDataState: any
    totalOrdersCost: number
  }) {
    this.ordersDataStateToSubmit = ordersDataState

    this.confirmModalSettings = {
      isWarning: false,
      title: t(TranslationKey['You are making an order, are you sure?']),
      message: ordersDataState.some((el: any) => el.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onSubmit: () => {
        this.onSubmitOrderProductModal()
        toast.success(t(TranslationKey['Data saved successfully']))
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      this.onTriggerOpenModal('showOrderModal')

      // @ts-ignore
      for (let i = 0; i < this.ordersDataStateToSubmit?.length; i++) {
        // @ts-ignore
        const orderObject = this.ordersDataStateToSubmit[i]

        if (orderObject.tmpBarCode.length) {
          // @ts-ignore
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        await this.createOrder(orderObject)
      }

      toast.success(t(TranslationKey['The order has been created']))

      this.onTriggerOpenModal('showConfirmModal')
      this.getCurrentData()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async createOrder(orderObject: any) {
    try {
      const requestData = getObjectFilteredByKeyArrayWhiteList(orderObject, createOrderRequestWhiteList)

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  setDestinationsFavouritesItem(item: any) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  async onClickAddSupplierButton(id: string) {
    runInAction(() => {
      this.selectedIdeaId = id
    })

    this.onTriggerOpenModal('showAddSupplierProductModal')
  }
}
