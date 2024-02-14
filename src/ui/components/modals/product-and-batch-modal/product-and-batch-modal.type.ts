export enum ProductAndBatchModalSwitcherConditions {
  ORDER_INFORMATION = 'ORDER_INFORMATION',
  BATCH_DATA = 'BATCH_DATA',
}

export interface IModalConfig {
  title: string
  element: () => JSX.Element
  onClick?: () => void
}
