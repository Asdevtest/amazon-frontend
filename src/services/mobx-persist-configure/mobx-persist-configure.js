import { configurePersistable } from 'mobx-persist-store'

const setItem = async (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    // console.log(error)

    console.warn('Local Storage is full, Please empty data')
  }
}

configurePersistable(
  {
    expireIn: 86400000,
    removeOnExpiration: true,
    storage: {
      getItem: key => localStorage.getItem(key),
      // setItem: (key, value) => localStorage.setItem(key, value),
      setItem: (key, value) => setItem(key, value),

      removeItem: key => localStorage.removeItem(key),
    },
    stringify: true,
    debugMode: false,
  },
  { delay: 200, fireImmediately: false },
)
