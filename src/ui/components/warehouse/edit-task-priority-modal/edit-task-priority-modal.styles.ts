import {makeStyles} from 'tss-react/mui'

export const useEditTaskPriorityModalStyles = makeStyles()(theme => ({
  body: {
    maxWidth: 367,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
  },

  reasonInput: {
    width: '100%',
    maxWidth: 367,
    minWidth: 367,
    minHeight: 75,
  },

  reasonLabel: {
    marginBottom: 5,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  controls: {
    display: 'flex',
    gap: 10,

    button: {
      padding: '10px 25px',
    },
  },

  cancel: {
    color: theme.palette.text.general,
  },

  nativeSelect: {
    // [theme.breakpoints.down(1282)]: {
    //   width: 130,
    // },
    width: 150,
    '& > div': {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
    },
  },

  colorYellow: {
    color: '#F3AF00 !important',
  },
  colorRed: {
    color: '#FF1616 !important',
  },

  colorGreen: {
    color: '#00B746 !important',
  },

  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  rushOrderImg: {
    width: '12px',
    height: '13px',
  },

  titleWrapper: {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-end',
  },
}))
