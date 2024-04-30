import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  flexDirectionColumn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },

  stringListMenuWrapper: {
    width: 160,
    padding: '10px',
    maxHeight: 400,
  },

  searchInput: {
    border: '1px solid #E0E0E0',
    width: '100%',
    height: 30,
    marginBottom: 10,
  },

  multilineTextHeaderWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  shopOrderText: {
    width: '100%',
    textAlign: 'center',

    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '14px',

    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
  },
}))
