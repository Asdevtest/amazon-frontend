import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  field: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '240px',

    div: {
      button: {
        padding: 4,
      },
    },
  },

  input: {
    width: '100%',
    fontSize: 14,
    lineHeight: '19px',
  },

  iconButton: {
    padding: 4,
  },
}))
