import { GlobalStyles } from '@mui/material'

const styles = () => ({
  '*': {
    display: 'none !important',
  },
})

export const GlobalStylesProvider = () => {
  return <GlobalStyles styles={styles} />
}
