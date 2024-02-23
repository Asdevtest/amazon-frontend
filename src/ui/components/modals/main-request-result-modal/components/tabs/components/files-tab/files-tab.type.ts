import { IMediaRework, SetFields } from '@components/modals/main-request-result-modal/main-request-result-modal.type'

export interface FilesTabProps {
  isClient: boolean
  files: IMediaRework[]
  setFields: SetFields
  readOnly?: boolean
}
