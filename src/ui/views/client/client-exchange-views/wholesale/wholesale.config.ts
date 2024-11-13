import { action, computed } from 'mobx'

export const wholesaleConfig = {
  suppliers: computed,
  loading: computed,
  onScroll: action.bound,
}
