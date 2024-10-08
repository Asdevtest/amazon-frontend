import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '90vw',
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 10,
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '3px 0',
    gap: '10px',
    height: '133px',
    overflowY: 'auto',
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  searchInput: {
    width: 400,
  },

  tableWrapper: {
    minHeight: 'calc(100% - 500px)',
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

  borderCell: {
    borderRight: `1px solid ${theme.palette.input.customBorder} !important`,
    borderLeft: `1px solid ${theme.palette.input.customBorder} !important`,
  },
}))
