import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  shortDateCellTypo: {
    textAlign: 'center',
    width: '100%',
    whiteSpace: 'pre-line',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
  },
}))
