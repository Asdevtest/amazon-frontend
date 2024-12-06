import { FilterOptionsType } from '@models/infinite-scroll-model/infinite-scroll.model'

export interface FilterValues {
  priceInUsdMin: string
  priceInUsdMax: string
  category: string[]
  minlotMin: string
  minlotMax: string
  cardName: string
}

export interface CardsFilterProps {
  showFilter: boolean
  filtersCount: number
  onSubmit: (values: FilterOptionsType) => void
  onReset: () => void
  loading?: boolean
  onlyExchangeCategories?: boolean
}
