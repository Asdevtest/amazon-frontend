import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  taskDescriptionScrollWrapper: {
    width: '100%',
    overflowX: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflowY: 'auto',
    margin: '10px 0',
    padding: '5px 0',
  },

  operationTypeText: {
    [theme.breakpoints.down(1282)]: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '16px',
    },
  },
}))
