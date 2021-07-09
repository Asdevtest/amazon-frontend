import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {ADMIN_PRODUCTS_DATA} from '@constants/mocks'

import {AdministratorModel} from '@models/administrator-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class AdminInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  products = [...ADMIN_PRODUCTS_DATA]

  selectionModel = undefined

  drawerOpen = false
  rowsPerPage = 15
  curPage = 0
  selectedProduct = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  getCurrentData() {
    return toJS(this.products)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  async getProducts() {
    try {
      const result = await AdministratorModel.getProducts()

      const productsData = result.map(product => ({
        ...getObjectFilteredByKeyArrayBlackList(product, ['_id']),
        id: product._id,
      }))

      runInAction(() => {
        this.products = productsData
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }
}
