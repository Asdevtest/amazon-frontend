import { action, observable } from 'mobx'

export const observerConfig = {
  countries: observable,
  paymentMethods: observable,

  countriesRequestStatus: observable,
  paymentMethodsRequestStatus: observable,

  getSuppliersPaymentMethods: action.bound,
  getCountries: action.bound,
  createSupplier: action.bound,
}
