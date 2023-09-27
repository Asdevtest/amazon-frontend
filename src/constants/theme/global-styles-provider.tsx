import { GlobalStyles, Theme } from '@mui/material'

const styles = (theme: Theme) => ({
  '*': {
    display: 'none !important',
  },
})

export const GlobalStylesProvider = () => {
  return <GlobalStyles styles={styles} />
}
