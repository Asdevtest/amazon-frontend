import { Dispatch, SetStateAction } from 'react'

import { UploadFileType } from '@typings/shared/upload-file'

export interface IMediaRework {
  _id: string | null
  fileLink: UploadFileType
  commentByPerformer?: string
  commentByClient?: string
  index?: number
}

export interface IFields {
  reason?: string
  timeLimitInMinutes?: number
  result?: string
  publicationLinks?: string[]
  media: IMediaRework[]
}

export type SetFields = Dispatch<SetStateAction<IFields>>
