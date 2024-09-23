import { action, observable } from 'mobx'

export const parsingRequestsViewConfig = {
  showProfilesModal: observable,
  requestId: observable,
  profileId: observable,
  shopId: observable,
  onApproveProfile: action.bound,
  onRejectProfile: action.bound,
  onToggleProfileModal: action.bound,
  onOpenProfileModal: action.bound,
}

export const fieldsForSearch = ['profileName', 'profileEmail']

export interface ColumnsProps {
  onOpenProfileModal: (requestId: string, profileId: string, shopId: string) => void
  onRejectProfile: (id: string) => void
}
