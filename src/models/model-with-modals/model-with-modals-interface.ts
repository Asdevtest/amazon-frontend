export interface IWarningInfoModalSettings {
  isWarning: boolean
  title: string
}

export interface IConfirmModalSettings {
  isWarning: boolean
  title: string
  message: string
  onSubmit: () => void
  onCancel: () => void
}
