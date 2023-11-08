/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

// export const useProductsPermissions = (callback: any, options?: any) => {
//   const [config, setConfig] = useState({})
//   const [permissionsData, setPermissionsData] = useState([])
//   const [requestStatus, setRequestStatus] = useState(loadingStatuses.success)

//   useEffect(() => {
//     if (options) setConfig(options)
//   }, [options])

//   const getPermissionsData = async () => {
//     setRequestStatus(loadingStatuses.isLoading)

//     const result = await callback(config)
//     await setPermissionsData(result)

//     setRequestStatus(loadingStatuses.success)
//   }

//   return {
//     requestStatus,
//     permissionsData,
//     getPermissionsData,
//   }
// }

interface IPermissionsData {
  _id: string
  asin: string
  shopIds: string[]
  amazonTitle: string
  skusByClient: string[]
  buyerId: string
  images: string[]
}

export class UseProductsPermissions {
  callback: (options: any) => any
  options = {
    offset: 0,
    limit: 15,
    sortField: 'asin',
    sortType: 'ASC',
    // filters - при использовании поиска передавать значения [skusByClient][$contains]= + [asin][$contains]=
  }

  isCanLoadMore = true

  requestStatus = loadingStatuses.success
  permissionsData: IPermissionsData[] = []
  constructor(callback: any, options?: any) {
    makeAutoObservable(this)

    this.callback = callback
    this.options = {
      ...this.options,
      ...options,
    }
  }

  get currentPermissionsData() {
    return this.permissionsData
  }
  get currentRequestStatus() {
    return this.requestStatus
  }

  async getPermissionsData() {
    if (!this.callback) return

    try {
      this.requestStatus = loadingStatuses.isLoading

      const result = await this.callback(this.options)

      runInAction(() => {
        this.permissionsData = result.rows
      })

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async loadMoreDataHadler() {
    if (!this.callback || !this.isCanLoadMore || this.requestStatus !== loadingStatuses.success) return

    try {
      this.requestStatus = loadingStatuses.isLoading

      this.options.offset += this.options.limit
      const result = await this.callback(this.options)

      runInAction(() => {
        this.permissionsData = [...this.permissionsData, ...result.rows]
      })

      if (result.rows.length < this.options.limit) {
        this.isCanLoadMore = false
      }

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  setOptions(options: any) {
    this.options = {
      ...this.options,
      ...options,
    }
  }
}
