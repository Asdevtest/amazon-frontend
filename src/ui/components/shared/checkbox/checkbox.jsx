import { StyledCheckbox } from './styled-checkbox'

export const Checkbox = ({ color, title = '', children = null, ...restProps }) => {
  return (
    <StyledCheckbox title={title ?? ''} color={color || 'primary'} {...restProps}>
      {children}
    </StyledCheckbox>
  )
}
