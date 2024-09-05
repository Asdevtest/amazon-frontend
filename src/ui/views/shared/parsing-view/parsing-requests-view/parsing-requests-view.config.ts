import { action } from 'mobx'

export const parsingRequestsViewConfig = {
  onApproveProfile: action.bound,
  onRejectProfile: action.bound,
}

export const fieldsForSearch = ['profileName', 'profileEmail']

export interface ColumnsProps {
  onApproveProfile: (id: string, profileId: string) => void
  onRejectProfile: (id: string) => void
}
