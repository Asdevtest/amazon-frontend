export interface ActionButtonsCellProps {
  wrapperClassName?: string
  className?: string
  block?: boolean
  row?: boolean

  showFirst?: boolean
  showSecond?: boolean
  showThird?: boolean

  firstDanger?: boolean
  secondDanger?: boolean
  thirdDanger?: boolean

  firstGhost?: boolean
  secondGhost?: boolean
  thirdGhost?: boolean

  firstIcon?: React.ReactNode
  secondIcon?: React.ReactNode
  thirdIcon?: React.ReactNode

  firstIconPosition?: 'start' | 'end'
  secondIconPosition?: 'start' | 'end'
  thirdIconPosition?: 'start' | 'end'

  firstLoading?: boolean
  secondLoading?: boolean
  thirdLoading?: boolean

  firstShape?: 'circle' | 'round' | 'default'
  secondShape?: 'circle' | 'round' | 'default'
  thirdShape?: 'circle' | 'round' | 'default'

  firstSize?: 'small' | 'middle' | 'large'
  secondSize?: 'small' | 'middle' | 'large'
  thirdSize?: 'small' | 'middle' | 'large'

  firstType?: 'primary' | 'dashed' | 'link' | 'text' | 'default'
  secondType?: 'primary' | 'dashed' | 'link' | 'text' | 'default'
  thirdType?: 'primary' | 'dashed' | 'link' | 'text' | 'default'

  firstContent?: React.ReactNode
  secondContent?: React.ReactNode
  thirdContent?: React.ReactNode

  firstDisabled?: boolean
  secondDisabled?: boolean
  thirdDisabled?: boolean

  firstDescription?: string
  secondDescription?: string
  thirdDescription?: string

  onClickFirst?: () => void
  onClickSecond?: () => void
  onClickThird?: () => void
}
