import {ToggleButton} from '@mui/material'
import {styled} from '@mui/material/styles'

export const ToggleBtn = styled(ToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#006CFF',
  },

  '&.MuiToggleButton-root': {
    border: 'none',
    borderRadius: '4px',
    width: '27px',
    height: '24px',
    fontFamily: "'Manrope, sans-serif'",
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
})
