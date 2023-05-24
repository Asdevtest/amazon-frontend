import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'auto',

    // border: '1px solid #E0E0E0',

    border: `1px solid ${theme.palette.input.customBorder}`,
    [theme.breakpoints.down(768)]: {
      borderRadius: '4px',
    },
  },
  chatWrapper: {
    width: '100%',
    borderBottomWidth: '2px',
    borderBottomColor: theme.palette.input.customBorder,
    borderBottomStyle: 'solid',

    borderTop: `1px solid ${theme.palette.input.customBorder}`,
  },
  chatWrapperIsSelected: {
    borderBottomColor: `${theme.palette.primary.main} !important`,
  },

  indicator: {
    // backgroundColor: '#1da1f2',
    backgroundColor: theme.palette.primary.main,
  },
  row: {
    width: '100%',
    padding: '0 0px',
    margin: '0 auto',
    minHeight: `40px`,
  },

  selected: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
  },

  tabRoot: {
    textTransform: 'none',
    minHeight: `40px`,
    borderBottom: `1px solid ${theme.palette.input.customBorder}`,
  },
}))
