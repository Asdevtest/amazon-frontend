import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: '600',
  },

  container: {
    display: 'grid',
    gridTemplateAreas: '"a b" "a с" "d e" "f g" "h i"',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(5, auto)',
    gap: '20px',
  },

  field: {
    margin: 0,
  },

  input: {
    width: '200px',
  },

  buttons: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '20px',
  },
}))