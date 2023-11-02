export type MemberType = {
  _id: string
  name: string
}

export type DataIdsType = Record<string, string>

export enum Members {
  Client,
  Buyer,
  Supervisor,
  Researcher,
}
