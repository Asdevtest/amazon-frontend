import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  optionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  optionImage: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },

  optionText: {
    fontSize: 12,
    lineHeight: '14px',
  },

  optionIcon: {
    width: '12px !important',
    height: '12px !important',
  },
}))
