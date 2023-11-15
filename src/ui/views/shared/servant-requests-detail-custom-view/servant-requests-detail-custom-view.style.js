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
  chatWrapper: {
    marginTop: '20px',
    width: '100%',
    height: '778px',
  },
  additionalButtonsWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  backBtn: {
    width: '140px',
    height: '40px',
  },
}))
