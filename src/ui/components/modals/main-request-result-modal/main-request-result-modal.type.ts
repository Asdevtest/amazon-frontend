import { Dispatch, SetStateAction } from 'react'

import { UploadFileType } from '@typings/shared/upload-file'

export interface IMediaRework {
  _id: string
  fileLink: UploadFileType
  commentByPerformer?: string
  commentByClient?: string
  index?: number
}

export interface IFieldsToRework {
  reason: string
  timeLimitInMinutes: number
  media: IMediaRework[]
}

export type SetFieldsToRework = Dispatch<SetStateAction<IFieldsToRework>>

export interface IFieldsAfterRework {
  result: string
  publicationLinks: string[]
  media: IMediaRework[]
}

export type SetFieldsAfterRework = Dispatch<SetStateAction<IFieldsAfterRework>>
