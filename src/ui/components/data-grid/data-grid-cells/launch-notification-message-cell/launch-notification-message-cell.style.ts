import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },

  text: {
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    lineHeight: '12px',
    fontWeight: 600,
    borderRadius: '22px',
  },
}))
