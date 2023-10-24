import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    flexDirection: 'column',
    height: '82.5vh',
  },

  placeAddBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '5px',
    [theme.breakpoints.down(768)]: {
      paddingRight: '10px',
    },
  },

  placeAddBtn: {
    width: '159px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '91px',
    },
  },
}))
