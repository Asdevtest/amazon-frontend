import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  tableWrapper: {
    marginTop: '20px',
    height: '80vh',
    width: '100%',
  },

  searchInput: {
    width: 440,

    input: {
      '&::placeholder': {
        fontSize: 14,
        lineHeight: '19px',
      },
    },
  },
}))
