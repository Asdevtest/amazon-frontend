import {configurePersistable} from 'mobx-persist-store'

configurePersistable(
  {
    expireIn: 86400000,
    removeOnExpiration: true,
    storage: {
      getItem: key => localStorage.getItem(key),
      setItem: (key, value) => localStorage.setItem(key, value),
      removeItem: key => localStorage.removeItem(key),
    },
    stringify: true,
    debugMode: false,
  },
  {delay: 200, fireImmediately: false},
)
