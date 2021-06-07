import {action, makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ProductForTestOnly} from '@models/product-for-test-only-model'

import categoryImgBeautyAndPersonalCare from '@components/product/assets/beautyAndPersonalCare.jpg'
import categoryImgHealthHouseholdAndBabyCare from '@components/product/assets/healthHouseholdAndBabyCare.jpg'
import categoryImgHomeAndKitchen from '@components/product/assets/homeAndKitchen.jpg'
import categoryImgSportsAndOutdoors from '@components/product/assets/sportsAndOutdoors.jpg'
import categoryImgToysAndGames from '@components/product/assets/toysAndGames.jpg'

const IMAGES = [
  categoryImgHomeAndKitchen,
  categoryImgSportsAndOutdoors,
  categoryImgToysAndGames,
  categoryImgHealthHouseholdAndBabyCare,
  categoryImgBeautyAndPersonalCare,
]

export class ProductViewModel {
  history = undefined
  requestStatus = undefined

  product = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFieldProduct = fieldsName =>
    action(e => {
      this.product[fieldsName] = e.target.value
    })

  async getProductData(id) {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined
      const result = await ProductForTestOnly.getProduct(id)
      this.product = {...result, images: IMAGES}
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }
}
