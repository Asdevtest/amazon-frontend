export type MemberType = {
  _id: string
  name: string
}

export type MembersType = Record<string, MemberType[]>

export type DataType = Record<string, string>

export enum Members {
  Client,
  Buyer,
  Supervisor,
  Researcher,
}
