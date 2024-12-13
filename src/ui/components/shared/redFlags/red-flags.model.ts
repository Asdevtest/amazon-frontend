import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'

import { ProductModel } from '@models/product-model'

import { IRedFlag } from '@typings/shared/red-flag'

export class RedFlagsModel {
  flags: IRedFlag[] = []
  searchValue = ''
  loading = false

  get filteredFlags() {
    return this.flags.filter(flag => flag.title.toLowerCase().includes(this.searchValue.toLowerCase()))
  }

  constructor(flags?: IRedFlag[], isCell?: boolean) {
    if (flags?.length || isCell) {
      this.flags = flags || []
    } else {
      this.getProductRedFlags()
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getProductRedFlags() {
    try {
      runInAction(() => {
        this.loading = true
      })

      const response = (await ProductModel.getProductRedFlags()) as unknown as IRedFlag[]

      runInAction(() => {
        this.flags = response
      })
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  onChangeSearchValue(e: ChangeEvent<HTMLInputElement>) {
    this.searchValue = e.target.value
  }
}
