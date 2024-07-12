import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  backBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  requestInfoWrapper: {
    marginTop: '20px',
  },
  detailsWrapper: {
    marginTop: '20px',
  },
}))
