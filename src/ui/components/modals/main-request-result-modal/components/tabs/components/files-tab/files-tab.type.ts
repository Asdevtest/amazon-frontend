import { IMediaRework, SetFields } from '@components/modals/main-request-result-modal/main-request-result-modal.type'

import { ISpec } from '@typings/shared/spec'

export interface FilesTabProps {
  isClient: boolean
  productId: string
  spec: ISpec
  files: IMediaRework[]
  setFields: SetFields
  readOnly?: boolean
}
