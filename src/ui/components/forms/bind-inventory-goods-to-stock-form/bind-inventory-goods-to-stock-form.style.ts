import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 920,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  transferWrapper: {
    display: 'flex',
    height: 230,
  },
}))
