import { StringLiteralType } from 'typescript'

export interface IDetail {
  conditions: string
  linksToMediaFiles: Array<string>
  createdById: string
  lastModifiedById: string
  createdAt: StringLiteralType
  updatedAt: string
  amazonOrderId: string
  result: string
  publicationLinks: Array<string>
}
