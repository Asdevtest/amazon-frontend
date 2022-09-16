import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  balanceWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  balanceTitle: {
    fontSize: 36,
    lineHeight: '49px',
    color: '#001029',
  },

  balanceFreeze: {
    fontSize: '36px',
    lineHeight: '49px',
    color: '#c4c4c4',
    marginLeft: 28,
  },

  title: {
    fontSize: 16,
    color: '#001029',
    lineHeight: '22px',
    marginTop: '12px',
  },
  fontSizeLarge: {
    width: '45px',
    height: '44px',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '97px',
    height: '97px',
    borderRadius: '50%',
    backgroundColor: '#F8F8F8',
    boxShadow: '0px 0px 14px 6px rgba(184, 184, 184, 0.18), inset -4px -4px 13px rgba(135, 135, 135, 0.15)',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '54px',
    height: '145px',
    marginLeft: '150px',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))
