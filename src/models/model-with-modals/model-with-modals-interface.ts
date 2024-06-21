export interface IConfirmModalSettings {
  isWarning: boolean
  title: string
  message: string
  onSubmit: () => void
  onCancel: () => void
}
