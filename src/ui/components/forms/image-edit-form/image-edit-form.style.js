import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    // width: 500,
    // maxHeight: 510,
    display: 'flex',
    flexDirection: 'column',
  },

  imageWrapper: {
    // width: '50vw',
    // height: '55vh',
    // width: '55vh',
    // paddingTop: 130,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '45vh',
    height: '45vh',
    objectFit: 'contain',
    // objectPosition: 'center',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 50,
  },

  btnsSubWrapper: {
    display: 'flex',
    gap: 20,
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },
}))
