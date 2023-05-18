import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '640px',

    display: 'flex',
    flexDirection: 'column',
  },

  mainTitle: {
    color: theme.palette.text.general,
  },

  mainWrapper: {
    width: '100%',
    minHeight: 320,
    display: 'flex',
    padding: '20px  0 20px ',
  },

  avatarWrapper: {
    width: '100%',
    minHeight: 320,
    maxHeight: 500,
    display: 'flex',
    overflow: 'auto',
  },

  imgWrapper: {
    marginLeft: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  img: {
    width: '208px',
    height: '208px',

    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '50%',

    backgroundColor: theme.palette.background.disabled,
  },

  btnsWrapper: {
    display: 'flex',
    margin: '30px 20px 10px 0',
    justifyContent: 'flex-end',
  },

  cancelBtn: {
    marginLeft: '30px',
    color: theme.palette.text.general,
  },

  standartText: {
    color: theme.palette.text.general,
  },

  labelStyle: {
    width: '100%',
    backgroundColor: theme.palette.background.second,
    textAlign: 'center',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
