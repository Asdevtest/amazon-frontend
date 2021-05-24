import AdministratorApi from './codegen/src/api/AdministratorApi'
import BuyerApi from './codegen/src/api/BuyerApi'
import ClientApi from './codegen/src/api/ClientApi'
import ProductForTestOnlyApi from './codegen/src/api/ProductForTestOnlyApi'
import ReseacherApi from './codegen/src/api/ReseacherApi'
import StorekeepersApi from './codegen/src/api/StorekeepersApi'
import SupervisorApi from './codegen/src/api/SupervisorApi'
import SupplierApi from './codegen/src/api/SupplierApi'

class RestApiService {
  constructor() {
    this.administratorApi = new AdministratorApi()
    this.buyerApi = new BuyerApi()
    this.clientApi = new ClientApi()
    this.productForTestOnlyApi = new ProductForTestOnlyApi()
    this.researcherApi = new ReseacherApi()
    this.strokeepersApi = new StorekeepersApi()
    this.supervisorApi = new SupervisorApi()
    this.supplierApi = new SupplierApi()
    this.userApi = new SupplierApi()
  }
}

export const restApiService = new RestApiService()
