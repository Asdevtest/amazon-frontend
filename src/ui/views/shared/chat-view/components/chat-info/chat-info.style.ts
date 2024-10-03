import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    height: '100%',
    minWidth: '320px',
    borderLeft: `1px solid ${theme.palette.background.second}`,
    padding: '10px',
  },

  customSwitcher: {
    '.ant-radio-button-wrapper span:nth-of-type(2)': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}))
