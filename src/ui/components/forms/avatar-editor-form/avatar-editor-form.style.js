import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '640px',

    display: 'flex',
    flexDirection: 'column',
  },

  mainWrapper: {
    width: '100%',
    height: '300px',

    display: 'flex',
    alignItems: 'center',

    padding: '20px',
  },

  imgWrapper: {
    marginLeft: '70px',
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    width: '208px',
    height: '208px',

    border: '1px solid #007BFF',
    borderRadius: '50%',
  },

  btnsWrapper: {
    display: 'flex',
    margin: '30px 20px 10px 0',
    justifyContent: 'flex-end',
  },

  cancelBtn: {
    marginLeft: '30px',
  },

  successText: {
    color: '#00B746',
  },

  spanText: {
    color: theme.palette.primary.main,
    fontWeight: '500',
  },

  textsWrapper: {
    alignSelf: 'center',
  },

  title: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.second,
  },
}))
