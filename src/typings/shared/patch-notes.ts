export interface IPatchNotes {
  count: number
  rows: IPatchNote[]
}

export interface IPatchNote {
  _id: string
  title: string
}
