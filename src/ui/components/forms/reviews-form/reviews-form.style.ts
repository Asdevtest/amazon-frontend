import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: '600',
  },

  reviews: {
    paddingRight: '5px',
    maxHeight: 500,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  center: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  card: {
    padding: 10,
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  textBold: {
    fontWeight: 600,
  },

  editor: {
    overflow: 'hidden',
    minHeight: 'max-content !important',

    '.public-DraftEditor-content': {
      minHeight: 'max-content !important',
    },
  },
}))
