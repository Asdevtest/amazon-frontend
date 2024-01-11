import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  backBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  requestInfoWrapper: {
    marginTop: '24px',
  },
  detailsWrapper: {
    marginTop: '20px',
  },

  backBtn: {
    width: '140px',
    height: '40px',
  },
}))
