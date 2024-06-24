import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: 20,
  },

  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  fieldContainer: {
    margin: 0,
  },

  label: {
    marginBottom: 5,
  },
}))
