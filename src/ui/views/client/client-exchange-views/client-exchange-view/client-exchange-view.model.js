import {makeAutoObservable} from 'mobx'

import {clientExchangeViewTable} from '@constants/mocks'

import {ClientModel} from '@models/client-model'

import {getRequiredListByKeys} from '@utils/get-required-list-by-keys'

const {mainTableKeys, modalTableKeys, productList} = clientExchangeViewTable

const mainTableProductList = getRequiredListByKeys(productList, mainTableKeys)
const modalTableProductList = getRequiredListByKeys(productList, modalTableKeys)

export class ClientExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productList = [...mainTableProductList]
  modalProductList = [...modalTableProductList]

  drawerOpen = false
  paginationPage = 1
  rowsPerPage = 5
  modalPrivateLabel = false
  selectedIndex = null
  modalQty = 0
  modalManagerIndex = 0

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerDrawer = () => {
    this.drawerOpen = !this.drawerOpen
  }

  onChangePagination(e, value) {
    this.paginationPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPage = 1
  }

  onCloseModal() {
    this.modalPrivateLabel = false
  }

  onClickPrivateLabel(index) {
    this.selectedIndex = index
    this.modalQty = this.modalProductList[index].qty
    this.modalPrivateLabel = true
  }

  onClickOrderNowBtn(id) {
    this.pickupProduct(id)
    this.makePayments([id])
    this.modalPrivateLabel = false
  }

  onClickCancelBtn() {
    this.modalPrivateLabel = false
  }

  onClickUsername() {
    this.props.history.push('/user/subusers')
  }

  onChangeModalQty(e) {
    this.modalQty = Number(e.target.value)
  }

  onChangeManager(e) {
    this.modalManagerIndex = Number(e.target.value)
  }

  async pickupProduct(id) {
    try {
      await ClientModel.pickupProduct(id)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async makePayments([id]) {
    try {
      await ClientModel.makePayments([id])
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
}
