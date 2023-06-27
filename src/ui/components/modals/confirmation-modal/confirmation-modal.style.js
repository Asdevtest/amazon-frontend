import { keyframes } from '@emotion/react'

import { makeStyles } from 'tss-react/mui'

const animate_gradient = keyframes`
 0% {
    backgroundPosition: '0% 50%';
  }
  50% {
    backgroundPosition: '100% 50%';
  }
  100% {
    backgroundPosition: '0% 50%';
  }
`

export const useClassNames = makeStyles()(theme => ({
  modalMessageWrapper: {
    width: '425px',
    minHeight: '168px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 28px',
    backgroundColor: theme.palette.background.general,

    [theme.breakpoints.down(768)]: {
      width: '300px',
      minHeight: '0',
      height: '122px',
      padding: 0,
    },
  },

  commentMessageWrapper: {
    width: '586px',
    minHeight: '168px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '30px',

    [theme.breakpoints.down(768)]: {
      width: '280px',
      minHeight: '168px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '30px',
    },
  },

  commentTitle: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  commentLabelText: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',

    padding: 0,
  },

  warningModalMessageWrapper: {
    background: theme.palette.background.general,
    borderRadius: '10px 10px',
  },

  modalMessage: {
    textAlign: 'center',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
    },
  },

  modalSmallMessage: {
    color: theme.palette.text.second,
    textAlign: 'center',
    fontSize: 14,
  },

  warningModalMessage: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    textAlign: 'center',
    margin: 0,
  },

  buttonsWrapper: {
    width: '100%',
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.general,
  },

  warningButtonsWrapper: {
    borderRadius: '0 0 10px 10px',
    backgroundColor: theme.palette.background.general,
    marginTop: '22px',
    [theme.breakpoints.down(768)]: {
      marginTop: '18px',
    },
  },

  commentButtonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    width: '350px',
    textAlign: 'center',
    marginBottom: '11px',

    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      width: '220px',
      textAlign: 'center',
      marginBottom: '0',
      fontSize: '16px',
      lineHeight: '22px',
    },
  },

  warningTitle: {
    borderRadius: '10px',
    backgroundSize: '400% 400%',
    animation: `${animate_gradient} 1.5s ease infinite`,
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    textAlign: 'center',
    verticalAlign: 'middle',
  },

  button: {
    height: '40px',
    width: '98px',
    [theme.breakpoints.down(768)]: {
      width: '69px',
    },
  },

  cancelButton: {
    height: '40px',
    width: '98px',
    color: theme.palette.text.general,
  },
}))
