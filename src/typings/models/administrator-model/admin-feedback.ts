interface IFeedback {
  _id?: string
  text?: string
  media?: object[]
  user?: IAdminUserFeedback
  updatedAt?: string
}

interface IAdminUserFeedback {
  _id?: string
  name?: string
  rating?: number
  lastSeen?: string
  email?: string
}
