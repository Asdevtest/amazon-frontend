export interface IWarningInfoModalSettings {
  isWarning: boolean
  title: string
  buttonText: string
  onSubmit: () => void
}

export interface IConfirmModalSettings {
  isWarning: boolean
  title: string
  message: string
  onSubmit: () => void
  onCancel: () => void
}
