export enum TableView {
  SUPLLIERS = 'Suppliers',
  CARDS = 'Cards',
}

export type IHandlers = IHandlersCards | IHandlersSuppliers

export interface IHandlersCards {
  onClickEdit: (id: string) => void
  onClickDelete: (id: string) => void
}
export interface IHandlersSuppliers extends IHandlersCards {
  onClickOpenInNewTab: (link: string) => void
}
