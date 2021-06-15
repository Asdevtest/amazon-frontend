import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'

import {ResearcherModel} from '@models/researcher-model'
import {SupplierModel} from '@models/supplier-model'

import {getObjectFilteredByKeyArrayWhiteList, getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {parseFieldsAdapter} from '@utils/parse-fields-adapter'

const fieldsOfProductAllowedToUpdate = [
  'lamazon',
  'lsupplier',
  'bsr',
  'status',
  'amazon',
  'supplier',
  'fbafee',
  'reffee',
  'delivery',
  'icomment',
  'fba',
  'profit',
  'margin',
]

export class ResearcherProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  productBase = undefined
  product = undefined
  suppliers = []
  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      console.log(location.state.product)
      this.productBase = location.state.product
      this.product = location.state.product
      this.loadSupliersForProduct()
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }

  onChangeProductFields = fieldName =>
    action(e => {
      this.product[fieldName] = e.target.value
    })

  onChangeActiveChip(e, value) {
    this.activeChip = value
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  async onClickSupplierButtons(actionType) {
    if (actionType === 'add') {
      runInAction(() => {
        this.selectedSupplier = undefined
      })
      this.onTriggerAddOrEditSupplierModal()
    } else if (actionType === 'edit') {
      this.onTriggerAddOrEditSupplierModal()
    } else {
      try {
        this.setActionStatus(loadingStatuses.isLoading)
        await SupplierModel.removeSupplier(this.selectedSupplier._id)
        this.setActionStatus(loadingStatuses.success)
        const findSupplierIndex = this.suppliers.findIndex(
          supplierItem => supplierItem._id === this.selectedSupplier._id,
        )
        const findProductSupplierIndex = this.product.supplier.findIndex(
          supplierItem => supplierItem._id === this.selectedSupplier._id,
        )
        runInAction(() => {
          this.suppliers.splice(findSupplierIndex, 1)
          this.product.supplier.splice(findProductSupplierIndex, 1)
          this.selectedSupplier = undefined
          this.onSaveProductData()
        })
      } catch (error) {
        console.log(error)
        this.setActionStatus(loadingStatuses.failed)
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
      }
    }
  }

  async handleProductActionButtons(actionType) {
    switch (actionType) {
      case 'accept':
        this.onSaveProductData()
        break
      case 'cancel':
        this.onResetInitialProductData()
        break
      case 'delete':
        this.onDeleteProduct()
        break
    }
  }

  async onClickSaveSupplierBtn(supplier) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(supplier, ['_id'])
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
        const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === supplier._id)
        this.suppliers[findSupplierIndex] = supplier
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplier)
        runInAction(() => {
          this.product.supplier.push(createSupplierResult.guid)
          this.suppliers.push({...supplier, _id: createSupplierResult.guid})
        })
        this.onSaveProductData()
      }
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickParseProductData(productDataParser, product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const parseResult = await (() => {
        switch (productDataParser) {
          case ProductDataParser.AMAZON:
            return ResearcherModel.parseAmazon(product.id)
          case ProductDataParser.SELLCENTRAL:
            return ResearcherModel.parseParseSellerCentral(product.id)
        }
      })()
      runInAction(() => {
        this.product = {
          ...this.product,
          ...parseFieldsAdapter(parseResult),
        }
      })
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onSaveProductData() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const updateProductData = getObjectFilteredByKeyArrayWhiteList(
        toJS(this.product),
        fieldsOfProductAllowedToUpdate,
        true,
        (key, value) => {
          switch (key) {
            case 'status':
              return value < 10 && this.suppliers.length ? 10 : value
            case 'bsr':
              return value ? parseInt(value) : 0
            case 'amazon':
              return value ? parseFloat(value) : 0
            default:
              return value
          }
        },
      )
      console.log('updateProductData ', updateProductData)
      await ResearcherModel.updateProduct(this.product._id, updateProductData)
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onResetInitialProductData() {
    this.setActionStatus(loadingStatuses.isLoading)
    this.product = this.productBase
    this.setActionStatus(loadingStatuses.success)
  }

  async onDeleteProduct() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await ResearcherModel.removeProduct(this.product._id)
      this.setActionStatus(loadingStatuses.success)
      this.history.goBack()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async loadSupliersForProduct() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(async () => {
        this.suppliers = []
        for (let index = 0; index < this.product.supplier.length; index++) {
          const getSupplierResult = await SupplierModel.getSupplier(this.product.supplier[index])
          runInAction(() => {
            this.suppliers.push(getSupplierResult)
          })
        }
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerAddOrEditSupplierModal() {
    if (this.showAddOrEditSupplierModal) {
      this.selectedSupplier = undefined
    }
    this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
