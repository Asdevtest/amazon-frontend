import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  infoWrapper: {
    flex: 2,
    display: 'flex',
    minWidth: '130px',
  },
  resultWrapper: {
    flex: 5,
    display: 'flex',
    minWidth: '250px',
  },
  commentWrapper: {
    flex: 3,
    display: 'flex',
    minWidth: '350px',
    overflow: 'hidden',
  },
  text: {
    color: theme.palette.text.general,
  },
}))
