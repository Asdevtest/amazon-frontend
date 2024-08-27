export enum ProfileRequestStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}

export enum ProfileStatus {
  REGISTERED = 'REGISTERED',
  WAITING_INVITE = 'WAITING_INVITE',
  INVITED = 'INVITED',
}

export type ProfileRequestStatusType = 'PENDING' | 'REJECTED' | 'APPROVED'
export type ProfileStatusType = 'REGISTERED' | 'WAITING_INVITE' | 'INVITED'
