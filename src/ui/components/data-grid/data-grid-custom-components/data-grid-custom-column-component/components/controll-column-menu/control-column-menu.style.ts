import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  controlWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    borderBottom: `1px solid ${theme.palette.input.customBorder}`,
  },

  crossIcon: {
    width: '11px !important',
    height: '11px !important',
  },

  pinButtonsWrapper: {
    display: 'flex',
    gap: '20px',
  },
}))
