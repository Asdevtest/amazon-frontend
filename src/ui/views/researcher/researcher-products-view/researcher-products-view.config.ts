import { action, computed, observable } from 'mobx'

export const researcherProductsViewConfig = {
  error: observable,
  reasonError: observable,
  actionStatus: observable,
  formFields: observable,
  newProductId: observable,
  formFieldsValidationErrors: observable,
  chekedCode: observable,

  userInfo: computed,

  createProduct: action.bound,
  onClickCheckAndAddProductBtn: action.bound,
  checkProductExists: action.bound,
  onClickTableRow: action.bound,
  onChangeFormFields: action.bound,
}
export const paginationInitModel = { page: 0, pageSize: 15 }
export const formFieldsDefault = {
  amazonLink: '',
  productCode: '',
  strategyStatus: '',
  niche: '',
  asins: '',
  avgRevenue: '',
  avgBSR: '',
  totalRevenue: '',
  coefficient: '',
  avgPrice: '',
  avgReviews: '',
}
