import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  boxesAndQuantityWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexWrap: 'wrap',
  },

  boxesAndQuantityText: {
    whiteSpace: 'normal',
    color: theme.palette.text.general,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
  },
}))
