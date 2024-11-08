import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  employeeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '5px',
  },

  contacts: {
    display: 'flex',
    gap: '5px',
  },
}))
