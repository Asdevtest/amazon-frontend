import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tabledWrapper: {
    marginTop: 20,
    height: 'calc(100vh - 240px)',
    width: '100%',
  },
}))
