import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  controls: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 30,
    marginTop: '-0px',
    marginRight: '-100px',

    button: {
      width: 40,
      height: 40,
    },

    [theme.breakpoints.down(768)]: {
      justifyContent: 'space-between',
      padding: '0 17px',
      marginTop: 0,
      marginRight: 0,
    },
  },

  button: {
    width: 40,
    height: 40,
  },

  activeMainIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    background: 'rgb(53, 112, 155)',
    color: '#F5CF00',
  },

  pasteInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
    borderRadius: 10,
  },
}))
