import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  employeeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '5px',
    overflow: 'hidden',
  },

  contacts: {
    display: 'flex',
    gap: '5px',
  },

  name: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
