export enum TableView {
  SUPLLIERS = 'Suppliers',
  PRODUCTS = 'Products',
}

export interface IHandlers {
  onClickOpenInNewTab: (link: string) => void
}
