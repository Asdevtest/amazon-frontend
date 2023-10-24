import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    gap: 10,
  },

  saveButton: {
    width: 240,
  },

  datagridWrapper: {
    width: '100%',
    height: '70vh',
    borderRadius: 4,
    boxShadow: theme.palette.boxShadow.paper,
  },
}))
