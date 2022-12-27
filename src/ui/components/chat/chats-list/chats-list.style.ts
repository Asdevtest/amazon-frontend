import {makeStyles} from 'tss-react/mui'

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
  },
  chatWrapperIsSelected: {
    borderBottomColor: `${theme.palette.primary.main} !important`,
  },
}))
