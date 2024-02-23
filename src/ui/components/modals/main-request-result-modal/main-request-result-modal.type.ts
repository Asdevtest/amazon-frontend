import { Dispatch, SetStateAction } from 'react'

import { ICustomProposal } from '@typings/models/proposals/custom-proposal'
import { IFullUser } from '@typings/shared/full-user'
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

export interface MainRequestResultModalProps {
  customProposal: ICustomProposal
  userInfo: IFullUser
  openModal: boolean
  onOpenModal: () => void
  onEditCustomProposal: (id: string, fields: IFields, status?: string) => void
  onReceiveCustomProposal: () => void
  showActionButtons?: boolean
}
