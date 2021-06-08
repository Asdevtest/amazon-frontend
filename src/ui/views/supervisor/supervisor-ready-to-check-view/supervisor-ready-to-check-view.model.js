import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {SupervisorModel} from '@models/supervisor-model'

export class SupervisorReadyToCheckViewModel {
  history = undefined
  requestStatus = undefined

  drawerOpen = false
  rowsPerPage = 5
  curPage = 1
  selectedProducts = []

  productsReadyToCheck = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.getProducsReadyToCheck()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProducsReadyToCheck() {
    try {
      const result = await SupervisorModel.getProducsVacant()
      runInAction(() => {
        this.productsReadyToCheck = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onSelectProduct(item, index) {
    const selectedProducts = [...this.selectedProducts]
    const newSelectedProducts = [...selectedProducts]
    const findRequestIndex = selectedProducts.indexOf(index)
    if (findRequestIndex !== -1) {
      newSelectedProducts.splice(findRequestIndex, 1)
    } else {
      newSelectedProducts.push(index)
    }
    this.selectedProducts = newSelectedProducts
  }

  onClickTableRow(item) {
    this.history.push('/supervisor/product', {product: toJS(item)})
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangePage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage = e => {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }
}
