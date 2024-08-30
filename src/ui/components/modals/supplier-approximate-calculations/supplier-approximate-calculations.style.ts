import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '85vw',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
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

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    alignItems: 'center',
    margin: '0 3px 5px 0',
  },

  activeRow: {
    background: theme.palette.background.tableCurRow,
  },

  borderCell: {
    borderRight: `1px solid ${theme.palette.input.customBorder} !important`,
    borderLeft: `1px solid ${theme.palette.input.customBorder} !important`,
  },
}))
