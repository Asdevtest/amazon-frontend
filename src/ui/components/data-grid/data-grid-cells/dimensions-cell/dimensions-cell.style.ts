import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: '10px 0',
    display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '5px',
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },

  option: {
    padding: '3px',
    width: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',
  },

  text: {
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'right',
  },

  bold: {
    fontWeight: 600,
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },

  lessWeight: {
    background: theme.palette.background.redRow,
    borderRadius: '6px',
  },

  icon: {
    display: 'inline-block',
    color: theme.palette.text.red,
  },
}))
