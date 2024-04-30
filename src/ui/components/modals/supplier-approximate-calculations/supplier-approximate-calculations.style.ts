import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '90vw',
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '> div': {
      width: '350px',
    },
  },

  productsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '3px 0',
    gap: '10px',
    height: '107px',
    overflowY: 'auto',
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  tableWrapper: {
    minHeight: 'calc(100% - 280px)',
    flex: 1,
    width: '100%',
    paddingBottom: '3px',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    alignItems: 'center',
    margin: '0 3px 5px 0',
  },

  activeRow: {
    background:
      'linear-gradient(180deg, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0) 32.5%, rgba(33, 150, 243, 0) 72.5%, rgba(33, 150, 243, 0.15) 100%), linear-gradient(270deg, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0) 6.5%, rgba(33, 150, 243, 0) 91.5%, rgba(33, 150, 243, 0.15) 100%)',
  },
}))
