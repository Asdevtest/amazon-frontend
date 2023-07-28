import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 310,
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    border: `1px solid ${theme.palette.input.customBorder}`,

    [theme.breakpoints.down(768)]: {
      width: '100%',
      border: 'none',
      maxHeight: 'calc(100vh - 142px)',

      '&::-webkit-scrollbar': {
        width: 0,
      },
    },
  },

  chatWrapper: {
    border: `1px solid ${theme.palette.input.customBorder}`,

    [theme.breakpoints.down(768)]: {
      border: 'none',
    },
  },

  chatWrapperIsSelected: {
    borderColor: `${theme.palette.primary.main} !important`,
  },

  indicator: {
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
