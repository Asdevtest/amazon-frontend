import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  optionWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  asinContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100px',
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
