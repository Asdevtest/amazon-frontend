import { ICreatedBy } from './created-by'

export interface IPatchNotes {
  count: number
  rows: IPatchNote[]
}

export interface IPatchNote {
  _id: string
  title: string
  version: string
  author: ICreatedBy
  createdAt: string
  description: string
  role: number
  updatedAt: string
}
