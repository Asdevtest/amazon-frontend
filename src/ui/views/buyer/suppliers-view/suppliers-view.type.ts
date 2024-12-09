export enum TableView {
  SUPLLIERS = 'Suppliers',
  CARDS = 'Cards',
}

export interface IHandlers {
  onClickEdit: (id: string) => void
  onClickDelete: (id: string) => void
  onClickBindProduct?: (id: string, supplierId: string) => void
}
