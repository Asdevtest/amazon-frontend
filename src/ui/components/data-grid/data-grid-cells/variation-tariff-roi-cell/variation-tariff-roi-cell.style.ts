import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    '& :last-child': {
      borderBottom: 'none',
    },
  },

  destination: {
    minHeight: 48,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    margin: '0 -10px',
    borderBottom: `1px solid ${theme.palette.input.customBorder}`,
    borderRight: `1px solid ${theme.palette.input.customBorder}`,
    borderLeft: `1px solid ${theme.palette.input.customBorder}`,

    p: {
      padding: '0 10px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },

  badRoi: {
    color: '#FC0032',
    backgroundColor: theme.palette.roi.bad,
  },

  normalRoi: {
    color: '#C69109',
    backgroundColor: theme.palette.roi.normal,
  },

  goodRoi: {
    color: '#0B903E',
    backgroundColor: theme.palette.roi.good,
  },
}))
