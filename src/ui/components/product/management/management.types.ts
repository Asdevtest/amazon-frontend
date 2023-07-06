export type MemberType = {
  _id: string
  name: string
}

export type MembersType = Record<string, MemberType[]>

export type DataType = Record<string, string>

export interface IPromiseItem {
  status: string
  value: PromiseSettledResult<MemberType>[]
}

export interface ObjWithProps {
  [key: string]: MemberType[]
}

export enum Members {
  Client,
  Buyer,
  Supervisor,
  Researcher,
}
