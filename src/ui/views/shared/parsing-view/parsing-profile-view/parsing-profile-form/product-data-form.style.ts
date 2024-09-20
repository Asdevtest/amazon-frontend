import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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

  flexRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '20px',
  },

  unlinked: {
    padding: '2px 5px',
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.gray,
    border: `1px solid ${theme.palette.text.gray}`,
    borderRadius: '6px',
  },
}))
