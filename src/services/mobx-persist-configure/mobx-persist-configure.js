import Cookies from 'js-cookie'
import {configurePersistable} from 'mobx-persist-store'

configurePersistable(
  {
    expireIn: 86400000,
    removeOnExpiration: true,
    storage: {
      getItem: Cookies.get,
      setItem: Cookies.set,
      removeItem: Cookies.remove,
    },
    stringify: true,
    debugMode: false,
  },
  {delay: 200, fireImmediately: false},
)
