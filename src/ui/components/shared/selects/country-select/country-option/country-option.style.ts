import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  selectOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  countryText: {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
